import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: 'Contact Us | Landometrix',
  description: 'Get in touch with the Landometrix team for data analysis and web services. We\'re ready to help your business grow.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}