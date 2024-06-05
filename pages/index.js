import Head from 'next/head';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Chat</title>
        <meta name="description" content="Join the global conversation with this chat app powered by Next.js and Socket.IO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Chat App</h1>
        <Chat />
      </main>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f9f9f9;
        }

        .title {
          margin-bottom: 20px;
          font-size: 2.5rem;
          color: #333;
          text-align: center;
        }

        main {
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }
      `}</style>
    </div>
  );
}
