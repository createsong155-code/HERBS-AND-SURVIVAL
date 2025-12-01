import React, { useState } from 'react';
import { Users, MessageCircle, Plus, ThumbsUp, Clock, Tag, Send } from 'lucide-react';

interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
  synced: boolean;
}

const CommunityPage: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, category: 'Identification', title: 'Help identifying this wild herb', author: 'ForagerJane', content: 'Found this in the woods, purple flowers...', likes: 12, replies: 8, time: '2h ago', synced: true },
    { id: 2, category: 'Recipes', title: 'Best elderberry syrup recipe', author: 'HerbMaster', content: 'Here is my grandmother\'s recipe...', likes: 45, replies: 23, time: '5h ago', synced: true },
    { id: 3, category: 'Growing Tips', title: 'Lavender not blooming?', author: 'GreenThumb', content: 'My lavender plants are healthy but...', likes: 8, replies: 15, time: '1d ago', synced: true },
    { id: 4, category: 'Survival', title: 'Essential herbs for bug-out bag', author: 'PrepperPro', content: 'What herbs do you keep for emergencies?', likes: 67, replies: 42, time: '2d ago', synced: true },
  ]);

  const categories = ['All', 'Identification', 'Recipes', 'Growing Tips', 'Survival'];
  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory);

  const handleSubmit = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      category: 'General',
      title: newTitle,
      author: 'You',
      content: newContent,
      likes: 0,
      replies: 0,
      time: 'Just now',
      synced: isOnline
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPost(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-[#2D5016]" />
          <h2 className="text-2xl font-bold text-gray-800">Community</h2>
        </div>
        <button onClick={() => setShowNewPost(true)} className="flex items-center gap-1 px-4 py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3d6b1e]">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {!isOnline && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-700">
          You're offline. Posts will sync when connected.
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-[#2D5016] text-white' : 'bg-gray-100 text-gray-600'}`}>
            {cat}
          </button>
        ))}
      </div>

      {showNewPost && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Post title..." className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-[#2D5016] outline-none" />
          <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Share your thoughts..." className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#2D5016] outline-none" rows={4} />
          <div className="flex gap-2 mt-3">
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#2D5016] text-white rounded-lg flex items-center gap-1"><Send className="w-4 h-4" /> Post</button>
            <button onClick={() => setShowNewPost(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">{post.category}</span>
              {!post.synced && <span className="text-xs text-amber-600">Pending sync</span>}
            </div>
            <h3 className="font-bold text-gray-800 mt-2">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {post.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.replies}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.time}</span>
              <span className="ml-auto">by {post.author}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
