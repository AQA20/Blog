'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Tabs = ({ tabs, index }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    index && setCurrentIndex(index);
  }, [index]);

  return (
    <>
      {
        <div className="relative flex items-center gap-[16px] border-b-dark-outlineVariant">
          {Object.keys(tabs).map((header, index) => (
            <button
              key={header}
              onClick={() => setCurrentIndex(index + 1)}
              className="flex items-center h-10  hover:cursor-pointer hover:text-light-primary"
            >
              <div className="relative">
                <p
                  className={clsx('text-sm', {
                    'text-light-primary': currentIndex === index + 1,
                  })}
                >
                  {header}
                </p>
                {currentIndex === index + 1 && (
                  <hr className="absolute w-full top-[31px] h-1 bg-light-primary rounded-t-[100px] rounder-r-[100px]" />
                )}
              </div>
            </button>
          ))}
        </div>
      }
      <hr className="text-light-outlineVariant mt-1 mb-4" />
      {Object.values(tabs).map(
        (tab, index) =>
          currentIndex === index + 1 && <div key={index}>{tab}</div>
      )}
    </>
  );
};

export default Tabs;
