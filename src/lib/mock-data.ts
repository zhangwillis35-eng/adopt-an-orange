// ─── Mock Data (replace with Prisma queries when DB is connected) ───

export interface MockPlan {
  id: string
  name: string
  description: string
  price: number
  duration: number
  deliveryCount: number
  estimatedWeight: number
  features: string[]
  isActive: boolean
  sortOrder: number
}

export interface MockTree {
  id: string
  treeCode: string
  variety: string
  age: number
  status: "AVAILABLE" | "ADOPTED" | "RESERVED"
  orchardId: string
  orchardName: string
  orchardLocation: string
  estimatedYield: number
}

export const mockPlans: MockPlan[] = [
  {
    id: "plan-1",
    name: "尝鲜套餐",
    description:
      "初次体验认养的最佳选择，感受来自果园的新鲜与甜蜜。适合个人尝鲜或作为特别的小礼物送给朋友。",
    price: 299,
    duration: 12,
    deliveryCount: 2,
    estimatedWeight: 10,
    features: [
      "专属橙树认养证书",
      "果园实时动态推送",
      "2次新鲜直达配送",
      "预估收获10斤鲜橙",
    ],
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "plan-2",
    name: "家庭套餐",
    description:
      "最受家庭欢迎的认养方案，全家共享来自果园的甜蜜时光。更多配送次数，更大收获量，让家人随时品尝新鲜。",
    price: 599,
    duration: 12,
    deliveryCount: 3,
    estimatedWeight: 25,
    features: [
      "专属橙树认养证书",
      "果园实时动态推送",
      "3次新鲜直达配送",
      "预估收获25斤鲜橙",
      "优先发货特权",
      "橙留香定制礼盒",
    ],
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "plan-3",
    name: "豪华套餐",
    description:
      "尊享级认养体验，专为追求极致品质的你打造。超大收获量，专属VIP服务，还可亲临果园体验采摘乐趣。",
    price: 999,
    duration: 12,
    deliveryCount: 4,
    estimatedWeight: 50,
    features: [
      "专属橙树认养证书",
      "果园实时动态推送",
      "4次新鲜直达配送",
      "预估收获50斤鲜橙",
      "优先发货特权",
      "橙留香定制礼盒",
      "果园实地参观1次",
      "专属客服1对1服务",
    ],
    isActive: true,
    sortOrder: 3,
  },
]

export const mockTrees: MockTree[] = [
  { id: "tree-01", treeCode: "GN-A001", variety: "赣南脐橙", age: 8, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 60 },
  { id: "tree-02", treeCode: "GN-A002", variety: "赣南脐橙", age: 6, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 45 },
  { id: "tree-03", treeCode: "GN-A003", variety: "赣南脐橙", age: 10, status: "ADOPTED", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 75 },
  { id: "tree-04", treeCode: "GN-A004", variety: "纽荷尔脐橙", age: 5, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 40 },
  { id: "tree-05", treeCode: "GN-A005", variety: "纽荷尔脐橙", age: 7, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 55 },
  { id: "tree-06", treeCode: "GN-A006", variety: "赣南脐橙", age: 9, status: "RESERVED", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 65 },
  { id: "tree-07", treeCode: "GN-A007", variety: "赣南脐橙", age: 4, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 30 },
  { id: "tree-08", treeCode: "GN-A008", variety: "纽荷尔脐橙", age: 11, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 80 },
  { id: "tree-09", treeCode: "GN-A009", variety: "赣南脐橙", age: 6, status: "ADOPTED", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 50 },
  { id: "tree-10", treeCode: "GN-A010", variety: "赣南脐橙", age: 7, status: "AVAILABLE", orchardId: "orchard-1", orchardName: "阳光果园", orchardLocation: "江西赣州·信丰县", estimatedYield: 55 },
  { id: "tree-11", treeCode: "GN-B001", variety: "赣南脐橙", age: 5, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 38 },
  { id: "tree-12", treeCode: "GN-B002", variety: "纽荷尔脐橙", age: 8, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 58 },
  { id: "tree-13", treeCode: "GN-B003", variety: "赣南脐橙", age: 12, status: "ADOPTED", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 85 },
  { id: "tree-14", treeCode: "GN-B004", variety: "赣南脐橙", age: 6, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 48 },
  { id: "tree-15", treeCode: "GN-B005", variety: "纽荷尔脐橙", age: 9, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 68 },
  { id: "tree-16", treeCode: "GN-B006", variety: "赣南脐橙", age: 3, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 25 },
  { id: "tree-17", treeCode: "GN-B007", variety: "赣南脐橙", age: 7, status: "RESERVED", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 52 },
  { id: "tree-18", treeCode: "GN-B008", variety: "纽荷尔脐橙", age: 10, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 72 },
  { id: "tree-19", treeCode: "GN-B009", variety: "赣南脐橙", age: 4, status: "AVAILABLE", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 32 },
  { id: "tree-20", treeCode: "GN-B010", variety: "赣南脐橙", age: 8, status: "ADOPTED", orchardId: "orchard-2", orchardName: "翠谷果园", orchardLocation: "江西赣州·安远县", estimatedYield: 62 },
]

