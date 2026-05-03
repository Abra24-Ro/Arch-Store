import Link from "next/link";
import Image from "next/image";

export const PageNotFound = () => {
  return (
    <div className="page-container flex items-center min-h-[calc(100vh-96px)]">
      {/* Columna izquierda — texto */}
      <div className="flex flex-col items-start flex-1 max-w-md">
        <span
          className="text-[120px] leading-none font-light tracking-tighter text-text-primary mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </span>

        <h1
          className="text-[22px] font-medium tracking-[-0.02em] text-(--color-text-primary) mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Página no encontrada
        </h1>

        <p className="text-sm text-(--color-text-tertiary) font-light leading-relaxed mb-8 max-w-[280px]">
          Lo que buscas no está aquí — pero nuestra colección sí.
        </p>

        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>

      </div>

      {/* Columna derecha — ilustración */}
      <div className="hidden md:flex flex-1 relative items-center justify-center h-[520px]">

        {/* Imagen */}
        <Image
          src="/imgs/starman_750x750.png"
          alt="Astronauta perdido en el espacio"
          width={420}
          height={420}
          className="relative z-10 object-contain"
          priority
        />
      </div>
    </div>
  );
};
