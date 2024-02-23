import {
  fetchFullData,
  getDummyData,
  oldParse,
  parseRawEnkiData,
} from "@/services/enki-data";

export default async function Page({
  searchParams,
}: {
  searchParams: { src?: "dummy"; format: "raw" | "json" | "toc" | "old" };
}) {
  const loadData = searchParams.src === "dummy" ? getDummyData : fetchFullData;

  let data = await loadData();

  switch (searchParams.format) {
    case "old":
      data = JSON.stringify(oldParse(data), null, 2);
      break;
    case "json":
      // If no section slug, do a Stage 1 parse
      data = JSON.stringify(parseRawEnkiData(data).data, null, 2);

      // TODO: If a section is specified, do a stage 2 parse of it
      break;
    case "toc":
      data = JSON.stringify(parseRawEnkiData(data).toc, null, 2);
      break;
    // default: leave it raw
  }

  return <pre>{data}</pre>;
}
