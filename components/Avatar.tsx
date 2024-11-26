import { FiUser } from '@react-icons/all-files/fi/FiUser';
import Image from "next/image";

export default function Avatar({ location }: { location: string }) {

  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 relative overflow-hidden">
      {location ? (
        <Image src={location} alt="Avatar" fill objectFit="cover" />
      ) : (
        <FiUser size={24} className={'text-zinc-500'} />
      )}
    </div>
  );
}