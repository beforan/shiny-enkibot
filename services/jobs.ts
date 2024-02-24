export function getJobSelectionFromCsv(csv?: string) {
  // support simple ALL JOBS filter option
  // TODO when we add more job parsing stuff elsewhere this could be made nicer?
  if (csv === "*")
    csv =
      "BER,BLM,BLU,BRD,BST,CAN,CHM,DNC,DRG,FRE,GEO,GLD,KGT,MIM,MNK,MYS,NIN,ORC,RAN,RDM,SAM,SUM,THF,TIM,WHM";

  // turn jobs CSV into JobTagSelection
  const includeJobs = (csv ?? "")
    .split(",")
    .reduce((result, jobTag) => (result = { ...result, [jobTag]: true }), {});

  return includeJobs;
}
