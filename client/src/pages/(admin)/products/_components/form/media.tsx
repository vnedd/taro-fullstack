import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import ProductImagesUpload from "@/components/product-images-upload";
interface MediaProps {
  form: UseFormReturn<any>;
  loading: boolean;
}

const Media: React.FC<MediaProps> = ({ form }) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>
          It is recommended to include at least 5 images to adequately represent
          your product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  <span className="text-red-600 mr-1">*</span>
                  Product Images
                </FormLabel>
                <FormDescription className="text-xs line-clamp-1">
                  It is recommended to include at least 5 images to adequately
                  represent your product.
                </FormDescription>
              </div>
              <FormControl>
                <ProductImagesUpload
                  initialUrls={field.value}
                  onImagesChange={(urls: string[]) => field.onChange(urls)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(Media);
