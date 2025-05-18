'use client';

import { memo } from 'react';
import ContactForm from '@/components/ui/ContactForm';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Define contact info items outside component to prevent recreation on each render
const CONTACT_INFO = [
	{
		id: 'email',
		icon: (
			<svg
				className="w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
		),
		title: 'Email',
		items: ['info@landometrix.com', 'support@landometrix.com'],
	},
	{
		id: 'phone',
		icon: (
			<svg
				className="w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
				/>
			</svg>
		),
		title: 'Phone',
		items: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
	},
	{
		id: 'location',
		icon: (
			<svg
				className="w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				/>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		),
		title: 'Location',
		items: ['123 Data Drive', 'San Francisco, CA 94105'],
	},
	{
		id: 'hours',
		icon: (
			<svg
				className="w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
		title: 'Business Hours',
		items: ['Monday - Friday: 9am - 5pm PST', 'Saturday - Sunday: Closed'],
	},
];

const ContactPageClient = () => {
	return (
		<div>
			{/* Hero section */}
			<section className="bg-theme-gradient-1 py-16 md:py-20">
				<div className="max-w-7xl mx-auto px-6 md:px-12">
					<AnimateOnScroll animation="fade-in-up">
						<div className="text-center max-w-3xl mx-auto">
							<h1 className="text-4xl md:text-5xl font-bold mb-6">
								Contact Us
							</h1>
							<p className="text-xl text-gray-700 dark:text-gray-300">
								Having questions about our services? Ready to start a project? Get
								in touch with our team.
							</p>
						</div>
					</AnimateOnScroll>
				</div>
			</section>

			{/* Contact info and form */}
			<section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					{/* Contact Info */}
					<AnimateOnScroll animation="slide-in-left" delay={200}>
						<div>
							<h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

							<div className="space-y-8">
								{CONTACT_INFO.map((info) => (
									<div className="flex" key={info.id}>
										<div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
											{info.icon}
										</div>
										<div className="ml-4">
											<h3 className="text-lg font-semibold mb-1">
												{info.title}
											</h3>
											{info.items.map((item, index) => (
												<p
													key={index}
													className="text-gray-700 dark:text-gray-300"
												>
													{item}
												</p>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					</AnimateOnScroll>

					{/* Contact Form */}
					<AnimateOnScroll animation="slide-in-right" delay={400}>
						<div className="bg-theme-surface-1 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
							<h2 className="text-2xl font-bold mb-6">Send a Message</h2>
							<ContactForm />
						</div>
					</AnimateOnScroll>
				</div>
			</section>

			{/* Map */}
			<section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
				<AnimateOnScroll animation="fade-in-up" delay={600}>
					<div className="bg-theme-surface-1 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
						<div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
							<div className="text-center p-8">
								<svg
									className="w-12 h-12 text-gray-400 mx-auto mb-4"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<p className="text-gray-600 dark:text-gray-300">
									Interactive map placeholder - would be implemented with Google
									Maps or another mapping service
								</p>
							</div>
						</div>
					</div>
				</AnimateOnScroll>
			</section>
		</div>
	);
};

// Export memoized component to prevent unnecessary re-renders
export default memo(ContactPageClient);
