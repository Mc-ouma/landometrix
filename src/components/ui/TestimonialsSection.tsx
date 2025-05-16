const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Landometrix transformed our business by turning our complex data into actionable insights. Their expertise has been invaluable.",
      author: "Sarah Johnson",
      position: "CTO, TechCorp Inc.",
      avatar: "👩‍💼", // Using emoji as placeholder
    },
    {
      id: 2,
      quote: "The web application Landometrix built for us has significantly improved our customer engagement and conversion rates.",
      author: "Michael Chen",
      position: "Marketing Director, GrowthCo",
      avatar: "👨‍💼", // Using emoji as placeholder
    },
    {
      id: 3,
      quote: "Working with Landometrix was a game-changer. Their data visualization solutions helped us identify opportunities we'd been missing for years.",
      author: "Elena Rodriguez",
      position: "CEO, DataDrive Solutions",
      avatar: "👩‍💼", // Using emoji as placeholder
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 inline-block text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="text-lg">{testimonial.avatar}</span>
                </div>
                <div className="ml-3">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
