import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="p-6 flex flex-col lg:items-center justify-start align-middle gap-4 sm:flex-row sm:items-start">
      <div className="md:flex-1">
        <h1 className="text-4xl sm:text-2xl text-background">Dashboard</h1>
        <p>Welcome back, Alex. Here's your financial overview.</p>
      </div>
      <button className="bg-linear-to-r from-gradient-white-green to-gradient-solid-green text-white flex justify-end align-middle p-2 rounded-md">
        <Plus />
        Quick add
      </button>
      <img className="rounded-3xl" src="person.png" alt="person" />
    </header>
  );
}
