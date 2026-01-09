"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X, AlertTriangle, Wrench, Minus, Plus, Info } from "lucide-react";
import type { UploadedFile, PrintConfig } from "@/lib/types";
import {
  MATERIALS,
  TECHNOLOGIES,
  INFILL_OPTIONS,
  LAYER_HEIGHT_OPTIONS,
} from "@/lib/constants";
import { usePriceCalculator } from "@/hooks/use-price-calculator";
import { ModelViewer } from "./model-viewer";

interface FileCardProps {
  file: UploadedFile;
  onRemove: () => void;
  onConfigChange: (config: PrintConfig) => void;
  config: PrintConfig;
}

export function FileCard({
  file,
  onRemove,
  onConfigChange,
  config,
}: FileCardProps) {
  const price = usePriceCalculator(file, config);
  const currentMaterial = MATERIALS.find((m) => m.id === config.material);
  const availableMaterials = MATERIALS.filter(
    (m) => m.technology === config.technology
  );

  const updateConfig = (updates: Partial<PrintConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  return (
    <Card className="border-2 border-foreground overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr] gap-0">
        {/* 3D Preview */}
        <div className="bg-secondary border-b-2 lg:border-b-0 lg:border-r-2 border-foreground p-4">
          <div className="aspect-square bg-background border-2 border-foreground relative">
            <ModelViewer url={file.url} />

            {/* File info overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-background/90 border border-foreground p-2 text-xs">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-muted-foreground">
                {file.dimensions?.x.toFixed(1)} ×{" "}
                {file.dimensions?.y.toFixed(1)} ×{" "}
                {file.dimensions?.z.toFixed(1)} mm
              </p>
            </div>

            {/* Non-manifold warning */}
            {!file.isManifold && (
              <div className="absolute top-2 left-2 right-2 bg-amber-100 border border-amber-500 p-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <span className="text-xs text-amber-800">Lưới có lỗi</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto h-6 text-xs border-amber-500 bg-transparent"
                >
                  <Wrench className="h-3 w-3 mr-1" />
                  Sửa tự động
                </Button>
              </div>
            )}
          </div>

          {/* Transform controls */}
          <div className="mt-4 space-y-3">
            <div>
              <Label className="text-xs font-medium mb-1 block">
                Tỷ lệ (%)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-foreground bg-transparent"
                  onClick={() =>
                    updateConfig({ scale: Math.max(10, config.scale - 10) })
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={config.scale}
                  onChange={(e) =>
                    updateConfig({ scale: Number(e.target.value) })
                  }
                  className="h-8 text-center border-foreground"
                  min={10}
                  max={500}
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-foreground bg-transparent"
                  onClick={() =>
                    updateConfig({ scale: Math.min(500, config.scale + 10) })
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium mb-1 block">Số lượng</Label>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-foreground bg-transparent"
                  onClick={() =>
                    updateConfig({ quantity: Math.max(1, config.quantity - 1) })
                  }
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  value={config.quantity}
                  onChange={(e) =>
                    updateConfig({
                      quantity: Math.max(1, Number(e.target.value)),
                    })
                  }
                  className="h-8 text-center border-foreground"
                  min={1}
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8 border-foreground bg-transparent"
                  onClick={() =>
                    updateConfig({ quantity: config.quantity + 1 })
                  }
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="p-4 lg:p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg">{file.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Thể tích: ~
                {file.volume?.toFixed(1)} cm³
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={onRemove}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Technology */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Công nghệ in
              </Label>
              <Select
                value={config.technology}
                onValueChange={(value: "FDM" | "SLA" | "SLS") => {
                  const firstMaterial = MATERIALS.find(
                    (m) => m.technology === value
                  );
                  updateConfig({
                    technology: value,
                    material: firstMaterial?.id || config.material,
                  });
                }}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-foreground">
                  {TECHNOLOGIES.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      <div>
                        <span className="font-medium">{tech.name}</span>
                        <span className="text-muted-foreground ml-2 text-xs">
                          {tech.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Material */}
            <div>
              <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                Vật liệu
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs border-2 border-foreground">
                      <p>{currentMaterial?.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={config.material}
                onValueChange={(value) => updateConfig({ material: value })}
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-foreground">
                  {availableMaterials.map((mat) => (
                    <SelectItem key={mat.id} value={mat.id}>
                      <span className="font-medium">{mat.name}</span>
                      <span className="text-muted-foreground ml-2 text-xs">
                        {formatPrice(mat.pricePerGram)}/g
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Màu sắc</Label>
              <div className="flex flex-wrap gap-2">
                {currentMaterial?.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 border-2 ${
                      config.color === color
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-foreground"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => updateConfig({ color })}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Infill */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Độ đặc (Infill)
              </Label>
              <Select
                value={config.infill.toString()}
                onValueChange={(value) =>
                  updateConfig({ infill: Number(value) })
                }
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-foreground">
                  {INFILL_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-muted-foreground ml-2 text-xs">
                        {option.description}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Layer Height */}
            <div className="sm:col-span-2">
              <Label className="text-sm font-medium mb-2 block">
                Độ mịn (Layer Height)
              </Label>
              <Select
                value={config.layerHeight.toString()}
                onValueChange={(value) =>
                  updateConfig({ layerHeight: Number(value) })
                }
              >
                <SelectTrigger className="border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-2 border-foreground">
                  {LAYER_HEIGHT_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      <span className="font-medium">{option.label}</span>
                      <span className="text-muted-foreground ml-2 text-xs">
                        {option.description}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Summary for this file */}
          <div className="bg-secondary border-2 border-foreground p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Giá dự tính ({config.quantity} bản)
                </p>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(price.total)}
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Thời gian in: ~{price.estimatedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
