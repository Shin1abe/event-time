import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { trpc } from "@/utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faHtml5,
  faInstagram,
  faJs,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from "../components/Card";
import { GroceryList } from "@prisma/client";

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");

  const { data: list, refetch } = trpc.useQuery(["findAll"]);
  const insertMutation = trpc.useMutation(["insertOne"], {
    onSuccess: () => refetch(),
  });
  const deleteAllMutation = trpc.useMutation(["deleteAll"], {
    onSuccess: () => refetch(),
  });
  const updateOneMutation = trpc.useMutation(["updateOne"], {
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      title: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

  const clearAll = useCallback(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  const updateOne = useCallback(
    (item: GroceryList) => {
      updateOneMutation.mutate({
        ...item,
        checked: !item.checked,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      {/* ヒーローセクション */}
      {/* <div id="home" className="container items-center mx-auto  w-full"> */}
      <div id="home" className=" px-8 md:px-14 lg:px-32 w-full">
        <Card>
          <CardContent>
            <CardHeader
              title="Grocery List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
            />
            <List>
              {list?.map((item) => (
                <ListItem key={item.id} item={item} onUpdate={updateOne} />
              ))}
            </List>
          </CardContent>
          <CardForm
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            submit={insertOne}
          />
        </Card>
      </div>
      {/* お問い合わせセクション */}
      <div
        id="contact"
        className="container mb-64 flex justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full"
      >
        <section className="w-full">
          <h2 className="secondary-title">お問い合わせ</h2>
          <p className="section-paragraph">
            私の経歴が気になる方はご一報ください。即時対応いたします。
          </p>
          <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-32 mt-16">
            <div className="space-y-12">
              <div>
                <label className=" block mb-6 text-xl font-bold">お名前</label>
                <input
                  type="text"
                  className="w-full border border-inputBorder  px-4 py-4"
                />
              </div>
              <div>
                <label className=" block mb-6 text-xl font-bold">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full border border-inputBorder  px-4 py-4"
                />
              </div>
              <div>
                <label className=" block mb-6 text-xl font-bold">
                  メッセージ
                </label>
                <input
                  type="text"
                  className="w-full border border-inputBorder  px-4 py-4"
                />
              </div>
              <button className="px-8  py-3 bg-theme font-bold rounded-lg hover:bg-purple-600 transition-all duration-300">
                送信する
              </button>
            </div>
            <div className="mt-20">
              <p className="text-secondary ">000-000-0000</p>
              <a href="mailto:xxxxx@gmail.com">xxxxx@gmail.com</a>
              {/* sns */}
              <div className="mt-20 space-x-6">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="text-blue-400 h-[20px]"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-blue-600  h-[20px]"
                  />
                </a>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-pink-400  h-[20px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
