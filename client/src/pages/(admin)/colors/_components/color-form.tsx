import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { useCreateColor, useUpdateColor } from "@/hooks/use-colors";
import { colorschema, TColorSchema } from "@/schemas/color.schema";
import { ColorColumn } from "./column";

interface ColorsFormProps {
  onSetShow?: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ColorColumn;
}

const ColorsForm = ({ onSetShow, initialData }: ColorsFormProps) => {
  const createMutation = useCreateColor();
  const updateMutation = useUpdateColor();

  const form = useForm<TColorSchema>({
    resolver: zodResolver(colorschema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
    },
  });

  const onSubmit = async (values: TColorSchema) => {
    try {
      if (initialData) {
        await updateMutation.mutateAsync({ ...values, id: initialData?.id });
        toast.success("Color updated successfully!");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Color created successfully!");
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
          label="Color name"
          placeholder="Ex: Music, funny..."
        />
        <FormInput
          form={form}
          name="value"
          label="Value"
          placeholder="Ex: Music, funny..."
          className="grow w-full shrink-0"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          ) : (
            <>{initialData ? "Update color" : "Add color"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ColorsForm;
