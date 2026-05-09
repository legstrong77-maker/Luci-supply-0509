# 璨榮會登山聯誼會 ／ Lucidity Hiking Club

> 由璨揚企業（Lucidity）同仁共同發起的登山聯誼會官方網站。
> 本月行程：**嘉南雲峰 × 石壁山**（雲林古坑｜2026.05.09）

純靜態網頁（HTML / CSS / JS），無相依套件。

---

## 🚀 線上分享（GitHub Pages）

最簡單的分享方式：

1. 進到 GitHub repo → **Settings** → **Pages**
2. **Source** 選「**GitHub Actions**」
3. 等 1 分鐘，Actions 自動跑完，網址會出現在頁面上：

   ```
   https://legstrong77-maker.github.io/Luci-supply-0509/
   ```

> 本 repo 已內建 `.github/workflows/pages.yml`，每次 push 到 `main` 或 `claude/hiking-club-website-YB5qy` 就會自動部署。

### 其他一鍵部署方式

| 平台 | 操作 |
|---|---|
| **Netlify Drop** | 把整個資料夾拖到 https://app.netlify.com/drop |
| **Vercel** | `npx vercel --prod` |
| **Cloudflare Pages** | Pages → Connect to Git → 選此 repo |

---

## 📁 檔案結構

```
.
├── index.html      # 主頁面
├── styles.css      # 樣式
├── script.js       # 互動 / 動畫
├── images/         # 照片放置處（見 images/README.md）
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Pages 自動部署
```

---

## 🖼 照片更換

照片目前為 SVG/CSS 風格化視覺。要換成實拍照片：

1. 把照片以下列檔名放進 `images/` 資料夾：
   - `hero.jpg`、`story-1.jpg`、`story-2.jpg`
   - `gallery-1.jpg` ~ `gallery-6.jpg`
   - `join-bg.jpg`
2. Push 後自動重新部署。

詳見 [`images/README.md`](images/README.md)。

---

## 🧭 本次紀錄

| 項目 | 數值 |
|---|---|
| 日期 | 2026.05.09 上午 8:51 |
| 路線 | 古坑石壁九芎公廟 → 嘉南雲峰 → 好望角 → 石壁山 → 南路 |
| 距離 | **8.69 公里** |
| 時間 | **4 小時 31 分** |
| 累積爬升 | **679 公尺** |
| 卡路里 | **1,861 kcal** |

---

## 🏢 主辦單位

**璨揚企業股份有限公司**　Lucidity Enterprise Co., Ltd.
台南市安南區塩田里工業一路 18 號
☎ +886-6-510-5998 　🌐 [lucidity-group.com](https://www.lucidity-group.com)

---

© 2018–2026 璨榮會登山聯誼會
