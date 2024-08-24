import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";
import SocialButton from "./social-button";

const LoginGoogleButton = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        await loginWithGoogle(code, () => {
          navigate("/");
        });
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Google login failed");
    },
    flow: "auth-code",
  });

  return (
    <div className="w-full">
      <SocialButton
        title="Continue with Google"
        icon={FcGoogle}
        onClick={() => login()}
      />
    </div>
  );
};

export default LoginGoogleButton;
