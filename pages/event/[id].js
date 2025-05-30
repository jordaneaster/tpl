import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEventById } from '../../lib/database';

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      const data = await getEventById(id);
      setEvent(data);
      setLoading(false);
    }
    
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 bg-gray-800 rounded-lg mb-6"></div>
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-800 rounded mb-6"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Event Header */}
      <div className="mb-8 relative">
        <div className="relative h-72 w-full">
          <Image 
            src={event.cover_image_url || '/placeholder-event-cover.jpg'} 
            alt={event.title}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-gray-300">{formatDate(event.start_time)}</p>
        </div>
      </div>
      
      {/* Event Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Video Player */}
          {event.is_live && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse mr-2">
                  LIVE NOW
                </span>
                Live Stream
              </h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
                <iframe 
                  src={event.stream_url} 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Event Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">About This Event</h2>
            <div className="prose prose-invert">
              <p>{event.description}</p>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Artist Info */}
          {event.artist && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Performed by</h3>
              <Link href={`/artist/${event.artist.id}`}>
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={event.artist.profile_image_url || '/placeholder-artist.jpg'} 
                      alt={event.artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.artist.name}</h4>
                    <p className="text-sm text-gray-400">{event.artist.genre}</p>
                  </div>
                </div>
              </Link>
            </div>
          )}
          
          {/* Event Details */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Event Details</h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="text-gray-400 w-20">Date:</span>
                <span>{new Date(event.start_time).toLocaleDateString()}</span>
              </li>
              <li className="flex">
                <span className="text-gray-400 w-20">Time:</span>
                <span>{new Date(event.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </li>
              {event.duration && (
                <li className="flex">
                  <span className="text-gray-400 w-20">Duration:</span>
                  <span>{event.duration} minutes</span>
                </li>
              )}
              {event.venue && (
                <li className="flex">
                  <span className="text-gray-400 w-20">Venue:</span>
                  <span>{event.venue}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
