import Link from "next/link"
import LayoutPage from "./LayoutPage"

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base">
      <LayoutPage className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{ new Date().getFullYear() } &copy; All Rights Reserved.</span>
        <div className="flex items-center lg:py-2">
          Built with <span className="text-purple-700 dark:text-primaryDark text-2xl px-1">&#9825;</span> by&nbsp;<Link href="/" className="underline underline-offset-2">Chuba</Link>
        </div>
        <Link href="/" className="underline underline-offset-2">Say Hello</Link>
      </LayoutPage>
    </footer>
  )
}

export default Footer