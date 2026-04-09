"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { mockSeries, mockUGC, UGCContent } from "@/data/mock";
import { PlusCircle, Heart, Flame, Clock, MessageSquare, Play, Sparkles } from "lucide-react";
import UGCItem from "@/components/UGCItem";

export default function SeriesDetail({ params }: { params: { id: string } }) {
  const series = mockSeries.find(s => s.id === params.id);
  const allUGC = mockUGC.filter(u => u.seriesId === params.id);
  
  const [filter, setFilter] = useState<"热门" | "最新" | "最多评论" | "最多收藏">("热门");
  const [contentType, setContentType] = useState<"全部" | "图文" | "视频">("全部");

  if (!series) {
    notFound();
  }

  // 筛选逻辑
  let displayUGC = [...allUGC];
  
  if (contentType === "图文") {
    displayUGC = displayUGC.filter(u => u.type === "note");
  } else if (contentType === "视频") {
    displayUGC = displayUGC.filter(u => u.type === "video");
  }

  if (filter === "热门") {
    displayUGC.sort((a, b) => b.likes - a.likes);
  } else if (filter === "最新") {
    displayUGC.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (filter === "最多评论") {
    displayUGC.sort((a, b) => b.comments - a.comments);
  } else if (filter === "最多收藏") {
    displayUGC.sort((a, b) => b.collections - a.collections);
  }

  // 简单的瀑布流分列计算 (不依赖外部库)
  const columns = { col1: [] as UGCContent[], col2: [] as UGCContent[], col3: [] as UGCContent[], col4: [] as UGCContent[] };
  displayUGC.forEach((item, index) => {
    if (index % 4 === 0) columns.col1.push(item);
    else if (index % 4 === 1) columns.col2.push(item);
    else if (index % 4 === 2) columns.col3.push(item);
    else columns.col4.push(item);
  });

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* 极简剧集信息头 (占比极小) */}
      <div className="sticky top-16 z-40 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-16 rounded overflow-hidden shadow-md flex-shrink-0">
              <Image src={series.poster} alt={series.title} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--foreground)] flex items-center gap-2">
                {series.title}
                <span className="text-xs font-normal bg-[var(--card)] px-2 py-0.5 rounded-full border border-[var(--border)] text-gray-500">
                  {series.year}
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-1 max-w-md hidden sm:block">
                {series.synopsis}
              </p>
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-2 text-sm flex-shrink-0">
            <PlusCircle className="w-4 h-4" />
            关注专区
          </button>
        </div>
      </div>

      {/* UGC 内容主体区 (绝对主角) */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* 顶部工具栏：发布引导 + 筛选器 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-[var(--card)] p-4 rounded-2xl border border-[var(--border)] cinematic-shadow">
          {/* 发布引导区 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <button className="flex-1 text-left bg-[var(--background)] hover:bg-gray-50 dark:hover:bg-gray-800 border border-[var(--border)] px-4 py-3 rounded-full text-gray-400 text-sm transition-colors group">
              分享你的《{series.title}》观后感、二创或吐槽...
              <span className="float-right text-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium">去发布 ↗</span>
            </button>
          </div>

          {/* 筛选器区 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pl-0 sm:pl-6 sm:border-l border-[var(--border)]">
            {/* 内容类型 Tabs */}
            <div className="flex bg-[var(--background)] p-1 rounded-xl border border-[var(--border)]">
              {(["全部", "图文", "视频"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    contentType === type 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-gray-500 hover:text-[var(--foreground)]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* 排序筛选 */}
            <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar w-full sm:w-auto">
              {[
                { name: "热门", icon: <Flame className="w-4 h-4" /> },
                { name: "最新", icon: <Clock className="w-4 h-4" /> },
                { name: "最多评论", icon: <MessageSquare className="w-4 h-4" /> },
                { name: "最多收藏", icon: <Heart className="w-4 h-4" /> }
              ].map(f => (
                <button
                  key={f.name}
                  onClick={() => setFilter(f.name as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === f.name 
                      ? "bg-gray-100 dark:bg-gray-800 text-[var(--foreground)] font-bold" 
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-[var(--foreground)]"
                  }`}
                >
                  {f.icon}
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 瀑布流展示区 */}
        {displayUGC.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
            <div className="flex flex-col gap-4">
              {columns.col1.map(item => <UGCItem key={item.id} data={item} />)}
            </div>
            <div className="flex flex-col gap-4">
              {columns.col2.map(item => <UGCItem key={item.id} data={item} />)}
            </div>
            <div className="flex flex-col gap-4 hidden md:flex">
              {columns.col3.map(item => <UGCItem key={item.id} data={item} />)}
            </div>
            <div className="flex flex-col gap-4 hidden lg:flex">
              {columns.col4.map(item => <UGCItem key={item.id} data={item} />)}
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-[var(--card)] rounded-3xl border border-[var(--border)] border-dashed">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">暂无相关内容</h3>
            <p className="text-gray-500 mb-6">成为第一个在《{series.title}》专区发布{contentType !== '全部' ? contentType : '内容'}的人吧！</p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
              立即发布
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
