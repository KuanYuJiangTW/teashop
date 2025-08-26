import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: "oolong-red-50",
        slug: "alishan-oolong-red-50g",
        name: "阿里山烏龍紅茶（2兩裝）",
        price: 42000,
        image: "/tea/placeholder.jpg",
        description: "手作淺中焙、花果香，冷泡熱泡皆宜。",
        stock: 12,
        weight: 75,
      },
    }),
    prisma.product.create({
      data: {
        id: "jinxuan-75",
        slug: "jinxuan-75g",
        name: "奶香金萱（75g）",
        price: 38000,
        image: "/tea/placeholder.jpg",
        description: "阿里山茶園直送，奶香濃郁、口感柔順。",
        stock: 20,
        weight: 75,
      },
    }),
    prisma.product.create({
      data: {
        id: "alishan-oolong-75",
        slug: "alishan-oolong-75g",
        name: "阿里山烏龍（75g）",
        price: 45000,
        image: "/tea/placeholder.jpg",
        description: "清香耐泡、山頭氣明顯，適合日常。",
        stock: 8,
        weight: 75,
      },
    }),
  ]);

  console.log("✅ Database seeded with products:", products.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


