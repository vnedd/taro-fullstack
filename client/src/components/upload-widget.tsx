import { uploadImageToCloudinary } from "@/services/cloudinary.service";
import { useState, ChangeEvent, useId, useCallback } from "react";
import { Button } from "./ui/button";
import { RiDeleteBackLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

interface UploadWidgetProps {
  title?: string;
  initUrl?: string;
  className?: string;
  disabled?: boolean;
  onUpload: (url: string) => void;
  onRemove?: (url: string) => void;
}

const UploadWidget = ({
  title = "Drag & drop an image here or browse",
  className,
  onUpload,
  onRemove,
  disabled = false,
  initUrl = "",
}: UploadWidgetProps) => {
  const [image, setImage] = useState<string>(initUrl);
  const inputId = useId();

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        const url = await uploadImageToCloudinary(file);
        setImage(url);
        onUpload(url);
      } catch (error) {
        console.error("Error uploading image:", error);
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

  const handleRemove = useCallback(() => {
    setImage("");
    if (onRemove) {
      onRemove(image);
    }
  }, [image, onRemove]);

  if (image) {
    return (
      <div className={cn("relative aspect-square rounded-md overflow-hidden")}>
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Uploaded"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleRemove}
          className="absolute top-2 right-2 w-6 h-6 p-1 rounded"
        >
          <RiDeleteBackLine className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <label
        htmlFor={inputId}
        className={cn(
          "flex justify-center items-center w-full h-32 border border-dashed border-gray-300 rounded-md cursor-pointer p-3",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
          className
        )}
      >
        <span className="text-secondary-foreground text-xs text-nowrap">
          {title}
        </span>
        <input
          id={inputId}
          type="file"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          accept="image/*"
        />
      </label>
    </div>
  );
};

export default UploadWidget;
