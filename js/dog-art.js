/* 用 SVG 畫的簡單狗狗插圖,結構比照 cat-art.js。
 * dogSVG(art, uid) 依照 art 設定產生一張狗臉:
 *   base:   底色
 *   muzzle: 口鼻部色(預設米白)
 *   ear:    "floppy" | "point" | "bat" | "long"
 *   eye:    眼睛顏色
 *   pattern:"none" | "mask" | "blaze" | "patches" | "curls"
 *   p1, p2: 花紋用色
 *   tongue: true 時吐舌
 * uid 讓同一頁多隻狗的 clipPath id 不會撞名。
 */
(function () {
  function ears(type, base, p1) {
    var inner = "#E8B39B";
    switch (type) {
      case "floppy":
        // 垂耳(黃金獵犬、邊牧)
        return (
          '<path d="M46 54 Q20 62 24 104 Q28 124 46 116 Q56 92 58 60 Z" fill="' + base + '"/>' +
          '<path d="M154 54 Q180 62 176 104 Q172 124 154 116 Q144 92 142 60 Z" fill="' + base + '"/>'
        );
      case "long":
        // 長垂耳(臘腸)
        return (
          '<path d="M44 56 Q14 66 20 122 Q24 146 44 134 Q54 100 56 62 Z" fill="' + base + '"/>' +
          '<path d="M156 56 Q186 66 180 122 Q176 146 156 134 Q146 100 144 62 Z" fill="' + base + '"/>'
        );
      case "bat":
        // 大立耳(法鬥、柯基、吉娃娃)
        return (
          '<path d="M52 62 Q22 6 74 24 Q88 32 80 58 Z" fill="' + base + '"/>' +
          '<path d="M148 62 Q178 6 126 24 Q112 32 120 58 Z" fill="' + base + '"/>' +
          '<path d="M56 54 Q38 20 70 30 Q78 36 72 52 Z" fill="' + inner + '"/>' +
          '<path d="M144 54 Q162 20 130 30 Q122 36 128 52 Z" fill="' + inner + '"/>'
        );
      default:
        // 立耳(柴犬、哈士奇)
        return (
          '<path d="M42 62 Q30 14 66 26 Q80 34 76 56 Z" fill="' + base + '"/>' +
          '<path d="M158 62 Q170 14 134 26 Q120 34 124 56 Z" fill="' + base + '"/>' +
          '<path d="M48 54 Q42 26 64 34 Q72 40 68 52 Z" fill="' + inner + '"/>' +
          '<path d="M152 54 Q158 26 136 34 Q128 40 132 52 Z" fill="' + inner + '"/>'
        );
    }
  }

  function pattern(art, clip) {
    var g = '<g clip-path="url(#' + clip + ')">';
    switch (art.pattern) {
      case "mask":
        // 下半臉淺色面罩(哈士奇)或深色口罩(法鬥)
        return g + '<ellipse cx="100" cy="126" rx="54" ry="42" fill="' + art.p1 + '"/></g>';
      case "blaze":
        // 額頭中線(柯基、邊牧)
        return g + '<path d="M90 34 Q100 28 110 34 L106 96 Q100 100 94 96 Z" fill="' + art.p1 + '"/></g>';
      case "patches":
        // 色塊(米克斯)
        return g +
          '<ellipse cx="58" cy="60" rx="32" ry="28" fill="' + art.p1 + '"/>' +
          '<ellipse cx="144" cy="62" rx="26" ry="24" fill="' + (art.p2 || art.p1) + '"/></g>';
      case "curls":
        // 頭頂捲毛(貴賓)
        return (
          '<circle cx="58" cy="52" r="16" fill="' + art.p1 + '"/>' +
          '<circle cx="82" cy="40" r="17" fill="' + art.p1 + '"/>' +
          '<circle cx="108" cy="38" r="17" fill="' + art.p1 + '"/>' +
          '<circle cx="132" cy="46" r="16" fill="' + art.p1 + '"/>'
        );
      default:
        return "";
    }
  }

  window.dogSVG = function (art, uid) {
    var clip = "dog-clip-" + (uid || Math.random().toString(36).slice(2, 7));
    var muzzle = art.muzzle || "#F6EBDD";
    var tongue = art.tongue
      ? '<path d="M94 128 Q100 142 106 128 Q104 124 96 124 Z" fill="#E77A72"/>'
      : "";
    return (
      '<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<defs><clipPath id="' + clip + '"><ellipse cx="100" cy="98" rx="70" ry="62"/></clipPath></defs>' +
      ears(art.ear || "point", art.base, art.p1) +
      '<ellipse cx="100" cy="98" rx="70" ry="62" fill="' + art.base + '"/>' +
      pattern(art, clip) +
      // 口鼻部
      '<ellipse cx="100" cy="122" rx="33" ry="23" fill="' + muzzle + '"/>' +
      // 眼睛
      '<ellipse cx="76" cy="88" rx="9" ry="11" fill="' + (art.eye || "#4A3826") + '"/>' +
      '<ellipse cx="124" cy="88" rx="9" ry="11" fill="' + (art.eye || "#4A3826") + '"/>' +
      '<circle cx="79" cy="84" r="3" fill="#fff"/>' +
      '<circle cx="127" cy="84" r="3" fill="#fff"/>' +
      // 鼻子與嘴巴
      '<ellipse cx="100" cy="112" rx="8" ry="6" fill="#3E3128"/>' +
      '<path d="M100 118 Q100 126 91 126 M100 118 Q100 126 109 126" stroke="#6B4F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      tongue +
      "</svg>"
    );
  };

  // 測驗卡片用的預設柴犬
  window.defaultDogArt = { base: "#E8A05A", ear: "point", pattern: "none", eye: "#4A3826", tongue: true };
})();
