// wealth-data.js — 隱藏財富引擎測驗:8 人格 × 主副型組合對照
// 供 /results/wealth-*/ 結果頁在使用者從測驗過來(帶 ?secondary=Px)時,
// 動態補上「雙核心組合」區塊。找不到手寫組合時自動合成(主型前3+副型前2方法)。
(function () {
  var PERSONAS = {
  "P1": {
    "name": "穩健資產家",
    "animal": "🐿️",
    "animalName": "松鼠",
    "slug": "wealth-squirrel",
    "topMethods": [
      "高股息 ETF",
      "債券 ETF",
      "REITs 不動產投資信託",
      "貨幣市場基金",
      "定期存款與階梯式定存"
    ]
  },
  "P2": {
    "name": "數位工匠",
    "animal": "🦫",
    "animalName": "河狸",
    "slug": "wealth-beaver",
    "topMethods": [
      "Notion 模板",
      "Excel／Google Sheets 財務試算表",
      "Canva 模板",
      "電子書與電子手帳",
      "設計素材包（Figma UI Kit、Icon、字型）"
    ]
  },
  "P3": {
    "name": "知識出版家",
    "animal": "🦉",
    "animalName": "貓頭鷹",
    "slug": "wealth-owl",
    "topMethods": [
      "預錄線上課程",
      "Amazon KDP 電子書／有聲書",
      "專業電子報",
      "題庫與教材授權",
      "付費資料庫與研究報告"
    ]
  },
  "P4": {
    "name": "流量放大器",
    "animal": "🦚",
    "animalName": "孔雀",
    "slug": "wealth-peacock",
    "topMethods": [
      "YouTube／Shorts 廣告分潤",
      "TikTok Shop 導購",
      "SEO 部落格與商品評測",
      "Amazon／蝦皮聯盟行銷",
      "軟體與 AI 工具推薦佣金"
    ]
  },
  "P5": {
    "name": "社群主理人",
    "animal": "🐝",
    "animalName": "蜜蜂",
    "slug": "wealth-bee",
    "topMethods": [
      "付費電子報（Substack）",
      "Patreon 會員",
      "Discord／LINE 付費社群",
      "專業研究／情報訂閱",
      "題庫會員與每月資源包"
    ]
  },
  "P6": {
    "name": "系統建築師",
    "animal": "🐜",
    "animalName": "螞蟻",
    "slug": "wealth-ant",
    "topMethods": [
      "Micro-SaaS 微型軟體",
      "AI Agent／AI 客服機器人",
      "n8n 自動化服務",
      "價格／職缺監控工具",
      "LINE Bot／Discord Bot 訂閱"
    ]
  },
  "P7": {
    "name": "版權收藏家",
    "animal": "🦩",
    "animalName": "火烈鳥",
    "slug": "wealth-flamingo",
    "topMethods": [
      "Stock Photo／Stock Video 圖片影片授權",
      "音樂與音效素材授權",
      "插畫／字型／3D 模型授權",
      "程式碼與 WordPress 主題授權",
      "角色 IP 與課程教材授權"
    ]
  },
  "P8": {
    "name": "實體經營家",
    "animal": "🐢",
    "animalName": "烏龜",
    "slug": "wealth-turtle",
    "topMethods": [
      "房屋／套房出租",
      "停車位與儲物空間出租",
      "攝影棚／廚房空間出租",
      "販賣機與自助洗衣店",
      "充電站與無人零售設備"
    ]
  }
};
  var COMBINATIONS = {
  "P6_P2": {
    "title": "系統建築師 × 數位工匠",
    "tagline": "你能把重複工作變成系統，也能把系統包裝成好賣的產品。",
    "methods": [
      "n8n 工作流模板",
      "AI 提示詞包",
      "自動化教學商品",
      "小型付費工具",
      "Chrome 擴充功能"
    ]
  },
  "P4_P2": {
    "title": "流量放大器 × 數位工匠",
    "tagline": "你能吸引人潮，也能做出他們想帶走的東西。",
    "methods": [
      "短影音導購",
      "Canva 模板",
      "社群素材包",
      "商品評測網站",
      "數位商品加聯盟行銷"
    ]
  },
  "P3_P5": {
    "title": "知識出版家 × 社群主理人",
    "tagline": "你能把知識講清楚，也能把讀者變成長期社群。",
    "methods": [
      "付費電子報",
      "線上課程",
      "專業會員社群",
      "題庫訂閱",
      "研究資料庫"
    ]
  },
  "P1_P8": {
    "title": "穩健資產家 × 實體經營家",
    "tagline": "你追求穩定現金流，也懂得讓實體資產替你生錢。",
    "methods": [
      "REITs",
      "收益型不動產",
      "停車位出租",
      "儲物空間出租",
      "委託管理型租賃"
    ]
  },
  "P2_P7": {
    "title": "數位工匠 × 版權收藏家",
    "tagline": "你做出的每件作品，都能被反覆授權、持續收租。",
    "methods": [
      "設計素材包",
      "Canva 模板版稅",
      "字型與 Icon 授權",
      "Procreate 筆刷",
      "Stock 圖庫上架"
    ]
  },
  "P6_P3": {
    "title": "系統建築師 × 知識出版家",
    "tagline": "你能建出工具，也能教會別人怎麼用它。",
    "methods": [
      "AI 工具訂閱＋教學",
      "自動化課程",
      "SaaS＋知識庫會員",
      "API 資料服務",
      "付費 Bot＋使用手冊"
    ]
  },
  "P4_P5": {
    "title": "流量放大器 × 社群主理人",
    "tagline": "你能把人潮引進來，也能把他們留下來變成鐵粉。",
    "methods": [
      "YouTube 頻道會員",
      "Patreon",
      "付費社群＋聯盟導購",
      "粉絲俱樂部",
      "訂閱制內容"
    ]
  },
  "P1_P7": {
    "title": "穩健資產家 × 版權收藏家",
    "tagline": "你既讓資金生息，也讓作品持續產生版稅現金流。",
    "methods": [
      "高股息 ETF",
      "書籍版稅",
      "音樂版權投資",
      "Stock 素材長尾收入",
      "REITs"
    ]
  }
};

  function getWealthCombination(primaryId, secondaryId) {
    if (!PERSONAS[primaryId] || !PERSONAS[secondaryId] || primaryId === secondaryId) return null;
    var key = primaryId + "_" + secondaryId;
    var reverseKey = secondaryId + "_" + primaryId;
    if (COMBINATIONS[key]) return COMBINATIONS[key];
    if (COMBINATIONS[reverseKey]) return COMBINATIONS[reverseKey];
    var p = PERSONAS[primaryId], s = PERSONAS[secondaryId];
    return {
      title: p.name + " × " + s.name,
      tagline: "你以「" + p.name + "」為核心,同時帶有「" + s.name + "」的特質,適合把兩者結合。",
      methods: p.topMethods.slice(0, 3).concat(s.topMethods.slice(0, 2))
    };
  }

  window.WEALTH_PERSONAS = PERSONAS;
  window.getWealthCombination = getWealthCombination;
})();
