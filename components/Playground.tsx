
import React, { useState, useRef, useEffect } from 'react';
import { PlaygroundTab, ChatMessage, Page } from '../types';
import { generateSocialPost, draftNewsletter, generateImage, getReceptionistResponseStream } from '../services/apiService';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { BotIcon, UserIcon } from './icons';
import ToggleSwitch from './ui/ToggleSwitch';
import DateTimePicker from './ui/DateTimePicker';

interface PlaygroundProps {
    setActivePage: (page: Page) => void;
}

const Playground: React.FC<PlaygroundProps> = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('receptionist');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'receptionist':
        return <ReceptionistDemo />;
      case 'social':
        return <SocialMediaDemo />;
      case 'newsletter':
        return <NewsletterDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading">Amunet AI Playground</h1>
        <p className="text-amunet-light mt-2">Experience the power of Amunet firsthand. No signup required.</p>
        <div className="mt-4 inline-block bg-amunet-secondary px-4 py-2 rounded-lg border border-amunet-accent/50">
            <p className="text-sm font-semibold">Sample Business: <span className="font-bold text-amunet-accent">Sample MedSpa</span></p>
        </div>
      </div>
      
      <div className="flex justify-center border-b border-amunet-secondary mb-6">
        <TabButton label="AI Receptionist" tab="receptionist" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton label="Social Media" tab="social" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton label="Newsletter" tab="newsletter" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div>{renderTabContent()}</div>
       <Card className="mt-8 text-center bg-gradient-to-r from-amunet-accent/30 to-amunet-primary">
        <h2 className="text-2xl font-bold font-heading mb-2">Ready to Automate?</h2>
        <p className="text-amunet-light mb-4">Save these settings and more by creating an account. Start your 7-day free trial today.</p>
        <Button variant="primary" onClick={() => setActivePage('signup')}>Save This to My Account</Button>
      </Card>
    </div>
  );
};

