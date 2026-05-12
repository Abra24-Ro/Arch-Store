import { prisma } from "../lib/prisma";
import { initialData, ValidTypes } from "./seed";

async function main() {
  //** 1.Borrar registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //** 2. Insertar datos iniciales

  const { categories, products } = initialData;

  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  //** 2.1 Insertar categorías

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

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
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
