
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Page } from '../types';
import { startChatbotStream } from '../services/apiService';
import { BotIcon, MessageSquareIcon, UserIcon, XIcon } from './icons';
import Button from './ui/Button';
import Input from './ui/Input';

interface ChatbotProps {
  activePage: Page;
}

const Chatbot: React.FC<ChatbotProps> = ({ activePage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getInitialMessage = (page: Page): string => {
        switch (page) {
            case 'pricing':
                return "Hello! I see you're looking at our pricing. Do you have any questions about the Core or Growth plans?";
            case 'roi-calculator':
                return "Hi there! Let me know if you have questions about how the ROI calculator works or how Amunet can save you money.";
            case 'playground':
                return "Welcome to the Playground! Feel free to ask me for tips on how to use the AI receptionist or social media tools.";
            default:
                return "Hello! I'm the Amunet AI assistant. Ask me anything about our services or pricing.";
        }
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ role: 'model', text: getInitialMessage(activePage) }]);
        }
    }, [isOpen, activePage, messages.length]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && !isLoading) {
            inputRef.current?.focus();
        }
    }, [isOpen, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);
        setError(null);
        
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);

        try {
            const stream = await startChatbotStream(newMessages, activePage);
            const reader = stream.getReader();
            const decoder = new TextDecoder();
            
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                modelResponse += decoder.decode(value, { stream: true });
                setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'model', text: modelResponse };
                    return updated;
                });
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(errorMessage);
            setMessages(prev => prev.slice(0, -1)); // Remove the empty model message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-8 right-8 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-amunet-accent text-white p-4 rounded-full shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amunet-bg focus:ring-amunet-accent"
                    aria-label="Open chat"
                >
                    <MessageSquareIcon className="w-8 h-8" />
                </button>
            </div>

            <div className={`fixed bottom-8 right-8 w-[calc(100%-4rem)] max-w-md bg-amunet-primary border border-amunet-secondary rounded-lg shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-amunet-secondary">
                    <h3 className="text-lg font-bold font-heading text-amunet-white">Amunet AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-amunet-light hover:text-amunet-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <div className="bg-amunet-secondary p-2 rounded-full flex-shrink-0"><BotIcon className="w-5 h-5"/></div>}
                            <div className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.role === 'model' ? 'bg-amunet-secondary text-amunet-white' : 'bg-amunet-accent text-white'}`}>
                                {msg.text || <span className="animate-pulse">...</span>}
                            </div>
                            {msg.role === 'user' && <div className="bg-amunet-light/50 p-2 rounded-full text-amunet-primary flex-shrink-0"><UserIcon className="w-5 h-5"/></div>}
                        </div>
                    ))}
                     {error && (
                        <div className="flex items-start gap-3">
                            <div className="bg-amunet-secondary p-2 rounded-full flex-shrink-0"><BotIcon className="w-5 h-5"/></div>
                            <div className="max-w-xs md:max-w-sm p-3 rounded-lg bg-red-900/50 text-red-300 border border-red-500">
                                {error}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-amunet-secondary flex gap-2">
                    <Input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>{isLoading ? '...' : 'Send'}</Button>
                </form>
            </div>
        </>
    );
};

export default Chatbot;
