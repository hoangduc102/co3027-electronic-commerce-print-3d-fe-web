import { Star } from "lucide-react";

export default function ReviewsTab() {
  const reviews = [
    {
      name: "Nguyễn Đăng Anh",
      rating: 5,
      date: "15/03/2025",
      comment: "In rất đẹp, màu sắc chuẩn, giao hàng nhanh. Ốp vừa khít điện thoại, chắc chắn. Sẽ recommend!",
    },
    {
      name: "Trần Nguyễn Ngọc Bích",
      rating: 4,
      date: "10/03/2025",
      comment: "Chất lượng tốt, nhưng hơi lâu nhận hàng (5 ngày). Mong shop cải thiện tốc độ.",
    },
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Đánh giá từ khách hàng</h2>

      <div className="space-y-8">
        {reviews.map((review, i) => (
          <div key={i} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                {review.name[0]}
              </div>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-full shadow-lg">
          Viết đánh giá của bạn
        </button>
      </div>
    </div>
  );
}