# ==============================================================================
# このファイルはフロントエンドの実行環境のバージョンを定義する唯一の場所.
# GitHub Actions (.github/actions/setup-frontend/action.yml) が下記2行から
# CI 側の Node / pnpm のバージョンを読み取っているため、
# バージョンは必ず x.y.z 形式でリテラルに記述すること.
#   - FROM node:<x.y.z>
#   - RUN npm install -g pnpm@<x.y.z>
# ==============================================================================
FROM node:26.7.0

# node25からcorepackがないため、pnpmをインストールする必要がある.
RUN npm install -g pnpm@10.34.5

WORKDIR /frontend

# pnpmのstoreの場所を指定している。
RUN pnpm config set store-dir /frontend/node_modules/.pnpm-store --global

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile