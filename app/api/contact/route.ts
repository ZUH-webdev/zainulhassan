import { handleContactRequest } from "@/lib/contact-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(req: Request) {
  return handleContactRequest(req);
}
