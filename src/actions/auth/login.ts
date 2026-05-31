"use server";

import { signIn } from "@/src/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Correo o contraseña incorrectos.";
        default:
          return "Ocurrió un error. Intenta de nuevo.";
      }
    }
    throw error;
  }
}


export const login = async (email:string,password:string)=> {
     try{
      await signIn("credentials", { email, password});
      return { success: true };
     }catch(error){
        console.error("Error en el login:", error);
        return { success: false, error: "Ocurrió un error al iniciar sesión. Intenta nuevamente." };
     }
}