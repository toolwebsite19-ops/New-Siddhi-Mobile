import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

export function SEO({ title, description, canonical, image }: SEOProps) {
  const siteName = "New Siddhi Mobile";
  const fullTitle = `${title} | ${siteName}`;
  const defaultImage = image || "https://picsum.photos/seed/siddhimobile/1200/630";
  const url = canonical || "https://newsiddhimobilesr.netlify.app/";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      
      {/* Open Graph Tags for Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={defaultImage} />
      
      {/* Twitter Tags */}
      <meta name="twitter:creator" content="@newsiddhimobile" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
