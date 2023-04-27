import { Link } from "@/types"

export const Links = ({ links }: { links: Link[] } ) => {
  if (!links.length) return null

  return (
    <div>
      {links?.map((link) => (
        <a key={link.id} href={link.url} target="_blank">
          <div
            className="bg-white p-4 px-24 mt-4 rounded-md text-center relative transition-all hover:scale-105"
            style={link.style}
          >
            {link.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="h-10 w-10 rounded-md mr-4 absolute left-2 top-2"
                src={link.imageUrl}
                alt="link.image"
              />
            )}
            <div>{link.label}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
