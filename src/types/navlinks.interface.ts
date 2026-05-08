export const NAV_LINKS = [
  { href: "/category/all", label: "Todo" },
  { href: "/category/women", label: "Mujeres" },
  { href: "/category/men", label: "Hombres" },
  { href: "/category/kid", label: "Niños" },
];

export const ACCOUNT_LINKS = [
  { href: "/profile", label: "Mi perfil" },
  { href: "/orders", label: "Mis pedidos" },
  { href: "/favorites", label: "Lista de deseos" },
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
