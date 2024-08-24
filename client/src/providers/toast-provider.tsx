import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: "14px",
        },
      }}
    />
  );
};

export default ToastProvider;
