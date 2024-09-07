import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import ImageForm from "./_components/image-form";
import PublicInforForm from "./_components/public-infor-form";

const ProfilePage = () => {
  return (
    <div className="lg:space-y-8 md:space-y-6 space-y-4">
      <Heading
        title="Profile"
        subTitle="This is how others will see you on the site."
        variant="medium"
      />
      <Separator className="w-full my-3" />
      <div className="grid md:grid-cols-3 md:gap-8 gap-4">
        <div className="md:col-span-1 col-span-full flex justify-center">
          <ImageForm />
        </div>
        <div className="md:col-span-2 col-span-full w-full">
          <PublicInforForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
