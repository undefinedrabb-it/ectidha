import Head from 'next/head';
import React from 'react';

const ChangelogPage = () => {
  return (
    <>
      <Head>
        <title>Ectidha - Changelog</title>
        <meta name="description" content="changelog of ectidha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <main className="text-gray-100/90 h-full bg-gray-800 flex-col flex p-8">
          <h1 className="text-center text-4xl m-6">Changelog</h1>
          <div className="grow">
            <section className="m-6 p-3 border-gray-600 border-2">
              <div className="flex flex-row mb-3">
                <h2 className="text-4xl grow">Version 0.0.1!</h2>
                <div className="self-end">2023.02.14</div>
              </div>
              <p>
                Zmiana kolorów partii, aby bardziej przypominały przezentowane
                poglądy.
              </p>
              <p>Dodanie changelogu.</p>
            </section>
          </div>
        </main>
        <footer className="text-xs text-center text-gray-400 p-2 bg-gray-700">
          <p>2023, powered by next, vercel, t3-app</p>
        </footer>
      </div>
    </>
  );
};

export default ChangelogPage;
