import Image from 'next/image';
import Link from 'next/link';

export default function Header() {

  return (
    <header className="w-full bg-white py-[10px] min-w-[320px] border-b border-[#CBD5E1] ">
      <div className='w-[1200px] px-5 m-auto md:px-5 sm:px-5'>
        <Link href="/">
          <Image 
            src="/images/Size=Large.svg" 
            alt="사이트 로고" 
            width={151}
            height={40}
          />
        </Link>
      </div>
    </header>
  );
}
