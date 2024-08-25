import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { sizeschema, TSizeSchema } from "@/schemas/size.schema";
import { useCreateSize, useUpdateSize } from "@/hooks/use-sizes";
import { SizeColumn } from "./column";

interface SizesFormProps {
  onSetShow?: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: SizeColumn;
}

const SizesForm = ({ onSetShow, initialData }: SizesFormProps) => {
  const createMutation = useCreateSize();
  const updateMutation = useUpdateSize();

  const form = useForm<TSizeSchema>({
    resolver: zodResolver(sizeschema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const onSubmit = async (values: TSizeSchema) => {
    try {
      if (initialData) {
        await updateMutation.mutateAsync({ ...values, id: initialData?.id });
        toast.success("Size updated successfully!");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Size created successfully!");
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
        <FormInput
          form={form}
          name="name"
          label="Size name"
          placeholder="Ex: Music, funny..."
        />
        <FormInput
          form={form}
          name="value"
          label="Value"
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
            <>{initialData ? "Update size" : "Add size"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SizesForm;
