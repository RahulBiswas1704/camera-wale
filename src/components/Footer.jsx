import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 mt-20 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center justify-center gap-2 relative h-16 w-56 bg-white rounded-xl px-2">
            <Image 
              src="/images/logo.png" 
              alt="Camera-Wale Logo" 
              fill 
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
          
          <div className="flex gap-6 text-sm font-semibold text-gray-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/compare" className="hover:text-white transition">Compare</Link>
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm font-medium border-t border-slate-800 pt-8">
          © 2026 Camera-Wale. Compare. Decide. Shoot.
        </div>
      </div>
    </footer>
  );
}
