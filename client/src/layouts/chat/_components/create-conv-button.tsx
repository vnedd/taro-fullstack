import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAllAdmin } from "@/hooks/use-user";
import { useAuthStore } from "@/store/auth";
import UserAvatar from "@/components/user-avatar";
import { useNavigate } from "react-router-dom";
import { useCreateConversation } from "@/hooks/use-conversation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CreateConversationButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createConversationMutate = useCreateConversation();

  const { data: admins } = useAllAdmin();
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const filteredAdmins = admins?.metaData.filter(
    (admin) => admin.id !== profile?.id
  );

  const handleCreateConversation = async (adminId: string) => {
    try {
      const data = await createConversationMutate.mutateAsync([
        adminId,
        profile?.id as string,
      ]);
      setIsOpen(false);
      navigate(`/conversations/${data.metaData.id}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Chat with admin</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="p-4">
          <h3 className="text-base font-semibold pb-3">Chat with Admin</h3>
          <div className="flex flex-col space-y-3">
            {filteredAdmins?.map((admin) => (
              <div
                key={admin.id}
                onClick={() => handleCreateConversation(admin.id)}
                className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer"
              >
                <UserAvatar url={admin.avatarUrl} userId={admin.id} />
                <span className="text-sm font-medium">{admin.username}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateConversationButton;
