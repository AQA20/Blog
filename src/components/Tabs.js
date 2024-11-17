'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const Tabs = ({ tabs, index }) => {
  const { replace } = useRouter();
  return (
    <>
      {
        <div className="relative flex items-center gap-[16px] border-b-dark-outlineVariant">
          {Object.keys(tabs).map((header, i) => (
            <button
              key={header}
              onClick={() => replace(`/policy?index=${i + 1}`)}
              className="flex items-center h-10  hover:cursor-pointer hover:text-primary"
            >
              <div className="relative">
                <p
                  className={clsx('text-sm dark:text-dark-onSurfaceVariant', {
                    'text-primary': index === i + 1,
                  })}
                >
                  {header}
                </p>
                {index === i + 1 && (
                  <hr className="absolute w-full top-[31px] h-1 bg-primary rounded-t-[100px] rounder-r-[100px]" />
                )}
              </div>
            </button>
          ))}
        </div>
      }
      <hr className="text-outlineVariant mt-1 mb-4" />
      {Object.values(tabs).map(
        (tab, i) => index === i + 1 && <div key={index}>{tab}</div>,
      )}
    </>
  );
};

export default Tabs;
