import { useState, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Menu } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant. Upload an Excel file using the sidebar to get started, or ask me anything!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response - replace with your actual API call
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response. Connect your FastAPI backend here to get real AI responses based on your Excel data and DuckDB queries.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-subtle">
        <ChatSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4 relative z-10">
            <SidebarTrigger className="hover:bg-muted rounded-md p-2 transition-colors relative z-20">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div>
              <h1 className="text-lg font-semibold">AI Chat Assistant</h1>
              <p className="text-sm text-muted-foreground">Upload Excel files and chat with your data</p>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  content="Thinking..."
                  isUser={false}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                placeholder="Ask me about your Excel data or anything else..."
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}