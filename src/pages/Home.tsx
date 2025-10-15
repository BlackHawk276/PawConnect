// Home page component - combines Navbar, Hero, FeaturedShelters, and Footer
import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedShelters } from '../components/FeaturedShelters';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedShelters />
      <Footer />
    </div>
  );
};
