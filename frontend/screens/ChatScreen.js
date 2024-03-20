import { StreamChat } from "stream-chat";
import {
  ChannelList,
  Chat,
  OverlayProvider,
  MessageList,
  MessageInput,
  Channel,
} from "stream-chat-expo";
import { useEffect, useState } from "react";

const ChatScreen = () => {
  const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_CHAT_API);
  const [channel, setChannel] = useState();

  useEffect(() => {
    const setupChat = async () => {
      // Connect user
      await client.connectUser(
        {
          id: "late-limit-5",
          name: "late",
          image: "https://bit.ly/2u9Vc0r",
        },
        `${process.env.EXPO_PUBLIC_CHAT_API_SECRET}`
      );

      // Create or join channel
      const newChannel = client.channel(
        "messaging",
        "team:Chappan_Trip_2ac46d6b-3840-4f3a-be0c-d174671584da",
        {
          name: "Chappan Trip",
          image: "https://bit.ly/2F3KEoM",
          members: ["late-limit-5"],
          session: 8, // custom field, you can add as many as you want
        }
      );
      await newChannel.watch();
      setChannel(newChannel);
    };

    setupChat();
  }, []);

  return (
    <>
      <OverlayProvider>
        <Chat client={client}>
          {channel ? (
            <Channel channel={channel} keyboardVerticalOffset={0}>
              <MessageList />
              <MessageInput />
            </Channel>
          ) : (
            <ChannelList onSelect={setChannel} />
          )}
        </Chat>
      </OverlayProvider>
    </>
  );
};

export default ChatScreen;
