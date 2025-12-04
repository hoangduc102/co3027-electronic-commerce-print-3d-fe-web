"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, Search, X } from "lucide-react";
import { PRODUCT_CATEGORIES, MATERIALS } from "@/lib/constants";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

export interface FilterState {
  search: string;
  categories: string[];
  materials: string[];
  priceRange: [number, number];
}

interface FilterContentProps {
  filters: FilterState;
  toggleCategory: (categoryId: string) => void;
  toggleMaterial: (materialId: string) => void;
  updateFilter: (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
}

function FilterContent({
  filters,
  toggleCategory,
  toggleMaterial,
  updateFilter,
  clearFilters,
  activeFiltersCount,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
          Danh mục
        </h4>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 -mx-2 transition-colors"
            >
              <Checkbox
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
          Vật liệu
        </h4>
        <div className="space-y-2">
          {MATERIALS.slice(0, 5).map((material) => (
            <label
              key={material.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 -mx-2 transition-colors"
            >
              <Checkbox
                checked={filters.materials.includes(material.id)}
                onCheckedChange={() => toggleMaterial(material.id)}
                className="border-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm">{material.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
          Khoảng giá
        </h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            min={0}
            max={1000000}
            step={50000}
            onValueChange={(value) =>
              updateFilter("priceRange", value as [number, number])
            }
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {new Intl.NumberFormat("vi-VN").format(filters.priceRange[0])}đ
            </span>
            <span>
              {new Intl.NumberFormat("vi-VN").format(filters.priceRange[1])}đ
            </span>
          </div>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full border-2 border-foreground bg-transparent"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
}

export function ProductFilters({
  onFilterChange,
  filters,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    updateFilter("categories", newCategories);
  };

  const toggleMaterial = (materialId: string) => {
    const newMaterials = filters.materials.includes(materialId)
      ? filters.materials.filter((m) => m !== materialId)
      : [...filters.materials, materialId];
    updateFilter("materials", newMaterials);
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      categories: [],
      materials: [],
      priceRange: [0, 1000000],
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.materials.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0);

  return (
    <>
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 border-2 border-foreground"
          />
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="lg:hidden border-2 border-foreground gap-2 bg-transparent"
            >
              <Filter className="h-4 w-4" />
              Lọc
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 border-r-2 border-foreground"
          >
            <SheetHeader>
              <SheetTitle>Bộ lọc</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent
                filters={filters}
                toggleCategory={toggleCategory}
                toggleMaterial={toggleMaterial}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block border-2 border-foreground p-4 bg-card h-fit sticky top-32">
        <h3 className="font-bold text-lg mb-4">Bộ lọc</h3>
        <FilterContent
          filters={filters}
          toggleCategory={toggleCategory}
          toggleMaterial={toggleMaterial}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />
      </div>
    </>
  );
}
