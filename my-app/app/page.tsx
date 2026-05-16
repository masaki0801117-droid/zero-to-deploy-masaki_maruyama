// F12を使うと開発者ツールが開けて、そこからスマホのサイズ感を確認できます。
// 右上のパソコンとスマホのマークを押すとサイズを変更できます。

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
    price: "¥399",
  },
  {
    name: "長芋の鉄板焼き",
    description: "トロトロの長芋にうずらの卵を添えて",
    price: "¥399",
  },
  {
    name: "カタラーナアイス",
    description: "〆に決めよう",
    price: "¥399",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">OSAKIZOKU</h1>
          <p className="mt-2 text-sm text-zinc-500">399均一居酒屋</p>
        </header>

        <section className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <Card key={item.name} className="rounded-2xl">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <p className="font-semibold">{item.price}</p>
                </div>

                <Button size="sm" className="shrink-0">
                  追加する
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="mt-8">
          <Button className="h-14 w-full rounded-full bg-red-600 text-lg text-white hover:bg-red-700">
            注文に進む
          </Button>
        </footer>
      </div>
    </main>
  );
}