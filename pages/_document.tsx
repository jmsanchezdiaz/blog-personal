import React from 'react';
import { Html, Head, NextScript, Main } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name='title' content='Bienvenido a mi blog personal!' />
        <meta
          name='description'
          content='Aqui encontraras posteos sobre mi dia a dia, tecnologia, herramientas de desarrollo web y tips.'
        />

        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://my-blog-personal.vercel.app/'
        />
        <meta property='og:title' content='Bienvenido a mi blog personal!' />
        <meta
          property='og:description'
          content='Aqui encontraras posteos sobre mi dia a dia, tecnologia, herramientas de desarrollo web y tips.'
        />
        <meta
          property='og:image'
          content='https://my-blog-personal.vercel.app/screenshot.png'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://my-blog-personal.vercel.app'
        />
        <meta
          property='twitter:title'
          content='Bienvenido a mi blog personal!'
        />
        <meta
          property='twitter:description'
          content='Aqui encontraras posteos sobre mi dia a dia, tecnologia, herramientas de desarrollo web y tips.'
        />
        <meta
          property='twitter:image'
          content='https://my-blog-personal.vercel.app/screenshot.png'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
