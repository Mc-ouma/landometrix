import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | Landometrix',
  description: 'Explore our comprehensive data analysis and web development services designed to transform your business.',
};

const ServicesPage = () => {
  const services = [
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description: 'Transform your raw data into meaningful insights with our advanced data analysis services.',
      features: [
        'Statistical analysis and pattern recognition',
        'Predictive modeling and forecasting',
        'Business intelligence reporting',
        'Custom data processing pipelines',
        'AI-powered insights extraction',
      ],
      image: '/images/data-analysis.jpg', // Placeholder - would need to be added to public folder
      cta: 'Start analyzing your data',
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Present complex data clearly with beautiful, informative visualizations that drive understanding.',
      features: [
        'Interactive dashboards and reports',
        'Custom chart and graph creation',
        'Real-time data visualization',
        'Executive-ready presentations',
        'Integration with your existing platforms',
      ],
      image: '/images/data-visualization.jpg', // Placeholder
      cta: 'Visualize your data',
    },
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technology to engage your audience.',
      features: [
        'Responsive website design and development',
        'Progressive web applications (PWAs)',
        'E-commerce solutions',
        'Content management systems',
        'API development and integration',
      ],
      image: '/images/web-development.jpg', // Placeholder
      cta: 'Build your web presence',
    },
    {
      id: 'consulting',
      title: 'Consulting',
      description: 'Strategic advice from industry experts to guide your data and web development decisions.',
      features: [
        'Data strategy development',
        'Digital transformation planning',
        'Technology stack assessment',
        'Process optimization',
        'Training and knowledge transfer',
      ],
      image: '/images/consulting.jpg', // Placeholder
      cta: 'Get expert advice',
    },
  ];

  return (
    <div>
      {/* Hero section */}
      <section className="bg-theme-gradient-1 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Comprehensive data analysis and web services to help your business thrive in the digital world
            </p>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center scroll-mt-24`}
            >
              {/* Image placeholder */}
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-24 h-24 opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mt-1 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md inline-block transition-colors"
                >
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-theme-surface-2">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need a customized solution?</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Our team can develop tailored solutions to address your specific business challenges.
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md inline-block transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
