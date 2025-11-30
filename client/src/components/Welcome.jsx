import React from 'react';
import { MessageCircle } from 'lucide-react';

const Welcome = ({ onStart }) => {
    return (
        <div className="glass-panel p-8 rounded-3xl text-center animate-fade-in">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                    <MessageCircle size={40} className="text-white" />
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Cham
            </h1>
            <p className="text-white/60 mb-8">
                Talk to strangers, make friends, or just pass the time. Completely anonymous.
            </p>

            <button
                onClick={onStart}
                className="w-full py-4 px-6 bg-white text-slate-900 font-bold rounded-xl shadow-lg 
                   hover:bg-white/90 transform transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                Start Chatting
            </button>

            <div className="mt-6 text-xs text-white/40">
                By using Cham, you agree to our Terms & Privacy Policy.
            </div>
        </div>
    );
};

export default Welcome;
