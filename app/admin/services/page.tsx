'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';

interface Service {
  id: string;
  title: string;
  description: string;
  displayOrder: number;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const data = await response.json();
      setServices(data.services);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    router.push(`/admin/services/${service.id}/edit`);
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <span className="line-clamp-2">{value}</span>
      ),
    },
    {
      key: 'displayOrder',
      label: 'Display Order',
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
        <h1 className="text-3xl font-bold text-white mb-2">Services</h1>
        <p className="text-gray-400">Manage service offerings</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <DataTable
        data={services}
        columns={columns}
        onEdit={handleEdit}
        emptyMessage="No services found."
      />
    </div>
  );
}
