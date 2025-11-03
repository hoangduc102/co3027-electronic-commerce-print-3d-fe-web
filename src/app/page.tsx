import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">
        Dịch vụ đặt in 3D trực tuyến
      </h1>
      <p className="text-gray-600">
        Nền tảng cung cấp dịch vụ in 3D chuyên nghiệp
      </p>
      <Link href="/login">
        <Button>Bắt đầu</Button>
      </Link>
    </main>
  );
}
