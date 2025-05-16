import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-theme-gradient-primary rounded-2xl shadow-xl overflow-hidden">
        <div className="relative px-6 py-10 md:p-12 text-center md:text-left">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white"></div>
          </div>
          
          <div className="relative md:flex items-center justify-between">
            <div className="md:max-w-xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to transform your business with data?
              </h2>
              <p className="text-blue-100 mb-0 text-lg">
                Get in touch today to see how our services can help you achieve your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 rounded-md text-center transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-md border border-blue-500 text-center transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
