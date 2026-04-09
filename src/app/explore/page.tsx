import Link from "next/link";
import { mockUGC } from "@/data/mock";
import { Compass, TrendingUp, Flame } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center gap-3 mb-10">
        <Compass className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)]">发现</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6"><Flame className="w-6 h-6 text-red-500" /> 热议榜单</h2>
          {mockUGC.slice(0, 5).map((ugc, i) => (
            <div key={ugc.id} className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] cinematic-shadow flex gap-4">
              <div className="text-3xl font-extrabold text-gray-300 dark:text-gray-700 italic w-8">{i + 1}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors cursor-pointer">{ugc.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ugc.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--foreground)]">{ugc.user.name}</span>
                  </div>
                  <span>{ugc.likes} 赞同 • {ugc.comments} 评论</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-6"><TrendingUp className="w-6 h-6 text-green-500" /> 话题趋势</h2>
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 cinematic-shadow">
            <div className="space-y-4">
              {["# 黑暗荣耀大结局", "# 邪恶力量重聚", "# 进击的巨人完结篇", "# 推荐一部治愈系日剧", "# 古装剧服化道大赏"].map((topic, i) => (
                <Link key={topic} href="#" className="block hover:bg-[var(--background)] p-3 rounded-xl transition-colors border-b border-[var(--border)] last:border-0">
                  <div className="font-bold text-[var(--foreground)] mb-1">{topic}</div>
                  <div className="text-xs text-gray-500">{100 - i * 15}k 讨论</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
