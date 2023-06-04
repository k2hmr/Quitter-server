# Quitter-server (３日ダケのサーバー)

3 日間だけ投稿を続けるようにするアプリです。

## 開発用
### ビルド
```shell
docker build -f Dockerfile.dev .  
```

### 起動
```shell
docker compose -f docker-compose-dev.yml up -d 
```

## 本番用
### ビルド
```shell
docker build -f Dockerfile .  
```

### 起動
```shell
docker-compose up -d
```

| 単語  | 誤解を防ぐメモ | 意味  | モデル名 |
| ------------- | ------------- | ------------- | ------------- |
| ユーザ  | 管理するユーザではない  | アプリを利用するユーザ  | User |
| テーマ  | 任意で作成可 | ユーザが取り組むテーマ<br>取り組み中のテーマは最大10個作成可  | Theme  |
| カテゴリー | 任意で作成可  | 取り組むテーマのカテゴリー<br>10種類まで任意で作成可  | Category  |
| 投稿テンプレート  | 投稿ではない  | 投稿するためのテンプレート<br>1日各テーマごとに1つ作成可  | PostTemplates  |
| メッセージ  | ユーザー間でのメッセージではない | 投稿テンプレートを作成するためにやり取りされるユーザとAI間の各メッセージ | Message  |
| フィードバック  | 投稿ではない  | 作成した投稿テンプレートに追加したいコメント | Feedback  |