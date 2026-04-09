import Link from "next/link";
import { Film, Home, Library, Compass, PenSquare, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[var(--border)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Film className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl tracking-wider">剧圈<span className="text-sm font-normal text-gray-500 ml-1">DramaTalk</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="/" icon={<Home className="w-4 h-4" />} text="首页" />
            <NavLink href="/library" icon={<Library className="w-4 h-4" />} text="剧集库" />
            <NavLink href="/explore" icon={<Compass className="w-4 h-4" />} text="发现" />
            <NavLink href="/post" icon={<PenSquare className="w-4 h-4" />} text="发布" />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center gap-2 hover:text-primary transition">
              <div className="w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:text-primary transition-colors">
      {icon}
      {text}
    </Link>
  );
}
