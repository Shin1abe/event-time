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
                            <div className=' p-2'>
                                <div className="container mx-auto px-4">
                                    <p>簡単に・匿名でイベント日程調整ができます。</p>
                                    <ul className="list-disc ml-4 mb-3">
                                        <li>個人を特定する情報はニックネームくらいで、あとは不要です。</li>
                                        <li>作成したイベント情報は、３ヶ月後に自動的に削除されます。</li>
                                    </ul>
                                    <h2 className="font-bold">使い方</h2>
                                    <ol className="list-decimal ml-4">
                                        <li>
                                            <h3 className="font-bold">幹事がイベントを作成</h3>
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
                                            <h3 className="font-bold">日程調整</h3>
                                            <p>登録された情報をもとに、最適な日程を調整します。</p>
                                        </li>
                                    </ol>
                                    <h2 className="font-bold">特徴</h2>
                                    <ul className="list-disc ml-4">
                                        <li>個人情報保護に配慮</li>
                                        <li>匿名で参加可能</li>
                                        <li>イベント情報は自動削除</li>
                                        <li>簡単操作で日程調整</li>
                                    </ul>
                                    <h2 className="font-bold">始め方</h2>
                                    <p>今すぐイベントを作成して、日程調整を始めましょう！</p>
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