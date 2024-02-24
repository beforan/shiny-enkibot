import { JobsIcon } from "@/components/shared/JobsIcon";
import { getStage2Data } from "@/services/enki-data";
import { getJobSelectionFromCsv } from "@/services/jobs";
import { getgroups } from "process";
import { Fragment } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { jobs?: string };
}) {
  const includeJobs = getJobSelectionFromCsv(searchParams.jobs);

  const viewModel = await getStage2Data(params.slug, includeJobs);

  return (
    <>
      <h1>{viewModel.title}</h1>
      <dl>
        {viewModel.tips.map((group, i) => (
          <Fragment key={`group${i}`}>
            <dt className="flex flex-row gap-2">
              {group.jobs &&
                group.jobs.map((combo, iJob) => (
                  <JobsIcon key={`jobCombo${iJob}`} jobs={combo} />
                ))}
            </dt>
            {group.tips.map((tip, j) => (
              <dd className="ml-4" key={`group${i}_tip${j}`}>{tip}</dd>
            ))}
          </Fragment>
        ))}
      </dl>
    </>
  );
}
