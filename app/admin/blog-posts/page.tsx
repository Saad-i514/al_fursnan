'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { Plus } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog-posts');
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch blog posts');
        }
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    router.push(`/admin/blog-posts/${post.id}/edit`);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog-posts?id=${post.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog post');

      setPosts(posts.filter((p) => p.id !== post.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete blog post');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'author',
      label: 'Author',
    },
    {
      key: 'published',
      label: 'Status',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value
              ? 'bg-green-900/30 text-green-400'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          {value ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Published Date',
      render: (value: string | null) =>
        value ? new Date(value).toLocaleDateString() : '-',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-gray-400">Manage your blog content</p>
        </div>
        <button
          onClick={() => router.push('/admin/blog-posts/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <DataTable
        data={posts}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No blog posts yet. Create your first post!"
      />
    </div>
  );
}
