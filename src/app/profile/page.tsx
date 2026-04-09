"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockSeries, mockUGC } from "@/data/mock";
import { User, Heart, Settings, LayoutGrid, List, MessageSquare } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"想看" | "在看" | "看过" | "发布">("看过");

  const mySeries = mockSeries.filter(s => s.status === activeTab);
  const myUGC = mockUGC.filter(u => u.user.name === "温彻斯特小迷弟");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header */}
      <div className="bg-[var(--card)] rounded-3xl p-8 mb-12 border border-[var(--border)] cinematic-shadow relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary/20 to-purple-500/20" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 pt-12">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--card)] cinematic-shadow">
            <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" alt="Avatar" fill className="object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-1">温彻斯特小迷弟</h1>
            <p className="text-gray-500">剧龄 5 年 • 追剧狂魔</p>
          </div>
          <div className="flex items-center gap-4 mb-2">
            <button className="flex items-center gap-2 bg-[var(--background)] border border-[var(--border)] px-4 py-2 rounded-full hover:border-primary transition-colors text-sm font-medium">
              <Settings className="w-4 h-4" /> 设置
            </button>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-around md:justify-start gap-12 mt-10 border-t border-[var(--border)] pt-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[var(--foreground)]">12</div>
            <div className="text-sm text-gray-500">关注</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[var(--foreground)]">48</div>
            <div className="text-sm text-gray-500">粉丝</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-[var(--foreground)]">1,240</div>
            <div className="text-sm text-gray-500">获赞</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-[var(--border)] mb-8">
        {(["看过", "在看", "想看", "发布"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-lg font-bold transition-all relative ${
              activeTab === tab ? "text-primary" : "text-gray-500 hover:text-[var(--foreground)]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "发布" ? (
        <div className="space-y-6">
          {myUGC.map(ugc => (
            <div key={ugc.id} className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:border-primary/50 transition-all card-hover">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <MessageSquare className="w-4 h-4" /> 发布了讨论
                <span className="text-xs ml-auto">{new Date(ugc.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{ugc.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{ugc.content}</p>
              <div className="flex items-center gap-2">
                {ugc.tags.map(t => (
                  <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mySeries.length > 0 ? (
            mySeries.map(series => (
              <Link key={series.id} href={`/series/${series.id}`} className="group card-hover block">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg">
                  <Image src={series.poster} alt={series.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-[var(--foreground)] truncate text-center">{series.title}</h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500 bg-[var(--card)] rounded-2xl border border-[var(--border)] border-dashed">
              暂无记录
            </div>
          )}
        </div>
      )}
    </div>
  );
}
