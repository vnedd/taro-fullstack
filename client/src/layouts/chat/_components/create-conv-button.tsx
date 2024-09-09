import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAllAdmin } from "@/hooks/use-user";
import { useAuthStore } from "@/store/auth";
import UserAvatar from "@/components/user-avatar";
import { useNavigate } from "react-router-dom";
import { useCreateConversation } from "@/hooks/use-conversation";

const CreateConversationButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createConversationMutate = useCreateConversation();

  const { data: admins } = useAllAdmin();
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
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
    <div className="relative w-full">
      <div className="flex justify-end ">
        <Button
          ref={buttonRef}
          size="sm"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Conversation</span>
        </Button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-base font-semibold pb-3">Chat with Admin</h3>
            <div className="flex flex-col space-y-3">
              {filteredAdmins?.map((admin) => (
                <div
                  key={admin.id}
                  onClick={() => handleCreateConversation(admin.id)}
                  className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md cursor-pointer"
                >
                  <UserAvatar url={admin.avatarUrl} />
                  <span className="text-sm font-medium">{admin.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateConversationButton;
