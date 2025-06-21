"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

type SortButtonProps = {
  sortCycle: string[];
};

const SortButton = ({ sortCycle }: SortButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const currentSort = searchParams.get("sort");
  const currentIndex = sortCycle.indexOf(currentSort || "");
  const nextSort = sortCycle[(currentIndex + 1) % sortCycle.length];

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", nextSort);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
      onClick={handleClick}
    >
      <Image src="/sort.png" alt="Sort" width={14} height={14} />
    </button>
  );
};

export default SortButton;
