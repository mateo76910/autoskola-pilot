import { generirajCsv, sveDatoteke } from "@/lib/cjenik";

// Strojno čitljivi cjenici (CSV) — generiraju se pri buildu iz src/data/cjenik.ts.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return sveDatoteke().map((d) => ({ datoteka: d.naziv }));
}

export async function GET(
  _req: Request,
  ctx: RouteContext<"/cjenik/[datoteka]">,
) {
  const { datoteka } = await ctx.params;
  const naziv = decodeURIComponent(datoteka);
  const d = sveDatoteke().find((x) => x.naziv === naziv);
  if (!d) return new Response("Not found", { status: 404 });

  return new Response(generirajCsv(d.verzija), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `inline; filename="${d.naziv}"`,
    },
  });
}
