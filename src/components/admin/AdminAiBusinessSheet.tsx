import React, { useState } from 'react';
import { queryAdminBusinessAi } from '../../services/aiAssistantService';
import { Bot, Sparkles, Send, X, TrendingUp, HelpCircle } from 'lucide-react';

interface AdminAiBusinessSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAiBusinessSheet: React.FC<AdminAiBusinessSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const [question, setQuestion] = useState('How much did I earn this week?');
  const [conversation, setConversation] = useState<
    { sender: 'user' | 'ai'; text: string }[]
  >([
    {
      sender: 'ai',
      text: "Vanakkam Sundar Rajan sir! I am your Dad's Auto & Cab Business Intelligence Assistant. Ask me any question regarding your Tamil Nadu fleet, revenue, busiest routes, or customer trends.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleAsk = (queryToAsk?: string) => {
    const q = (queryToAsk || question).trim();
    if (!q) return;

    const userMessage = { sender: 'user' as const, text: q };
    setConversation((prev) => [...prev, userMessage]);
    setQuestion('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = queryAdminBusinessAi(q);
      setConversation((prev) => [...prev, { sender: 'ai' as const, text: answer }]);
      setIsTyping(false);
    }, 450);
  };

  const sampleQuestions = [
    'How much did I earn this week?',
    'What was my busiest route?',
    'How many rides did I complete today?',
    'Compare this month with last month.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-glow-yellow flex flex-col max-h-[85vh] overflow-hidden text-white animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                Dad's Fleet AI Business Intelligence
              </h3>
              <p className="text-[11px] text-amber-400">
                Powered by live Tamil Nadu operational database
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-bold ml-4'
                    : 'bg-slate-800 border border-slate-700 text-slate-100 mr-4'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing real-time fleet numbers...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Queries Chips */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex flex-wrap gap-1.5">
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleAsk(sq)}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-full text-slate-300 hover:text-amber-400 transition-colors"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Question Input */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask business AI e.g. How much did I earn this week?..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleAsk()}
            className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
