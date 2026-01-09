"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/store/product-card";
import { ProductFilters, type FilterState } from "@/components/store/product-filters";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { Loader2, AlertCircle } from "lucide-react";
import { productService } from "@/services/product.api";

export default function StorePage() {
  // 1. CALL QUERY DIRECTLY IN COMPONENT
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    materials: [],
    priceRange: [0, 1000000],
  });

  // 2. CLIENT-SIDE FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search: Name or Description
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDesc = product.description?.toLowerCase().includes(searchLower) ?? false;
        if (!matchesName && !matchesDesc) return false;
      }

      // Categories: Compare against product tags
      if (filters.categories.length > 0) {
        const productTagNames = product.tags.map(t => t.tag.name.toLowerCase());
        const hasMatch = filters.categories.some(cat => productTagNames.includes(cat.toLowerCase()));
        if (!hasMatch) return false;
      }

      // Materials: Compare against variant materials
      if (filters.materials.length > 0) {
        const productMaterials = product.variants
          .map(v => v.material?.name.toLowerCase())
          .filter(Boolean);
        const hasMatch = filters.materials.some(mat => productMaterials.includes(mat.toLowerCase()));
        if (!hasMatch) return false;
      }

      // Price Range
      if (product.basePrice < filters.priceRange[0] || product.basePrice > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [filters, products]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Đang tải danh sách sản phẩm...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-destructive">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h2 className="text-xl font-bold">Lỗi tải dữ liệu</h2>
        <p className="text-sm opacity-80">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cửa hàng Mẫu có sẵn</h1>
          <p className="text-muted-foreground">Khám phá và tùy chỉnh mẫu in 3D của bạn.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilters(p => ({ ...p, categories: [] }))}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
              filters.categories.length === 0 ? "bg-primary text-white" : "hover:bg-secondary"
            }`}
          >
            Tất cả
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters(p => ({
                ...p,
                categories: p.categories.includes(cat.id) ? [] : [cat.id]
              }))}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                filters.categories.includes(cat.id) ? "bg-primary text-white" : "hover:bg-secondary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          <aside><ProductFilters filters={filters} onFilterChange={setFilters} /></aside>

          <section>
            <div className="mb-4 text-sm text-muted-foreground">
              Tìm thấy {filteredProducts.length} sản phẩm
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      ...product,
                      image: product.images[0]?.url || "/placeholder.png"
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <p className="text-lg font-medium">Không tìm thấy sản phẩm nào khớp với bộ lọc</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}