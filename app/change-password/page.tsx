import { Suspense } from "react";
import ChangePasswordClient from "./ChangePasswordClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordClient />
    </Suspense>
  );
}
