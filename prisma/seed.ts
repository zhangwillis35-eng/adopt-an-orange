import { PrismaClient, Role, TreeStatus, UpdateType } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@adopt-an-orange.com" },
    update: {},
    create: {
      email: "admin@adopt-an-orange.com",
      name: "管理员",
      nickname: "Admin",
      role: Role.ADMIN,
      phone: "13800000000",
    },
  });
  console.log(`  ✅ Admin user: ${admin.id}`);

  // ── Orchards ────────────────────────────────────────────
  const orchard1 = await prisma.orchard.upsert({
    where: { id: "orchard-gannan" },
    update: {},
    create: {
      id: "orchard-gannan",
      name: "赣南脐橙果园",
      location: "江西省赣州市信丰县",
      latitude: 25.386,
      longitude: 114.922,
      description:
        "赣南脐橙果园位于江西省赣州市信丰县，地处北纬25°黄金产区。果园占地500亩，种植赣南脐橙超过20年，土壤富含稀土元素，产出的脐橙果大形正、橙红鲜艳、光洁美观、可食率达85%，肉质脆嫩、化渣，风味浓甜芳香。",
      coverImage: "/images/orchards/gannan.jpg",
      livestreamUrl: "https://live.example.com/gannan",
    },
  });

  const orchard2 = await prisma.orchard.upsert({
    where: { id: "orchard-zigui" },
    update: {},
    create: {
      id: "orchard-zigui",
      name: "秭归脐橙果园",
      location: "湖北省宜昌市秭归县",
      latitude: 30.825,
      longitude: 110.978,
      description:
        "秭归脐橙果园坐落于三峡库区秭归县，这里是中国脐橙之乡。依托长江三峡独特的河谷气候，冬暖夏凉，雨量充沛，光照充足，非常适合脐橙生长。果园采用生态种植方式，全程可追溯，产出的脐橙皮薄多汁、酸甜适度。",
      coverImage: "/images/orchards/zigui.jpg",
      livestreamUrl: "https://live.example.com/zigui",
    },
  });
  console.log(`  ✅ Orchards: ${orchard1.name}, ${orchard2.name}`);

  // ── Orange Trees (20 total: 12 in orchard1, 8 in orchard2) ──
  const varieties1 = ["纽荷尔脐橙", "赣南脐橙", "红肉脐橙"];
  const varieties2 = ["秭归脐橙", "伦晚脐橙", "血橙"];

  const trees = [];
  for (let i = 1; i <= 12; i++) {
    const tree = await prisma.orangeTree.upsert({
      where: { treeCode: `GN-${String(i).padStart(4, "0")}` },
      update: {},
      create: {
        orchardId: orchard1.id,
        treeCode: `GN-${String(i).padStart(4, "0")}`,
        variety: varieties1[i % varieties1.length],
        age: 5 + (i % 10),
        status: i <= 8 ? TreeStatus.AVAILABLE : TreeStatus.ADOPTED,
        location: `A区${Math.ceil(i / 4)}排${((i - 1) % 4) + 1}号`,
        coverImage: `/images/trees/tree-gn-${i}.jpg`,
        estimatedYield: 50 + Math.round(Math.random() * 30),
      },
    });
    trees.push(tree);
  }

  for (let i = 1; i <= 8; i++) {
    const tree = await prisma.orangeTree.upsert({
      where: { treeCode: `ZG-${String(i).padStart(4, "0")}` },
      update: {},
      create: {
        orchardId: orchard2.id,
        treeCode: `ZG-${String(i).padStart(4, "0")}`,
        variety: varieties2[i % varieties2.length],
        age: 3 + (i % 8),
        status: i <= 6 ? TreeStatus.AVAILABLE : TreeStatus.RESTING,
        location: `B区${Math.ceil(i / 4)}排${((i - 1) % 4) + 1}号`,
        coverImage: `/images/trees/tree-zg-${i}.jpg`,
        estimatedYield: 40 + Math.round(Math.random() * 25),
      },
    });
    trees.push(tree);
  }
  console.log(`  ✅ Orange trees: ${trees.length}`);

  // ── Adoption Plans ──────────────────────────────────────
  const plans = [
    {
      id: "plan-trial",
      name: "尝鲜套餐",
      description:
        "适合初次体验认养橙树的用户。认养一棵橙树，享受3个月的果园直播、成长记录推送，到期后可获得一次新鲜脐橙配送（约10斤）。",
      price: 299,
      duration: 3,
      deliveryCount: 1,
      estimatedWeight: 10,
      features: [
        "认养1棵橙树",
        "3个月果园直播",
        "成长记录推送",
        "1次配送（约10斤）",
        "电子认养证书",
      ],
      sortOrder: 1,
    },
    {
      id: "plan-family",
      name: "家庭套餐",
      description:
        "最受欢迎的家庭认养方案。认养一棵橙树，享受6个月的全程陪伴，期间可获得两次新鲜脐橙配送（共约25斤），适合全家享用。",
      price: 599,
      duration: 6,
      deliveryCount: 2,
      estimatedWeight: 25,
      features: [
        "认养1棵橙树",
        "6个月果园直播",
        "成长记录推送",
        "2次配送（共约25斤）",
        "电子认养证书",
        "果园参观体验券",
      ],
      sortOrder: 2,
    },
    {
      id: "plan-premium",
      name: "豪华套餐",
      description:
        "尊享全年认养体验。认养一棵精选橙树，享受12个月的深度果园体验，4次时令配送（共约60斤），并获赠精美礼盒包装，适合送礼或企业团购。",
      price: 999,
      duration: 12,
      deliveryCount: 4,
      estimatedWeight: 60,
      features: [
        "认养1棵精选橙树",
        "12个月果园直播",
        "成长记录推送",
        "4次配送（共约60斤）",
        "精装认养证书",
        "果园参观体验券×2",
        "专属礼盒包装",
        "优先客服通道",
      ],
      sortOrder: 3,
    },
  ];

  for (const p of plans) {
    await prisma.adoptionPlan.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        duration: p.duration,
        deliveryCount: p.deliveryCount,
        estimatedWeight: p.estimatedWeight,
        features: p.features,
        isActive: true,
        sortOrder: p.sortOrder,
        coverImage: `/images/plans/${p.id}.jpg`,
      },
    });
  }
  console.log(`  ✅ Adoption plans: ${plans.length}`);

  // ── Orchard Updates ─────────────────────────────────────
  const updates = [
    {
      orchardId: orchard1.id,
      title: "春季花期开始",
      content:
        "赣南果园的脐橙树已经进入花期，漫山遍野的橙花散发出阵阵清香。今年气温适宜，预计花期将持续两周左右，坐果率有望超过去年。我们已经加强了水肥管理，确保每棵树都能得到充足的养分。",
      type: UpdateType.GROWTH,
      mediaUrls: ["/images/updates/spring-bloom-1.jpg", "/images/updates/spring-bloom-2.jpg"],
      isPublished: true,
      publishedAt: new Date("2026-03-15"),
    },
    {
      orchardId: orchard1.id,
      title: "果园施肥与病虫害防治",
      content:
        "本周果园完成了一轮有机肥追施，使用的是发酵豆粕和骨粉混合肥。同时，我们对部分区域进行了物理防虫处理，悬挂了黄色粘虫板和太阳能杀虫灯，确保绿色生态种植。",
      type: UpdateType.CARE,
      mediaUrls: ["/images/updates/care-fertilize.jpg"],
      isPublished: true,
      publishedAt: new Date("2026-04-01"),
    },
    {
      orchardId: orchard2.id,
      title: "秭归果园迎来降雨",
      content:
        "本周秭归地区迎来了一场及时春雨，降雨量约25mm，对脐橙树的生长非常有利。三峡库区特有的温湿气候为脐橙提供了得天独厚的生长条件。果农们趁雨后对果树进行了修枝整形。",
      type: UpdateType.WEATHER,
      mediaUrls: ["/images/updates/zigui-rain.jpg"],
      isPublished: true,
      publishedAt: new Date("2026-04-05"),
    },
    {
      orchardId: orchard1.id,
      title: "直播预告：走进赣南脐橙果园",
      content:
        "本周六上午10点，我们将进行一场果园直播，带大家实地探访赣南脐橙果园。届时果园负责人将为大家介绍脐橙的生长过程、种植技术，并回答认养用户的问题。敬请期待！",
      type: UpdateType.LIVE,
      mediaUrls: ["/images/updates/live-preview.jpg"],
      isPublished: true,
      publishedAt: new Date("2026-04-10"),
    },
    {
      orchardId: orchard2.id,
      title: "秭归伦晚脐橙开始采摘",
      content:
        "好消息！秭归果园的伦晚脐橙已经成熟，今天正式开始采摘。伦晚脐橙是秭归特有的晚熟品种，挂树越冬，口感更加香甜。第一批采摘的鲜果将在48小时内发出，认养用户请留意物流信息。",
      type: UpdateType.HARVEST,
      mediaUrls: [
        "/images/updates/harvest-lunwan-1.jpg",
        "/images/updates/harvest-lunwan-2.jpg",
      ],
      isPublished: true,
      publishedAt: new Date("2026-04-15"),
    },
  ];

  for (const u of updates) {
    await prisma.orchardUpdate.create({ data: u });
  }
  console.log(`  ✅ Orchard updates: ${updates.length}`);

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
