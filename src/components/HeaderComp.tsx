import { Header } from "@/types"

export const HeaderComop = ({ title }: { title: Header }) => {
  if (!title.id) return null;

  return (
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
  )
}
