"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"; // ← añadir
import { Loader2 } from "lucide-react"; // ← añadir
import { useState } from "react"; // ← añadir
import { login, registerUser } from "@/src/actions";
import { toast } from "sonner";

type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false); // ← añadir

  const {
    register,
    handleSubmit,
    watch, // ← para validar confirmPassword
    formState: { errors }, // ← añadir
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const { name, lastName, email, password } = data;
      const result = await registerUser(name, lastName, password, email);

      if (!result.success) {
        toast.error(result.error ?? "No se pudo crear la cuenta.");
        return;
      }
      toast.success("Usuario registrado con éxito.");
      await login(email.toLocaleLowerCase(), password);
      window.location.replace("/"); // Redirige al inicio después del login
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Ocurrió un error al registrar. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // ← solo una vez
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {/* Nombre y Apellido */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div className="input-group">
          <label htmlFor="firstName" className="input-label">
            Nombre
          </label>
          <input
            id="firstName"
            type="text"
            className="input"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.6 : 1 }}
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {/* Error inline bajo el campo */}
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontSize: "11px",
                  color: "var(--color-error)",
                  marginTop: "4px",
                }}
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="input-group">
          <label htmlFor="lastName" className="input-label">
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            className="input"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.6 : 1 }}
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
          />
          <AnimatePresence>
            {errors.lastName && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontSize: "11px",
                  color: "var(--color-error)",
                  marginTop: "4px",
                }}
              >
                {errors.lastName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Email */}
      <div className="input-group">
        <label htmlFor="email" className="input-label">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="tu@email.com"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.6 : 1 }}
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              // ← pattern en el lugar correcto
              value: /^\S+@\S+$/i,
              message: "El correo no es válido",
            },
          })}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: "11px",
                color: "var(--color-error)",
                marginTop: "4px",
              }}
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Contraseña */}
      <div className="input-group">
        <label htmlFor="password" className="input-label">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="input"
          placeholder="••••••••"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.6 : 1 }}
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: "11px",
                color: "var(--color-error)",
                marginTop: "4px",
              }}
            >
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmar contraseña */}
      <div className="input-group">
        <label htmlFor="confirmPassword" className="input-label">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="input"
          placeholder="••••••••"
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.6 : 1 }}
          {...register("confirmPassword", {
            required: "Confirma tu contraseña",
            validate: (val) =>
              val === watch("password") || "Las contraseñas no coinciden", // ← validación real
          })}
        />
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: "11px",
                color: "var(--color-error)",
                marginTop: "4px",
              }}
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Botón */}
      <motion.button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        style={{
          marginTop: "8px",
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={14} strokeWidth={1.5} />
          </motion.div>
        )}
        {isLoading ? "Creando cuenta..." : "Crear cuenta"}
      </motion.button>

      {/* Divisor */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            flex: 1,
            height: "0.5px",
            background: "var(--color-border)",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            letterSpacing: "0.08em",
          }}
        >
          O
        </span>
        <div
          style={{
            flex: 1,
            height: "0.5px",
            background: "var(--color-border)",
          }}
        />
      </div>

      <Link
        href="/auth/login"
        className="btn btn-secondary w-full"
        style={{ textAlign: "center" }}
      >
        Ya tengo una cuenta
      </Link>
    </form>
  );
};
