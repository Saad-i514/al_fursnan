import { prisma } from '@/lib/prisma';
import AnimatedSection from '@/components/public/AnimatedSection';
import Image from 'next/image';

async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const ceo = teamMembers.find(member => member.role === 'CEO');
  const founder = teamMembers.find(member => member.role === 'FOUNDER');

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
              About AL FURSAN
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Resilience, Bravery, and Innovation in Every Solution
            </p>
          </div>
        </AnimatedSection>

        {/* Origin Story */}
        <AnimatedSection>
          <div className="mb-10 sm:mb-20 bg-card border border-border rounded-lg p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary tracking-tight">
              Our Story
            </h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed font-light">
              <p>
                AL FURSAN Technologies was born from victory. Our journey began at the prestigious MIT Hackathon, 
                where our team's innovative solution and unwavering determination earned us first place among 
                hundreds of talented competitors from around the world.
              </p>
              <p>
                That victory wasn't just about winning a competition — it was proof of our philosophy: 
                combining cutting-edge technology with resilience and strategic thinking to solve real-world problems.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Meaning of Al-Fursan */}
        <AnimatedSection>
          <div className="mb-10 sm:mb-20 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-secondary tracking-tight">
              The Meaning of "Al-Fursan"
            </h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed font-light">
              <p>
                "Al-Fursan" translates to "The Knights" in Arabic — warriors known for their courage, 
                honor, and unwavering commitment to their cause. This name embodies our core values:
              </p>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 ml-2 sm:ml-4">
                <li><strong className="text-foreground font-semibold">Resilience:</strong> We persist through challenges and adapt to overcome obstacles</li>
                <li><strong className="text-foreground font-semibold">Bravery:</strong> We take bold steps into new technologies and innovative solutions</li>
                <li><strong className="text-foreground font-semibold">Fighting for Our Aims:</strong> We're dedicated to achieving excellence in every project</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission */}
        <AnimatedSection>
          <div className="mb-10 sm:mb-20 bg-card border border-border rounded-lg p-6 sm:p-8 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-accent tracking-tight">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed mb-4 sm:mb-6 font-light">
              At AL FURSAN Technologies, we provide end-to-end technology solutions that transform businesses 
              and empower innovation. From AI-powered systems to mobile applications, from SAAS products to 
              custom chatbots — we deliver comprehensive solutions tailored to your unique needs.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed font-light">
              We believe in making cutting-edge technology accessible. That's why we offer free consultations 
              to understand your challenges and propose solutions that drive real results.
            </p>
          </div>
        </AnimatedSection>

        {/* Team */}
        {(ceo || founder) && (
          <AnimatedSection>
            <div className="mb-10 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Leadership
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {ceo && (
                  <div className="bg-card border border-border rounded-lg p-6 sm:p-8 text-center hover:border-primary/50 transition-all duration-300">
                    {ceo.imageUrl && (
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image src={ceo.imageUrl} alt={ceo.name} fill className="object-cover" />
                      </div>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{ceo.name}</h3>
                    <p className="text-primary font-semibold text-sm sm:text-base">Chief Executive Officer</p>
                  </div>
                )}
                {founder && (
                  <div className="bg-card border border-border rounded-lg p-6 sm:p-8 text-center hover:border-secondary/50 transition-all duration-300">
                    {founder.imageUrl && (
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image src={founder.imageUrl} alt={founder.name} fill className="object-cover" />
                      </div>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{founder.name}</h3>
                    <p className="text-secondary font-semibold text-sm sm:text-base">Founder</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* CTA */}
        <AnimatedSection>
          <div className="text-center bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-lg p-6 sm:p-10 md:p-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get a free consultation and discover how AL FURSAN Technologies can help you achieve your goals.
            </p>
            <a
              href="/consultation"
              className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-center"
            >
              Schedule Free Consultation
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

