import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import SocialButton from "@/components/social-button";
import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
  return (
    <div className=" bg-white border dark:border-2 dark:bg-transparent dark:border-white w-[450px] sm:h-auto rounded-lg  shadow-2xl px-6 py-8 ">
      <div className="flex items-center flex-col space-y-6">
        <div className=" text-center space-y-1">
          <h4 className="font-semibold text-lg">Create your account</h4>
          <p className="text-muted-foreground font-normal text-sm">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <RegisterForm />
        <div className="relative w-full">
          <p className="p-2 px-3 bg-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-muted-foreground text-xs">
            Or
          </p>
          <p className="w-full h-[.5px] bg-secondary" />
        </div>

        <SocialButton
          title="Continue with Google"
          icon={FcGoogle}
          onClick={() => {}}
        />
        <div className="flex items-center justify-center gap-2 text-sm mt-8">
          <p>Have an account yet?</p>
          <Link to="/auth/login" className="text-slate-600">
            Sign in!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
