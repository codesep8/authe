import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getSession, login, logout } from "@/lib/session";

export default async function Home() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return (
      <form action={login}>
      <label className="block text-lg">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="username" name="username" />
        <Label htmlFor="id">id</Label>
        <Input id="id" placeholder="id" name="id" />
      </label>
      <div>
        <Button type="submit">login</Button>
      </div>
    </form>
    );
  };

  return (
    <div>
      <p>you: {session.username}</p>
      <p>id: {session.id}</p>
      <form action={logout}>
        <Button type="submit">logout</Button>
      </form>
    </div>
  );
}
