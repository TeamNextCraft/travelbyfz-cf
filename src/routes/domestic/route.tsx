import { Footer } from "#/components/common/domestic/footer.tsx";
import { Navbar } from "#/components/common/domestic/nav-bar.tsx";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/domestic")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
