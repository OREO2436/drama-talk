"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockSeries, regions, genres } from "@/data/mock";
import { Star, Filter, ArrowDownWideNarrow } from "lucide-react";

export default function Library() {
  const [activeRegion, setActiveRegion] = useState("全部");
  const [activeGenre, setActiveGenre] = useState("全部");

  const filteredSeries = mockSeries.filter((series) => {
    const regionMatch = activeRegion === "全部" || series.region === activeRegion;
    const genreMatch = activeGenre === "全部" || series.tags.includes(activeGenre);
    return regionMatch && genreMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-[var(--foreground)] flex items-center gap-3">
            <Filter className="w-8 h-8 text-primary" /> 剧集库
          </h1>
          <p className="text-gray-500">发现更多好剧，筛选你最爱的题材与地区。</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm bg-[var(--card)] px-4 py-2 rounded-full border border-[var(--border)]">
          <ArrowDownWideNarrow className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">排序:</span>
          <select className="bg-transparent border-none outline-none text-[var(--foreground)] cursor-pointer">
            <option>最高评分</option>
            <option>最新上线</option>
            <option>最受关注</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6 bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] mb-12 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold w-12 text-gray-500">地区</span>
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeRegion === r ? "bg-primary text-white" : "bg-[var(--background)] text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap pt-4 border-t border-[var(--border)]">
          <span className="text-sm font-semibold w-12 text-gray-500">题材</span>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeGenre === g ? "bg-primary text-white" : "bg-[var(--background)] text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        {filteredSeries.length > 0 ? (
          filteredSeries.map((series) => (
            <Link key={series.id} href={`/series/${series.id}`} className="group card-hover block">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 shadow-lg group-hover:shadow-primary/20">
                <Image src={series.poster} alt={series.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {series.rating}
                </div>
              </div>
              <h3 className="font-bold text-lg text-[var(--foreground)] truncate mb-1">{series.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{series.year} • {series.region}</span>
                <span className="truncate ml-2">{series.tags[0]}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500">
            暂无匹配的剧集，请尝试更换筛选条件。
          </div>
        )}
      </div>
    </div>
  );
}
