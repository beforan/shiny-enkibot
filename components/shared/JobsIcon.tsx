import Image from "next/image";
import { Fragment } from "react";

export function JobsIcon({ jobs }: { jobs: string[] }) {
  return (
    <div className="flex flex-row gap-2 w-100% p-2 border-4 rounded-lg text-white border-gray-300 [border-style:ridge] bg-gradient-to-br from-[#00c] to-[#004]">
      {jobs.map((job, i) => (
        <Fragment key={i}>
          <JobIcon job={job} />
          {i < jobs.length - 1 && <div /*Icon as={FaPlus}*/>+</div>}
        </Fragment>
      ))}
    </div>
  );
}

function JobIcon({
  job,
  character = "Butz",
}: {
  job: string;
  character?: string;
}) {
  // const { locale, character } = useSettings();
  return (
    <div
      className="grid grid-cols-[20px_1fr] gap-2 items-center" /*Grid align="center" templateColumns="20px 1fr" columnGap={2}*/
    >
      <Image
        src={`/assets/jobs/${character}/${job}.png`}
        // fallback={<Box minW="20px" minH="28.75px" />}
        alt={job}
        width={32}
        height={48}
      />
      <div
        className="flex w-100% justify-center items-center" /*Flex width="100%" align="center" justify="center"*/
      >
        {/* TODO {forLocale(jobDefinitions[job].name, locale)} */}
        {job}
      </div>
    </div>
  );
}
