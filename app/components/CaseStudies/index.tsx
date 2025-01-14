'use client';

import { useCaseStudy } from '@/app/store/caseStudies';
import Container from '../Container';
import { useState } from 'react';
import CaseStudyCard from './CaseStudy';
import AddCaseStudy from './AddCaseStudy';

const CaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const caseStudies = useCaseStudy((state) => state.caseStudies);
  const caseStudiesLoading = useCaseStudy((state) => state.caseStudiesLoading);

  const filteredCaseStudies = caseStudies.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-gray-100">
      <Container>
        <div className="min-h-svh py-10 space-y-5">
          <article className="space-y-3">
            {/* <h1 className="font-bold text-2xl">All Case Studies</h1> */}
            <AddCaseStudy />
          </article>

          <div className="">
            <input
              type="search"
              placeholder="Search by title"
              className="py-3 px-5 rounded-xl w-full transition-all duration-200 outline-none border border-transparent focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-10">
            <article className="">
              <span className="text-sm">
                Showing{' '}
                <span className="text-white bg-purple-500 px-2 py-1 rounded-full text-xs font-semibold">
                  {filteredCaseStudies.length}
                </span>{' '}
                of {caseStudies.length} case studies
              </span>
            </article>

            {caseStudiesLoading && (
              <div className="skeleton w-full min-h-svh"></div>
            )}

            {!caseStudiesLoading && !Boolean(filteredCaseStudies.length) && (
              <article className="w-full min-h-[10rem] grid place-items-center">
                <div className="text-center">
                  <h1 className="font-bold text-lg">No case studies</h1>
                  <p className="text-gray-500 text-sm">No items to show yet.</p>
                </div>
              </article>
            )}

            {!caseStudiesLoading && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 items-start">
                {Boolean(filteredCaseStudies.length) &&
                  filteredCaseStudies.map((caseStudy) => (
                    <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default CaseStudies;
