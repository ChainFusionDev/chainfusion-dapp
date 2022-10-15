import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  metaDescription: string;
};

function Layout({ children, title, metaDescription }: LayoutProps) {
  const finalTitle = `ChainFusion | ${title}`;
  return (
    <div className="page">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{finalTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/img/favicon.svg" sizes="any" type="image/svg+xml" />
      </Head>

      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
