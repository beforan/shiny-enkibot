import {
  fetchFullData,
  getDummyData,
  oldParse,
  parseRawEnkiData,
  parseStage1SectionData,
} from "@/services/enki-data";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    src?: "dummy";
    format: "raw" | "json" | "toc" | "old";
    section?: string;
    jobs?: string;
  };
}) {
  const loadData = searchParams.src === "dummy" ? getDummyData : fetchFullData;

  let data = await loadData();

  switch (searchParams.format) {
    case "old":
      data = JSON.stringify(oldParse(data), null, 2);
      break;
    case "json":
      const stage1data = parseRawEnkiData(data).data;

      // If no section slug, return the Stage 1 parse
      if (!searchParams.section) data = JSON.stringify(stage1data, null, 2);
      else {
        // If a section is specified, do a stage 2 parse of it
        
        // support simple ALL JOBS filter option
        // TODO when we add more job parsing stuff elsewhere this could be made nicer?
        if (searchParams.jobs === "*")
          searchParams.jobs =
            "BER,BLM,BLU,BRD,BST,CAN,CHM,DNC,DRG,FRE,GEO,GLD,KGT,MIM,MNK,MYS,NIN,ORC,RAN,RDM,SAM,SUM,THF,TIM,WHM";
        
        // turn jobs CSV into JobTagSelection
        const includeJobs = (searchParams.jobs ?? "")
          .split(",")
          .reduce(
            (result, jobTag) => (result = { ...result, [jobTag]: true }),
            {}
          );

        // get stage2 parsed section data
        data = JSON.stringify(
          parseStage1SectionData(stage1data[searchParams.section], includeJobs),
          null,
          2
        );
      }
      break;
    case "toc":
      data = JSON.stringify(parseRawEnkiData(data).toc, null, 2);
      break;
    // default: leave it raw
  }

  return <pre>{data}</pre>;
}
