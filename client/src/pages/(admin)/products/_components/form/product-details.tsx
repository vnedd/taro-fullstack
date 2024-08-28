import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ProductDetailsProps {
  form: UseFormReturn<any>;
  loading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ form, loading }) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Product details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <div className="w-full">
                  <TextareaAutosize
                    className="w-full border rounded-md p-2 font-normal text-sm"
                    minRows={3}
                    disabled={loading}
                    placeholder="Please enter the product name"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col">
                <FormLabel>
                  Featured Product?
                  <span className="text-gray-600 ml-1 text-light text-xs">
                    (optional)
                  </span>
                </FormLabel>
                <FormLabel className="cursor-pointer p-4 flex items-center space-x-2 mt-2 rounded-md border">
                  <FormControl>
                    <Checkbox
                      disabled={loading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p>This product will appear on the home page</p>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(ProductDetails);
