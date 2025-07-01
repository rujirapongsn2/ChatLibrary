import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  language: 'en' | 'th';
}

export default function ChatInput({ onSendMessage, language }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const placeholder = language === 'en' 
    ? "Ask me anything about library books..."
    : "ถามฉันเกี่ยวกับหนังสือในห้องสมุดได้เลย...";

  return (
    <div className="p-6 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-12 rounded-2xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-500"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>
        <Button
          type="submit"
          className="px-6 py-3 bg-muted-blue hover:bg-blue-600 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95"
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
