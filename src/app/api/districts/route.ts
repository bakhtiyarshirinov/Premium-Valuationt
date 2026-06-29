import { getDistricts } from "@/lib/districts-store";

export const dynamic = "force-dynamic";

/** Public endpoint — returns the district list for the estimator. */
export async function GET() {
  const districts = await getDistricts();
  return Response.json(districts);
}
