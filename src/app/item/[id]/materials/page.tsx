import { Check } from "lucide-react";

export default function MaterialsTab() {
  const materials = [
    { name: "PLA", color: "bg-green-amber-100 text-amber-800", desc: "Thân thiện môi trường, dễ in" },
    { name: "PLA+", color: "bg-green-100 text-green-800", desc: "Độ bền cao hơn PLA thường" },
    { name: "PETG", color: "bg-blue-100 text-blue-800", desc: "Chống nước, chịu lực tốt" },
    { name: "ABS", color: "bg-gray-700 text-white", desc: "Chịu nhiệt cao, bền" },
    { name: "TPU", color: "bg-purple-rose-100 text-rose-800", desc: "Dẻo, chống sốc" },
    { name: "ASA", color: "bg-orange-100 text-orange-800", desc: "Chống UV, dùng ngoài trời" },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Vật liệu hỗ trợ in sản phẩm này</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {materials.map((mat => (
          <div key={mat.name} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${mat.color} rounded-xl flex items-center justify-center font-bold text-xl`}>
                {mat.name}
              </div>
              <div>
                <h4 className="font-bold text-lg">{mat.name}</h4>
                <p className="text-sm text-gray-600">+50.000đ</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-4">{mat.desc}</p>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check className="w-5 h-5" />
              <span>Hỗ trợ in ngay</span>
            </div>
          </div>
        )))}
      </div>

      <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Bạn muốn in bằng <strong>vật liệu khác</strong> (Carbon Fiber, Nylon, Wood, Metal...)?
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full">
          Liên hệ tư vấn miễn phí
        </button>
      </div>
    </div>
  );
}