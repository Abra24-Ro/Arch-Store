import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import {
  getProfileDisplayName,
  getProfileInitials,
  getProfileRoleLabel,
  ProfileAside,
  ProfileHeader,
  ProfileQuickActions,
  profileQuickActions,
  ProfileSummaryCard,
} from "./ui";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = session.user;
  const fullName = getProfileDisplayName(user);
  const initials = getProfileInitials(fullName);
  const roleLabel = getProfileRoleLabel(user.role);

  return (
    <div className="page-container page-section">
      <section
        className="animate-slide-up"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          maxWidth: "1120px",
        }}
      >
        <ProfileHeader
          title="Mi perfil"
          subtitle="Gestiona tu informacion personal, revisa tus compras y manten tus accesos principales en un solo lugar."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <ProfileSummaryCard
            fullName={fullName}
            initials={initials}
            email={user.email}
            name={user.name}
            lastName={user.lastName}
            roleLabel={roleLabel}
          />

          <ProfileAside isAdmin={user.role === "admin"} />
        </div>

        <ProfileQuickActions actions={profileQuickActions} />
      </section>
    </div>
  );
}
