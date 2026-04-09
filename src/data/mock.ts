export interface Series {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  rating: number;
  region: string;
  year: number;
  tags: string[];
  director: string;
  cast: string[];
  synopsis: string;
  status: "想看" | "在看" | "看过" | null;
}

export type UGCType = "note" | "video";

export interface UGCContent {
  id: string;
  seriesId: string;
  type: UGCType;
  user: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  coverImage?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  collections: number;
  createdAt: string;
  tags: string[];
}

export const mockSeries: Series[] = [
  {
    id: "s1",
    title: "邪恶力量",
    originalTitle: "Supernatural",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    rating: 9.1,
    region: "美剧",
    year: 2005,
    tags: ["奇幻", "悬疑", "恐怖"],
    director: "Eric Kripke",
    cast: ["Jared Padalecki", "Jensen Ackles", "Misha Collins"],
    synopsis: "两兄弟开着1967年的黑色雪佛兰“黑斑羚”，穿梭在美国各处调查超自然案件并对抗邪魔的故事。这部剧讲述了亲情、牺牲以及对抗宿命的故事。",
    status: "看过"
  },
  {
    id: "s2",
    title: "甄嬛传",
    originalTitle: "Empresses in the Palace",
    poster: "https://images.unsplash.com/photo-1548684201-44755a90e3eb?q=80&w=600&auto=format&fit=crop",
    rating: 9.4,
    region: "国产剧",
    year: 2011,
    tags: ["古装", "剧情", "爱情"],
    director: "郑晓龙",
    cast: ["孙俪", "陈建斌", "蔡少芬", "蒋欣"],
    synopsis: "雍正元年，结束了激烈的夺位之争，四阿哥胤禛继位，年号雍正。甄嬛在这场后宫权力的漩涡中，从一个不谙世事的少女成长为一代太后。",
    status: "看过"
  },
  {
    id: "s3",
    title: "黑暗荣耀",
    originalTitle: "The Glory",
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop",
    rating: 8.9,
    region: "韩剧",
    year: 2022,
    tags: ["复仇", "悬疑", "剧情"],
    director: "安吉镐",
    cast: ["宋慧乔", "李到晛", "林智妍"],
    synopsis: "梦想成为建筑师的文东恩在高中时期遭遇残酷的校园暴力而退学。多年后，她开始对曾经的霸凌者进行精心策划的复仇。",
    status: "在看"
  }
];

export const mockUGC: UGCContent[] = [
  // s1: 邪恶力量
  {
    id: "u1",
    seriesId: "s1",
    type: "note",
    user: { name: "温彻斯特小迷弟", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" },
    title: "十五年青春，再见黑斑羚🚗",
    content: "《邪恶力量》不仅是一部打怪剧，它更是关于家庭和兄弟情的最美诠释。无论发生什么，Family don't end with blood. 看到最后大结局真的爆哭，十五年的陪伴结束了...",
    coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
    likes: 1240,
    comments: 89,
    collections: 450,
    createdAt: "2024-03-20T10:00:00Z",
    tags: ["剧评", "催泪", "情怀"]
  },
  {
    id: "u2",
    seriesId: "s1",
    type: "video",
    user: { name: "剪刀手爱德华", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop" },
    title: "高燃混剪！Dean的那些名场面🔥",
    content: "带你回顾Dean最帅的战斗瞬间，配合BGM简直燃爆了！",
    coverImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
    likes: 8900,
    comments: 1200,
    collections: 3200,
    createdAt: "2024-03-25T14:30:00Z",
    tags: ["二创", "混剪", "高燃"]
  },
  {
    id: "u3",
    seriesId: "s1",
    type: "note",
    user: { name: "考据狂魔", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
    title: "SPN里的那些都市传说考据👻",
    content: "第一季里的血腥玛丽、白衣女鬼到底在现实中有没有原型？今天来给大家盘点一下剧中的怪物设定和民间传说的对应关系...",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    likes: 560,
    comments: 45,
    collections: 890,
    createdAt: "2024-03-28T09:15:00Z",
    tags: ["细节盘点", "考据"]
  },

  // s2: 甄嬛传
  {
    id: "u4",
    seriesId: "s2",
    type: "note",
    user: { name: "碎玉轩常客", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
    title: "十年甄嬛，常看常新：华妃的爱与恨",
    content: "每一次重温都能发现新的细节。这不仅仅是宫斗，更是对封建礼教下女性悲剧命运的深刻探讨。华妃那一巴掌打的是爱情的虚妄...",
    coverImage: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop",
    likes: 3450,
    comments: 210,
    collections: 1200,
    createdAt: "2024-03-01T10:00:00Z",
    tags: ["剧评", "深度分析", "角色解读"]
  },
  {
    id: "u5",
    seriesId: "s2",
    type: "note",
    user: { name: "汉服十级爱好者", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=150&auto=format&fit=crop" },
    title: "绝美！甄嬛传服化道大赏👗",
    content: "来盘点一下剧中那些惊艳的旗头和服饰搭配，每一套都是精心设计的，完全贴合人物心境变化。",
    coverImage: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?q=80&w=800&auto=format&fit=crop",
    likes: 4500,
    comments: 320,
    collections: 2800,
    createdAt: "2024-03-15T16:20:00Z",
    tags: ["穿搭", "服化道", "审美"]
  },
  {
    id: "u6",
    seriesId: "s2",
    type: "video",
    user: { name: "后宫第一解说", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
    title: "滴血验亲名场面reaction！太刺激了🤯",
    content: "第63集简直是全剧最高潮！带大家重温这教科书级别的群像戏！",
    coverImage: "https://images.unsplash.com/photo-1616004655123-818cbd4b3143?q=80&w=800&auto=format&fit=crop",
    likes: 12000,
    comments: 3400,
    collections: 5600,
    createdAt: "2024-03-29T20:00:00Z",
    tags: ["解说", "名场面", "吐槽"]
  },
  
  // s3: 黑暗荣耀
  {
    id: "u7",
    seriesId: "s3",
    type: "note",
    user: { name: "首尔夜行者", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" },
    title: "复仇的终点是什么？♟️",
    content: "《黑暗荣耀》用极其细腻的手法描绘了霸凌带来的终身创伤。东恩的复仇计划精密如棋局，但最终的释怀才是真正的救赎。妍珍呐，你看到了吗？",
    coverImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop",
    likes: 2100,
    comments: 180,
    collections: 950,
    createdAt: "2024-02-12T11:30:00Z",
    tags: ["观后感", "人物分析"]
  },
  {
    id: "u8",
    seriesId: "s3",
    type: "video",
    user: { name: "追剧达人小李", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" },
    title: "一口气看完《黑暗荣耀》全季！爽文大女主的复仇之路",
    content: "太解压了！全员演技在线，没有烂尾，这才是真正的爽剧！",
    coverImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
    likes: 15600,
    comments: 2100,
    collections: 4500,
    createdAt: "2024-03-10T18:45:00Z",
    tags: ["解说", "爽剧"]
  }
];

export const regions = ["全部", "国产剧", "美剧", "韩剧", "日剧", "英剧", "泰剧", "动漫", "综艺"];
export const genres = ["全部", "悬疑", "爱情", "科幻", "奇幻", "古装", "职场", "喜剧", "治愈", "恐怖", "动作"];
