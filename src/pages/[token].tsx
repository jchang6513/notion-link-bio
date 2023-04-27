import { GetServerSideProps } from 'next';
import { getDatabase } from '@/service';
import { LinkBio } from '@/types';
import { createLinkBio } from '@/utils';
import { HeaderComp } from '@/components/HeaderComp';
import { Links } from '@/components/Links';
import { FooterComp } from '@/components/FooterComp';
import Head from 'next/head';
import { useMemo } from 'react';

export default function Token(props: { linkBio: LinkBio }) {
  const { linkBio } = props
  const { header, background, links, footer } = linkBio || {}

  const backgroundStyle = useMemo(() => {
    if (background.imageUrl) {
      return { backgroundImage: `url('${background?.imageUrl}')` }
    }

    if (background.style) {
      return background.style
    }

    return {}
  }, [background.imageUrl, background.style])

  if (!linkBio) return

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      title="123"
      style={backgroundStyle}
    >
      <Head>
        <title>{`${header.label}|notion-link-bio`}</title>
      </Head>
      <div className="columns-md mx-3 min-h-screen">
        <HeaderComp header={header} />
        <Links links={links} />
        <FooterComp footer={footer} />
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params = {} } = ctx
  const { token = '' } = params

  if (typeof token !== 'string' || !token) return { props: {} }

  const results = await getDatabase(
    token,
    process.env.NOTION_INTEGRATION_SECRET || ''
  )

  return {
    props: { linkBio: createLinkBio(results), results },
  }
}
