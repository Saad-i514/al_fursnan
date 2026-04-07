'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface TeamMember {
  id: string;
  role: string;
  name: string;
  imageUrl: string | null;
}

export default function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamMember();
  }, [params.id]);

  const fetchTeamMember = async () => {
    try {
      const response = await fetch(`/api/admin/team?id=${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch team member');
      
      const data = await response.json();
      setFormData(data.teamMember);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load team member');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    if (formData) {
      setFormData({ ...formData, imageUrl: url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: params.id, name: formData.name, imageUrl: formData.imageUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update team member');
      }

      router.push('/admin/team');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team member');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Team member not found</p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit {formData.role}</h1>
        <p className="text-gray-400">Update team member information</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              disabled
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">Role cannot be changed</p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              minLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Image
            </label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.imageUrl || undefined}
              maxSizeMB={5}
              acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