const TabButton: React.FC<{label: string, tab: PlaygroundTab, activeTab: PlaygroundTab, setActiveTab: (tab: PlaygroundTab) => void}> = ({ label, tab, activeTab, setActiveTab }) => {
    const isActive = activeTab === tab;
    return (
        <button onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-lg font-semibold border-b-4 transition-colors duration-300 ${isActive ? 'border-amunet-accent text-amunet-accent' : 'border-transparent text-amunet-light hover:text-amunet-white'}`}>
            {label}
        </button>
    );
}

// Receptionist Demo Component
const ReceptionistDemo: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! This is Amunet from Sample MedSpa. How can I help you book an appointment today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);
        setError('');

        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
        
        try {
            const stream = await getReceptionistResponseStream(newMessages);
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
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <div className="h-96 overflow-y-auto pr-4 space-y-4 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <div className="bg-amunet-secondary p-2 rounded-full"><BotIcon /></div>}
                        <div className={`max-w-md p-3 rounded-lg ${msg.role === 'model' ? 'bg-amunet-secondary text-amunet-white' : 'bg-amunet-accent text-white'}`}>
                             {msg.text || <span className="animate-pulse">...</span>}
                        </div>
                        {msg.role === 'user' && <div className="bg-amunet-light/50 p-2 rounded-full text-amunet-primary"><UserIcon /></div>}
                    </div>
                ))}
                {error && <div className="flex items-start gap-3"><div className="bg-amunet-secondary p-2 rounded-full"><BotIcon /></div><div className="max-w-md p-3 rounded-lg bg-red-900/50 border border-red-500 text-red-300">{error}</div></div>}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex gap-4">
                <Input ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="e.g., I'd like to book a consultation for a chemical peel." disabled={isLoading} />
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send'}</Button>
            </form>
        </Card>
    );
};


// Social Media Demo Component
const SocialMediaDemo: React.FC = () => {
    const [isAutoPost, setIsAutoPost] = useState(false);
    const [postTopic, setPostTopic] = useState('');
    const [imagePrompt, setImagePrompt] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [textResult, setTextResult] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!postTopic.trim() || isLoading) return;
        setIsLoading(true);
        setTextResult('');
        setImageUrl('');
        setError('');
        setConfirmationMessage('');

        const imageGenPrompt = imagePrompt.trim() || postTopic.trim();

        try {
            const [textResponse, imageResponse] = await Promise.all([
                generateSocialPost(postTopic),
                generateImage(imageGenPrompt)
            ]);
            setTextResult(textResponse);
            setImageUrl(imageResponse);
        } catch(err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(errorMessage);
        }
        
        if (scheduleDate) {
            const formattedDate = new Date(scheduleDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
            setConfirmationMessage(`Content scheduled for ${formattedDate}.`);
        }

        setIsLoading(false);
    };

    const getButtonText = () => {
        if (isLoading) return 'Generating...';
        if (scheduleDate) {
            return isAutoPost ? 'Schedule & Auto-Post' : 'Schedule for Approval';
        }
        return isAutoPost ? 'Generate & Auto-Post' : 'Generate for Approval';
    };


    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <h3 className="text-xl font-bold font-heading mb-2">Social Post & Image Generator</h3>
                <p className="text-amunet-light mb-4">Provide a topic and an optional image prompt. Amunet will create social posts and a matching visual.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-semibold">Post Topic</label>
                        <Input type="text" value={postTopic} onChange={(e) => setPostTopic(e.target.value)} placeholder="e.g., Benefits of a chemical peel" disabled={isLoading} required />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Image Prompt (optional)</label>
                        <Input type="text" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} placeholder="A relaxing spa environment with soft lighting" disabled={isLoading} />
                    </div>
                     <DateTimePicker value={scheduleDate} onChange={setScheduleDate} disabled={isLoading} />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amunet-secondary mt-4">
                        <ToggleSwitch
                            label="Approval Workflow"
                            enabled={isAutoPost}
                            onChange={setIsAutoPost}
                            disabledText="Manual Approval"
                            enabledText="Auto-Post"
                        />
                        <Button type="submit" className="w-full sm:w-auto flex-shrink-0" disabled={isLoading}>
                            {getButtonText()}
                        </Button>
                    </div>
                </form>
            </Card>
            <Card className="min-h-[300px]">
                 <h3 className="text-xl font-bold font-heading mb-4">Generated Content</h3>
                 {isLoading && <div className="text-center p-8 text-amunet-light">Generating... Please wait, image creation can take a moment.</div>}
                 {error && <pre className="whitespace-pre-wrap bg-red-900/50 p-4 rounded-md text-red-300 border border-red-500 font-sans">{error}</pre>}
                 {confirmationMessage && <div className="p-4 mb-4 bg-green-900/50 border border-green-500 text-green-300 rounded-md font-semibold">{confirmationMessage}</div>}
                 <div className="space-y-6">
                    {imageUrl && (
                        <div>
                            <h4 className="font-bold text-amunet-light mb-2">Generated Image:</h4>
                            <img src={imageUrl} alt="Generated by AI" className="rounded-md w-full aspect-square object-cover" />
                        </div>
                    )}
                    {textResult && (
                        <div>
                            <h4 className="font-bold text-amunet-light mb-2">Generated Posts:</h4>
                            <pre className="whitespace-pre-wrap bg-amunet-bg p-4 rounded-md text-amunet-white font-sans">{textResult}</pre>
                        </div>
                    )}
                 </div>
            </Card>
        </div>
    );
};


const NewsletterDemo: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim() || isLoading) return;
        setIsLoading(true);
        setResult('');
        setError('');
        setConfirmationMessage('');
        try {
            const response = await draftNewsletter(topic, audience);
            setResult(response);
        } catch(err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setError(errorMessage);
        }
        
        if (scheduleDate) {
            const formattedDate = new Date(scheduleDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
            setConfirmationMessage(`Newsletter scheduled for delivery on ${formattedDate}.`);
        }

        setIsLoading(false);
    };

    const getButtonText = () => {
        if (isLoading) return 'Generating...';
        return scheduleDate ? 'Schedule Newsletter' : 'Draft Newsletter';
    };

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <h3 className="text-xl font-bold font-heading mb-2">Newsletter Drafter</h3>
                <p className="text-amunet-light mb-4">Enter a theme and target audience for your monthly newsletter, and Amunet will draft it for you.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block mb-2 font-semibold">Newsletter Theme/Topic</label>
                        <Input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Top 3 Summer Skincare Tips" disabled={isLoading} />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold">Target Audience</label>
                        <Input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., Past and current clients" disabled={isLoading} />
                    </div>
                    <DateTimePicker value={scheduleDate} onChange={setScheduleDate} disabled={isLoading} />
                    <Button type="submit" className="w-full !mt-6" disabled={isLoading}>{getButtonText()}</Button>
                </form>
            </Card>
            <Card className="min-h-[300px]">
                 <h3 className="text-xl font-bold font-heading mb-4">Generated Content (HTML Preview)</h3>
                 {isLoading && <div className="text-center p-8 text-amunet-light">Generating...</div>}
                 {error && <pre className="whitespace-pre-wrap bg-red-900/50 p-4 rounded-md text-red-300 border border-red-500 font-sans">{error}</pre>}
                 {confirmationMessage && <div className="p-4 mb-4 bg-green-900/50 border border-green-500 text-green-300 rounded-md font-semibold">{confirmationMessage}</div>}
                 {result && (
                    <div className="prose prose-invert bg-amunet-bg p-4 rounded-md" dangerouslySetInnerHTML={{__html: result}}></div>
                 )}
            </Card>
        </div>
    );
};

export default Playground;
