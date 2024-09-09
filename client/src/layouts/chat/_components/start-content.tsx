import useConversation from "@/hooks/use-conversation";
import { cn } from "@/lib/utils";

const StartContent = () => {
  const { isOpen } = useConversation();

  return (
    <div className={cn("lg:block", isOpen ? "block" : "hidden")}>
      <section className="flex pt-40 items-center justify-center flex-col h-full w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Connect and Chat with Admins
        </h2>
        <p className="text-gray-500 mt-2 max-w-lg text-center">
          Connect with amdin to get help with your problems.
        </p>
      </section>
    </div>
  );
};

export default StartContent;
