import { prisma } from "../lib/prisma";
import { initialData, ValidTypes } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  //** 1.Borrar registros previos

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany(); // ← va aquí, después de address cuando lo tengas
  await prisma.user.deleteMany();

  //** 2. Insertar datos iniciales

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  //** 2.1 Insertar categorías

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  );

  const getCategoryId = (type: ValidTypes): string => {
    const id = categoriesMap[type];
    if (!id) throw new Error(`Categoría "${type}" no encontrada en la DB`);
    return id;
  };

  //** 3. Insertar productos

  for (const { images, type, ...productData } of products) {
    await prisma.product.create({
      data: {
        ...productData,
        categoryId: getCategoryId(type),
        productImages: {
          createMany: {
            data: images.map((url) => ({ url })),
          },
        },
      },
    });
  }

  //** 4. Insertar países
  await prisma.country.createMany({
    data: countries,
  });
}

(async () => {
  if (process.env.NODE_ENV === "production") return;
  try {
    await main();
    console.log("Seed completado");
  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
