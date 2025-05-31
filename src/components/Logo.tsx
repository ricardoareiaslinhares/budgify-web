import Image from 'next/image';
type LoginProps  = {
  width: number, height:number, adjustToParent:boolean
}
export const Logo = ({width, height, adjustToParent}:LoginProps) => {
  return (
     <Image
      src="/logo.svg"
      alt="Budgify"
      width={width}
      height={height}
      style={ adjustToParent ? {
        width: "100%",
          objectFit: 'contain',
        }: {}}
    />
  )
}
