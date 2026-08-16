function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildResumePdf() {
  const lines = [
    "TamilArasan N",
    "Backend Software Engineer | AI Systems | Distributed Architecture",
    "",
    "Focus",
    "Production backend systems, AI infrastructure, performance optimization,",
    "distributed architecture, databases, Linux, Docker, AWS, Redis, LangChain,",
    "LangGraph, large-scale data processing, and Rust experimentation.",
    "",
    "Selected Work",
    "AI Interview Platform: LLM pipelines, resume ranking, speech, TTS, analytics.",
    "1.5TB NDJSON to Parquet Engine: streaming conversion for 300M records.",
    "High Performance HTTP Audio Server: low-latency socket communication.",
    "Infrastructure and VPS: Docker, Linux, monitoring, CI/CD, deployment.",
    "",
    "Contact",
    "Email: hello@tamilarasan.dev",
    "GitHub: github.com/tamil-arasan",
    "LinkedIn: linkedin.com/in/tamilarasan-n",
  ];

  const textOperators = lines
    .map((line, index) => {
      const y = 760 - index * 24;
      const size = index === 0 ? 24 : index === 1 ? 12 : 10;
      return `BT /F1 ${size} Tf 64 ${y} Td (${escapePdfText(line)}) Tj ET`;
    })
    .join("\n");

  const stream = `${textOperators}\n`;
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}endstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += object;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Uint8Array(Buffer.from(pdf, "binary"));
}

export function GET() {
  return new Response(buildResumePdf(), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="TamilArasan-N-Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
