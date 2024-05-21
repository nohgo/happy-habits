import HabitGrid from "./_ui/HabitGrid";
export const metadata = { title: "Dashboard", description: "Dashboard" };

export default function Dashboard() {
  return (
    <div className="min-h-screen overflow-y-scroll bg-grayscale-50">
      <HabitGrid />{" "}
    </div>
  );
}
