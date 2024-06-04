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

## localforage

https://localforage.github.io/localForage/
https://neos21.net/blog/2017/11/01-02.html

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
OK npm run build: npm run build: found pages without a React Component as default export in pages/components/ui/alert-dialog
OK npm run build:たくさんのコンパイルエラー
OK VERCELプロジェクト→DEPLOY
OK VERCEL DBに切り替えてローカルも本番も同じにする
OK npm run build:error - ESLint: Failed to load plugin '@typescript-eslint' declared in '.eslintrc.json': Cannot find module '@typescript-eslint/eslint-plugin' Require stack: - C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json Referenced from: C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json
Event_findWhereMany?batch=1&input=%7B%220%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%221%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%222%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%223%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%7D' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
ok INPUTタグ変更
ok 登録・更新画面での2度実行防ぐ
ok 登録・更新でエラー、必須入力チェック
OK ＤＢコネクション数
OK 利用者自身の登録情報削除
ok 管理者情報のローカル保存
ok ALERT→TOAST?
ok 利用者一覧の日付が昇順になっていない。
ok イベント更新でDB更新不具合
ok EventMng Warning → <h1 className='m-1 text-2xl font-bold'></h1>の指定でエラーとなっていて削除
　　　　at EventMng (webpack-internal:///./src/pages/components/EventMng.tsx:65:72)
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <table> cannot appear as a descendant of <p>.
ok 　　AttendCreateDialog
　　　　TRPCClientError: Invalid `prisma.eventUserSel.create()` invocation:
　　　　Unique constraint failed on the fields: (`eventId`,`eventDate`,`userId`)
ok イベント更新後、出欠を入力すると、出席状況未設定が他のに引きずられて反映されてしまう→削除処理の位置を変更
ok 　-を表示：AttendCreateDialog、AttendMng
TODO npm run build: Warning: You have opted-out of Automatic Static Optimization due to `getInitialProps` in `pages/_app`. This does not opt-out pages with `getStaticProps`
TODO VSCODE npm run start：Access to fetch at 'https://event-time.vercel.app/api/trpc/EventDate_findWhereMany,EventUserSel_findWhereMany,EventUser_findWhereMany,
TODO 背景色
TODO ダイアログで×ボタン無効
TODO AttendCreateDialog、AttendUpdateDialog 、EventCreateDialog
　　　 at AttendCreateDialog (webpack-internal:///./src/pages/components/AttendCreateDialog.tsx:97:72)　
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <table> cannot appear as a descendant of <p>.
　　　　　→<Table>使った瞬間にNG。

---

import React, { useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { Button } from '../../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table"
import AttendCreateDialog from './AttendCreateDialog';
import { formatDateWithDayOfWeek0sup } from '@/utils/utils';
import HeaderCoordinator from './HeaderCoordinator';
import { useEtContext } from '../../providers/EtProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDiamond, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';

const AttendMng = () => {
//■ initial
const router = useRouter();
const { eventid } = router.query;

    //■  useEtContext
    const { isCoordinator, curentEventId, setCurentEventId } = useEtContext()

    // eventidが変わった時にcurentEventIdを更新
    useEffect(() => {
        if (typeof eventid === 'string') {
            setCurentEventId(eventid);
        }
    }, [eventid, curentEventId, setCurentEventId]);

    //■  trcp
    let eventIdtmp = ""
    if (typeof eventid === "string") { eventIdtmp = eventid }
    const { data: event } = trpc.useQuery(["Event_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventDate } = trpc.useQuery(["EventDate_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUser } = trpc.useQuery(["EventUser_findWhereMany", { eventId: eventIdtmp }]);
    const { data: eventUserSel } = trpc.useQuery(["EventUserSel_findWhereMany", { eventId: eventIdtmp }]);

    //■ util------------------------------------------------------------------
    type ResultType = {
        eventDate: Date;
        userSel: string;
        sumCount: number;
    };
    type EventUserSelType = {
        id: number;
        eventId: string;
        eventDate: Date;
        userId: number;
        userSel: string;
        createdAt: Date;
    }

    type CalcUserSelNumType = { [key: string]: ResultType };

    // 確実にeventDateがDateオブジェクトであることを保証する
    const ensureDateObject = (item: EventUserSelType) => {
        if (!(item.eventDate instanceof Date)) {
            item.eventDate = new Date(item.eventDate);
        }
        return item;
    };

    // eventUserSelをDateオブジェクトに変換する
    const eventUserSelWithDates = useMemo(() => {
        return eventUserSel?.map(ensureDateObject) ?? [];
    }, [eventUserSel]);

    // ユニークな日付と選択肢の組み合わせをリスト化
    const uniqueDates = useMemo(() => {
        return Array.from(new Set(eventUserSelWithDates.map(item => item.eventDate.toISOString())));
    }, [eventUserSelWithDates]);

    const uniqueUserSels = useMemo(() => {
        return Array.from(new Set(eventUserSelWithDates.map(item => item.userSel)));
    }, [eventUserSelWithDates]);

    // 全ての組み合わせを初期化
    const calcUserSelNum: CalcUserSelNumType = useMemo(() => {
        const initialCalcUserSelNum: CalcUserSelNumType = {};
        uniqueDates.forEach(date => {
            uniqueUserSels.forEach(userSel => {
                const key = `${date}_${userSel}`;
                initialCalcUserSelNum[key] = { eventDate: new Date(date), userSel, sumCount: 0 };
            });
        });

        return eventUserSelWithDates.reduce((acc: CalcUserSelNumType, curr) => {
            const eventDate = new Date(curr.eventDate); // Ensure eventDate is a Date object
            const key = `${eventDate.toISOString()}_${curr.userSel}`;
            if (!acc[key]) {
                acc[key] = { eventDate, userSel: curr.userSel, sumCount: 0 };
            }
            acc[key].sumCount += 1;
            return acc;
        }, initialCalcUserSelNum);
    }, [eventUserSelWithDates, uniqueDates, uniqueUserSels]);

    const resultList = Object.values(calcUserSelNum);

    console.log("resultList", resultList);
    const getCalUserSelNum = useCallback((eventdate: Date | string, usersel: string): number => {
        // Ensure eventdate is a Date object
        const eventDate = new Date(eventdate);
        // Find the result matching the eventDate and userSel
        const resultItem = resultList.find(item =>
            item.eventDate.toISOString() === eventDate.toISOString() && item.userSel === usersel
        );

        // Return the sumCount if found, otherwise return 0
        return resultItem ? resultItem.sumCount : 0;
    }, [resultList]);

    const onClickEventshare = useCallback(() => {
        const url: string = event?.[0]?.eventUrl ?? "";
        void (async () => {
            if (navigator.share) {
                await navigator.share({
                    url,
                });
            } else {
                // Web Share APIが使えないブラウザの処理
                await navigator.clipboard.writeText(url);
                alert("URLをコピーしました");
            }
        })();
    }, [event]);

    const onClickUserUpdate = useCallback((userId: number) => {
        router.push({
            pathname: '/components/AttendUpdateDialog',
            query: { eventid: eventid, userid: userId },
        });
    }, [router, eventid]);

    return (
        <div className="flex-wrap flex-row gap-1 m-2">
            {/* ■■■■■■■■■ヘッド・メニュー■■■■■■■■■ */}
            {isCoordinator ? (<HeaderCoordinator />) : null}
            {/* ■■■■■■■■■出席者一覧■■■■■■■■■ */}
            <div>
                <h1 className='font-bold'>{event?.[0]?.eventName}</h1>
                <div className="flex flex-col justify-center gap-2">
                    <p className=' text-base ml-3'>回答者：{eventUser?.length}名</p>
                    <h1 className='font-bold'>イベントメモ</h1>
                    <div>
                        <Table>
                            {/* <TableCaption>A list of attendees and their availability.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-96 ">参加者</TableHead>
                                    {eventDate?.map((date, index) => (
                                        <TableHead key={index} className='text-center'>
                                            {formatDateWithDayOfWeek0sup(date.eventDate)}
                                        </TableHead>
                                    ))}
                                    <TableHead>コメント</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >
                                {eventUser?.map((user, index) => (
                                    <TableRow key={index} >
                                        <TableCell className=' p-0'>
                                            <Button variant="secondary" onClick={() => onClickUserUpdate(user.userId)}
                                                className=' p-0 ml-4'
                                            >
                                                {user.userName}
                                            </Button>
                                        </TableCell>
                                        {eventUserSel?.filter(e => e.userId === user.userId).map((user, idx) => (
                                            <TableCell key={idx} className='p-1'>
                                                <div className="block ">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            user.userSel === "○" ? faCircle :
                                                                user.userSel === "◇" ? faDiamond :
                                                                    user.userSel === "×" ? faXmark : faMinus}
                                                        className={"cursor-pointer  text-slate-600"}
                                                        style={{ width: '16px', height: '16px', margin: 'auto' }}
                                                    />
                                                </div>
                                            </TableCell>
                                        ))}
                                        <TableCell className='w-96 p-0'>{user.userMemo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-96 ">参加状況</TableHead>
                                    {
                                        eventDate?.map((date, index) => (
                                            <TableHead key={index} className='text-center'>
                                                {formatDateWithDayOfWeek0sup(date.eventDate)}
                                            </TableHead>
                                        ))}
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >
                                <TableRow>
                                    <TableCell className=' p-0 pl-5'>
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className={`cursor-pointer 'text-slate-200', 'text-slate-600')}`}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                    </TableCell>
                                    {eventDate?.map((date, index) => (
                                        <TableCell className=' p-0 ' key={index}><div className=' text-center'>
                                            {getCalUserSelNum(date.eventDate, '〇')}人
                                        </div></TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell className=' p-0 pl-5'>
                                        <FontAwesomeIcon
                                            icon={faDiamond}
                                            className={`cursor-pointer 'text-slate-200', 'text-slate-600')}`}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                    </TableCell>
                                    <TableCell className=' p-0 '><div className=' text-center' >20人</div></TableCell>
                                    <TableCell className=' p-0'><div className=' text-center' >20人</div></TableCell>
                                    <TableCell className='w-96 p-0'></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className=' p-0 pl-5'>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={`cursor-pointer 'text-slate-200', 'text-slate-600')}`}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                    </TableCell>
                                    <TableCell className=' p-0 '><div className=' text-center' >20人</div></TableCell>
                                    <TableCell className=' p-0'><div className=' text-center' >20人</div></TableCell>
                                    <TableCell className='w-96 p-0'></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className=' ml-2'>
                        出欠状況を変更する場合は名前を選択してください。
                    </div>
                    <Button onClick={onClickEventshare}>イベンＵＲＬをシェア</Button>
                </div>
            </div>
            {/* ■■■■■■■■■出席入力ダイアログ■■■■■■■■■ */}
            <div >
                <AttendCreateDialog />
            </div>
        </div >
    )

}

export default AttendMng
