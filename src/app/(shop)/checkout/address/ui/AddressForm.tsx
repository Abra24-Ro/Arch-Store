"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { deleteUserAddress, setUserAddress } from "@/src/actions";
import { AddressFormInputs, addressFormSchema } from "@/src/schemas";
import { useAddressStore } from "@/src/store";
import { Address, Country } from "@/src/types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormInputs {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  saveAddress: boolean;
}

interface AddressFormProps {
  countries: Country[];

  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({
  countries,

  userStoredAddress = {},
}: AddressFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // ← loading propio

  const setAddress = useAddressStore((state) => state.setAddress);
  const storeAddress = useAddressStore((state) => state.address);

  // ← prioridad: servidor > store
  const initialValues: Partial<FormInputs> = userStoredAddress?.firstName
    ? { ...userStoredAddress, saveAddress: true }
    : storeAddress?.firstName
      ? { ...storeAddress, saveAddress: false }
      : { saveAddress: false };

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors },
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, []); // ← solo al montar, sin competencia

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);

    const { saveAddress, ...restAddress } = data;
    //* Guardamos una copia temporal para conservar el checkout si el usuario recarga la pestaña.
    setAddress(restAddress);

    try {
      if (saveAddress) {
        const result = await setUserAddress(restAddress);
        if (!result.success) {
          toast.error("No se pudo guardar la dirección.");
          return;
        }
        toast.success("Dirección guardada.");
      } else {
        await deleteUserAddress();
      }

      router.push("/checkout"); // ← redirige al siguiente paso
    } catch {
      toast.error("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Nombres y Apellidos */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div className="input-group">
          <label htmlFor="firstName" className="input-label">
            Nombres
          </label>
          <input
            id="firstName"
            type="text"
            className="input"
            placeholder="Juan"
            disabled={isSubmitting}
            style={{
              borderColor: errors.firstName ? "var(--color-error)" : undefined,
            }}
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName" className="input-label">
            Apellidos
          </label>
          <input
            id="lastName"
            type="text"
            className="input"
            placeholder="Pérez"
            disabled={isSubmitting}
            style={{
              borderColor: errors.lastName ? "var(--color-error)" : undefined,
            }}
            {...register("lastName", { required: true })}
          />
        </div>
      </div>

      {/* Dirección */}
      <div className="input-group">
        <label htmlFor="address" className="input-label">
          Dirección
        </label>
        <input
          id="address"
          type="text"
          className="input"
          placeholder="Av. Principal 123"
          disabled={isSubmitting}
          style={{
            borderColor: errors.address ? "var(--color-error)" : undefined,
          }}
          {...register("address", { required: true })}
        />
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
        <input
          id="address2"
          type="text"
          className="input"
          placeholder="Dpto, piso, referencia..."
          disabled={isSubmitting}
          {...register("address2")}
        />
      </div>

      {/* CP y Ciudad */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div className="input-group">
          <label htmlFor="postalCode" className="input-label">
            Código postal
          </label>
          <input
            id="postalCode"
            type="text"
            className="input"
            placeholder="15001"
            disabled={isSubmitting}
            style={{
              borderColor: errors.postalCode ? "var(--color-error)" : undefined,
            }}
            {...register("postalCode", { required: true })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="city" className="input-label">
            Ciudad
          </label>
          <input
            id="city"
            type="text"
            className="input"
            placeholder="Lima"
            disabled={isSubmitting}
            style={{
              borderColor: errors.city ? "var(--color-error)" : undefined,
            }}
            {...register("city", { required: true })}
          />
        </div>
      </div>

      {/* País */}
      <div className="input-group">
        <label htmlFor="country" className="input-label">
          País
        </label>
        <select
          id="country"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: "14px",
            color: "var(--color-text-primary)",
            background: "transparent",
            border: `1px solid ${errors.country ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "6px",
            cursor: "pointer",
            outline: "none",
          }}
          {...register("country", { required: true })}
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
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
          disabled={isSubmitting}
          style={{
            borderColor: errors.phone ? "var(--color-error)" : undefined,
          }}
          {...register("phone", { required: true })}
        />
      </div>

      <div style={{ height: "0.5px", background: "var(--color-border)" }} />

      {/* Checkbox */}
      <label
        htmlFor="saveAddress"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          fontSize: "13px",
          color: "var(--color-text-secondary)",
        }}
      >
        <input
          id="saveAddress"
          type="checkbox"
          style={{
            width: "16px",
            height: "16px",
            accentColor: "var(--color-text-primary)",
            cursor: "pointer",
            flexShrink: 0,
          }}
          {...register("saveAddress")}
        />
        Guardar dirección para próximas compras
      </label>

      {/* CTA */}
      <motion.button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="btn btn-primary w-full"
        whileTap={!isSubmitting && isValid ? { scale: 0.98 } : {}}
        style={{
          textAlign: "center",
          opacity: !isValid || isSubmitting ? 0.4 : 1,
          cursor: !isValid || isSubmitting ? "not-allowed" : "pointer",
          transition: "opacity 200ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isSubmitting && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={14} strokeWidth={1.5} />
          </motion.div>
        )}
        {isSubmitting ? "Guardando..." : "Continuar al método de pago"}
      </motion.button>
    </form>
  );
};
