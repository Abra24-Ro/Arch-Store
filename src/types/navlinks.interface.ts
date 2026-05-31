
export const NAV_LINKS = [
  { href: "/gender/all", label: "Todo" },
  { href: "/gender/women", label: "Mujeres" },
  { href: "/gender/men", label: "Hombres" },
  { href: "/gender/kid", label: "Niños" },
];

export const ACCOUNT_LINKS = [
  { href: "/profile", label: "Mi perfil" },
  { href: "/orders", label: "Mis pedidos" },
  { href: "/favorites", label: "Lista de deseos" },
];

export const ADMIN_LINKS = [
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/orders",   label: "Órdenes"   },
  { href: "/admin/users",    label: "Usuarios"   },
];

export const CATEGORY_META: Record<
  string,
  { title: string; subtitle: string }
> = {
  men: { title: "Hombres", subtitle: "Ropa y accesorios para él" },
  women: { title: "Mujeres", subtitle: "Ropa y accesorios para ella" },
  kid: { title: "Niños", subtitle: "Ropa y accesorios para los más pequeños" },
  all: { title: "Todo", subtitle: "Toda nuestra colección" },
};


