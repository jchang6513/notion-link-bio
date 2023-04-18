import { GetServerSideProps } from 'next';
import { getDatabase } from './service';
import { LinkBio } from './types';
import { createLinkBio } from './utils';

export default function Token(props: { linkBio: LinkBio }) {
  const { linkBio } = props
  const { title, footer } = linkBio
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      style={{
        backgroundImage: `url('${linkBio.background.imageUrl}')`
      }}
    >
      <div>
        <div className="text-center relative mt-24 mb-12">
          {title.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="h-20 w-20 m-auto rounded-full"
              src={title.imageUrl}
              alt="link.image"
            />
          )}
          <p className="font-bold text-white mt-2 text-xl">{title.label}</p>
        </div>
        <div>
          {linkBio.links.map((link) => (
            <a key={link.id} href={link.url} target="_blank">
              <div className="bg-white p-4 px-24 mt-4 rounded-full text-center relative transition-all hover:scale-105">
                {link.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="h-10 w-10 rounded-full mr-4 absolute left-2 top-2"
                    src={link.imageUrl}
                    alt="link.image"
                  />
                )}
                <div>{link.label}</div>
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          {footer.map((item) => (
            item.imageUrl && (
              <a key={item.id} href={item.url} target="_blank">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-6 w-6 mr-6 hover:scale-125"
                  src={item.imageUrl}
                  alt="link.image"
                />
              </a>
            )
          ))}
        </div>
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
