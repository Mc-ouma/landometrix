'use client';

import { memo } from 'react';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';

// Blog posts data moved outside component to prevent recreation on each render
const BLOG_POSTS = [
    {
      id: 1,
      title: 'How Data Analysis Can Transform Your Business Decision-Making',
      excerpt: 'Learn how leveraging data analytics can lead to smarter business decisions and improved outcomes.',
      date: 'May 12, 2025',
      readTime: '5 min read',
      category: 'Data Analysis',
      slug: '/blog/data-analysis-transform-business',
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2025',
      excerpt: 'Discover the latest web development trends that are shaping the digital landscape in 2025.',
      date: 'May 5, 2025',
      readTime: '4 min read',
      category: 'Web Development',
      slug: '/blog/web-development-trends-2025',
    },
    {
      id: 3,
      title: 'Data Visualization Best Practices for Non-Technical Audiences',
      excerpt: 'Effective strategies for presenting complex data insights to stakeholders without technical backgrounds.',
      date: 'April 28, 2025',
      readTime: '6 min read',
      category: 'Data Visualization',
      slug: '/blog/data-visualization-best-practices',
    },
  ];

// Component declaration
const BlogSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <AnimateOnScroll animation="fade-in-up">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with our latest thoughts on data analysis, web development, and industry trends
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <AnimateOnScroll 
            key={post.id}
            animation="blur-in"
            delay={index * 200}
            duration={800}
            threshold={0.1}
          >
            <article className="bg-theme-surface-1 rounded-xl shadow-sm hover-lift border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="h-48 bg-theme-gradient-2 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full px-2.5 py-0.5">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">
                  <Link href={post.slug} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </span>
                  <Link 
                    href={post.slug}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center"
                  >
                    Read more
                    <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll animation="fade-in-up" delay={400}>
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="bg-theme-surface-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium px-8 py-3 rounded-md inline-flex items-center transition-colors hover-glow"
          >
            View All Articles
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(BlogSection);
