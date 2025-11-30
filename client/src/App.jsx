import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Welcome from './components/Welcome';
import Chat from './components/Chat';
import Loading from './components/Loading';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';

function App() {
    const [socket, setSocket] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, waiting, paired
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('waiting', () => {
            setStatus('waiting');
        });

        newSocket.on('paired', ({ roomId }) => {
            setRoomId(roomId);
            setStatus('paired');
        });

        newSocket.on('partnerDisconnected', () => {
            alert('Stranger disconnected');
            setStatus('idle');
            setRoomId(null);
        });

        return () => newSocket.close();
    }, []);

    const handleStart = () => {
        if (socket) {
            socket.emit('join');
        }
    };

    const handleNext = () => {
        if (socket) {
            socket.emit('next');
            setStatus('waiting');
            socket.emit('join');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 bg-animated relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md z-10 relative">
                {status === 'idle' && <Welcome onStart={handleStart} />}
                {status === 'waiting' && <Loading />}
                {status === 'paired' && <Chat socket={socket} roomId={roomId} onNext={handleNext} />}
            </div>
        </div>
    );
}

export default App;
