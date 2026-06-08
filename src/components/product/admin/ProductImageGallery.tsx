"use client";

import { ProductFormInputs } from "@/src/hooks";
import { ProductImage as ProductImageType } from "@/src/types";
import { motion } from "framer-motion";
import { ProductImage } from "../product-image/ProductImage";
import { ConfirmDialog, ImageLightbox } from "../..";
import { useState } from "react";

interface Props {
  images?: ProductImageType[];
  onDeleteImage?: (imageId: number, imageUrl: string) => void; //* preparado para la acción de borrar
  onFilesChange: (files: File[]) => void
}

interface PendingDelete {
  id: number;
  url: string;
}

//* Galería de imágenes del producto con botón de eliminación por imagen.
//* onDeleteImage es opcional — cuando se implemente la acción, solo se conecta aquí.
export const ProductImageGallery = ({ images, onDeleteImage,onFilesChange }: Props) => {
  const [pending, setPending] = useState<PendingDelete | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  //* handleFileChange — sin register
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected); //* ← agrega este estado
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
    onFilesChange?.(selected); //* ← notifica al hook
  };

  const handleConfirm = () => {
    if (!pending) return;
    onDeleteImage?.(pending.id, pending.url);
    setPending(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Imágenes actuales */}
      <div className="input-group">
        <label className="input-label">Imágenes del producto</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {images?.map((img) => (
            <div
              key={img.id}
              onClick={() => setLightbox(img.url)}
              style={{
                cursor: "zoom-in",
                position: "relative",
                width: "80px",
                height: "100px",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                background: "var(--color-bg-surface)",
                border: "0.5px solid var(--color-border)",
              }}
            >
              <ProductImage
                src={img.url}
                alt={`imagen ${img.id}`}
                fill
                className="object-cover"
              />

              {/* Botón eliminar */}
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPending({ id: img.id, url: img.url });
                }}
                whileHover={{ background: "rgba(0,0,0,0.8)" }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  color: "#fff",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="input-group">
        <label className="input-label">
          Añadir imágenes{" "}
          <span
            style={{
              color: "var(--color-text-tertiary)",
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
            }}
          >
            (png, jpg)
          </span>
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          className="input"
          style={{ cursor: "pointer" }}
        />

        {/* Previews */}
        {previews.map((url, i) => (
          <div
            key={url}
            onClick={() => setLightbox(url)}
            style={{
              cursor: "zoom-in",
              position: "relative",
              width: "80px",
              height: "100px",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              border: "0.5px solid var(--color-border)",
              opacity: 0.7,
            }}
          >
            <ProductImage
              src={url}
              alt={`preview ${i + 1}`}
              fill
              className="object-cover"
            />

            {/* Botón eliminar preview — solo local, sin server action */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviews((prev) => prev.filter((_, idx) => idx !== i));
              }}
              whileHover={{ background: "rgba(0,0,0,0.8)" }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </motion.button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!pending}
        title="¿Eliminar imagen?"
        description="Esta acción no se puede deshacer."
        onConfirm={handleConfirm}
        onCancel={() => setPending(null)}
        preview={
          pending && (
            <div
              style={{
                width: "52px",
                height: "64px",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: "0.5px solid var(--color-border)",
              }}
            >
              <ProductImage
                src={pending.url}
                alt="imagen a eliminar"
                fill
                className="object-cover"
              />
            </div>
          )
        }
      />

      <ImageLightbox
        src={lightbox ?? ""}
        alt="imagen ampliada"
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};
