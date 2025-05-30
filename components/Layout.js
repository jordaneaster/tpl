import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title = 'TheProgram.Live' }) {
  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Head>
        <title>{title} - Hip Hop Live Streaming</title>
        <meta name="description" content="Stream live performances from top hip hop artists and discover new talent" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      
      <Navbar />
      
      <main className="flex-grow container py-8 mt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
