"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/store/product-card";
import {
  ProductFilters,
  type FilterState,
} from "@/components/store/product-filters";
import { SAMPLE_PRODUCTS } from "@/lib/data";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export default function StorePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    materials: [],
    priceRange: [0, 1000000],
  });

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !product.name.toLowerCase().includes(searchLower) &&
          !product.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }

      // Material filter
      if (
        filters.materials.length > 0 &&
        !product.materials.some((m) => filters.materials.includes(m))
      ) {
        return false;
      }

      // Price filter
      if (
        product.basePrice < filters.priceRange[0] ||
        product.basePrice > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Cửa hàng Mẫu có sẵn
            </h1>
            <p className="text-muted-foreground">
              Khám phá bộ sưu tập mẫu in 3D được thiết kế sẵn. Tùy chỉnh kích
              thước, màu sắc và vật liệu theo ý bạn.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, categories: [] }))
              }
              className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                filters.categories.length === 0
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-foreground hover:bg-secondary"
              }`}
            >
              Tất cả
            </button>
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    categories: prev.categories.includes(category.id)
                      ? prev.categories.filter((c) => c !== category.id)
                      : [category.id],
                  }))
                }
                className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  filters.categories.includes(category.id)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-foreground border-foreground hover:bg-secondary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Filters Sidebar */}
            <div>
              <ProductFilters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Hiển thị {filteredProducts.length} sản phẩm
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed border-foreground">
                  <p className="text-lg font-medium mb-2">
                    Không tìm thấy sản phẩm
                  </p>
                  <p className="text-muted-foreground">
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
