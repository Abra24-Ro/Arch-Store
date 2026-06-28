"use client";

import { updateProfile } from "@/src/actions";
import { UpdateProfileSchema, updateProfileSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  name?: string | null;
  lastName?: string | null;
  onCancel: () => void;
  onSuccess: () => void;
}
export const EditProfileForm = ({
  name,
  lastName,
  onCancel,
  onSuccess,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: name ?? "",
      lastName: lastName ?? "",
    },
  });

  const onSubmit = (data: UpdateProfileSchema) => {
    startTransition(async () => {
      const result = await updateProfile(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      reset(data);
      onSuccess();
      router.refresh();
    });
  };

  const handleCancel = () => {
    reset({
      name: name ?? "",
      lastName: lastName ?? "",
    });
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        <div className="input-group">
          <label htmlFor="profile-name" className="input-label">
            Nombre
          </label>
          <input
            id="profile-name"
            className="input"
            disabled={isPending}
            {...register("name")}
          />
          {errors.name && (
            <p className="input-error-msg">{errors.name.message}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="profile-last-name" className="input-label">
            Apellido
          </label>
          <input
            id="profile-last-name"
            className="input"
            disabled={isPending}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="input-error-msg">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending || !isDirty || !isValid}
        >
          {isPending && (
            <Loader2 className="animate-spin" size={14} strokeWidth={1.5} />
          )}
          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          disabled={isPending}
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
