import { SessionOptions } from "iron-session";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: "asdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjaskasdfoij23ijfjask",
  cookieName: "session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: false,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
  }

  if (shouldSleep) {
    // simulate looking up the user in db
    await sleep(250);
  }

  return session;
}

export async function logout() {
  "use server";
  const session = await getSession(false);
  session.destroy();
}

export async function login(formData: FormData) {
  "use server";

  const session = await getSession();

  session.username = (formData.get("username") as string) ?? "No username";
  session.isLoggedIn = true;
  await session.save();
}