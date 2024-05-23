# 本プロジェクトは下記の構成におけるひな形プロジェクト

・vercel  
・nextjs  
・react  
・prisma  
・trpcs  
・tailwindcss

# GIT

## https://github.com/Shin1abe/nextjs_tailwind_prisma_trpc

# 参考

## next-tailwind-trpc-prisma

# Simple Grocery List

https://github.com/FranciscoMendes10866/next-tailwind-trpc-prisma

https://dev.to/franciscomendes10866/build-a-full-stack-app-with-nextjs-tailwind-trpc-and-prisma-orm-4ail

・OneNote  
・https://onedrive.live.com/view.aspx?resid=237B1A5D9D8EAE9D%213865&id=documents&wd=target%28Prj.one%7C84D67BD3-0EE1-4E47-90A3-B1DBF37DD3DC%2Fnextjs_tailwind_prisma_trpc%7C3C7F1B58-5EFE-4103-BF55-80D21FADD0CC%2F%29

・onenote:https://d.docs.live.net/237b1a5d9d8eae9d/ドキュメント/開発メモ/Prj.one#nextjs_tailwind_prisma_trpc&section-id={84D67BD3-0EE1-4E47-90A3-B1DBF37DD3DC}&page-id={3C7F1B58-5EFE-4103-BF55-80D21FADD0CC}&end

## Udemy

・【Tailwindcss3.0】利用者急増中！作って学ぶ爆速で理解したい人向けの Tailwindcss 完全入門パック  
https://fujitsu.udemy.com/course/tailwindcss-for-beginner/learn/lecture/32435558?start=60#overview
・OneNote  
・https://onedrive.live.com/view.aspx?resid=237B1A5D9D8EAE9D%215982&id=documents&wd=target%28Udemy.one%7C63C93F65-2943-4453-B67B-8F9D8C205BF7%2F%E3%80%90Tailwindcss3.0%E3%80%91%E5%88%A9%E7%94%A8%E8%80%85%E6%80%A5%E5%A2%97%E4%B8%AD%EF%BC%81%E4%BD%9C%E3%81%A3%E3%81%A6%E5%AD%A6%E3%81%B6%E7%88%86%E9%80%9F%E3%81%A7%E7%90%86%E8%A7%A3%E3%81%97%E3%81%9F%E3%81%84%E4%BA%BA%E5%90%91%E3%81%91%E3%81%AETailwindcss%E5%AE%8C%E5%85%A8%E5%85%A5%E9%96%80%E3%83%91%E3%83%83%E3%82%AF%7C6006E5D7-249A-43C9-B227-3A031B7149F7%2F%29
・onenote:https://d.docs.live.net/237b1a5d9d8eae9d/ドキュメント/OneNote%20ノートブック/技術メモ/Udemy.one#【Tailwindcss3.0】利用者急増中！作って学ぶ爆速で理解したい人向けのTailwindcss完全入門パック&section-id={63C93F65-2943-4453-B67B-8F9D8C205BF7}&page-id={6006E5D7-249A-43C9-B227-3A031B7149F7}&end

# VERCEL DB作成・接続・APPデプロイ

onenote:https://d.docs.live.net/237b1a5d9d8eae9d/ドキュメント/OneNote%20ノートブック/技術メモ/クラウド.one#Vercelガイド%20Next.js、Prisma、Vercel%20Postgres%20を使用してフルスタック%20アプリを構築する方法&section-id={9CA546E3-0D60-4D53-97E7-E6A52F7B4466}&page-id={11AA0600-DEC7-4224-961B-2644CAED2B95}&end
https://onedrive.live.com/view.aspx?resid=237B1A5D9D8EAE9D%215982&id=documents&wd=target%28%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89.one%7C9CA546E3-0D60-4D53-97E7-E6A52F7B4466%2FVercel%E3%82%AC%E3%82%A4%E3%83%89%20%3ANext.js%E3%80%81Prisma%E3%80%81Vercel%20Postgres%20%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%83%95%E3%83%AB%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%20%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95%7C11AA0600-DEC7-4224-961B-2644CAED2B95%2F%29

## VSCODE Plugin

SQLite3 Editor

## clone 後の作業

npm i  
npx prisma migrate dev --name init  
npm run dev

## shadcn/ui 適用

https://ui.shadcn.com/docs/installation/next

## model into prisma.schema 適用

