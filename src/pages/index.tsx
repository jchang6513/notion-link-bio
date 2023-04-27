import Head from 'next/head';
import Link from 'next/link';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';

function App() {
  const [dbId, setDbId] = useState('');

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDbId(event.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (dbId) {
      window.location.href = `/${dbId}`;
    }
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center columns-md">
      <Head>
        <title>notion-link-bio</title>
      </Head>
      <div className="relative place-items-center">
        <h1 className="text-4xl font-bold mb-4">NotionLinkBio</h1>
        <p className="text-xl mb-4">Enter your Notion database ID below to create your custom link bio page.</p>
        <form className="text-right" onSubmit={handleSubmit}>
          <input className="rtl px-4 py-2 border border-gray-300 rounded-md w-full mb-4" type="text" placeholder="Enter your database ID" value={dbId} onChange={handleInputChange} />
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" disabled={!dbId}>Create Link Bio</button>
        </form>
        <div className="flex mt-8 text-right">
          <Link className="text-gray-500 hover:text-gray-700 mr-4" href="/terms">Terms of Use</Link>
          <Link className="text-gray-500 hover:text-gray-700" href="/policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}

export default App;
