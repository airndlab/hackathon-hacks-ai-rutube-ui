import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-1 items-center relative w-full">
      <Image
        src="/owley.png"
        alt="owley"
        width="972"
        height="984"
        className="w-1/3 bounce absolute left-1/2 main-logo"
      />
    </div>
  );
}
