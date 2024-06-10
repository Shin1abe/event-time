import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu'
import React from 'react'

const EventNavigationMenu = () => {
    return (
        <div className="text-base">
            <NavigationMenu>
                <NavigationMenuList className="flex">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger >About EventTime</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className='text-base p-0 text-blue-100'>
                                <div className="container mx-auto px-4">
                                    <p>簡単に・匿名でイベント日程調整ができます。</p>
                                    <ul className="list-disc ml-4 mb-3">
                                        <li>個人を特定する情報はニックネームくらい</li>
                                        <li>イベント情報は３ヶ月後に自動的に削除</li>
                                    </ul>
                                    <h2 className="font-bold">使い方</h2>
                                    <ol className="list-decimal ml-4">
                                        <li>
                                            <h3 className="font-bold">起案者がイベント作成</h3>
                                            <ul className="list-disc ml-4">
                                                <li>イベント名を入力</li>
                                                <li>日程候補日を設定</li>
                                                <li>SNSなどでイベントURLを共有</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <h3 className="font-bold">参加者がイベントに参加</h3>
                                            <ul className="list-disc ml-4">
                                                <li>共有されたイベントURLにアクセス</li>
                                                <li>ニックネームを入力</li>
                                                <li>日程を選択</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <h3 className="font-bold ">日程調整</h3>
                                            <p>登録された情報をもとに、日程を調整。</p>
                                        </li>
                                    </ol>
                                    <h2 className="font-bold  mt-3">始め方</h2>
                                    <p>  イベントを作成して日程調整を始めましょう！</p>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default EventNavigationMenu