import { auth } from "@/src/auth";
import { Title } from "@/src/components";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div>
      <Title title="Perfil" subtitle="Gestiona tu perfil y tus datos" />
      {JSON.stringify(session.user, null, 2)}
      <h3>
        {`Bienvenido, ${session.user.name || session.user.email}! Aquí puedes gestionar tu perfil y tus datos personales.`}
      </h3>
    </div>
  );
}
