import Footer from '@/components/Footer';
import type React from 'react';

export function Layout({
  children
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <section className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-1 grid place-items-center">
        {children}
      </main>
      <Footer />
    </section>
  );
}
