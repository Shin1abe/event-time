##未決
TODO イベント出席には、合計行があるべき
TODO カレンダーで選択過去は選択できないようにするべき
TODO 更新画面では最も現在に近い日付を初期で表示すべき

TODO AttendCreateDialog、AttendUpdateDialog 、EventCreateDialog
　　　 at AttendCreateDialog (webpack-internal:///./src/pages/components/AttendCreateDialog.tsx:97:72)　
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
　　　　next-dev.js:53 Warning: validateDOMNesting(...): <table> cannot appear as a descendant of <p>.
　　　　　→<Table>使った瞬間にNG。
TODO 背景色
TODO npm run build: Warning: You have opted-out of Automatic Static Optimization due to `getInitialProps` in `pages/_app`. This does not opt-out pages with `getStaticProps`

##解決
ok 妥協：出席登録で小スマフォで下のボタンが隠れる
ok ブラウザ制限で妥協 全画面にすべき　nextjs tailwindcss shaduiで構築している。全画面で常に表示されるためには？
ok 更新画面でメモにDEFAULTは非表示すべき
ok 文字の色を薄い青、紫
ok 出席一覧で日付と●×の位置がずれている
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
OK npm run build:error - ESLint: Failed to load plugin '@typescript-eslint' declared in '.eslintrc.json': Cannot find module '@typescript-eslint/eslint-plugin' Require stack: - 　　C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json Referenced from: C:\Fujitsu\MyPrj\nextjs\event-time\.eslintrc.json
Event_findWhereMany?batch=1&　　input=%7B%220%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%221%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%222%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%2C%223%22%3A%7B%22eventId%22%3A%22clwik2g5k00003r6upc7ycdb8%22%7D%7D' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
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
ng ダイアログで×ボタン無効→無理

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
