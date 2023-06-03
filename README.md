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