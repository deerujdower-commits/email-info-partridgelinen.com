import Head from 'next/head';
import dynamic from 'next/dynamic';

// Use a dynamic import of your existing Index component so you don't have to
// duplicate its contents during this migration. This keeps the current
// src/pages/Index.tsx in place and renders it under Next.
const IndexContent = dynamic(() => import('@/pages/Index'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Partridge Linen | Premium Commercial Linen Hire London</title>
        <meta name="description" content="Premium commercial linen services for restaurants, hotels & events across London & South East." />
        <link rel="canonical" href="https://partridgelinen.com/" />
      </Head>
      <IndexContent />
    </>
  );
}