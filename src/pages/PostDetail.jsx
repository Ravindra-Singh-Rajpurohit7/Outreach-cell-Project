import { useParams, Link } from 'react-router-dom';
import { posts } from '../data';
import { ChevronLeft, Calendar, Clock, Tag, Share2, User } from 'lucide-react';


import { motion, useScroll } from 'framer-motion';

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));
  
  
  const { scrollYProgress } = useScroll();

  if (!post) return <div className="p-20 text-center font-bold">Post not found.</div>;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };


  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="relative">
     
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-50"
     style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">
    <ChevronLeft size={18} /> Back to Hub
          </Link>
          
          {/* FEATURE: Share Button */}
      <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition-all font-bold text-xs"
          >
            <Share2 size={16} /> SHARE
          </button>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-md uppercase tracking-widest">
              {post.tag}
   </span>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase">
              <Clock size={14} /> {readingTime} min read
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 border-b pb-8 border-gray-100">
    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <User size={24} />
            </div>
            <div>
                <p className="font-black text-gray-900 leading-none">Outreach Admin</p>
              <p className="text-xs text-gray-400 mt-1 font-bold tracking-tighter uppercase">IIT Roorkee Official</p>
            </div>
          </div>
        </header>

        <article className="prose prose-xl max-w-none">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 whitespace-pre-line first-letter:text-6xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
            {post.content}
          </p>
        </article>
      </div>
    </div>
  );
}