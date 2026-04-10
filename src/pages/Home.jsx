import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { posts as initialPosts } from '../data';
import { 
  Calendar, Tag, ArrowRight, Bell, Search, 
  Zap, Rocket, CheckCircle, Plus, X 
} from 'lucide-react';

export default function Home() {
      const [allPosts, setAllPosts] = useState(initialPosts);
  const [filter, setFilter] = useState('All');
      const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
     const [newPost, setNewPost] = useState({ title: '', excerpt: '', tag: 'Technical' });

  const categories = ['All', 'Placement', 'Technical', 'Social', 'Academic'];

  
  const filteredPosts = allPosts.filter(post => {
    const matchesFilter = filter === 'All' || post.tag === filter;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  
  const handleAddUpdateClick = () => {
    const password = prompt("Enter Admin Password to add update:");
    if (password === "1234") { 
      setIsModalOpen(true);
    } else {
      alert("Galat Password! Sirf Admin hi update de sakta hai.");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const postToAdd = { 
      ...newPost, 
      id: allPosts.length + 1,   date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }), 
      imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800",
      content: "Official update posted by Outreach Admin."
    };
    setAllPosts([postToAdd, ...allPosts]);
 setIsModalOpen(false);
    setNewPost({ title: '', excerpt: '', tag: 'Technical' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 relative font-sans">
      
      {}
      <button 
  onClick={handleAddUpdateClick}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-5 rounded-full shadow-2xl z-40 hover:scale-110 active:scale-95 transition-all"
      >
        <Plus size={28} />
      </button>

      {}
      <AnimatePresence>
        {isModalOpen && (
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
      className="bg-white w-full max-w-lg rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
              <div className="flex justify-between items-center mb-8 border-b pb-6">
                <h2 className="text-3xl font-black italic tracking-tighter">Broadcast Update</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 rounded-2xl"><X size={20} /></button>
 </div>
              <form onSubmit={handleAddPost} className="space-y-6">
                <input required placeholder="Headline..." className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold" 
                  onChange={(e)=>setNewPost({...newPost, title: e.target.value})} />
     <textarea required placeholder="Short Summary..." className="w-full p-4 bg-gray-50 rounded-2xl outline-none min-h-[120px]" 
                  onChange={(e)=>setNewPost({...newPost, excerpt: e.target.value})} />
                <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold uppercase text-xs tracking-widest"
           onChange={(e)=>setNewPost({...newPost, tag: e.target.value})}>
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
         </select>
                <button className="w-full py-5 bg-gray-900 text-white font-black rounded-[2rem] hover:bg-blue-600 transition-all uppercase tracking-widest text-xs">Publish Now</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {}
      <header className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
  <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-4 rounded-3xl shadow-xl rotate-3"><Bell className="text-white" size={32} /></div>
          <div>
    <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">Outreach Hub</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Official IIT Roorkee Portal</p>
          </div>
        </div>
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none" 
            placeholder="Search news..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </header>

      {}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
    <button key={cat} onClick={() => setFilter(cat)} 
            className={`px-8 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <AnimatePresence mode='popLayout'>
       {filteredPosts.map(post => (
              <motion.div layout key={post.id}>
                <Link to={`/post/${post.id}`} className="group block bg-white border border-gray-50 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all p-4">
                  <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8">
                    <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="px-6 pb-6">
         <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase">{post.tag}</span>
                    <h2 className="text-3xl font-black my-4 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h2>
                    <p className="text-gray-500 font-medium line-clamp-2 leading-relaxed italic">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
       
        <aside className="space-y-8">
           <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
             {subscribed ? (
   <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-6">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="font-black italic">Welcome to Hub!</h3>
              </motion.div>
             ) : (
               <>
                 <h3 className="text-2xl font-black mb-4 flex items-center gap-2"><Rocket size={24} className="text-blue-400"/> Stay Posted.</h3>
                 <form onSubmit={handleSubscribe} className="space-y-3">
        <input required type="email" placeholder="email@iitr.ac.in" className="w-full p-4 bg-gray-800 rounded-2xl outline-none text-white" />
                   <button className="w-full py-4 bg-blue-600 font-black rounded-2xl active:scale-95 transition-all">SUBSCRIBE</button>
                 </form>
               </>
             )}
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm">
      <h3 className="text-xl font-black mb-8 flex items-center gap-2 text-gray-900"><Zap size={20} className="text-yellow-500 fill-yellow-500" /> Portals</h3>
             <div className="space-y-5">
               {[ 
                 {name: "TPO Portal", url: "https://tpo.iitr.ac.in/"}, 


          {name: "DORA Handbook", url: "https://iitr.ac.in/dora/"}, 
                 {name: "Channel-i Login", url: "https://channeli.in/"},
            
        {name: "Acad Portal", url: "https://acad.iitr.ac.in/"},
                 {name: "Library (MGCL)", url: "https://library.iitr.ac.in/"},
          {name: "Convocation", url: "https://iitr.ac.in/convocation/"},
                 {name: "Main IITR Web", url: "https://www.iitr.ac.in/"}
               ].map(link => (
                 <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between text-gray-400 font-bold hover:text-blue-600 transition-all group py-1">
                   <span className="text-sm">{link.name}</span>
                   <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                 </a>
               ))}
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}