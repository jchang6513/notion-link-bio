import Head from "next/head";

function Terms() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Terms | notion-link-bio</title>
      </Head>
      <div className="relative place-items-center">
        <h1 className="text-4xl font-bold mb-4">Terms</h1>
        <p className="text-xl mb-4 leading-loose lg:max-w-4xl md:max-w-2xl sm:max-w-xl">
          By using our Notion integration,
          you agree to allow us to access and read your Notion database page(s) solely for the purpose of rendering it into a design page.
          We will not modify or delete any content in your database.
          We will not share your data with any third-party without your consent.
          We reserve the right to suspend or terminate access to the integration if we believe there is a violation of these terms or if it is necessary to protect our users or our services.
        </p>
      </div>
    </main>
  );
}

export default Terms;
