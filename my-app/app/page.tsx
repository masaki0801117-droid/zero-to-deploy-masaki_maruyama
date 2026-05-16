"use client";

// F12を使うと開発者ツールが開けて、そこからスマホのサイズ感を確認できます。
// 右上のパソコンとスマホのマークを押すとサイズを変更できます。

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const menuItems = [
  {
    name: "大崎焼",
    description: "秘伝オリジナルスパイスで病みつきな味に",
    price: 399,
    image: "/menu/yakitori.png",
  },
  {
    name: "長芋の鉄板焼き",
    description: "トロトロの長芋にうずらの卵を添えて",
    price: 399,
    image: "/menu/yamaimo.png",
  },
  {
    name: "鳥雑炊",
    description: "鳥を飲み込んでるような凝縮された味",
    price: 399,
    image: "/menu/kome.png",
  },
  {
    name: "キムチ",
    description: "農家の佐藤さんからいただいた白菜をお店で漬けてます！",
    price: 399,
    image: "/menu/kimuti.png",
  },
  {
    name: "ハッピープレート",
    description: "一日頑張ったご褒美にお店からのささやかな気持ちです",
    price: 399,
    image: "/menu/happy.png",
  },
  {
    name: "カタラーナアイス",
    description: "〆に決めよう！",
    price: 399,
    image: "/menu/katarana.png",
  },
  {
    name: "大崎サワー",
    description: "オリジナルブレンドのNo.1サワー",
    price: 399,
    image: "/menu/sake.png",
  },
];

const createInitialQuantities = () => {
  return Object.fromEntries(menuItems.map((item) => [item.name, 0])) as Record<
    string,
    number
  >;
};

export default function Home() {
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<string, number>
  >(createInitialQuantities);

  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    createInitialQuantities
  );

  const increaseSelectedQuantity = (name: string) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
    }));
  };

  const decreaseSelectedQuantity = (name: string) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 0),
    }));
  };

  const addToCart = (name: string) => {
    const selectedQuantity = selectedQuantities[name];

    if (selectedQuantity === 0) {
      return;
    }

    setCartQuantities((prev) => ({
      ...prev,
      [name]: prev[name] + selectedQuantity,
    }));

    setSelectedQuantities((prev) => ({
      ...prev,
      [name]: 0,
    }));
  };

  const resetAll = () => {
    setSelectedQuantities(createInitialQuantities());
    setCartQuantities(createInitialQuantities());
  };

  const totalCount = menuItems.reduce(
    (sum, item) => sum + cartQuantities[item.name],
    0
  );

  const totalPrice = menuItems.reduce(
    (sum, item) => sum + item.price * cartQuantities[item.name],
    0
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">OSAKIZOKU</h1>
          <p className="mt-2 text-sm text-zinc-500">399均一居酒屋</p>
        </header>

        <section className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <Card key={item.name} className="overflow-hidden rounded-2xl">
              <CardContent className="space-y-4 p-5">
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <p className="font-semibold">¥{item.price}</p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => decreaseSelectedQuantity(item.name)}
                    >
                      -
                    </Button>

                    <span className="w-8 text-center font-semibold">
                      {selectedQuantities[item.name]}
                    </span>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={() => increaseSelectedQuantity(item.name)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0 bg-red-600 text-white hover:bg-red-700"
                    onClick={() => addToCart(item.name)}
                    disabled={selectedQuantities[item.name] === 0}
                  >
                    追加する
                  </Button>
                </div>

                <p className="text-sm text-zinc-500">
                  追加済み：{cartQuantities[item.name]}点
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="mt-8 space-y-3">
          <div className="rounded-2xl bg-white p-4 text-sm shadow-sm">
            <div className="flex justify-between">
              <span>合計点数</span>
              <span className="font-semibold">{totalCount}点</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span>合計金額</span>
              <span className="font-semibold">¥{totalPrice}</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-full text-base"
            onClick={resetAll}
          >
            全て取り消し
          </Button>

          <Button className="h-14 w-full rounded-full bg-red-600 text-lg text-white hover:bg-red-700">
            注文に進む
          </Button>
        </footer>
      </div>
    </main>
  );
}