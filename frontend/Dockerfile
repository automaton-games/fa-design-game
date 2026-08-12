FROM node:26

# node25からcorepackがないため、pnpmをインストールする必要がある.
RUN npm install -g pnpm@10

WORKDIR /frontend

# pnpmのstoreの場所を指定している。
RUN pnpm config set store-dir /frontend/node_modules/.pnpm-store --global

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile