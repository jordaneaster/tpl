import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">The</span>
              <span className="text-primary">Program</span>
              <span className="text-accent">.Live</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/events" className={`nav-link ${router.pathname.startsWith('/event') ? 'active' : ''}`}>
              Events
            </Link>
            <Link href="/artists" className={`nav-link ${router.pathname.startsWith('/artist') ? 'active' : ''}`}>
              Artists
            </Link>
            <a href="#" className="ml-4 btn btn-primary">
              <span className="live-badge mr-2">LIVE</span> Watch Now
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-4 pb-6">
            <Link 
              href="/" 
              className={`px-4 py-2 font-medium ${router.pathname === '/' ? 'text-primary' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className={`px-4 py-2 font-medium ${router.pathname.startsWith('/event') ? 'text-primary' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/artists" 
              className={`px-4 py-2 font-medium ${router.pathname.startsWith('/artist') ? 'text-primary' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Artists
            </Link>
            <a href="#" className="mx-4 btn btn-primary flex justify-center">
              <span className="live-badge mr-2">LIVE</span> Watch Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
