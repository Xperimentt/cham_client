import React from 'react';

const Loading = () => {
    return (
        <div className="glass-panel p-12 rounded-3xl text-center animate-fade-in flex flex-col items-center">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Looking for someone...</h2>
            <p className="text-white/50">
                Hang tight, we're finding a stranger for you.
            </p>
        </div>
    );
};

export default Loading;
