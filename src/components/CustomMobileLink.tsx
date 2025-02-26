"use client";

import { usePathname, useRouter } from "next/navigation";

type CustomMobileLinkProps = {
  href: string,
  title: string,
  className: string,
  toggleMenuVisibility: () => void
}

const CustomMobileLink = ({
  href,
  title,
  className = "",
  toggleMenuVisibility
}: CustomMobileLinkProps) => {

  const pathname = usePathname();
  const router = useRouter();
  //     ^?

  const handleMenuItemClick = () => {
    toggleMenuVisibility();
    router.push(href);
  };

  return (
    <button
      className={`${className} relative group text-light dark:text-dark my-2`}
      onClick={handleMenuItemClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-purple-400 absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          pathname === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </button>
  );
};

export default CustomMobileLink;
