import Head from "next/head";

function Terms() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Privacy Policy | notion-link-bio</title>
      </Head>
      <div className="relative place-items-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-xl mb-4 leading-loose lg:max-w-4xl md:max-w-2xl sm:max-w-xl">
          We take your privacy seriously and are committed to protecting your personal information.
          Our Notion integration is a side project that parses your Notion database page(s) and renders it into a responsive web design page.
          <br />
          We do not collect or process any data from you,
          including your Notion database page(s) or any design page(s) created using our integration.
          Our integration only renders your existing Notion database page(s) into an RWD page,
          and does not collect, store, or share any information from your database.
          We do not use cookies or similar technologies to collect data about your use of our integration.
          <br />
          We do not share your personal information with any third-party without your consent,
          except as required by law or as necessary to provide the integration service to you.
          <br />
          We will take reasonable measures to protect any data processed by our integration from unauthorized access,
          disclosure, or destruction.
          However, please note that no data transmission over the internet or any other network can be guaranteed to be 100% secure.
          <br />
          If you have any questions or concerns about our privacy practices or this privacy policy,
          please contact us at [https://github.com/jchang6513/notion-link-bio/issues].
          We may update this privacy policy from time to time,
          and any changes will be posted on this page.
          Your continued use of our integration after any such changes constitutes your acceptance of the revised policy.
        </p>
      </div>
    </main>
  );
}

export default Terms;
