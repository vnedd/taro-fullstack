import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { registerSchema, TRegisterSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register, isLoading } = useAuthStore((s) => s);
  const nav = useNavigate();
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: TRegisterSchema) => {
    const { confirmPassword, ...rest } = values;
    await register(rest, () => {
      nav("/auth/login");
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormInput form={form} name="username" label="Username" />
          <FormInput
            loading={isLoading}
            form={form}
            name="email"
            label="Email Address"
            type="email"
          />
          <FormInput
            loading={isLoading}
            form={form}
            name="password"
            label="Password"
            type="password"
          />
          <FormInput
            loading={isLoading}
            form={form}
            name="confirmPassword"
            label="Confirm password"
            type="password"
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
