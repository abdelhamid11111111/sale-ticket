import { Suspense } from "react";
import Events from "../../app/components/ui/Events";

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white animate-pulse" />}>
      <Events />
    </Suspense>
  );
}