/* ─── Orchard Updates ─── */

export type UpdateType = "GROWTH" | "WEATHER" | "CARE" | "HARVEST" | "EVENT" | "LIVE"

export interface MockOrchardUpdate {
  id: string
  orchardName: string
  orchardLocation: string
  title: string
  content: string
  type: UpdateType
  mediaUrls: string[]
  publishedAt: string
  author: string
}

export const mockOrchardUpdates: MockOrchardUpdate[] = [
  {
    id: "update-1",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "春季新芽萌发",
    content:
      "经过一个冬天的休养，橙树们迎来了春天的第一缕阳光。嫩绿的新芽从枝头破壳而出，仿佛在向世界宣告新一年的开始。果农老王一大早便来到果园，仔细查看每一棵橙树的萌芽情况。今年的气温回升比去年早了将近一周，新芽的密度也明显增多，这预示着今年将会是一个丰收年。春风拂过果园，空气中弥漫着泥土与新芽的清新气息，几只早归的燕子在枝头欢快地鸣叫，为这片充满希望的土地增添了几分生机。",
    type: "GROWTH",
    mediaUrls: [],
    publishedAt: "2026-03-15",
    author: "果园管理员 老王",
  },
  {
    id: "update-2",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "橙花盛开季节到来",
    content:
      "四月的果园迎来了最美的时刻——橙花盛开。满园洁白如雪的小花挂满枝头，微风轻拂便送来阵阵沁人心脾的花香。这种独特的香气甜而不腻，是赣南春天最美的味道。蜜蜂们忙碌地穿梭在花丛间，为橙花授粉。果农们正在进行人工辅助授粉，以确保每一朵花都能结出饱满的果实。今年的花期持续了约两周，花量比去年增加了约15%，初步预估今年的挂果率将会达到历史新高。认养的朋友们可以期待一个甜蜜的丰收季。",
    type: "GROWTH",
    mediaUrls: [],
    publishedAt: "2026-04-08",
    author: "果园管理员 老王",
  },
  {
    id: "update-3",
    orchardName: "翠谷果园",
    orchardLocation: "江西赣州·安远县",
    title: "春季修剪与病虫害防治",
    content:
      "春季是果园养护的关键时期。我们的技术团队对每一棵橙树进行了精细化修剪，去除枯枝、病枝和交叉枝，改善树冠通风透光条件。同时，果园启动了物理防虫措施，安装了新一批黄色粘虫板和太阳能杀虫灯，采用生物农药进行预防性喷施。所有养护措施均严格遵循有机种植标准，确保果实安全无残留。修剪后的橙树看起来更加精神焕发，树形也更加美观。",
    type: "CARE",
    mediaUrls: [],
    publishedAt: "2026-03-22",
    author: "技术主管 张师傅",
  },
  {
    id: "update-4",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "清明前后降雨充沛",
    content:
      "清明节前后，赣南地区迎来了几场及时雨，累计降水量达到68毫米。适量的春雨对橙树的生长极为有利，土壤湿度保持在65%左右的最佳状态。不过，果园管理团队也密切关注着天气变化，提前疏通了排水沟渠，避免果园积水导致根系受损。气象站数据显示，未来两周赣南地区将以多云为主，偶有阵雨，非常有利于橙树的开花坐果。我们已经调整了灌溉计划，确保每棵橙树都能获得最佳的水分供给。",
    type: "WEATHER",
    mediaUrls: [],
    publishedAt: "2026-04-05",
    author: "气象观测员 小刘",
  },
  {
    id: "update-5",
    orchardName: "翠谷果园",
    orchardLocation: "江西赣州·安远县",
    title: "幼果膨大期管理要点",
    content:
      "进入五月，橙树上的小果实已经有拇指大小了。这个阶段是果实生长发育的关键期，我们采取了多项精准管理措施：第一，科学施肥，以有机复合肥为主，配合微量元素叶面喷施；第二，合理疏果，保留优质幼果，确保养分集中供给；第三，加强水分管理，保持土壤适度湿润。每棵树平均保留200-300个幼果，预计最终成熟果实在100-150个左右。认养用户们，你们的橙子正在茁壮成长。",
    type: "GROWTH",
    mediaUrls: [],
    publishedAt: "2026-05-10",
    author: "技术主管 张师傅",
  },
  {
    id: "update-6",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "果园亲子采摘体验日",
    content:
      "上周末，我们成功举办了今年首场\u201C果园亲子体验日\u201D活动。来自深圳、广州、长沙等地的12组认养家庭来到果园，近距离感受橙树的生长过程。孩子们在果农的带领下学习了嫁接技术、了解了橙树的生长周期，还亲手给自己认养的橙树浇水施肥。活动中，大家品尝了果园自制的橙子果酱和鲜榨橙汁，欢声笑语充满了整个果园。下一期活动将在六月中旬举办，名额有限，感兴趣的认养家庭请尽快报名。",
    type: "EVENT",
    mediaUrls: [],
    publishedAt: "2026-04-20",
    author: "活动策划 小陈",
  },
  {
    id: "update-7",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "果园直播预告：橙花观赏专场",
    content:
      "本周六（4月12日）上午10:00，我们将进行橙花盛开季的直播专场。果园管理员老王将带大家漫步花海，近距离观赏洁白的橙花、聆听蜜蜂忙碌的嗡嗡声。直播中还会讲解橙花从绽放到坐果的全过程，以及如何通过花期判断今年的收成情况。别忘了打开提醒，和我们一起感受赣南果园最美的春日时光。",
    type: "LIVE",
    mediaUrls: [],
    publishedAt: "2026-04-10",
    author: "直播运营 小美",
  },
  {
    id: "update-8",
    orchardName: "翠谷果园",
    orchardLocation: "江西赣州·安远县",
    title: "夏季高温应对措施",
    content:
      "近日赣南地区气温持续攀升，最高温度已达36度。为了保护橙树免受高温危害，果园采取了多项降温措施：一是加大灌溉频次，采用微喷灌系统在清晨和傍晚各浇灌一次；二是在果树行间种植绿肥作物，降低地表温度；三是对部分阳面果实套袋保护，防止日灼。同时，我们安排了24小时值班制度，实时监测果园温湿度变化，确保橙树安全度夏。",
    type: "WEATHER",
    mediaUrls: [],
    publishedAt: "2026-06-28",
    author: "气象观测员 小刘",
  },
  {
    id: "update-9",
    orchardName: "阳光果园",
    orchardLocation: "江西赣州·信丰县",
    title: "秋季转色期：橙子开始变色啦",
    content:
      "激动人心的时刻到了！经过大半年的生长，橙子终于开始从绿色向橙黄色转变。这个过程叫做\u201C转色期\u201D，是橙子从青涩走向成熟的标志。目前果实大小已经接近成品果，表皮开始出现浅浅的橙黄色泽。随着昼夜温差加大，橙子的糖分将不断积累，酸度逐渐降低，口感会越来越甜美。预计再过6-8周，你们认养的橙子就可以采摘啦！",
    type: "HARVEST",
    mediaUrls: [],
    publishedAt: "2026-09-15",
    author: "果园管理员 老王",
  },
  {
    id: "update-10",
    orchardName: "翠谷果园",
    orchardLocation: "江西赣州·安远县",
    title: "丰收季正式开始",
    content:
      "等了一整年，终于迎来了最激动人心的丰收时刻！经过严格的糖度和酸度检测，阳光果园的第一批赣南脐橙达到了采摘标准：糖度12.5%以上，酸度0.8%以下，果重平均280克。今天清晨，果农们手持专用剪刀，小心翼翼地将成熟的橙子从枝头采下。每一颗橙子都会经过人工分拣、清洗、包装，然后在24小时内通过冷链物流发往全国各地。认养用户们，请注意查收你们的甜蜜包裹！",
    type: "HARVEST",
    mediaUrls: [],
    publishedAt: "2026-11-05",
    author: "果园管理员 老王",
  },
]

