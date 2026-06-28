import { Heart, MapPin, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProfileQuickAction {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const profileQuickActions: ProfileQuickAction[] = [
  {
    href: "/orders",
    label: "Mis pedidos",
    description: "Consulta el estado y detalle de tus compras.",
    icon: Package,
  },
  {
    href: "/favorites",
    label: "Lista de deseos",
   description: "Vuelve rápido a tus productos guardados.",
    icon: Heart,
  },
  {
    href: "/checkout/address",
    label: "Dirección de envío",
   description: "Revisa o actualiza tu dirección principal.",
    icon: MapPin,
  },
];