import { createContext } from "react";

export type chatroomContextType = {
  conversationList: any;
  setConversationList: any;
  selectedConversation: any;
  setSelectedConversation: any;
  isSelectedConversation: any;
  setIsSelectedConversation: any;
  showReplyPrivately: any;
  setShowReplyPrivately: any;
  replyPrivatelyMode: any;
  setReplyPrivatelyMode: any;
  editMessageObject: any;
  setEditMessageObject: any;
};

const ChatroomContext = createContext<chatroomContextType>({
  conversationList: [],
  setConversationList: null,
  selectedConversation: {},
  setSelectedConversation: null,
  isSelectedConversation: false,
  setIsSelectedConversation: null,
  showReplyPrivately: false,
  setShowReplyPrivately: null,
  replyPrivatelyMode: null,
  setReplyPrivatelyMode: null,
  editMessageObject: null,
  setEditMessageObject: null,
});

export default ChatroomContext;
