import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Delete from '../Delete';
import { CaseStudyType } from '@/app/store/caseStudies';
import { useConnectDb } from '@/app/providers/ConnectDb';
import EditCourse from './EditCaseStudy';

const CaseStudyCard = ({ caseStudy }: { caseStudy: CaseStudyType }) => {
  const { setInvalidateCaseStudies } = useConnectDb();

  return (
    <article className="border border-gray-200 grid grid-rows-[15rem_max-content] relative overflow-hidden bg-white rounded-xl transition-all duration-200 outline outline-1 outline-offset-4 outline-transparent hover:outline-teal-600">
      <Link
        href={`/case-studies/${caseStudy.id}`}
        className="h-full cursor-pointer bg-gray-100"
        legacyBehavior
        passHref
      >
        <a>
          <Image
            src={caseStudy.image}
            width={500}
            height={500}
            alt=""
            className="h-full w-full object-cover rounded-xl rounded-b-none overflow-hidden"
            unoptimized
          />
        </a>
      </Link>

      <div className="flex flex-col gap-2 p-4 h-full">
        <article className="col-span-full space-y-2">
          <h3 className="text-lg font-bold">{caseStudy.title}</h3>
          <p className="text-gray-500 text-sm">{caseStudy.description}</p>
        </article>

        <div className="flex items-center justify-start gap-2 mt-5">
          <EditCourse caseStudy={caseStudy} />

          <Delete
            onDelete={() => setInvalidateCaseStudies(true)}
            table="case_studies"
            id={caseStudy.id}
          />
        </div>
      </div>
    </article>
  );
};

export default CaseStudyCard;
