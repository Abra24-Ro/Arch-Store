"use client";

import {
  FieldError,
  ProductImageGallery,
  ProductSizePicker,
} from "@/src/components";
import { useProductForm } from "@/src/hooks";
import { CategoryAdmin, Product, ProductImage } from "@/src/types";
import { motion } from "framer-motion";

interface Props {
  product: Partial<Product> & { productImages?: ProductImage[] };
  categories: CategoryAdmin[];
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    form: {
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid, isDirty },
    },
    onSizeChange,
    onDeleteImage,
    formKey,
    onFilesChange,
    onSubmit,
    isDeleting,
    hasChanges,
  } = useProductForm(product);

  const canSubmit = isValid && (isDirty || hasChanges) && !isDeleting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
      }}
    >
      {/* ── Columna izquierda — datos ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Título */}
        <div className="input-group">
          <label className="input-label">Título</label>
          <input
            type="text"
            className="input"
            placeholder="Nombre del producto"
            style={{
              borderColor: errors.title ? "var(--color-error)" : undefined,
            }}
            {...register("title", { required: "El título es obligatorio" })}
          />
          <FieldError message={errors.title?.message} />
        </div>

        {/* Slug */}
        <div className="input-group">
          <label className="input-label">Slug</label>
          <input
            type="text"
            className="input"
            placeholder="url-del-producto"
            style={{
              borderColor: errors.slug ? "var(--color-error)" : undefined,
            }}
            {...register("slug", { required: "El slug es obligatorio" })}
          />
          <FieldError message={errors.slug?.message} />
        </div>

        {/* Descripción */}
        <div className="input-group">
          <label className="input-label">Descripción</label>
          <textarea
            rows={5}
            className="input"
            placeholder="Descripción del producto..."
            style={{
              resize: "vertical",
              borderColor: errors.description
                ? "var(--color-error)"
                : undefined,
            }}
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
          />
          <FieldError message={errors.description?.message} />
        </div>

        {/* Precio e Inventario */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="input-group">
            <label className="input-label">Precio</label>
            <input
              type="number"
              className="input"
              placeholder="0.00"
              style={{
                borderColor: errors.price ? "var(--color-error)" : undefined,
              }}
              {...register("price", {
                required: "El precio es obligatorio",
                min: 1,
              })}
            />
            <FieldError message={errors.price?.message} />
          </div>

          <div className="input-group">
            <label className="input-label">Inventario</label>
            <input
              type="number"
              className="input"
              placeholder="0"
              style={{
                borderColor: errors.inStock ? "var(--color-error)" : undefined,
              }}
              {...register("inStock", {
                required: "El inventario es obligatorio",
                min: 0,
              })}
            />
            <FieldError message={errors.inStock?.message} />
          </div>
        </div>

        {/* Tags */}
        <div className="input-group">
          <label className="input-label">
            Tags{" "}
            <span
              style={{
                color: "var(--color-text-tertiary)",
                fontWeight: 400,
                textTransform: "none",
                letterSpacing: 0,
              }}
            >
              (separados por coma)
            </span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="tag1, tag2, tag3"
            style={{
              borderColor: errors.tags ? "var(--color-error)" : undefined,
            }}
            {...register("tags", { required: "Los tags son obligatorios" })}
          />
          <FieldError message={errors.tags?.message} />
        </div>

        {/* Género y Categoría */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="input-group">
            <label className="input-label">Género</label>
            <select
              className="input"
              style={{
                cursor: "pointer",
                borderColor: errors.gender ? "var(--color-error)" : undefined,
              }}
              {...register("gender", { required: "El género es obligatorio" })}
            >
              <option value="">Selecciona</option>
              <option value="men">Hombres</option>
              <option value="women">Mujeres</option>
              <option value="kid">Niños</option>
              <option value="unisex">Unisex</option>
            </select>
            <FieldError message={errors.gender?.message} />
          </div>

          <div className="input-group">
            <label className="input-label">Categoría</label>
            <select
              className="input"
              style={{
                cursor: "pointer",
                borderColor: errors.categoryId
                  ? "var(--color-error)"
                  : undefined,
              }}
              {...register("categoryId", {
                required: "La categoría es obligatoria",
              })}
            >
              <option value="">Selecciona</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <FieldError message={errors.categoryId?.message} />
          </div>
        </div>

        {/* Botón guardar */}
        <motion.button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!canSubmit}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          style={{
            opacity: canSubmit ? 1 : 0.4,
            cursor: canSubmit ? "pointer" : "not-allowed",
            transition: "opacity 200ms ease",
          }}
        >
          Guardar producto
        </motion.button>
      </div>

      {/* ── Columna derecha — tallas e imágenes ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ProductSizePicker selected={watch("sizes")} onChange={onSizeChange} />

        <div style={{ height: "0.5px", background: "var(--color-border)" }} />

        <ProductImageGallery
          key={formKey}
          images={product.productImages}
          onDeleteImage={(id, url) => onDeleteImage(id, url)}
          onFilesChange={onFilesChange} //* ← register ya no va
        />
      </div>
    </form>
  );
};
