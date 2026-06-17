export type ChatRole = "user" | "assistant" | "system";

export type ChatTurnDto = {
  role: ChatRole;
  content: string;
};

export type ClientChatMessage = ChatTurnDto & {
  id: string;
  createdAt: number;
  status?: "sending" | "sent" | "error";
  quick?: string[];
  streaming?: boolean;
  displayContent?: string;
};
