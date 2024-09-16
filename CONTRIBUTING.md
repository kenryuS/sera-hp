# SERA ウェブサイトに貢献する方法

## 必要な知識

分からなかったらリストにはられているリンクを参照すること。

* HTML, CSS, JavaScriptの基本的な知識 [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web)
* (Optional) TypeScript [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* フロントエンド([Vue.js](https://ja.vuejs.org/)/[Nuxt](https://nuxt.com), [htmx](https://htmx.org/))とバックエンド([sqlite](https://www.sqlite.org/), Nuxt, [Express](https://expressjs.com/))の基本的な知識
* GitとGitHubの基本的な知識 [GitHubとGitについて](https://docs.github.com/ja/get-started/start-your-journey/about-github-and-git)
* Markdownの基本的な知識 [Markdown記法一覧](https://qiita.com/oreo/items/82183bfbaac69971917f)
* 中学卒業レベル以上の英語力 [**頑張れ**](https://jstc.jma.or.jp/)

## レポジトリの構成

このレポジトリには２つのプロジェクトが存在する：

1. SERA Website: メインプロジェクト、ソースディレクトリ：`assets/ components/ layouts/ pages/ public/ server/`
2. Content Manager: ニュース等のためのデータベースの管理UI・API、ソースディレクトリ：`src-manager/`

## 問題の報告・新仕様の提案

ウェブサイトで起こったバグの報告や新しい仕様の提案はIssueから行う。

### バグ報告

#### ISSUEテンプレート

```markdown
**タイトル:** [簡潔で明確に問題やリクエストを記述してください]

**説明:**

* **何をしようとしていましたか？**  [文脈と行った手順を提供してください]
* **代わりに何が起こりましたか？** [予期しない動作またはエラーメッセージを記述してください]
* **どのような結果が望まれましたか？** [期待される結果を述べてください]
* **スクリーンショット/動画:** [問題を示すために関連するスクリーンショットまたはスクリーン録画を含めてください]
* **手順の再現 (該当する場合):**
    1. [ステップ1]
    2. [ステップ2]
    3. [ステップ3]
    ...
* **ブラウザ/OS情報:**  [使用しているブラウザ（例：Chrome、Firefox）とバージョン、およびオペレーティングシステム（例：Windows 10、macOS Big Sur）を指定してください]
* **関連するコードスニペット (該当する場合):** [問題に関連するコードスニペットを貼り付けてください]

**深刻度:**

* **重大:** [ウェブサイトが完全に使用できなくなったり、重要なセキュリティ脆弱性がある場合]
* **高:**  [コア機能の動作を防ぐ重大な機能上の問題]
* **中:**  [些細な不快感またはマイナーな機能の問題]
* **低:** [美的要素の問題や改善のための提案]

**ラベル:**

* 利用可能なオプションから最も関連性の高いラベルを選択してください。
```

### 新仕様の提案

## 変更の提案

変更を提案するときには以下に注意すること：

* フォークレポジトリで加えた変更の手案はプルリクエスト(PR)から
* 変更の内容の説明はなるべく簡潔で明確に
* 一つのIssueには一つのPRを
* PRには元となったIssueをリンクすること
* なるべく小規模の変更に留めること
* 変更が大規模の場合は他の貢献者にレビューを分担すること
* 最終的にプロジェクトマネージャーがPRのマージを認可する

### PRテンプレート

```markdown

```

## コーディング規約

ソースコードを書く際には可読性、保守性の確保のために以下の規約に従いましょう：

#### ファイル

* タブ・インデントは半角スペース４個分とし、タブ文字は使わないとする
* ファイルは**必ず**UTF-8で保存する

#### 変数、定数など

##### 命名規則

* 変数、定数、型名、関数名にローマ字を使用しない
* 変数、定数、型名、関数名での連番は極力避ける
* 変数、定数、型名、関数名には3文字以上の略称でない意味のある名前をつける
* 変数、定数、関数名にはcamelCase
* クラス名、型名、Vueコンポーネントファイル名・importにはPascalCase
* CSSクラス、id、`pages/`下のVueファイル・フォルダにはkebab-case
* 上記に該当しないものはcamelCaseで命名するものとする

##### その他

* (TypeScript): 関数名・クラス名から判断できる場合のみ型の明記を省略しても良い、それ以外は明記する必要がある
* 変数・定数定義以外でMagic Values(生の値)の使用は極力避け、代わりに列挙体や定数を使う
* 変数・定数には内容に合った型を明記する(TypeScript)

#### 括弧の使用について

* if文、for文、while文、関数定義、CSSのセレクターの中括弧は同じ行に書く
* if文、for文、while文の内容が１行だけならば中括弧は省略しても良いとする
* JavaScript/TypeScriptでのネスティングは4段以上にしない(参照：[Why You Shouldn't Nest Your Code](https://www.youtube.com/watch?v=CFRhGnuXG-4))

#### プログラミングパラダイム

* JavaScript/TypeScriptでクラスを使用したい場合、継承を避け、合成を採用する。抽象化は冗長解消より本来のモノの概念をソースに起こすことを優先する(参照：[The Flaws of Inheritance](https://www.youtube.com/watch?v=hxGOiiR9ZKg), [Abstracion Can Make Your Code Worse](https://www.youtube.com/watch?v=rQlMtztiAoA))
* 関数型言語の特徴を取り入れても良いとする

#### コメント・ドキュメンテーション

* コメントは英語、日本語どちらでも良い
* 無駄で間違ったコメントは書かない(参照：[Don't Write Comments](https://www.youtube.com/watch?v=Bf7vDBBOBUA&ab_channel=CodeAesthetic))
* 仕様、動作についてはコメントではなくドキュメンテーションに記載する
* APIには簡潔なドキュメンテーションを書く([JSdoc](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html))

#### その他

* その他コーディング規約は`eslint.config.js`に記載されているものを使用する
* 車輪の再発明をせずになるべくライブラリー・フレームワークで提供されている関数・クラスを使う