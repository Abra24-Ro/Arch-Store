import { BackLink } from "@/src/components";
import Link from "next/link";

export default function AddressPage() {
  return (
    <div
      className="page-container"
      style={{ paddingTop: "40px", paddingBottom: "80px" }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <BackLink href="/cart" label="Volver al carrito" />

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              marginBottom: "4px",
            }}
          >
            Dirección de entrega
          </h1>
          <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>
            ¿A dónde enviamos tu pedido?
          </p>
        </div>

        {/* Formulario */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Nombres y Apellidos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                Nombres
              </label>
              <input id="firstName" type="text" className="input" />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                Apellidos
              </label>
              <input id="lastName" type="text" className="input" />
            </div>
          </div>

          {/* Dirección */}
          <div className="input-group">
            <label htmlFor="address" className="input-label">
              Dirección
            </label>
            <input id="address" type="text" className="input" />
          </div>

          {/* Dirección 2 */}
          <div className="input-group">
            <label htmlFor="address2" className="input-label">
              Dirección 2{" "}
              <span
                style={{
                  color: "var(--color-text-tertiary)",
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                (opcional)
              </span>
            </label>
            <input id="address2" type="text" className="input" />
          </div>

          {/* CP y Ciudad */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="input-group">
              <label htmlFor="postalCode" className="input-label">
                Código postal
              </label>
              <input id="postalCode" type="text" className="input" />
            </div>
            <div className="input-group">
              <label htmlFor="city" className="input-label">
                Ciudad
              </label>
              <input id="city" type="text" className="input" />
            </div>
          </div>

          {/* País */}
          <div className="input-group">
            <label htmlFor="country" className="input-label">
              País
            </label>
            <select id="country" className="select">
              <option value="">Selecciona un país</option>
              <option value="PE">Perú</option>
              <option value="MX">México</option>
              <option value="CO">Colombia</option>
              <option value="AR">Argentina</option>
              <option value="CL">Chile</option>
              <option value="US">Estados Unidos</option>
            </select>
          </div>

          {/* Teléfono */}
          <div className="input-group">
            <label htmlFor="phone" className="input-label">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              className="input"
              placeholder="+51 999 999 999"
            />
          </div>

          <div style={{ height: "0.5px", background: "var(--color-border)" }} />

          {/* CTA */}
          <Link href="/checkout">
            <button className="btn btn-primary w-full">
              Continuar al resumen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
