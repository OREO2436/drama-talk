import { Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 mt-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Film className="w-6 h-6 text-gray-400" />
          <span className="font-semibold text-gray-400">剧圈 DramaTalk</span>
        </div>
        <p className="mb-4">记录你的看剧时光，探讨每一段动人故事。</p>
        <p>&copy; {new Date().getFullYear()} 剧圈社区. All rights reserved.</p>
      </div>
    </footer>
  );
}
