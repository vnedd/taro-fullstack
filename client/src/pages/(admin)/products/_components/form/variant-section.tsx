import React from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CgTemplate } from "react-icons/cg";
import VariantsTable from "@/components/variants-table";
import { IVariant } from "@/types/product";

interface VariantSectionProps {
  variants: IVariant[];
  onQuantityChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onPriceChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onDelete: (index: number) => void;
  onUsePriceTemplate: () => void;
  loading: boolean;
}

const VariantSection: React.FC<VariantSectionProps> = ({
  variants,
  onQuantityChange,
  onPriceChange,
  onDelete,
  onUsePriceTemplate,
  loading,
}) => {
  if (variants.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between">
        <FormLabel className="flex items-center space-x-1">
          <span className="text-red-600">*</span>
          <p>Variation list</p>
        </FormLabel>
        <Button
          className="space-x-2"
          onClick={onUsePriceTemplate}
          disabled={loading}
          variant="outline"
          type="button"
          size="sm"
        >
          <CgTemplate className="w-4 h-4" />
          <p>Use price template</p>
        </Button>
      </div>
      <VariantsTable
        variants={variants}
        onQuantityChange={onQuantityChange}
        onPriceChange={onPriceChange}
        onDelete={onDelete}
      />
    </>
  );
};

export default React.memo(VariantSection);
