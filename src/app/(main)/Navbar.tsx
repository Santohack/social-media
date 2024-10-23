import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto gap-2 flex max-w-7xl flex-wrap items-center justify-between px-5 py-3">
        <Link href="/" className="text-2xl text-primary font-bold">
          <span className="text-primary">S</span>hare
          <span className="text-primary">😇</span>
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
