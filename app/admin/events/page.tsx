import { Suspense } from "react";
import Events from "../../components/admin/Events";

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="" />}>
      <Events />
    </Suspense>
  );
}