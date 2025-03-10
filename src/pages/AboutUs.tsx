
import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/home/Footer';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import AboutContent from '@/components/about/AboutContent';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-sholom-light to-blue-50">
        <ScrollAnimation direction="up" duration={0.8}>
          <AboutContent />
        </ScrollAnimation>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
