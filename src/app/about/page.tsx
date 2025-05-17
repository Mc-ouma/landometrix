'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ColorPalette from '@/components/ui/ColorPalette';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'About Us | Landometrix',
  description: 'Learn about Landometrix - who we are, our mission, values, and the team behind our data analysis and web services.',
};

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Morgan',
      title: 'Founder & CEO',
      bio: 'Alex has over 15 years of experience in data science and web development. Previously led technical teams at major tech companies.',
      avatar: '👨‍💼', // Emoji placeholder
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'Chief Data Scientist',
      bio: 'Sarah specializes in advanced analytics and machine learning. PhD in Computer Science with focus on AI applications.',
      avatar: '👩‍💼', // Emoji placeholder
    },
    {
      id: 3,
      name: 'Marco Rodriguez',
      title: 'Lead Web Developer',
      bio: 'Marco is an expert in modern web technologies. Over a decade of experience building scalable web applications.',
      avatar: '👨‍💻', // Emoji placeholder
    },
    {
      id: 4,
      name: 'Priya Sharma',
      title: 'UX/UI Designer',
      bio: 'Priya creates beautiful, user-centered designs. Background in psychology helps her understand user behavior.',
      avatar: '👩‍🎨', // Emoji placeholder
    },
  ];

  const values = [
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.',
      icon: (
        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'quality',
      title: 'Quality',
      description: 'We commit to delivering exceptional quality in every project, focusing on accuracy, reliability, and performance.',
      icon: (
        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'integrity',
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical standards in all our client relationships.',
      icon: (
        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'We believe in working closely with our clients, understanding their needs, and building solutions together.',
      icon: (
        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="bg-theme-gradient-1 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-accent-light">About Landometrix</h1>
              <p className="text-xl text-text-secondary">
                We transform businesses through data insights and exceptional web experiences
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Story</h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                Founded in 2020, Landometrix began with a simple mission: to make data insights accessible 
                to businesses of all sizes and to create web experiences that truly connect with users.
              </p>
              <p>
                Our founder, Alex Morgan, recognized that many companies were collecting vast amounts of data 
                but lacked the expertise to transform it into actionable business intelligence. Simultaneously, 
                these companies needed a strong online presence to remain competitive in an increasingly digital world.
              </p>
              <p>
                Today, Landometrix has grown into a team of passionate experts across data science, analytics, 
                and web development. We've helped over 50 companies across various industries harness their 
                data potential and build impactful digital experiences.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-gradient-to-br from-primary-dark to-accent-dark rounded-xl flex items-center justify-center text-white">
              <svg className="w-24 h-24 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 md:px-12 bg-surface-2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-text-primary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.id}
                className="bg-surface-1 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-600"
              >
                <div className="w-14 h-14 bg-primary-dark/30 rounded-lg flex items-center justify-center mb-6 text-primary-light">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-primary">{value.title}</h3>
                <p className="text-text-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 px-6 md:px-12 bg-surface-3">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-text-primary">Meet Our Team</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The passionate experts behind Landometrix's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  {/* Team member image with gradient overlay */}
                  <div className="aspect-[4/5] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary-dark to-accent-dark relative">
                      <Image 
                        src="/images/team-placeholder.svg"
                        alt={member.name}
                        fill
                        className="object-cover object-center mix-blend-soft-light"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Social links that appear on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-primary-light/70 hover:text-primary-light transition-colors">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-primary-light/70 hover:text-primary-light transition-colors">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-primary-light/70 hover:text-primary-light transition-colors">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1 text-text-primary">{member.name}</h3>
                  <p className="text-primary-light mb-4">{member.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="/careers" className="inline-flex items-center text-primary-light font-medium hover:text-primary transition-colors">
              <span>Join our team</span>
              <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-theme-gradient-accent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-primary">Ready to work with us?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help your business grow through data insights and exceptional web experiences.
          </p>
          <Link
            href="/contact"
            className="bg-surface-1 text-primary hover:bg-surface-2 font-medium px-8 py-3 rounded-md inline-block transition-colors shadow-md hover:shadow-lg"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
