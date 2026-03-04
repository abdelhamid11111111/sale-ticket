import { Suspense } from "react";
import SoldTicketsLog from "../../components/admin/Orders";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white animate-pulse" />}>
      <SoldTicketsLog />
    </Suspense>
  );
}