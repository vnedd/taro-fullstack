import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "lucide-react";

import { useAuthStore } from "@/store/auth";
import { FormInput } from "@/components/form/form-input";
import { TUpdateUserSchema, updateUserSchema } from "@/schemas/auth";
import { updateUser } from "@/services/auth.service";
import toast from "react-hot-toast";

const PublicInforForm = () => {
  const { profile, getProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: profile?.username || "",
    },
  });

  const onSubmit = async (values: TUpdateUserSchema) => {
    setIsLoading(true);
    try {
      await updateUser({ ...values });
      await getProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="username"
          label="Username"
          placeholder="ex: John Doe"
          disabled={isLoading}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="currentPassword"
            label="Current Password"
            placeholder="******"
            type="password"
            disabled={isLoading}
          />

          <FormInput
            form={form}
            name="newPassword"
            label="New Password"
            placeholder="******"
            type="password"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            className="max-w-[100px] rounded-lg text-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span>Save Changes</span>
                <Loader className="w-4 h-4 animate-spin mr-1" />
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PublicInforForm;
