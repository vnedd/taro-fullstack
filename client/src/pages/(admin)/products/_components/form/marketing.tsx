import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
interface MarketingProps {
  form: UseFormReturn<any>;
  loading: boolean;
}

const Marketing: React.FC<MarketingProps> = ({ form, loading }) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardHeader>
        <CardTitle>Product Marketing</CardTitle>
        <CardDescription>
          Create discount programs to attract customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Product discount</FormLabel>
              </div>
              <FormControl>
                <Input disabled={loading} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(Marketing);