npx prisma migrate dev
npx prisma generate
※npx prisma studio
\server\router.tsにcrudを定義

## dev/production/vercel関係

### npm run dev

schema.prisma :vercel postgre/FJWAN sqliteに切り替え
url :localhost:3000
env :.env.local(vercel db)

### npm run production

schema.prisma :vercel postgre
url :localhost:3000
env :.env.production(無効)

### vercel env

schema.prisma :vercel postgre
url :event-time.vercel.app
env :Environment Variables(NEXT_PUBLIC_API_URL：event-time.vercel.app)
.env.productionは無効

### （解決）スクロールするとヘッダ・フッタが透けているため不自然。

.fixed-header {
position: fixed;
top: 0;
width: 100%;
background-color: grey; /_ 必要に応じて背景色を設定 _/
z-index: 10;
}

.fixed-footer {t
position: fixed;
bottom: 0;
width: 100%;
background-color: grey; /_ 必要に応じて背景色を設定 _/
z-index: 10;
}

.body-content {
position: relative; /_ positionを指定 _/
z-index: 1;
}

### baseColorが有効になっていない

"baseColor": "slate",

### baseColorが有効になっていない

### TRPCClientError: Invalid `prisma.eventDate.create()` invocation:Foreign key constraint failed on the field: `foreign key`

→うまくいくときもある。

---

model Event {
id Int @id @default(autoincrement())
eventId String @unique
eventName String?
eventUrl String?
eventMemo String?
eventDates EventDate[]
eventUsers EventUser[]
createdAt DateTime @default(now())
}

model EventDate {
id Int @id @default(autoincrement())
eventId String
eventDate DateTime?
createdAt DateTime @default(now())
Event Event @relation(fields: [eventId], references: [eventId])

@@unique([eventId, eventDate])
}
→下記を削除して解決
eventDates EventDate[]
eventUsers EventUser[]
Event Event @relation(fields: [eventId], references: [eventId])

---

参考
Prismaで日付データを扱う
https://wp-kyoto.net/prisma-handle-date-data/
Draw.io Integration

useContext：https://zenn.dev/nenenemo/articles/1ed50829c27a0f

【Next.js】PrismaをつかったアプリをVercelにデプロイしてみる
https://hisuiblog.com/nextjs-use-prisma-postgresql-deploy-to-vercel/

## prisma

datasource db {
provider = "postgresql"
url = env("POSTGRES_PRISMA_URL") // uses connection pooling
directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}

## .env

POSTGRES_URL="postgres://default:TYRiMa07ynBm@ep-muddy-wave-a1541cau-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:TYRiMa07ynBm@ep-muddy-wave-a1541cau-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:TYRiMa07ynBm@ep-muddy-wave-a1541cau-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:TYRiMa07ynBm@ep-muddy-wave-a1541cau.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-muddy-wave-a1541cau-pooler.ap-southeast-1.aws.neon.tech"
POSTGRES_PASSWORD="TYRiMa07ynBm"
POSTGRES_DATABASE="verceldb"

##

OK 本番でDB参照できない模様→FJWANだったから
export default withTRPC<ServerRouter>({
config({ ctx }) {
const url = process.env.VERCEL_URL
? `https://${process.env.VERCEL_URL}/api/trpc`
: "http://localhost:3000/api/trpc";

    return { url };

},
ssr: true,
})(App);
OK npm run build: TODO npm run build: found pages without a React Component as default export in pages/components/ui/alert-dialog
OK npm run build:たくさんのコンパイルエラー
OK VERCELプロジェクト→DEPLOY
OK VERCEL DBに切り替えてローカルも本番も同じにする
OK TODO npm run build:error - ESLint: Failed to load plugin '@typescript-eslint' declared in '.eslintrc.json': Cannot find module '@typescript-eslint/eslint-plugin' Require stack: - C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json Referenced from: C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json
TODO npm run build: Warning: You have opted-out of Automatic Static Optimization due to `getInitialProps` in `pages/_app`. This does not opt-out pages with `getStaticProps`
TODO VSCODE npm run start：Access to fetch at 'https://event-time.vercel.app/api/trpc/EventDate_findWhereMany,EventUserSel_findWhereMany,EventUser_findWhereMany,Event_findWhereMany?batch=1&input=%7B%220%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%221%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%222%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%223%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%7D' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
