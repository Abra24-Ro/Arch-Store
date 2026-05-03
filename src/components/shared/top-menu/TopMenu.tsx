"use client";

import Link from "next/link";
import { SearchIcon, ShoppingBagIcon, AlignJustify } from "lucide-react";
import { ArcLogo } from "../LogoArc";
import { AnnouncementBar } from "./AnnouncementBar";
import { useUIStore } from "@/src/store";
import { NAV_LINKS } from "@/src/types";


export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <AnnouncementBar text="Envío gratis en pedidos mayores a S/99 · Nueva colección disponible" />

      <nav className="arc-nav flex items-center justify-between h-16">
        <Link href="/" aria-label="Arc Store — Inicio" className="logo-link shrink-0">
          <ArcLogo size="md" variant="dark" wordmark="Shop" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="nav-link">{label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link href="/search" aria-label="Buscar" className="nav-icon-btn">
            <SearchIcon size={17} strokeWidth={1.5} />
          </Link>

          <Link href="/cart" aria-label="Carrito" className="nav-icon-btn relative">
            <ShoppingBagIcon size={17} strokeWidth={1.5} />
            <span className="cart-badge">0</span>
          </Link>

          <div className="hidden md:block w-px h-4 mx-1" style={{ background: "var(--color-border-medium)" }} />

          <button aria-label="Abrir menú" className="menu-btn cursor-pointer" onClick={openMenu}>
            <AlignJustify size={15} strokeWidth={1.5} />
            <span className="hidden md:inline">Menú</span>
          </button>
        </div>
      </nav>
    </header>
  );
};