/* ─── Live Replay Data ─── */

export interface MockLiveReplay {
  id: string
  title: string
  orchardName: string
  date: string
  duration: string
  viewers: number
}

export const mockLiveReplays: MockLiveReplay[] = [
  { id: "replay-1", title: "橙花盛开观赏直播", orchardName: "阳光果园", date: "2026-04-12", duration: "1小时32分", viewers: 2368 },
  { id: "replay-2", title: "果园日出晨间漫步", orchardName: "翠谷果园", date: "2026-03-28", duration: "45分钟", viewers: 1856 },
  { id: "replay-3", title: "春季修剪技术讲解", orchardName: "阳光果园", date: "2026-03-15", duration: "1小时08分", viewers: 1532 },
  { id: "replay-4", title: "亲子采摘体验日花絮", orchardName: "阳光果园", date: "2026-04-20", duration: "2小时15分", viewers: 3021 },
]

/* ─── Live Chat Mock ─── */

export interface MockLiveComment {
  id: string
  user: string
  content: string
  time: string
}

export const mockLiveComments: MockLiveComment[] = [
  { id: "c1", user: "橙子爱好者", content: "画面好清晰，能看到橙树上的小花", time: "2分钟前" },
  { id: "c2", user: "甜蜜妈妈", content: "我认养的那棵在哪里呀？", time: "3分钟前" },
  { id: "c3", user: "赣南老乡", content: "看着就亲切，想起家乡的果园了", time: "5分钟前" },
  { id: "c4", user: "果园新粉", content: "第一次看果园直播，太治愈了", time: "6分钟前" },
  { id: "c5", user: "吃货小王", content: "已经开始期待丰收季了！", time: "8分钟前" },
  { id: "c6", user: "自然控", content: "蜜蜂飞来飞去好有活力", time: "10分钟前" },
]
