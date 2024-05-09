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

# メモ

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

## Todo

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

## EventMng.tsxコンポーネント分割

    済

## AttendMng.tsxコンポーネント分割

    済

## 幹事メニューのコンポーネント化

    済

## 幹事メニューの表示・非表示 useContext eventId,mode

    useContext：https://zenn.dev/nenenemo/articles/1ed50829c27a0f
    済

## 幹事メニューのイベント編集

## 幹事メニューのイベント削除

## 出欠一覧における参加者を押下して対象行情報を更新・削除？

## イベント一覧のローカルSTORAGE読込

## 出欠表入力の○▽×のボタン制御について
