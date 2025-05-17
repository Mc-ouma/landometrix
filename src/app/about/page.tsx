// filepath: /home/luizzy/NextJS/landometrix/src/app/about/page.tsx
import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Landometrix',
  description: 'Learn about Landometrix - who we are, our mission, values, and the team behind our data analysis and web services.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
