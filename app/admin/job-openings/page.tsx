'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { Plus } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  active: boolean;
  createdAt: string;
}

export default function JobOpeningsPage() {
  const router = useRouter();
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      const response = await fetch('/api/admin/job-openings');
      if (!response.ok) throw new Error('Failed to fetch job openings');
      
      const data = await response.json();
      setJobOpenings(data.jobOpenings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load job openings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: JobOpening) => {
    router.push(`/admin/job-openings/${job.id}/edit`);
  };

  const handleDelete = async (job: JobOpening) => {
    if (!confirm(`Are you sure you want to delete "${job.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/job-openings?id=${job.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job opening');

      setJobOpenings(jobOpenings.filter((j) => j.id !== job.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete job opening');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'active',
      label: 'Status',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value
              ? 'bg-green-900/30 text-green-400'
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
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
          <h1 className="text-3xl font-bold text-white mb-2">Job Openings</h1>
          <p className="text-gray-400">Manage job postings</p>
        </div>
        <button
          onClick={() => router.push('/admin/job-openings/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Job Opening
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <DataTable
        data={jobOpenings}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No job openings yet. Create your first posting!"
      />
    </div>
  );
}
