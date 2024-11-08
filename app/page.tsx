import { getSession, login, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return (
      <form action={login}>
      <label className="block text-lg">
        <span>Username</span>
        <input type="text" name="username" />
        <span>ID</span>
        <input type="text" name="id" />
      </label>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
    )
  }
  return (
    <div>
      <p>you: {session.username}</p>
      <p>id: {session.id}</p>
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
}
