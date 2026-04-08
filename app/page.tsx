'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimatedSection from '@/components/public/AnimatedSection';
import ServiceCard from '@/components/public/ServiceCard';
import ProjectCard from '@/components/public/ProjectCard';
import JobCard from '@/components/public/JobCard';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface JobOpening {
  id: string;
  title: string;
  description: string;
  requirements: string;
  active: boolean;
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, projectsRes, jobsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/projects'),
          fetch('/api/job-openings')
        ]);
        
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }
        
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData);
        }

        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobOpenings(jobsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 via-secondary/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-2 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-[1.1] tracking-tight">
              AL FURSAN Technologies
            </h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-4 sm:mb-8 font-medium tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            End-to-End Technology Solutions
          </motion.p>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            From AI Solutions to Mobile Applications, we bring your vision to life with resilience and innovation.
            Born from victory at MIT Hackathon, we embody the spirit of Al-Fursan — brave, determined, and unstoppable.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <Link
              href="/consultation"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-center"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-card border border-border text-foreground rounded-lg font-semibold text-base sm:text-lg hover:bg-card-hover hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                Our Services
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-12 sm:py-20 px-4 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  Our Projects
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                  Showcasing our expertise through successful client projects
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                />
              ))}
            </div>

            {projects.length > 6 && (
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                >
                  View All Projects
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Job Openings Section */}
      {jobOpenings.length > 0 && (
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  Join Our Team
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                  Explore exciting career opportunities at AL FURSAN Technologies
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobOpenings.map((job, index) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  description={job.description}
                  requirements={job.requirements}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
