import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationList from "./conversation-list";
import useConversation, {
  useConversationByUser,
} from "@/hooks/use-conversation";
import CreateConversationButton from "./create-conv-button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import BackBtn from "@/components/back-btn";
const Sidebar = () => {
  const { data: conversations, isLoading } = useConversationByUser();

  const { isOpen } = useConversation();

  return (
    <div
      className={cn(
        "md:w-72 w-full h-full shrink-0 fixed top-0 left-0 bottom-0  md:border-r space-y-3 ",
        isOpen ? "hidden md:block" : "block"
      )}
    >
      <div className="flex items-center w-full p-2">
        <BackBtn url="/" />
        <CreateConversationButton />
      </div>
      <ScrollArea className="flex-grow">
        {isLoading && (
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-20 h-9 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md " />
            <Skeleton className="w-full h-12 rounded-md " />
            <Skeleton className="w-full h-12 rounded-md " />
            <Skeleton className="w-full h-12 rounded-md " />
          </div>
        )}
        {conversations && conversations?.metaData.length ? (
          <ConversationList data={conversations?.metaData} />
        ) : (
          !isLoading && (
            <div className="flex items-center flex-col mt-8 space-y-4">
              <p className="text-muted-foreground text-sm">No messages yet</p>
            </div>
          )
        )}
      </ScrollArea>
      <div></div>
    </div>
  );
};

export default Sidebar;
