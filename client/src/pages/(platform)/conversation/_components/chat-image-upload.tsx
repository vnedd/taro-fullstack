import { uploadImageToCloudinary } from "@/services/cloudinary.service";
import { useState, ChangeEvent, useId, useCallback } from "react";
import { cn } from "@/lib/utils";
import { IoImagesOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
interface ChatImageUploadProps {
  className?: string;
  disabled?: boolean;
  onUpload: (url: string) => void;
}

const ChatImageUpload = ({
  className,
  onUpload,
  disabled = false,
}: ChatImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputId = useId();

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        const url = await uploadImageToCloudinary(file);
        onUpload(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );

  return (
    <div className="mt-2">
      <label
        htmlFor={inputId}
        className={cn(
          "cursor-pointer aspect-square rounded-md",
          disabled || isUploading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100",
          className
        )}
      >
        <Button asChild variant="ghost" size="icon">
          <IoImagesOutline className="w-3 h-3 text-gray-400" />
        </Button>
        <input
          id={inputId}
          type="file"
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default ChatImageUpload;
