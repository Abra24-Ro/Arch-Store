import { auth } from "../auth";



export async function getSession() {
  const session = await auth();
  return {
    isLoggedIn: !!session?.user,
    user: session?.user ?? null,
     isAdmin: session?.user?.role === "admin", 
  };
}