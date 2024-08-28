import { uploadImageToCloudinary } from "@/services/cloudinary.service";
import { useState, ChangeEvent, useId } from "react";
import { Button } from "./ui/button";
import { RiDeleteBackLine } from "react-icons/ri";
import { Loader } from "lucide-react";
import { dataPlaceholderImage } from "@/constants/images";
import { cn } from "@/lib/utils";
import { GoPlus } from "react-icons/go";

interface UploadWidgetProps {
  initialUrls?: string[];
  disabled?: boolean;
  onImagesChange: (urls: string[]) => void;
}

const UploadWidget = ({
  onImagesChange,
  disabled,
  initialUrls = [],
}: UploadWidgetProps) => {
  const [images, setImages] = useState<string[]>(initialUrls);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const inputId = useId();
  let dataImageArray: string[] = [];

  const uploadImages = async (files: FileList) => {
    setIsLoading(true);
    setLoadingProgress(0);
    try {
      const uploadPromises = Array.from(files).map((file) => {
        return uploadImageToCloudinary(file).then((url) => {
          setLoadingProgress((prev) => prev + 100 / files.length);
          return url;
        });
      });
      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls].slice(0, 5);
      setImages(newImages);
      onImagesChange(newImages);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  dataImageArray = dataPlaceholderImage.map((item, index) => {
    let image = item;
    if (images.length && images[index]) {
      image = images[index];
    }
    return image;
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const remainingSlots = 5 - images.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);
      uploadImages(filesToUpload as unknown as FileList);
    }
  };

  const handleRemove = (url: string) => {
    const newImages = images.filter((item) => item !== url);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 border-dashed border relative aspect-square rounded-md overflow-hidden bg-gray-50 dark:bg-slate-900">
        <img
          src={dataImageArray[0]}
          alt=""
          className={cn(
            !dataImageArray[0].includes("res.cloudinary.com") && " scale-50",
            "w-full h-full object-cover"
          )}
        />
        {dataImageArray[0].includes("res.cloudinary.com") && (
          <>
            <Button
              onClick={() => handleRemove(dataImageArray[0])}
              variant="outline"
              size="icon"
              type="button"
              className="absolute top-2 right-2 hover:bg-red-100 hover:text-red-500"
            >
              <RiDeleteBackLine className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2 mt-2">
        {dataImageArray.splice(1).map((image, index) => {
          return (
            <div
              key={index}
              className="relative border border-dashed w-full h-full aspect-square rounded-md overflow-hidden bg-gray-50 dark:bg-slate-900"
            >
              <img
                className={cn(
                  "w-full h-full object-cover",
                  !image.includes("res.cloudinary.com") && " scale-50"
                )}
                src={image}
                alt={`Uploaded ${index + 1}`}
              />
              {image.includes("res.cloudinary.com") && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => handleRemove(image)}
                  className="absolute top-2 right-2 w-6 h-6 p-1 rounded"
                >
                  <RiDeleteBackLine className="w-4 h-4" />
                </Button>
              )}
            </div>
          );
        })}
        <div
          className={cn(
            "relative border border-dashed w-full h-full aspect-square rounded-md bg-gray-50 dark:bg-slate-900",
            images.length === 5 && "cursor-not-allowed"
          )}
        >
          <label
            htmlFor={inputId}
            className={`flex justify-center items-center w-full h-full border border-dashed border-gray-300 rounded-md cursor-pointer ${
              disabled || isLoading || images.length === 5
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <Loader className="animate-spin" />
                <span className="text-xs">{Math.round(loadingProgress)}%</span>
              </div>
            ) : (
              <span className="text-secondary-foreground">
                <GoPlus className="w-6 h-6 group-hover:scale-110 transition-all " />
              </span>
            )}
            <input
              id={inputId}
              type="file"
              onChange={handleFileChange}
              disabled={disabled || isLoading || images.length === 5}
              multiple
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        You can upload up to 5 images. {5 - images.length} slots remaining.
      </p>
    </div>
  );
};

export default UploadWidget;
