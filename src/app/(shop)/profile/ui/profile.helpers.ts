type ProfileUser = {
  name?: string | null;
  lastName?: string | null;
  email: string;
  role: "admin" | "user";
};

export const getProfileDisplayName = (user: ProfileUser) => {
  return [user.name, user.lastName].filter(Boolean).join(" ") || user.email;
};

export const getProfileInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const getProfileRoleLabel = (role: ProfileUser["role"]) => {
  return role === "admin" ? "Admin" : "Cliente";
};