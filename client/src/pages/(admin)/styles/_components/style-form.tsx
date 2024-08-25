import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { StylesColumn } from "./column";
import { FormInput } from "@/components/form/form-input";
import { styleschema, TStyleSchema } from "@/schemas/style.schema";
import { useCreateStyle, useUpdateStyle } from "@/hooks/use-styles";

interface StylesFormProps {
  onSetShow?: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: StylesColumn;
}

const StylesForm = ({ onSetShow, initialData }: StylesFormProps) => {
  const createMutation = useCreateStyle();
  const updateMutation = useUpdateStyle();

  const form = useForm<TStyleSchema>({
    resolver: zodResolver(styleschema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (values: TStyleSchema) => {
    try {
      if (initialData) {
        await updateMutation.mutateAsync({ ...values, id: initialData?.id });
        toast.success("Style updated successfully!");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Style created successfully!");
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
          label="Style name"
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
            <>{initialData ? "Update style" : "Add style"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default StylesForm;
