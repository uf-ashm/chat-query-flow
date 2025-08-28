import { User, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp?: Date;
}

export function ChatMessage({ content, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <Card 
        className={`max-w-[80%] p-4 shadow-custom-sm transition-all duration-200 hover:shadow-custom-md ${
          isUser 
            ? "bg-chat-user text-chat-user-foreground" 
            : "bg-chat-assistant text-chat-assistant-foreground"
        }`}
      >
        <div className="prose prose-sm max-w-none">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && (
          <div className="text-xs opacity-70 mt-2">
            {timestamp.toLocaleTimeString()}
          </div>
        )}
      </Card>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}