import HabitGrid from "./_ui/HabitGrid";
export const metadata = { title: "Dashboard", description: "Dashboard" };

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-row overflow-y-scroll bg-grayscale-50">
      <HabitGrid />{" "}
    </div>
  );
}
