import Link from "next/link"
import LayoutPage from "./LayoutPage"

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-lg">
      <LayoutPage className="py-8 flex items-center justify-between">
        <span>{ new Date().getFullYear() } &copy; All Rights Reserved.</span>
        <div className="flex items-center">
          Built with <span className="text-purple-400 text-2xl px-1">&#9825;</span> by&nbsp;<Link href="/" className="underline underline-offset-2">Chuba</Link>
        </div>
        <Link href="/" className="underline underline-offset-2">Say Hello</Link>
      </LayoutPage>
    </footer>
  )
}

export default Footer