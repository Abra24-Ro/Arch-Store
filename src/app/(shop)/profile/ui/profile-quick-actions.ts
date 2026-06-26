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
    description: "Vuelve rapido a tus productos guardados.",
    icon: Heart,
  },
  {
    href: "/checkout/address",
    label: "Direccion de envio",
    description: "Revisa o actualiza tu direccion principal.",
    icon: MapPin,
  },
];