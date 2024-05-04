'use client';

import { RiArrowRightLine } from '@remixicon/react';
import { RiCloseFill } from '@remixicon/react';
import Hug from './Hug';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchLine } from '@remixicon/react';
import clsx from 'clsx';

const Search = ({ isShow, onHideSearch, tag = null }) => {
  const router = useRouter();
  const [query, setQuery] = useState(tag || '');
  const [timeoutId, setTimeoutId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    isShow && !tag && inputRef.current.focus();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [tag, isShow]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSuggestClick = (value) => {
    clearTimeout(timeoutId);
    setQuery(value);
    setShowSuggestions(false);
  };

  const handleRemoveClick = () => {
    setQuery('');
    setShowSuggestions(true);
    inputRef.current.focus();
  };

  const onBlur = () => {
    const timeout = setTimeout(() => {
      setShowSuggestions(false);
      if (!query) {
        onHideSearch();
      }
    }, 200);
    setTimeoutId(timeout);
  };

  return (
    <section>
      <label htmlFor="term">
        {''}
        <input
          className={clsx('search-input relative', {
            'rounded-br-none rounded-bl-none transition-all duration-[800ms]':
              showSuggestions,
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
          <button onClick={() => handleSuggestClick('عشوائي')}>
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </button>
          <button onClick={() => handleSuggestClick('عشوائي')}>
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </button>
          <button onClick={() => handleSuggestClick('عشوائي')}>
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </button>
          <button onClick={() => handleSuggestClick('عشوائي')}>
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </button>
          <button onClick={() => handleSuggestClick('عشوائي')}>
            <li>
              <Hug>
                <RiSearchLine size={24} />
              </Hug>
              عشوائي
            </li>
          </button>
        </ul>
      )}

      <div className="absolute top-[16%] right-4">
        <Hug onClick={() => router.back()}>
          <RiArrowRightLine size={20} className="fill-light-onSurfaceVariant" />
        </Hug>
      </div>
      <div className="z-11 absolute top-[16%] left-14">
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
