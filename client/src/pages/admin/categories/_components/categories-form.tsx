import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { CategoriesColumn } from "./column";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-categories";
import { FormInput } from "@/components/form/form-input";
import UploadWidget from "@/components/upload-widget";
import { categorychema, TCategorySchema } from "@/schemas/category.schema";

interface CategoriesFormProps {
  onSetShow?: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: CategoriesColumn;
}

const CategoriesForm = ({ onSetShow, initialData }: CategoriesFormProps) => {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorychema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      image_url: initialData?.imageUrl || "",
    },
  });

  const onSubmit = async (values: TCategorySchema) => {
    try {
      if (initialData) {
        await updateMutation.mutateAsync({ ...values, id: initialData?.id });
        toast.success("Category updated successfully!");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Category created successfully!");
      }
      if (onSetShow) onSetShow(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <UploadWidget
          initUrl={initialData?.imageUrl}
          onUpload={(url) => {
            form.setValue("image_url", url);
          }}
          onRemove={(_) => {
            form.setValue("image_url", "");
          }}
        />
        {form.formState.errors.image_url?.message && (
          <span className="text-destructive font-normal text-sm">
            {form.formState.errors.image_url?.message}
          </span>
        )}
        <FormInput
          form={form}
          name="name"
          label="Category  name"
          placeholder="Ex: Music, funny..."
        />
        <FormInput
          form={form}
          name="description"
          label="Description"
          placeholder="Ex: Music, funny..."
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          ) : (
            <>{initialData ? "Update category" : "Add category"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CategoriesForm;
