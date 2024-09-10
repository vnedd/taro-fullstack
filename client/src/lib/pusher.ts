import Pusher from "pusher-js";

export const pusher = new Pusher("cd6381255f3866143184", {
  cluster: "ap2",
  channelAuthorization: {
    endpoint: `${import.meta.env.VITE_SERVER_URL}pusher`,
    transport: "ajax",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  },
});
