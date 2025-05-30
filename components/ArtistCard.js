import Link from 'next/link';
import Image from 'next/image';

export default function ArtistCard({ artist }) {
  return (
    <Link href={`/artist/${artist.id}`} className="block">
      <div className="artist-card bg-dark-surface-2 rounded-xl overflow-hidden shadow-lg hover:shadow-neon transition-all duration-300">
        <div className="relative h-64">
          <Image 
            src={artist.profile_image_url || '/placeholder-artist.jpg'} 
            alt={artist.name}
            fill
            className="object-cover"
          />
          <div className="artist-overlay"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <h3 className="text-white text-xl font-bold mb-1">{artist.name}</h3>
            <p className="text-gray-300 text-sm inline-block bg-dark-surface/70 px-3 py-1 rounded-full">{artist.genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
