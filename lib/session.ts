import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  id: string;
  username: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: "asdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjask",
  cookieName: "session",
  cookieOptions: {
    secure: false,
  },
};

async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
    session.isAdmin = false;
    session.username = "";
    session.id = "";
  }
  return session;
}

async function logout() {
  "use server";
  const session = await getSession();
  session.destroy();
}

async function login(formData: FormData) {
  "use server";
  const session = await getSession();
  session.username = (formData.get("username") as string) ?? "No username";
  session.isLoggedIn = true;
  session.isAdmin = false;
  session.id = (formData.get("id") as string) ?? "No username";
  await session.save();
}

export {
  logout,
  login,
  getSession
}