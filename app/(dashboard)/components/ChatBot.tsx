import { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface Recommendation {
  sellerName: string;
  gigTitle: string;
  reason: string;
  matchScore: number;
  avgRating: number;
  gigId: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const newMessages: Message[] = [...messages, { text: input, sender: "user" as const }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.sender, text: m.text })),
        }),
      });
      const data = await res.json();
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
        setMessages((msgs) => [
          ...msgs,
          { text: "Here are some top matches for you!", sender: "bot" as const }
        ]);
      } else {
        setRecommendations([]);
        setMessages((msgs) => [
          ...msgs,
          { text: "Sorry, no suitable recommendations found.", sender: "bot" as const }
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [...msgs, { text: "Sorry, I couldn't reach the agent.", sender: "bot" as const }]);
      setRecommendations([]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white">
            <span className="font-semibold">SkillSync Chat</span>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center mt-10">How can I help you today?</div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="mt-4 space-y-4">
                {recommendations.map((rec, idx) => (
                  <Card key={rec.gigId} className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-blue-700 flex items-center justify-between">
                        {rec.sellerName}
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">Score: {rec.matchScore.toFixed(2)}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-semibold text-gray-800">{rec.gigTitle}</div>
                      <div className="text-gray-600 text-sm mt-1">{rec.reason}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{rec.avgRating.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <a
                        href={`/gig/${rec.gigId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
                      >
                        View Gig
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {/* End Recommendations Section */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t bg-white flex items-center gap-2">
            <input
              className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              onClick={handleSend}
              aria-label="Send"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
              )}
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="h-7 w-7" />
      </button>
    </div>
  );
} 