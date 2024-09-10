import { useEffect, useState } from "react";
import useActiveList from "./use-active-list";
import { Channel, Members } from "pusher-js";
import { pusher } from "@/lib/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;
    if (!channel) {
      channel = pusher.subscribe("presence-conversations");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        console.log("Unsubscribing from channel");
        pusher.unsubscribe("presence-conversations");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);

  return null;
};

export default useActiveChannel;
