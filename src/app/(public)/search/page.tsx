"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, FileText, Package, BookOpen, ImageIcon } from "lucide-react";
import { MATERIALS } from "@/lib/constants";
import { SAMPLE_PRODUCTS } from "@/lib/data";

const guidelineResults = [
  {
    id: "1",
    title: "Độ dày vách tối thiểu",
    description: "Hướng dẫn về độ dày tường khi thiết kế mô hình in 3D",
    url: "/guidelines",
  },
  {
    id: "2",
    title: "Góc nghiêng và Support",
    description: "Quy tắc 45 độ và khi nào cần support cho overhangs",
    url: "/guidelines",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return SAMPLE_PRODUCTS.slice(0, 6);
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredMaterials = useMemo(() => {
    if (!query.trim()) return MATERIALS.slice(0, 4);
    return MATERIALS.filter(
      (m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredGuidelines = useMemo(() => {
    if (!query.trim()) return guidelineResults;
    return guidelineResults.filter(
      (g) =>
        g.title.toLowerCase().includes(query.toLowerCase()) ||
        g.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalResults =
    filteredProducts.length +
    filteredMaterials.length +
    filteredGuidelines.length;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Tìm kiếm</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm sản phẩm, vật liệu, hướng dẫn..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-foreground"
                autoFocus
              />
            </div>
            {query && (
              <p className="text-muted-foreground mt-3 text-center">
                Tìm thấy{" "}
                <span className="font-semibold text-foreground">
                  {totalResults}
                </span>{" "}
                kết quả cho &quot;{query}
                &quot;
              </p>
            )}
          </div>

          {/* Results */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-4xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-4 border-2 border-foreground bg-secondary mb-6">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Package className="h-4 w-4 mr-2" />
                Sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Vật liệu
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Hướng dẫn
              </TabsTrigger>
            </TabsList>

            {/* All Results */}
            <TabsContent value="all" className="space-y-8">
              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Sản phẩm ({filteredProducts.length})
                    </h2>
                    <Button
                      variant="link"
                      onClick={() => setActiveTab("products")}
                      className="text-primary"
                    >
                      Xem tất cả
                    </Button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        href={`/store/${product.id}`}
                        className="border-2 border-foreground p-4 hover:bg-secondary transition-colors"
                      >
                        <div className="aspect-square bg-muted mb-3 flex items-center justify-center border border-foreground">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category}
                        </p>
                        <p className="font-bold text-primary mt-1">
                          {new Intl.NumberFormat("vi-VN").format(
                            product.basePrice
                          )}
                          đ
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials Section */}
              {filteredMaterials.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Vật liệu ({filteredMaterials.length})
                    </h2>
                    <Button
                      variant="link"
                      onClick={() => setActiveTab("materials")}
                      className="text-primary"
                    >
                      Xem tất cả
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {filteredMaterials.slice(0, 2).map((material) => (
                      <Link
                        key={material.id}
                        href={`/materials/${material.id}`}
                        className="flex items-center gap-4 p-4 border-2 border-foreground hover:bg-secondary transition-colors"
                      >
                        <div className="flex gap-1">
                          {material.colors.slice(0, 4).map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 border border-foreground"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{material.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {material.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Guidelines Section */}
              {filteredGuidelines.length > 0 && (
                <div>
                  <h2 className="font-bold text-lg flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5" />
                    Hướng dẫn ({filteredGuidelines.length})
                  </h2>
                  <div className="space-y-3">
                    {filteredGuidelines.map((guide) => (
                      <Link
                        key={guide.id}
                        href={guide.url}
                        className="block p-4 border-2 border-foreground hover:bg-secondary transition-colors"
                      >
                        <h3 className="font-semibold">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/store/${product.id}`}
                    className="border-2 border-foreground p-4 hover:bg-secondary transition-colors"
                  >
                    <div className="aspect-square bg-muted mb-3 flex items-center justify-center border border-foreground">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="font-bold text-primary mt-1">
                      {new Intl.NumberFormat("vi-VN").format(product.basePrice)}
                      đ
                    </p>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Materials Tab */}
            <TabsContent value="materials">
              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <Link
                    key={material.id}
                    href={`/materials/${material.id}`}
                    className="flex items-center gap-4 p-4 border-2 border-foreground hover:bg-secondary transition-colors"
                  >
                    <div className="flex gap-1">
                      {material.colors.slice(0, 4).map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 border border-foreground"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{material.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {material.description}
                      </p>
                    </div>
                    <span className="font-bold text-primary">
                      {new Intl.NumberFormat("vi-VN").format(
                        material.pricePerGram
                      )}
                      đ/g
                    </span>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides">
              <div className="space-y-3">
                {filteredGuidelines.map((guide) => (
                  <Link
                    key={guide.id}
                    href={guide.url}
                    className="block p-4 border-2 border-foreground hover:bg-secondary transition-colors"
                  >
                    <h3 className="font-semibold">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
