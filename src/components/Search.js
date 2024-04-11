'use client';

import { RiArrowRightLine } from '@remixicon/react';
import { RiCloseFill } from '@remixicon/react';
import Hug from './Hug';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchLine } from '@remixicon/react';
import clsx from 'clsx';

const Search = ({ tag = null }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (tag) {
      setQuery(tag);
    } else {
      inputRef.current.focus();
    }
  }, [tag]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSuggestClick = (value) => {
    setQuery(value);
    setShowSuggestions(false);
  };

  const handleRemoveClick = () => {
    setQuery('');
    setShowSuggestions(true);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    console.log(e);
  };

  const onBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <section>
      <label htmlFor="term" className="relative">
        {''}
        <input
          className={clsx('search-input ', {
            'rounded-br-none rounded-bl-none': showSuggestions,
          })}
          type="text"
          name="term"
          placeholder="ابحث عن اي شيء"
          value={query}
          onChange={handleOnChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={onBlur}
          ref={inputRef}
        />
      </label>

      {showSuggestions && (
        <ul className="suggestions rounded-tr-none rounded-tl-none block">
          <li className="text-sm hover:cursor-default">مقترحات قد تعجبك!</li>
          <div
            onClick={() => handleSuggestClick('عشوائي')}
            onKeyDown={(e) => handleKeyDown(e)}
            role="button"
            tabIndex={0}
          >
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </div>
          <div
            onClick={() => handleSuggestClick('عشوائي')}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </div>
          <div
            onClick={() => handleSuggestClick('عشوائي')}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </div>
          <div
            onClick={() => handleSuggestClick('عشوائي')}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </div>
          <div
            onClick={() => handleSuggestClick('عشوائي')}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </div>
        </ul>
      )}

      <div className="absolute top-3 right-4">
        <Hug onClick={() => router.back()}>
          <RiArrowRightLine size={20} className="fill-light-onSurfaceVariant" />
        </Hug>
      </div>
      <div className="z-11 absolute top-3 left-14">
        {query && (
          <Hug onClick={handleRemoveClick}>
            <RiCloseFill size={20} className="fill-light-onSurfaceVariant" />
          </Hug>
        )}
      </div>
    </section>
  );
};

export default Search;
