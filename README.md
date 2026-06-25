# Matome Library

AIが作るHTMLのまとめを、スマホで少しでも読みやすく——そんな思いで作った、ささやかなビューワーです。
サーバー不要・オフラインで動く単一ファイルのPWAで、取り込んだHTMLは端末内（IndexedDB）に保存されます。

🇯🇵 日本語 ／ 🇺🇸 [English below](#matome-library--english)

---

## つくったきっかけ

AIエージェント（Claude Code など）の出力は、少しずつ **Markdown から HTML へ** と広がってきているようです。
表・図解・SVG・スライダーやボタンといった操作までを1枚の自己完結したHTMLに収められるので、仕様書・レビュー・リサーチ・レポートが読みやすく返ってくる——そんな話を Claude ブログの記事 [_The Unreasonable Effectiveness of HTML_](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html)（Thariq Shihipar）で知りました。

ただ、そうして増えていくHTMLのまとめは、気づけばダウンロードフォルダに散らばってしまいがちです。とくにスマホだと、開く・探す・読み返すのが少し面倒でした。
**そこで、散らばったHTMLを一か所に集めて読み返せたらいいな、という軽い気持ちで用意したのがこのツールです。** 大したことはしていませんが、よければ使ってみてください。

## できること

- 📥 **取り込み** — HTMLを「追加」かドラッグ&ドロップで入れるだけ。タイトルと本文は自動で抽出されます。
- 👆 **スワイプで読む** — まとめからまとめへ、左右スワイプやキー操作で移動できます。
- 🔍 **全文検索** — すべてのまとめを横断して検索し、ヒット箇所をハイライト。開くとその位置までスクロールします。
- 🗂 **タグで整理** — 1つのまとめに複数のタグを付けられます。カードをタグへドラッグで付与、ゴミ箱へドラッグで削除。「＋」でタグを追加できます。
- 💾 **バックアップ** — 設定からまとめをファイルに書き出し／読み込み。サイトデータの削除や機種変更のときに復元できます。
- 📱 **オフライン対応** — データは端末内に保存。ホーム画面に追加すれば全画面で起動し、電波がなくても読めます。
- 🌐 **日本語 / 英語** — 設定（⚙）から切り替えられます。

## 使い方

1. **取り込む** — 下部の「＋ 追加」からHTMLを選ぶ（PCならドラッグ&ドロップ、複数同時も可）。
2. **読む** — カードをタップして開き、左右スワイプで前後のまとめへ。
3. **探す** — 下部の「🔍」で全文検索。ヒットしたまとめを開くと検索語の位置まで自動でスクロール。
4. **タグを付ける** — まとめを開いて上部の🏷からタグをオン/オフ（複数選択可）・新規作成。一覧ではカードをタグチップへドラッグで付与、「＋」チップでタグ作成。タグを🗑へドラッグするとそのタグを削除（まとめ自体は残り、タグだけ外れます）。
5. **備える** — 設定（⚙）の「バックアップ」から、ときどきファイルに書き出しておくと安心です。

困ったときは [FAQ](FAQ.md) もご覧ください。

## ローカルで試す

ブラウザのファイル直開き（`file://`）では IndexedDB / Service Worker が制限されるため、簡易サーバー経由で開いてください。

```sh
cd "260623_HTMLViewer"
python3 -m http.server 8000
```

ブラウザで http://localhost:8000/ を開く。

## iPhone / iPad で使う

1. **静的ホスティングに置く**（手軽です）
   - GitHub Pages / Netlify / Cloudflare Pages などに一式をアップロード。
   - Safari でそのURLを開き、共有 → **「ホーム画面に追加」**。全画面で起動し、オフラインでも動きます。
2. **AI生成HTMLを端末へ届ける**には iCloud Drive / ファイルアプリが便利です。
   - PCで作ったHTMLを iCloud に置く → 端末のファイルアプリから参照 → 「＋ 追加」で取り込み。

> データは端末のブラウザ内に保存され、端末・ブラウザをまたいでは共有されません。大切なまとめは、ときどきバックアップを書き出しておくことをおすすめします。

## ファイル構成

- `index.html` … アプリ本体（UI・ロジックすべて）
- `manifest.webmanifest` … PWA設定
- `sw.js` … オフライン用 Service Worker
- `icon.svg` … アイコン（差し替え可）

## 技術メモ

- 各まとめは `<iframe sandbox>` で隔離表示するため、まとめ側のCSS/JSがアプリ本体に干渉しません。
- 横スワイプは iframe 内に注入した軽量スクリプトがジェスチャを検出し、本体へ通知します（縦スクロールでの読書は妨げません）。
- 検索は IndexedDB をカーソルで走査するため、まとめが多くてもメモリを抑えて動きます。
- 各まとめはタグの配列を持ち、タグ一覧は `localStorage` に保存されます（使われていないタグも保持）。
- バックアップは全まとめ（HTML原文＋メタ情報＋タグ）を1つのJSONファイルに書き出します。

---

# Matome Library — English

**Your scattered AI-generated HTML, finally turned into a beautiful, searchable library you'll actually love opening.**
A single-file PWA that runs entirely offline, with no server and no setup. Everything you import lives safely on your own device (IndexedDB).

🇺🇸 English ／ 🇯🇵 [日本語は上へ](#matome-library)

## Why it exists

The output of AI agents (like Claude Code) is rapidly shifting **from Markdown to HTML** — and for good reason. A single self-contained HTML file can pack in tables, diagrams, SVG, and interactive controls like sliders and buttons, so complex specs, reviews, research, and reports arrive **richer, clearer, and genuinely interactive**. It's the powerful idea behind the Claude blog post [_The Unreasonable Effectiveness of HTML_](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html) by Thariq Shihipar.

But here's the catch: all that brilliant HTML quickly piles up and vanishes into the void of your Downloads folder — especially painful to open, search, and revisit on a phone.

**Matome Library fixes that, beautifully.** It's a purpose-built reader that gathers every scattered HTML summary into one elegant place and makes reading them an absolute pleasure.

## What makes it great

- 📥 **Effortless import** — Just hit “Add” or drag & drop. Titles and body text are extracted instantly into clean, tappable cards.
- 👆 **Read it like a book** — Glide between summaries with a swipe (or arrow keys). AI's output finally feels like something you *want* to read.
- 🔍 **Instant full-text search** — Search across your *entire* library in one shot, with matches highlighted and the reader jumping straight to the line.
- 🗂 **Tag it your way** — Give each summary as many tags as you like. Drag a card onto a tag to apply it, or onto the trash to delete it. Spin up new tags with a single “＋”. The tag bar stays pinned, always in reach.
- 💾 **Bulletproof backup** — Export your whole library to one file and restore it anytime. Switch phones or wipe site data without losing a thing.
- 📱 **Offline, always** — Everything is stored on-device. Add it to your home screen and it launches full-screen like a native app — no signal required.
- 🌐 **English / Japanese** — Flip between languages instantly from Settings (⚙).

## How to use it (you'll get it in 30 seconds)

1. **Import** — Tap “＋ Add” in the bottom bar and pick your HTML (or drag & drop on desktop; batches welcome).
2. **Read** — Tap a card, then swipe left/right to move through your summaries.
3. **Find** — Tap “🔍” for full-text search; open a hit and it auto-scrolls right to the match.
4. **Tag** — Open a summary and use 🏷 at the top to toggle tags on/off (pick as many as you like) or create new ones. In the list, drag a card onto a tag chip to apply it, or use the “＋” chip to create a tag. Drag a tag onto 🗑 to remove it (summaries stay; only the tag is removed).
5. **Stay safe** — Pop into Settings (⚙) → Backup now and then, and your library is untouchable.

Got questions? The [FAQ](FAQ.md) has you covered.

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

> Data is stored inside the browser on each device and isn't shared across devices or browsers — so export a backup now and then to keep your library safe and portable.

## Project structure

- `index.html` … the app itself (all UI and logic)
- `manifest.webmanifest` … PWA configuration
- `sw.js` … Service Worker for offline use
- `icon.svg` … icon (replaceable)

## Technical notes

- Each summary renders inside an `<iframe sandbox>`, so its CSS/JS can't interfere with the app shell.
- Horizontal swipes are detected by a tiny script injected into the iframe, which notifies the shell (vertical scroll reading is never blocked).
- Search walks the IndexedDB store with a cursor, keeping memory low even with many summaries.
- Each summary holds an array of tags; the tag list is persisted in `localStorage` (unused tags are kept too).
- Backup exports everything (raw HTML + metadata + tags) into a single JSON file.
