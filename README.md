# Matome Library

**AIが作るHTMLまとめのための、ポケットサイズの本棚。**
サーバー不要・完全オフラインで動く単一ファイルPWA。取り込んだHTMLは端末内（IndexedDB）に保存されます。

🇯🇵 日本語 ／ 🇺🇸 [English below](#matome-library--english)

---

## なぜ生まれたのか

AIエージェント（Claude Code など）の出力フォーマットは、いま静かに **Markdown から HTML へ** 移りつつあります。
表・図解・SVG・スライダーやボタンといった操作までを1枚の自己完結したHTMLに詰め込めるため、複雑な仕様書・レビュー・リサーチ・レポートを **読みやすく・共有しやすく・触れる** 形で返せる——これが Claude ブログの記事 [_The Unreasonable Effectiveness of HTML_](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)（Thariq Shihipar）で語られた「HTMLの不合理なまでの有効性」です。

でも、そうして増えていく“HTMLのまとめ”たちは、たいていダウンロードフォルダの底に散らばって迷子になります。**スマホで開く・探す・読み返す** となると、なおさら面倒。

**Matome Library は、その散らばったHTMLまとめを一か所に集めて「読む」ことに特化したビューワーです。**

## 何が嬉しいのか

- 📥 **入れるだけ** — HTMLを「追加」かドラッグ&ドロップで取り込むだけ。タイトルと本文は自動抽出され、カードになって並びます。
- 👆 **本のようにスワイプで読む** — まとめからまとめへ左右スワイプ（やキー操作）でめくる感覚。AIが作った“読み物”を、読み物として味わえます。
- 🔍 **全文をまたいで検索** — すべてのまとめを横断して一発検索。ヒット箇所はハイライトされ、開いた瞬間に該当行へジャンプ。
- 🗂 **指でサッと整理** — カードをカテゴリーへドラッグして分類、いらないものはゴミ箱へドラッグ。カテゴリーは「＋」で自由に追加。カテゴリーバーは常に画面上部に固定。
- 📱 **オフラインで、手のひらで** — すべて端末内に保存。ホーム画面に追加すれば普通のアプリのように全画面で起動し、電波がなくても読めます。
- 🌐 **日本語 / 英語** — 設定（⚙）からいつでも切替。

## 使い方（30秒で腑に落ちる）

1. **取り込む** — 下部の「＋ 追加」をタップしてHTMLを選ぶ（PCならドラッグ&ドロップでも、複数まとめても可）。
2. **読む** — カードをタップして開き、左右スワイプで前後のまとめへ。
3. **探す** — 下部の「🔍」で全文検索。ヒットしたまとめを開けば検索語の位置まで自動でスクロール。
4. **片づける** — カードを🗑へドラッグで削除、カテゴリーチップへドラッグで分類。「＋」チップで新しいカテゴリーを作成。カテゴリーを🗑へドラッグでそのカテゴリーを削除（中のまとめは未分類に戻ります）。

## ローカルで試す

ブラウザのファイル直開き（`file://`）では IndexedDB / Service Worker が制限されるため、簡易サーバー経由で開いてください。

```sh
cd "260623_HTMLViewer"
python3 -m http.server 8000
```

ブラウザで http://localhost:8000/ を開く。

## iPhone / iPad で使う（推奨）

1. **静的ホスティングに置く**（最も手軽）
   - GitHub Pages / Netlify / Cloudflare Pages などに一式をアップロード。
   - Safari でそのURLを開き、共有 → **「ホーム画面に追加」**。アプリのように全画面で起動し、オフラインでも動きます。
2. **AI生成HTMLを端末へ届ける**には iCloud Drive / ファイルアプリが簡単です。
   - PCで作ったHTMLを iCloud に置く → 端末のファイルアプリから参照 → 「＋ 追加」で取り込み。

> データは端末のブラウザ内に保存されます。端末・ブラウザをまたいでは共有されません（別端末で見たい場合は、その端末でも同じHTMLを取り込みます）。

## ファイル構成

- `index.html` … アプリ本体（UI・ロジックすべて）
- `manifest.webmanifest` … PWA設定
- `sw.js` … オフライン用 Service Worker
- `icon.svg` … アイコン（差し替え可）

## 技術メモ

- 各まとめは `<iframe sandbox>` で隔離表示するため、まとめ側のCSS/JSがアプリ本体に干渉しません。
- 横スワイプは iframe 内に注入した軽量スクリプトがジェスチャを検出し、本体へ通知します（縦スクロールでの読書は阻害しません）。
- 検索は IndexedDB をカーソルで走査するため、まとめが多くてもメモリを抑えて動きます。
- カテゴリー一覧は `localStorage` に保存され、空のカテゴリーも保持されます。

---

# Matome Library — English

**A pocket-sized bookshelf for the HTML that AI writes for you.**
A single-file PWA that runs fully offline with no server. Imported HTML is stored on-device (IndexedDB).

🇺🇸 English ／ 🇯🇵 [日本語は上へ](#matome-library)

## Why it exists

The output format of AI agents (like Claude Code) is quietly shifting **from Markdown to HTML**. A single self-contained HTML file can pack in tables, diagrams, SVG, and interactive controls like sliders and buttons—so complex specs, reviews, research, and reports come back in a form that's **easier to read, easier to share, and actually interactive**. That's the idea behind the Claude blog post [_The Unreasonable Effectiveness of HTML_](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html) by Thariq Shihipar.

But all those HTML summaries tend to pile up and get lost at the bottom of your Downloads folder—and opening, searching, and re-reading them **on a phone** is even more of a chore.

**Matome Library is a viewer built for one thing: collecting those scattered HTML summaries in one place and making them a joy to read.**

## What's great about it

- 📥 **Just drop them in** — Import HTML via the “Add” button or drag & drop. Titles and body text are extracted automatically and laid out as cards.
- 👆 **Read it like a book** — Swipe left/right (or use arrow keys) to flip between summaries. Enjoy AI's output as something you actually read.
- 🔍 **Search across everything** — One search spans all summaries. Matches are highlighted, and opening a result jumps straight to the line.
- 🗂 **Organize with your thumb** — Drag a card onto a category to file it, or onto the trash to delete it. Add categories freely with “＋”. The category bar stays pinned at the top.
- 📱 **Offline, in your hand** — Everything is stored on-device. Add it to your home screen and it launches full-screen like a native app, working even without a connection.
- 🌐 **English / Japanese** — Switch anytime from Settings (⚙).

## How to use it (clicks in 30 seconds)

1. **Import** — Tap “＋ Add” in the bottom bar and pick an HTML file (or drag & drop on desktop; multiple at once is fine).
2. **Read** — Tap a card to open it, then swipe left/right to move between summaries.
3. **Find** — Tap “🔍” for full-text search. Open a hit and it auto-scrolls to the matched term.
4. **Tidy up** — Drag a card to 🗑 to delete, or onto a category chip to file it. Use the “＋” chip to create a new category. Drag a category onto 🗑 to delete it (its summaries return to uncategorized).

## Try it locally

Opening the file directly (`file://`) restricts IndexedDB / Service Worker, so serve it over a simple HTTP server:

```sh
cd "260623_HTMLViewer"
python3 -m http.server 8000
```

Open http://localhost:8000/ in your browser.

## On iPhone / iPad (recommended)

1. **Put it on static hosting** (easiest)
   - Upload the files to GitHub Pages / Netlify / Cloudflare Pages, etc.
   - Open the URL in Safari, then Share → **“Add to Home Screen.”** It launches full-screen like an app and works offline.
2. **Getting AI-generated HTML onto the device** is easiest via iCloud Drive / the Files app.
   - Put your HTML in iCloud on a PC → browse it from the Files app → import with “＋ Add.”

> Data is stored inside the browser on each device; it is not shared across devices or browsers (to view on another device, import the same HTML there).

## Project structure

- `index.html` … the app itself (all UI and logic)
- `manifest.webmanifest` … PWA configuration
- `sw.js` … Service Worker for offline use
- `icon.svg` … icon (replaceable)

## Technical notes

- Each summary renders inside an `<iframe sandbox>`, so its CSS/JS can't interfere with the app shell.
- Horizontal swipes are detected by a tiny script injected into the iframe, which notifies the shell (vertical scroll reading is never blocked).
- Search walks the IndexedDB store with a cursor, keeping memory low even with many summaries.
- The category list is persisted in `localStorage`, so empty categories are kept.
