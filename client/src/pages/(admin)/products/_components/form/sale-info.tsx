import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IoCreateOutline } from "react-icons/io5";
import { ISize } from "@/types/size";
import { IColor } from "@/types/color";
import { IStyle } from "@/types/style";
import { FormCheckboxs } from "@/components/form/form-checkboxs";

interface SaleInfoProps {
  form: UseFormReturn<any>;
  loading: boolean;
  sizes: ISize[];
  colors: IColor[];
  styles: IStyle[];
  generateVariants: () => void;
}

const SaleInfo: React.FC<SaleInfoProps> = ({
  form,
  loading,
  sizes,
  colors,
  styles,
  generateVariants,
}) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Sale information</CardTitle>
        <CardDescription>
          Select sizes, colors, product types before creating product variations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="border p-3 rounded-md">
            <FormCheckboxs
              control={form.control}
              name="product_sizes"
              label="Sizes"
              items={sizes}
              loading={loading}
            />
          </div>
          <div className="border p-3 rounded-md">
            <FormCheckboxs
              control={form.control}
              name="product_colors"
              label="Colors"
              items={colors}
              loading={loading}
            />
          </div>
        </div>
        <div className="border p-3 rounded-md">
          <FormCheckboxs
            control={form.control}
            name="product_styles"
            label="Product Style"
            items={styles}
            loading={loading}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          className="flex items-center space-x-2"
          onClick={generateVariants}
        >
          <IoCreateOutline className="mb-1 w-4 h-4" />
          <p className="text-xs"> Generate Variations</p>
        </Button>
      </CardContent>
    </Card>
  );
};

export default React.memo(SaleInfo);
