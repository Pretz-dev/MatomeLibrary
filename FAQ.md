# よくある質問（FAQ）

🇯🇵 日本語 ／ 🇺🇸 [English below](#faq-english)

## Q1. 読み込んだHTMLはどこに保存されていますか？

お使いの端末内（ブラウザのデータ領域）に保存されます。サーバーには送信されません。

- 保存先はブラウザの **IndexedDB**（データベース名 `matome-viewer`）です。1まとめにつき、(1) メタ情報、(2) 検索用に抽出した本文テキスト、(3) HTML原文 を保存します。
- カテゴリー一覧と言語設定は別途 `localStorage` に保存されます。
- すべて端末ローカルのため、端末・ブラウザをまたいでは共有されません（別の端末で見たい場合は、その端末でも同じHTMLを取り込んでください）。
- ホーム画面に追加したアプリ（PWA）と Safari は、同じ保存領域を共有します。
- ⚠️ ブラウザの「サイトデータの削除」やアプリ（PWA）の削除を行うと、取り込んだまとめも消えます。**ただし、設定（⚙）の「バックアップを書き出す」でファイルに保存しておけば、「バックアップから読み込む」でいつでも復元できます。** 機種変更のときも同じ手順で移行できます。

## Q2. まとめの日付はどの日付を参照していますか？

そのHTMLを「このアプリに取り込んだ日時」です。

- ファイル自体の作成日・更新日や、HTML内に書かれている日付ではありません。
- 並び替えの「新しい順 / 古い順」も、この取り込み日時を基準にしています。

## Q3. 最大で何個のまとめファイルを保存できますか？

個数の上限は設けていません。実際に保存できる量は、ブラウザに割り当てられるストレージ容量（端末の空き容量に依存）で決まります。

- 容量は主にHTMLのサイズ次第です。テキスト中心のまとめなら1件あたり数十KB〜数百KB程度で、数百〜数千件でも十分収まることが多いです。
- iOS の Safari / PWA は、空き容量が少ないと保存に失敗したり、長期間使われないと自動的に削除されることがあります（永続化の保証はブラウザの仕様に依存します）。このアプリは起動時に永続ストレージを要求して自動削除を受けにくくしていますが、念のため大切なまとめはバックアップを書き出しておくと安心です。
- 目安として、通常の使い方（数十〜数百件）であれば問題ありません。

## Q4. まとめの量が多くなりすぎると動作は重くなりますか？

通常の使い方（〜数百件程度）なら快適に動きます。ただし、極端に増えると少しずつ重くなる可能性があります。

- **読む（リーダー）**：開いたまとめだけを読み込む仕組みなので、件数が増えても重くなりません。
- **検索**：全まとめの本文を順番に走査する方式です（メモリは抑えています）。件数・文章量に比例して時間が増えるため、数千件規模だと検索に少し時間がかかることがあります。
- **一覧表示**：該当するカードを一度にまとめて描画します。数千件など極端に多いと、初期表示やスクロールがもたつくことがあります。→ カテゴリーで絞り込むと表示件数が減り、軽くなります。
- **起動時**：全まとめのメタ情報をメモリに読み込みます（メタは軽量なので通常は問題ありません）。

> 💡 まとめが増えてきたら、カテゴリー分け＋絞り込みで使うのが快適さのコツです。

---

# FAQ (English)

🇺🇸 English ／ 🇯🇵 [日本語は上へ](#よくある質問faq)

## Q1. Where is the imported HTML stored?

On your own device, inside the browser's storage. Nothing is sent to a server.

- It's saved in the browser's **IndexedDB** (database name `matome-viewer`). For each summary it stores (1) metadata, (2) the extracted body text for search, and (3) the raw HTML.
- The category list and language setting are stored separately in `localStorage`.
- Because everything is local, it isn't shared across devices or browsers (to view on another device, import the same HTML there).
- An app added to your home screen (PWA) and Safari share the same storage.
- ⚠️ Clearing the browser's site data, or deleting the PWA, will also remove your imported summaries. **However, if you export a file via Settings (⚙) → “Export backup,” you can restore it anytime with “Import backup.”** The same steps work for moving to a new device.

## Q2. Which date does a summary's date refer to?

It's the date and time you imported the HTML into this app.

- It is not the file's creation/modification date, nor any date written inside the HTML.
- The “Newest / Oldest” sort order is also based on this import time.

## Q3. How many summaries can I store at most?

There's no fixed limit on the number of items. The real limit is the storage quota the browser grants, which depends on your device's free space.

- Size depends mostly on the HTML. Text-centric summaries are roughly tens to hundreds of KB each, so hundreds to thousands of items usually fit comfortably.
- On iOS Safari / PWA, saving can fail when free space is low, and unused data may be evicted automatically (persistence guarantees depend on the browser). The app requests persistent storage at startup to reduce automatic eviction, but exporting a backup of important summaries is still recommended.
- As a rule of thumb, typical use (tens to a few hundred items) is no problem.

## Q4. Does it get slow when there are too many summaries?

Typical use (up to a few hundred) stays smooth. With extreme counts, a few things gradually get heavier:

- **Reading**: only the opened summary is loaded, so this never slows down as your count grows.
- **Search**: it scans every summary's text sequentially (with low memory use). Time grows with the number and length of summaries, so search may take a moment at the thousands scale.
- **List view**: all matching cards are rendered at once. With extreme counts (thousands), initial render and scrolling may stutter. → Filtering by category reduces the number drawn and speeds things up.
- **Startup**: all summary metadata is loaded into memory (metadata is light, so this is usually fine).

> 💡 As your library grows, using categories + filtering is the trick to keeping things snappy.
