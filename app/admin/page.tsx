import { prisma } from '@/lib/prisma';
import DashboardCard from '@/components/admin/DashboardCard';
import { FileText, Briefcase, FolderKanban, MessageSquare } from 'lucide-react';

async function getDashboardStats() {
  const [blogPostsCount, activeJobsCount, projectsCount, consultationsCount, recentConsultations] = await Promise.all([
    prisma.blogPost.count({ where: { published: true } }),
    prisma.jobOpening.count({ where: { active: true } }),
    prisma.project.count(),
    prisma.consultationRequest.count(),
    prisma.consultationRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    blogPostsCount,
    activeJobsCount,
    projectsCount,
    consultationsCount,
    recentConsultations,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">
        Dashboard
      </h1>
      <p className="text-gray-400 mb-8">
        Welcome to the admin panel. Here's an overview of your content.
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Published Blog Posts"
          value={stats.blogPostsCount}
          icon={FileText}
          description="Total published articles"
        />
        <DashboardCard
          title="Active Job Openings"
          value={stats.activeJobsCount}
          icon={Briefcase}
          description="Currently open positions"
        />
        <DashboardCard
          title="Projects"
          value={stats.projectsCount}
          icon={FolderKanban}
          description="Total project entries"
        />
        <DashboardCard
          title="Consultation Requests"
          value={stats.consultationsCount}
          icon={MessageSquare}
          description="Total submissions"
        />
      </div>

      {/* Recent Consultation Requests */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Recent Consultation Requests
        </h2>
        {stats.recentConsultations.length === 0 ? (
          <p className="text-gray-400">No consultation requests yet.</p>
        ) : (
          <div className="space-y-4">
            {stats.recentConsultations.map((request) => (
              <div
                key={request.id}
                className="border-b border-gray-800 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-white">{request.name}</p>
                    <p className="text-sm text-gray-400">{request.email}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {request.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
