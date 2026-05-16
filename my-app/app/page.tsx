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

const categories = [
  {
    id: "food",
    label: "料理",
  },
  {
    id: "dessert",
    label: "デザート",
  },
  {
    id: "drink",
    label: "ドリンク",
  },
];

const menuItems = [
  {
    name: "大崎焼",
    description: "秘伝オリジナルスパイスで病みつきな味に",
    price: 399,
    image: "/menu/yakitori.png",
    category: "food",
  },
  {
    name: "長芋の鉄板焼き",
    description: "トロトロの長芋にうずらの卵を添えて",
    price: 399,
    image: "/menu/yamaimo.png",
    category: "food",
  },
  {
    name: "鳥雑炊",
    description: "鳥を飲み込んでるような凝縮された味",
    price: 399,
    image: "/menu/kome.png",
    category: "food",
  },
  {
    name: "キムチ",
    description: "農家の佐藤さんからいただいた白菜をお店で漬けてます！",
    price: 399,
    image: "/menu/kimuti.png",
    category: "food",
  },
  {
    name: "ハッピープレート",
    description: "一日頑張ったご褒美にお店からのささやかな気持ちです",
    price: 399,
    image: "/menu/happy.png",
    category: "dessert",
  },
  {
    name: "カタラーナアイス",
    description: "〆に決めよう！",
    price: 399,
    image: "/menu/katarana.png",
    category: "dessert",
  },
  {
    name: "大崎サワー",
    description: "オリジナルブレンドのNo.1サワー",
    price: 399,
    image: "/menu/sake.png",
    category: "drink",
  },
];

const createInitialQuantities = () => {
  return Object.fromEntries(menuItems.map((item) => [item.name, 0])) as Record<
    string,
    number
  >;
};

export default function Home() {
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(
    createInitialQuantities
  );

  const increaseQuantity = (name: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
    }));
  };

  const decreaseQuantity = (name: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 0),
    }));
  };

  const resetAll = () => {
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
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight">OSAKIZOKU</h1>
          <p className="mt-2 text-sm text-zinc-500">399均一居酒屋</p>
        </header>

        <nav className="sticky top-0 z-10 mb-6 bg-zinc-50 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="shrink-0 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100"
              >
                {category.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="flex-1 space-y-8">
          {categories.map((category) => {
            const filteredItems = menuItems.filter(
              (item) => item.category === category.id
            );

            return (
              <div
                key={category.id}
                id={category.id}
                className="scroll-mt-24 space-y-4"
              >
                <div>
                  <h2 className="text-2xl font-bold">{category.label}</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {category.label}メニューを選んでください
                  </p>
                </div>

                {filteredItems.map((item) => (
                  <Card key={item.name} className="overflow-hidden rounded-2xl">
                    <CardContent className="space-y-4 p-5">
                      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 448px"
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <p className="font-semibold">¥{item.price}</p>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500">
                          カート内：{cartQuantities[item.name]}点
                        </p>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={() => decreaseQuantity(item.name)}
                          >
                            -
                          </Button>

                          <span className="w-8 text-center font-semibold">
                            {cartQuantities[item.name]}
                          </span>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={() => increaseQuantity(item.name)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </section>

        <footer className="sticky bottom-0 mt-8 space-y-3 bg-zinc-50 py-4">
          <div className="rounded-2xl bg-white p-4 text-sm shadow-sm">
            <div className="flex justify-between">
              <span>カート内の合計点数</span>
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
            カートを全て取り消し
          </Button>

          <Button className="h-14 w-full rounded-full bg-red-600 text-lg text-white hover:bg-red-700">
            注文に進む
          </Button>
        </footer>
      </div>
    </main>
  );
}