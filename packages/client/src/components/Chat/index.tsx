import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Chat = () => {
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE'>('OFFLINE');
  const [messages, setMessages] = useState<string[]>([]);
  const [_, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io('ws://localhost:8000/chat', {
      transports: ['websocket'],
      auth: {
        token: 'my-token',
      }
    });

    setSocket(socket);

    socket.on('connect', () => {
      setStatus('ONLINE');

      socket.on('message', (msg) => {
        setMessages((prevMsgs) => [...prevMsgs, msg]);
      });

      socket.emit('message', 'Greetings');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    console.log('mounted');
  }, []);

  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="message">
          {message}
        </div>
      ))}
      <input />
      <span>{status}</span>
    </>
  );
};

export default Chat;
