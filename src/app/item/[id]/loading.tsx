export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-green-700 to-green-900 h-64 animate-pulse" />
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-16 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="h-32 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-16 bg-green-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}