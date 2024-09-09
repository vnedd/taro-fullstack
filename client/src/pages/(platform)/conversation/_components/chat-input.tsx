import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { messageSchema, TMessageSchema } from "@/schemas/message.schema";
import { useCreateMessage } from "@/hooks/use-message";
import { useAuthStore } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import ChatImageUpload from "./chat-image-upload";

interface ChatInputProps {
  conversationId: string;
}

const ChatInput = ({ conversationId }: ChatInputProps) => {
  const { profile } = useAuthStore();
  const queryClient = useQueryClient();
  const form = useForm<TMessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      body: "",
    },
  });

  const createMessage = useCreateMessage();

  const onSubmit = async (values: TMessageSchema) => {
    if (values.body) {
      try {
        await createMessage.mutateAsync({
          body: values.body,
          conversationId,
          senderId: profile?.id as string,
        });
        await queryClient.invalidateQueries({ queryKey: ["conversations"] });
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    }
  };

  const onUploadImage = async (url: string) => {
    if (url) {
      try {
        await createMessage.mutateAsync({
          image: url,
          conversationId,
          senderId: profile?.id as string,
        });
        await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image!");
      }
    }
  };

  return (
    <div className="h-16 p-4 fixed bottom-0 right-0  md:left-72 left-0 flex items-center bg-white dark:bg-black border-t gap-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-between w-full gap-x-4"
        >
          <div className="flex space-x-3 items-center grow">
            <ChatImageUpload onUpload={onUploadImage} />
            <div className="shrink-0 grow">
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="w-full shrink relative">
                    <FormControl>
                      <>
                        <Input
                          className="rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent dark:focus-visible:ring-transparent"
                          {...field}
                        />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={form.formState.isSubmitting}
            className="rounded-full shrink-0"
          >
            <BsFillSendFill className="w-5 h-5 " />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
