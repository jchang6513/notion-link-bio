import { GetServerSideProps } from 'next';
import { getDatabase } from '@/service';
import { LinkBio } from '@/types';
import { createLinkBio } from '@/utils';
import { HeaderComop } from '@/components/HeaderComp';
import { Links } from '@/components/Links';
import { FooterComp } from '@/components/FooterComp';

export default function Token(props: { linkBio: LinkBio }) {
  const { linkBio } = props
  if (!linkBio) return

  const { title, background, links, footer } = linkBio

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      style={{
        backgroundImage: `url('${background?.imageUrl}')`
      }}
    >
      <div>
        <HeaderComop title={title} />
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
    props: { linkBio: createLinkBio(results) },
  }
}
