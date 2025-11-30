import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MoreVertical } from 'lucide-react';

const Chat = ({ socket, roomId, onNext }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, { ...msg, type: 'received' }]);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim()) {
            socket.emit('sendMessage', { roomId, message: input });
            setMessages((prev) => [...prev, { text: input, type: 'sent' }]);
            setInput('');
        }
    };

    return (
        <div className="glass-panel h-[600px] w-full rounded-3xl flex flex-col animate-slide-up overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                        S
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Stranger</h3>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs text-white/60">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onNext}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                        title="Next Stranger"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                <div className="text-center text-xs text-white/30 my-4">
                    You are now connected with a random stranger. Say hi!
                </div>

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'sent'
                                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none shadow-lg'
                                    : 'bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-tl-none'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full p-4 pr-12 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-black/30 transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 p-2 bg-white text-indigo-600 rounded-lg shadow-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!input.trim()}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;
