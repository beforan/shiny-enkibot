import { getRawDummyDebugData } from "@/services/enki-data";

export default async function Page({
  searchParams,
}: {
  searchParams: { src?: "dummy" };
}) {
  const data = searchParams.src === "dummy" ? await getRawDummyDebugData() : ""; // TODO:  fetch live from enkibot-prime

  return <pre>{data}</pre>;
}
