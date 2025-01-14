'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '@/app/components/Container';
import { useCaseStudy } from '@/app/store/caseStudies';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CaseStudy = () => {
  const caseStudies = useCaseStudy((state) => state.caseStudies);
  const caseStudiesLoading = useCaseStudy((state) => state.caseStudiesLoading);
  const router = useRouter();

  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<any>();

  useEffect(() => {
    const caseStudy = caseStudies.filter((c) => c.id == id)[0];
    if (caseStudy) setCaseStudy(caseStudy);

    if (!caseStudy) {
      router.push('/case-studies');
      toast.error('case study not found');
    }
  }, [id, caseStudies, router]);

  return (
    <div>
      <section className="pt-5 pb-10 lg:pb-20 lg:pt-10">
        <Container>
          <div className="">
            {caseStudiesLoading && (
              <div className="skeleton w-full min-h-svh"></div>
            )}

            {!caseStudiesLoading && caseStudy && (
              <div>
                <div className="grid grid-cols-[50fr_50fr] gap-5 mb-5 border-b pb-10">
                  <article className="space-y-5">
                    <h1 className="font-normal text-4xl">{caseStudy.title}</h1>
                    <p className="text-md text-gray-500">
                      {caseStudy.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1 items-center justify-start">
                      <span className="capitalize rounded-sm bg-black text-sm text-white px-5 py-2">
                        {caseStudy.tag}
                      </span>
                    </div>
                  </article>
                  <figure className="relative w-full h-[20rem] overflow-hidden rounded-xl">
                    <Image
                      src={caseStudy.image}
                      width={500}
                      height={500}
                      className="w-full h-full absolute top-0 left-0 object-cover"
                      alt=""
                      unoptimized
                    />
                  </figure>
                </div>

                <div className="max-w-[50rem] mx-auto ">
                  <div
                    className="ProseMirror-Viewer"
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(caseStudy.content),
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CaseStudy;
