import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const menuItems = [
  {
    title: "おすすめメニュー",
    description: "人気の商品を確認できます。",
    buttonText: "見る",
  },
  {
    title: "注文フォーム",
    description: "名前を入力して注文を始めます。",
    buttonText: "注文する",
  },
  {
    title: "店舗情報",
    description: "営業時間やアクセスを確認できます。",
    buttonText: "確認する",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">OSAKI　プロジェクト</h1>
          <p className="text-zinc-600">
            5月16日
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <Input placeholder="名前を入力してください" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {menuItems.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <Button className="w-full">{item.buttonText}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}