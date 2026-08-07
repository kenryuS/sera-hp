# sera-new-hp

更新が止まっているSERA HPを置き換えるよりモダンなHP

## 使用言語、ライブラリー、フレームワーク、ツール

* JavaScript、TypeScript、Vue
* Nuxt
* node, npm
* sqlite
* typedoc, eslint, prettier

## コンテンツの管理

ニュース等のコンテンツの管理は`src-manager/`内の`README.md`を参照すること

## 開発を開始する

> 初めてこのプロジェクトに参加する際には`CONTRIBUTING.md`を***必ず***読んでおくこと

```bash
git clone https://git.kenryu.us/kenryuS/sera-new-hp.git # レポジトリをクローン
cd sera-new-hp # 移動して
npm install # 依存パッケージのインストール

npm run dev # デベロッパーモードでサーバーを起動
npm run generate # 静的サイトを生成

npm run lint # 静的解析ツール eslint を実行
npm run format # prettier を使用してソースコードを整形
npm run documentation # typedoc でドキュメンテーションを生成
```

## 便利・重要なファイル/フォルダ

* `assets/databases/news.db`: ニュースを管理しているsqliteデータベース
* `assets/databases/gallery.db`: 写真集で使用されている画像のURLと説明文を管理しているsqliteデータベース
* `assets/siteinfo.json`: 部長と顧問の名前、コピーライトの年、メンバーの学科・学年ごとの人数、など更新があまりされない情報を集めたファイル、`import`して使う
* `assets/achievements.json`: 活動実績に表示される参加・受賞歴を集めたファイル
* `assets/pankuzuEntries.json`: パンくずリストで使用される主なページのリンクと名前の紐付けが列挙されている
* `docs/`: `typedoc`で生成されたドキュメンテーションが入っている、`python -m http.server`などで`localhost`にホストして読む
* `dist/`, `.output/`: `npm run generate`で生成された静的ウェブサイト本体、プロダクションレディーな状態 `dist/`は`.output/`へのリンクである
* `getPath.bash`: ビルドに必要な環境変数を`source getPath.bash`でセットする
