/* 答題頁引擎:讀取 window.QUIZ_CONFIG 設定,載入題目 JSON 後直接開始作答。
 * 計分:每個選項對 1~2 種類型加分(scores),取總分最高者;
 *       平手時比 results[type].weight(越大越優先,稀有類型權重高)。
 * 結果:若該類型的靜態結果頁已上線(readySlugs),導向 /results/<slug>/?from=quiz;
 *       否則退回頁內結果畫面(過渡期用)。
 */
(function () {
  var cfg = window.QUIZ_CONFIG || {};
  // 插圖產生器:貓測驗用 catSVG(預設),狗測驗設 cfg.artFn = "dogSVG"
  function drawArt(art, uid) {
    var fn = window[cfg.artFn] || window.catSVG;
    return fn(art, uid);
  }

  var quiz = null;
  var current = 0;
  var totals = {};
  var locked = false; // 防止動畫期間連點

  function fail(msg) {
    document.getElementById("screen-question").hidden = true;
    var box = document.getElementById("error-box");
    box.hidden = false;
    box.innerHTML = msg + '<br><br><a class="btn btn-ghost" href="' + cfg.quizUrl + '">回測驗介紹頁</a>';
  }

  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  fetch(cfg.dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(function (data) {
      quiz = data;
      startQuiz();
    })
    .catch(function () { fail("測驗載入失敗,請稍後再試 🙀"); });

  function startQuiz() {
    current = 0;
    totals = {};
    locked = false;
    document.getElementById("screen-question").hidden = false;
    document.getElementById("screen-result").hidden = true;
    window.scrollTo(0, 0);
    renderQuestion();
  }

  function renderQuestion() {
    var q = quiz.questions[current];
    var total = quiz.questions.length;

    document.getElementById("progress-label").textContent =
      "第 " + (current + 1) + " 題 / 共 " + total + " 題";
    document.getElementById("progress-fill").style.width =
      ((current + 1) / total) * 100 + "%";

    var card = document.getElementById("question-card");
    card.classList.remove("slide-in");
    void card.offsetWidth; // 重新觸發動畫
    card.classList.add("slide-in");

    document.getElementById("question-text").textContent = q.text;

    var box = document.getElementById("options");
    box.innerHTML = "";
    q.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = opt.text;
      btn.addEventListener("click", function () { pick(btn, opt); });
      box.appendChild(btn);
    });
    locked = false;
  }

  function pick(btn, opt) {
    if (locked) return;
    locked = true;
    btn.classList.add("picked");

    Object.keys(opt.scores).forEach(function (type) {
      totals[type] = (totals[type] || 0) + opt.scores[type];
    });

    // 給一點點擊回饋時間再進下一題
    setTimeout(function () {
      current++;
      if (current < quiz.questions.length) {
        renderQuestion();
      } else {
        finish(computeResult());
      }
    }, 320);
  }

  function computeResult() {
    var best = null;
    Object.keys(totals).forEach(function (type) {
      if (!quiz.results[type]) return;
      var score = totals[type];
      var weight = quiz.results[type].weight || 0;
      if (!best || score > best.score || (score === best.score && weight > best.weight)) {
        best = { type: type, score: score, weight: weight };
      }
    });
    return best ? best.type : Object.keys(quiz.results)[0];
  }

  function finish(type) {
    var slug = (cfg.slugs || {})[type];
    if (slug && (cfg.readySlugs || []).indexOf(slug) !== -1) {
      // 靜態結果頁已上線 → 直接導過去(用 replace,返回鍵不會回到空白答題頁)
      location.replace(cfg.resultBase + slug + "/?from=quiz");
      return;
    }
    showFallbackResult(type); // 過渡期:結果頁還沒建好時,先在頁內顯示
  }

  function showFallbackResult(type) {
    var r = quiz.results[type];
    document.getElementById("screen-question").hidden = true;
    var screen = document.getElementById("screen-result");
    screen.hidden = false;
    document.getElementById("result-art").innerHTML = drawArt(r.art, "result");
    document.getElementById("result-name").textContent = r.name;
    document.getElementById("result-tagline").textContent = r.tagline;
    document.getElementById("result-desc").textContent = r.description;
    document.getElementById("result-friend").textContent = r.friend;
    document.getElementById("result-rival").textContent = r.rival;
    document.getElementById("result-cta").textContent = quiz.resultCta;
    document.getElementById("btn-share").dataset.result = r.name;
    window.scrollTo(0, 0);
  }

  document.getElementById("btn-retry").addEventListener("click", startQuiz);
  document.getElementById("btn-share").addEventListener("click", share);

  function share() {
    var resultName = document.getElementById("btn-share").dataset.result || "";
    var url = location.origin + cfg.quizUrl;
    var text = (quiz.shareText || "").replace("{result}", resultName);

    if (navigator.share) {
      navigator.share({ title: quiz.shareTitle || quiz.title, text: text, url: url })
        .catch(function () { /* 使用者取消分享,不用處理 */ });
    } else {
      copyLink(text + "\n" + url);
    }
  }

  function copyLink(content) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(content).then(
        function () { toast("已複製連結,快貼給朋友吧!"); },
        function () { legacyCopy(content); }
      );
    } else {
      legacyCopy(content);
    }
  }

  function legacyCopy(content) {
    var ta = document.createElement("textarea");
    ta.value = content;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast("已複製連結,快貼給朋友吧!");
    } catch (e) {
      toast("複製失敗,請手動複製網址");
    }
    document.body.removeChild(ta);
  }
})();
