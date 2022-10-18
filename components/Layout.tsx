import React from 'react';
import Head from 'next/head';
import Navbar from '@components//Navbar';
import { Footer } from '@components/Staking/Footer';

type LayoutProps = {
  children: React.ReactNode;
  module: string;
  title: string;
  description: string;
};

function Layout({ children, module, title, description }: LayoutProps) {
  const finalTitle = `ChainFusion | ${title}`;
  return (
    <div className="page">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{finalTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/img/favicon.svg" sizes="any" type="image/svg+xml" />
      </Head>

      <main className="d-flex flex-column h-100">
        <Navbar module={module} />
        {children}
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
