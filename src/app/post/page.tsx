"use client";

import { useState } from "react";
import Image from "next/image";
import { mockSeries } from "@/data/mock";
import { PenSquare, Send, X, Search, FileText } from "lucide-react";

export default function PostPage() {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSeries = mockSeries.filter(s => s.title.includes(searchQuery));

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeries || !title || !content) return;
    alert("发布成功！(模拟功能)");
    setTitle("");
    setContent("");
    setTags([]);
    setSelectedSeries(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center gap-3 mb-10">
        <PenSquare className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)]">发布讨论</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] cinematic-shadow">
        
        {/* Series Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-[var(--foreground)]">关联剧集 <span className="text-red-500">*</span></label>
          {!selectedSeries ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索要讨论的剧集..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-[var(--foreground)] focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl max-h-60 overflow-y-auto z-10">
                  {filteredSeries.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => { setSelectedSeries(s.id); setSearchQuery(""); }}
                      className="w-full text-left px-4 py-3 hover:bg-[var(--background)] transition-colors flex items-center gap-3 border-b border-[var(--border)] last:border-0"
                    >
                      <Image src={s.poster} alt={s.title} width={32} height={48} className="rounded object-cover" />
                      <div>
                        <div className="font-medium text-[var(--foreground)]">{s.title}</div>
                        <div className="text-xs text-gray-500">{s.year} • {s.region}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[var(--background)] border border-[var(--border)] rounded-xl p-3">
              <div className="flex items-center gap-3">
                <Image src={mockSeries.find(s => s.id === selectedSeries)?.poster || ""} alt="Selected" width={40} height={60} className="rounded object-cover" />
                <span className="font-bold text-[var(--foreground)]">{mockSeries.find(s => s.id === selectedSeries)?.title}</span>
              </div>
              <button type="button" onClick={() => setSelectedSeries(null)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-[var(--foreground)]">标题 <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="写一个吸引人的标题吧..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-3 px-4 text-[var(--foreground)] focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
            required
          />
        </div>

        {/* Content (Rich Text Simulation) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-[var(--foreground)]">正文 <span className="text-red-500">*</span></label>
            <div className="text-xs text-gray-500">支持 Markdown 语法</div>
          </div>
          <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-shadow">
            <div className="flex items-center gap-2 p-2 border-b border-[var(--border)] bg-[var(--card)] text-gray-400">
              <button type="button" className="p-1 hover:text-[var(--foreground)] transition-colors"><FileText className="w-4 h-4" /></button>
              <button type="button" className="font-bold p-1 hover:text-[var(--foreground)] transition-colors">B</button>
              <button type="button" className="italic p-1 hover:text-[var(--foreground)] transition-colors">I</button>
              <button type="button" className="underline p-1 hover:text-[var(--foreground)] transition-colors">U</button>
            </div>
            <textarea
              placeholder="分享你的观后感、剧情分析或是角色讨论..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 bg-transparent py-3 px-4 text-[var(--foreground)] outline-none resize-y"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-[var(--foreground)]">标签 (可选)</label>
          <div className="flex flex-wrap items-center gap-2 bg-[var(--background)] border border-[var(--border)] rounded-xl p-3 focus-within:ring-2 focus-within:ring-primary transition-shadow">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-primary-hover"><X className="w-3 h-3" /></button>
              </span>
            ))}
            {tags.length < 5 && (
              <input
                type="text"
                placeholder={tags.length === 0 ? "输入标签后按回车添加..." : "继续添加..."}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 min-w-[150px] bg-transparent outline-none text-[var(--foreground)] text-sm"
              />
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-[var(--border)] flex justify-end">
          <button
            type="submit"
            disabled={!selectedSeries || !title || !content}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
          >
            <Send className="w-5 h-5" /> 发布
          </button>
        </div>

      </form>
    </div>
  );
}
