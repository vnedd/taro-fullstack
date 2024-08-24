import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { loginSchema, TLoginSchema } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { isLoading, login } = useAuthStore((s) => s);
  const nav = useNavigate();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: TLoginSchema) => {
    await login(values, () => {
      nav("/");
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormInput
            form={form}
            name="email"
            loading={isLoading}
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
          <Button disabled={isLoading} type="submit" className="w-full">
            Login now!
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
