import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function seedDatabase() {
  
     await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
     ])
    
 
   

;}

(() => {
  if (process.env.NODE_ENV === "production") return;
  seedDatabase();
})();
