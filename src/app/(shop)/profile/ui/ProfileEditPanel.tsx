"use client";

import { useState } from "react";
import { EditProfileForm } from "./EditProfileForm";

interface Props {
  name?: string | null;
  lastName?: string | null;
}

export const ProfileEditPanel = ({ name, lastName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing) {
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setIsEditing(true)}
        style={{ alignSelf: "flex-start" }}
      >
        Editar perfil
      </button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div>
        <h3 className="text-h3">Editar información personal</h3>
        <p
          style={{
            color: "var(--color-text-tertiary)",
            fontSize: "var(--text-xs)",
            marginTop: "4px",
          }}
        >
          Puedes actualizar tu nombre y apellido. El correo y el rol no se
          modifican desde esta sección.
        </p>
      </div>

      <EditProfileForm
        name={name}
        lastName={lastName}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    </div>
  );
};