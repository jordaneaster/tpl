import Link from 'next/link';
import Image from 'next/image';

export default function EventCard({ event }) {
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
    <Link href={`/event/${event.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <Image 
            src={event.thumbnail_url || '/placeholder-event.jpg'} 
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-white text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{formatDate(event.start_time)}</p>
          <p className="text-gray-300 line-clamp-2">{event.description}</p>
        </div>
      </div>
    </Link>
  );
}
