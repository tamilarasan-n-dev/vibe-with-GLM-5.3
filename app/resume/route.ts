import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const pdf = await readFile(
    path.join(process.cwd(), "app", "resume", "Tamil_resume.pdf"),
  );

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="TamilArasan-N-Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
