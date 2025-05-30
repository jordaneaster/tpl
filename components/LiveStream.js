import { useEffect, useState } from 'react';
import { getLiveStream } from '../lib/database';

export default function LiveStream() {
  const [liveStream, setLiveStream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveStream() {
      const data = await getLiveStream();
      setLiveStream(data);
      setLoading(false);
    }
    
    fetchLiveStream();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
        <div className="bg-gray-800 h-96 w-full rounded-lg"></div>
      </div>
    );
  }

  if (!liveStream) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <h3 className="text-xl text-white mb-4">No Live Streams Currently</h3>
        <p className="text-gray-400">Check back later for upcoming live performances!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src={liveStream.embed_url} 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse mr-2">
            LIVE NOW
          </span>
          <h3 className="text-xl font-bold text-white">{liveStream.event.title}</h3>
        </div>
        <p className="text-gray-400">{liveStream.event.description}</p>
      </div>
    </div>
  );
}
