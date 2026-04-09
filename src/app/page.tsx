import Image from "next/image";
import Link from "next/link";
import { mockSeries, mockUGC, regions } from "@/data/mock";
import { Star, MessageSquare, Heart, ArrowRight, PlayCircle, Flame } from "lucide-react";

export default function Home() {
  const featured = mockSeries[0];
  const hotSeries = mockSeries.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={featured.poster}
            alt={featured.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <span className="bg-primary/20 px-2 py-1 rounded">{featured.region}</span>
              <span>{featured.year}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              {featured.title}
            </h1>
            <p className="text-lg text-gray-300 line-clamp-3">
              {featured.synopsis}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link href={`/series/${featured.id}`} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/30">
                <PlayCircle className="w-5 h-5" />
                查看详情
              </Link>
              <div className="flex items-center gap-2 text-xl font-bold text-yellow-400 drop-shadow">
                <Star className="w-6 h-6 fill-current" />
                {featured.rating}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Filter / Quick Entry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-16">
        <div className="bg-[var(--card)] p-4 rounded-2xl cinematic-shadow flex items-center justify-between overflow-x-auto border border-[var(--border)] gap-4 hide-scrollbar">
          {regions.slice(1).map((region) => (
            <Link
              key={region}
              href={`/library?region=${region}`}
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-[var(--background)] hover:bg-primary hover:text-white transition-colors font-medium text-sm"
            >
              {region}
            </Link>
          ))}
          <Link href="/library" className="flex items-center gap-1 text-sm text-primary whitespace-nowrap px-4 hover:underline">
            全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Recommended Series Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">近期热门推荐</h2>
          <Link href="/library" className="text-sm text-gray-500 hover:text-primary transition-colors">查看更多</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {hotSeries.map((series) => (
            <Link key={series.id} href={`/series/${series.id}`} className="group card-hover block">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                <Image src={series.poster} alt={series.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {series.rating}
                </div>
              </div>
              <h3 className="font-semibold text-[var(--foreground)] truncate">{series.title}</h3>
              <p className="text-sm text-gray-500 truncate">{series.tags.join(" • ")}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Reviews & Discussions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold border-l-4 border-primary pl-3 mb-8">最新热门创作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockUGC.slice(0, 3).map((ugc) => {
            const series = mockSeries.find(s => s.id === ugc.seriesId);
            return (
              <div key={ugc.id} className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] hover:border-primary/50 transition-colors card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <Image src={ugc.user.avatar} alt={ugc.user.name} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <div className="font-medium text-sm">{ugc.user.name}</div>
                    <div className="text-xs text-gray-500">评《{series?.title}》</div>
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-2 line-clamp-1">{ugc.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">{ugc.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-[var(--border)]">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {ugc.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {ugc.comments}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
