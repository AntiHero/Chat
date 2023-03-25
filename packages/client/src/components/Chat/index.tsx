import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Chat = () => {
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE'>('OFFLINE');
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const client = io('http://localhost:8000/chat', {
      transports: ['websocket'],
      auth: {
        token: 'my-token',
      },
    });

    client.on('connect', () => {
      setSocket(client);
      setStatus('ONLINE');

      client.on('message', (msg) => {
        setMessages((prevMsgs) => [...prevMsgs, msg]);
      });
    });

    client.on('disconnect', () => {
      setStatus('OFFLINE');
    });

    () => {
      client.close();
    };
  }, []);

  const handleMessage = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setCurrentMessage(e.target.value);
    }
  };

  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="message">
          {message}
        </div>
      ))}
      <input onChange={handleMessage} value={currentMessage} />
      <button onClick={() => { socket?.emit('message', currentMessage); setCurrentMessage(''); }}>
        send
      </button>
      <span>{status}</span>
    </>
  );
};

export default Chat;
