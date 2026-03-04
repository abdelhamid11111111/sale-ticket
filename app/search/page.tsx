import { Suspense } from "react";
import SearchPage from "../components/ui/Search";

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="" />}>
      <SearchPage />
    </Suspense>
  );
}