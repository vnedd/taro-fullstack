import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { ICategory } from "@/types/category";
import { FormInput } from "@/components/form/form-input";

interface BasicInfoProps {
  form: UseFormReturn<any>;
  loading: boolean;
  categories: ICategory[];
}

const BasicInfo: React.FC<BasicInfoProps> = ({ form, loading, categories }) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Basic information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormInput
          form={form}
          name="name"
          label="Product name"
          loading={loading}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger className="w-[50%]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cate) => (
                    <SelectItem
                      key={cate.id}
                      className="cursor-pointer"
                      value={cate.id}
                    >
                      {cate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(BasicInfo);
