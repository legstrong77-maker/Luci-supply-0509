# 璨榮會登山聯誼會 ／ Lucidity Hiking Club

> 由璨揚企業（Lucidity）同仁共同發起的登山聯誼會官方網站。
> 本月行程：**嘉南雲峰 × 石壁山**（雲林古坑｜2026.05.09）

純靜態網頁（HTML / CSS / JS），無相依套件。

---

## 🚀 線上分享（GitHub Pages）

**首次設定（一次就好）**

1. 進到 [Settings → Pages](https://github.com/legstrong77-maker/Luci-supply-0509/settings/pages)
2. **Source** 選「**GitHub Actions**」（不要選「Deploy from a branch」）
3. 把 PR #1 合併進 `main`（或在 Actions 頁手動 dispatch `Deploy to GitHub Pages`）
4. 約 1 分鐘後，網址會在 Actions deployment summary 出現：

   ```
   https://legstrong77-maker.github.io/Luci-supply-0509/
   ```

> 本 repo 已內建 `.github/workflows/pages.yml`，每次 push 到 `main` 就會自動重新部署。
> **注意**：若 Pages 尚未在 Settings 啟用，workflow 會失敗 — 那是預期行為，啟用後就會正常。

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

## 🗺 互動軌跡地圖 — 上傳 GPX

網站的「本次行程紀錄」區塊可以顯示**真實 GPS 軌跡的互動地圖**（OpenStreetMap，可拖曳/縮放）。

**怎麼上傳 GPX：**

1. 到 [健行筆記](https://hiking.biji.co/index.php?q=trail&act=gpx_detail&id=5566637) 把 `.gpx` 檔下載到電腦
   （或從 Garmin Connect → Activity → Export → GPX）
2. **在 iPhone 上**：把檔案傳到 GitHub。
   或在電腦上用瀏覽器開：
   👉 https://github.com/legstrong77-maker/Luci-supply-0509/upload/claude/hiking-club-website-YB5qy
3. 拖檔上去，**檔名改成 `track.gpx`**（直接放 repo 根目錄，不是 images/）
4. Commit。網站幾秒內就會自動載入互動軌跡圖。

> 沒上傳前，地圖會顯示「尚未上傳 track.gpx」提示，但 OpenStreetMap 底圖仍可用。

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
