import { Header } from "@/types"

export const HeaderComp = ({ header }: { header: Header }) => {
  if (!header.id) return null;

  return (
    <div className="text-center relative mt-20 mb-12 pt-6">
      {header.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-16 w-16 m-auto rounded-full mb-6"
          src={header.imageUrl}
          alt="link.image"
        />
      )}
      <span className="font-bold text-white mt-4 text-xl p-2 rounded-md" style={header.style}>
        {header.label}
      </span>
    </div>
  )
}
