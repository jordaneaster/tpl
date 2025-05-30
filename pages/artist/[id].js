import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArtistById, getArtistEvents } from '../../lib/database';
import EventCard from '../../components/EventCard';

export default function ArtistPage() {
  const router = useRouter();
  const { id } = router.query;
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchArtistData() {
      const [artistData, eventsData] = await Promise.all([
        getArtistById(id),
        getArtistEvents(id)
      ]);
      
      setArtist(artistData);
      setEvents(eventsData);
      setLoading(false);
    }
    
    fetchArtistData();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-800 rounded-lg mb-6"></div>
        <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-800 rounded mb-6"></div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Artist Not Found</h2>
        <p className="text-gray-400 mb-6">The artist you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Artist Header */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8">
          <Image 
            src={artist.profile_image_url || '/placeholder-artist.jpg'} 
            alt={artist.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{artist.name}</h1>
          <p className="text-xl text-gray-400 mb-4">{artist.genre}</p>
          
          {/* Social Links */}
          {(artist.social_links || artist.website) && (
            <div className="flex justify-center md:justify-start space-x-4">
              {artist.website && (
                <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Website
                </a>
              )}
              {artist.social_links?.instagram && (
                <a href={artist.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              )}
              {artist.social_links?.twitter && (
                <a href={artist.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              )}
              {artist.social_links?.youtube && (
                <a href={artist.social_links.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  YouTube
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Artist Bio */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Biography</h2>
        <div className="prose prose-invert max-w-none">
          <p>{artist.bio || "No biography available for this artist."}</p>
        </div>
      </div>
      
      {/* Artist Events */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No upcoming events for this artist.</p>
        )}
      </div>
    </div>
  );
}
