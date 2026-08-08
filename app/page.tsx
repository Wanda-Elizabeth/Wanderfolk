'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import ExampleExperience from '@/components/ExampleExperience';
import FriendshipFirst from '@/components/FriendshipFirst';
import CountryDiscovery from '@/components/CountryDiscovery';
import ValidationCTA from '@/components/ValidationCTA';
import Footer from '@/components/Footer';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  useEffect(() => {
    trackEvent('page_view');
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <ExampleExperience />
      <FriendshipFirst />
      <CountryDiscovery />
      <ValidationCTA />
      <Footer />
    </main>
  );
}
