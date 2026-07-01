import { DivisionPageBody } from "@/app/divisions/[slug]/page";
import { sectors } from "@/lib/sectors";

export async function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export default async function ArDivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DivisionPageBody locale="ar" slug={slug} />;
}
