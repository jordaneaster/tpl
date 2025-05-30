import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HipHopHero from '../components/HipHopHero';
import ArtistGallery from '../components/ArtistGallery';

// Import placeholders instead of actual data fetching for initial load
// We'll add proper data fetching once the basic page works
const placeholderEvents = [
  { id: 1, title: 'Live Hip Hop Showcase', description: 'Featuring the hottest artists in the game', start_time: new Date().toISOString() },
  { id: 2, title: 'Rap Battle Finals', description: 'The ultimate showdown of lyrical talent', start_time: new Date(Date.now() + 86400000).toISOString() },
  { id: 3, title: 'Beats & Rhymes', description: 'A celebration of hip hop culture', start_time: new Date(Date.now() + 172800000).toISOString() },
];

const placeholderArtists = [
  { id: 1, name: 'MC Flow', genre: 'Hip Hop/Rap' },
  { id: 2, name: 'DJ Beats', genre: 'Hip Hop/R&B' },
  { id: 3, name: 'Lyrical Genius', genre: 'Conscious Rap' },
  { id: 4, name: 'Street Poet', genre: 'Urban Poetry' },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Simulate data loading with setTimeout
    const timer = setTimeout(() => {
      setEvents(placeholderEvents);
      setArtists(placeholderArtists);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <Head>
        <title>TheProgram.Live - Hip Hop Streaming</title>
        <meta name="description" content="Live streaming platform for hip hop artists and events" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <HipHopHero title="Rhythm & Poetry" />
        <ArtistGallery />

        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TheProgram.Live
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            The ultimate platform for live hip hop performances and content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold">
              Watch Now
            </button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold">
              Upcoming Events
            </button>
          </div>
        </section>

        {/* Live Now Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Live Streaming Now</h2>
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <p className="text-xl text-gray-400">No live streams currently active</p>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-16" id="events">
          <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="bg-gray-800 rounded-xl p-6">
                  <p className="text-sm text-gray-400 mb-2">{formatDate(event.start_time)}</p>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  <Link href={`/event/${event.id}`} className="text-primary hover:underline">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Artists Section */}
        <section id="artists">
          <h2 className="text-3xl font-bold mb-6">Featured Artists</h2>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-48 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {artists.map(artist => (
                <Link key={artist.id} href={`/artist/${artist.id}`} className="block">
                  <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
                    <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                    <p className="text-gray-400">{artist.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Latest Releases Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Latest Releases</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-12">
              Stay updated with the freshest tracks dropping in the hip-hop universe.
            </p>
            {/* Album display would go here */}
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full 
                              hover:bg-gray-100 transition duration-300">
              Browse All Releases
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
