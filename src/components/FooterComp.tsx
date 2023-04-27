import { Footer } from "@/types"

export const FooterComp = ({ footer }: { footer: Footer[] }) => {
  if (!footer.length) return null

  return (
    <div className="flex justify-center mt-12">
      {footer?.map((item) => (
        item.imageUrl && (
          <a key={item.id} href={item.url} target="_blank" className="mr-6 last:mr-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-6 w-6 md:hover:scale-125"
              src={item.imageUrl}
              alt="link.image"
            />
          </a>
        )
      ))}
    </div>
  )
}
