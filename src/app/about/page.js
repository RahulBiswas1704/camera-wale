export const metadata = {
  title: 'About Us | Camera-Wale',
  description: 'Learn more about Camera-Wale, the ultimate ecosystem for professional gear.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">About Camera-Wale</h1>
      
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="lead text-xl text-gray-600 font-medium mb-8">
          Camera-Wale was built with a single mission: to cut through the noise and help creators find the absolute best gear for their specific needs, at the lowest possible prices.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Story</h2>
        <p className="text-gray-600 mb-6">
          We started as a small group of passionate photographers and filmmakers who were frustrated by how hard it was to compare camera bodies, track real-time price drops, and figure out true lens compatibility across different ecosystems. We realized that the industry needed a dedicated platform—not just a store, but a true <strong>ecosystem</strong>.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What We Do</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-3 mb-6">
          <li><strong>Deep Data Comparison:</strong> Put two cameras head-to-head and see exactly where your money goes.</li>
          <li><strong>Live Pricing Engine:</strong> We aggregate prices from top retailers to ensure you never overpay for gear.</li>
          <li><strong>Community Driven:</strong> Real reviews, real photo samples, and honest buying guides from working professionals.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Join the Ecosystem</h2>
        <p className="text-gray-600 mb-6">
          Whether you're looking for your first mirrorless camera or upgrading your cinema rig, Camera-Wale is your home. Create an account to save your favorite gear, track prices, and join the conversation.
        </p>
      </div>
    </div>
  );
}
