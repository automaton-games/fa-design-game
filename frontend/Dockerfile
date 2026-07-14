FROM node:26

# node25からcorepackがないため、pnpmをインストールする必要がある.
RUN npm install -g pnpm@10

WORKDIR /frontend

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile