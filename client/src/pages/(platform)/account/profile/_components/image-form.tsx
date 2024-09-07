import UploadWidget from "@/components/upload-widget";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { updateUser } from "@/services/auth.service";

const ImageForm = () => {
  const { profile, getProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (url: string) => {
    setIsLoading(true);
    try {
      await updateUser({ avatar_url: url });
      await getProfile();
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col gap-3">
      <UploadWidget
        className="w-32 h-8"
        title="Upload your image"
        initUrl={profile?.avatarUrl}
        onUpload={handleUpload}
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageForm;
