import React from 'react';
import Head from 'next/head';

const SEO = ({
  title = 'Blog Personal de Juanma',
  description = 'Aqui encontraras posteos sobre mi dia a dia, tecnologia, herramientas de desarrollo web y tips.',
  url = 'https://my-blog-personal.vercel.app/',
  image = 'https://my-blog-personal.vercel.app/screenshot.png'
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
    </Head>
  );
};

export default SEO;
