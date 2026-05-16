import { getGuideBySlug, getGuides } from '@/data/guides';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export default async function GuideDetailPage({ params }) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/guides" className="hover:text-slate-900 transition">Buying Guides</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">{guide.title}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/guides" className="inline-flex items-center text-sm font-bold text-orange-500 hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to all guides
        </Link>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-6">
          <Calendar className="w-4 h-4" />
          {new Date(guide.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-10 leading-tight">
          {guide.title}
        </h1>

        {guide.cover_image && (
          <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={guide.cover_image} alt={guide.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg prose-slate prose-headings:font-extrabold prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-2xl max-w-none">
          <ReactMarkdown>{guide.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
