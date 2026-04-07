'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/admin/DataTable';

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function ConsultationRequestsPage() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/consultation-requests');
      if (!response.ok) throw new Error('Failed to fetch consultation requests');
      
      const data = await response.json();
      setRequests(data.requests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load consultation requests');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'message',
      label: 'Message',
      render: (value: string) => (
        <span className="line-clamp-2" title={value}>{value}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Submitted',
      render: (value: string) => new Date(value).toLocaleString(),
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Consultation Requests</h1>
        <p className="text-gray-400">View all consultation form submissions</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <DataTable
        data={requests}
        columns={columns}
        emptyMessage="No consultation requests yet."
      />
    </div>
  );
}
