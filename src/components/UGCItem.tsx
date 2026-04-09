import React from 'react';
import Image from 'next/image';
import { Heart, MessageSquare, Play } from 'lucide-react';
import { UGCContent } from '@/data/mock';

interface UGCItemProps {
  data: UGCContent;
}

export default function UGCItem({ data }: UGCItemProps) {
  const isVideo = data.type === 'video';

  return (
    <div className="bg-[var(--card)] rounded-2xl overflow-hidden cinematic-shadow mb-4 card-hover border border-[var(--border)] group cursor-pointer relative">
      {/* 封面区 */}
      <div className="relative w-full aspect-[3/4] sm:aspect-auto sm:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
        {data.coverImage && (
          <Image
            src={data.coverImage}
            alt={data.title}
            width={400}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* 短视频特有标识 */}
        {isVideo && (
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Play className="w-3 h-3 text-white fill-white" />
            <span className="text-xs text-white font-medium">视频</span>
          </div>
        )}
        
        {/* 悬浮暗角渐变 (增强文字可读性) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 内容区 */}
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-[var(--foreground)] text-sm sm:text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {data.title}
        </h3>
        
        {/* 底部信息栏 */}
        <div className="flex items-center justify-between mt-auto">
          {/* 用户信息 */}
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image src={data.user.avatar} alt={data.user.name} fill className="object-cover" />
            </div>
            <span className="text-xs text-gray-500 truncate max-w-[80px]">{data.user.name}</span>
          </div>

          {/* 数据互动 */}
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs">{data.likes}</span>
            </div>
            {!isVideo && (
              <div className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-xs">{data.comments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
