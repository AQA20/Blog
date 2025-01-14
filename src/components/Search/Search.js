'use client';

import ArrowRightLine from '../iconComponents/ArrowRightLine';
import CloseFill from '../iconComponents/CloseFill';
import SearchLine from '../iconComponents/SearchLine';
import Hug from '../Hug';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import clsx from 'clsx';
import { fetchSuggestions, debounce } from '@/lib';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import './search.css';

const Search = ({ isShow, onHideSearch }) => {
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  const section = useRef(null);
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Memoizes the addHashtag value.
  const addHashtag = useMemo(() => path.includes('tags'), [path]);
  // Memoizes the search query value.
  const searchQuery = useMemo(
    () => searchParams.get('search')?.toString() || '',
    [searchParams],
  );
  // Create a persistent reference across the renders to the debounce function
  // to prevent recreation the debounce function on each render
  const debounceFunction = useRef(
    // Use the debounce function to prevent a request from being sent on every keystroke
    debounce(async (value) => {
      const data = await fetchSuggestions(value);
      setSuggestions({ show: true, data });
    }, 100),
  ).current;

  // Memoizes the URLSearchParams instance creation.
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const [inputValue, setInputValue] = useState(
    addHashtag ? `#${searchQuery}` : searchQuery,
  );
  const [suggestions, setSuggestions] = useState({
    show: false,
    data: [],
  });

  const [timeoutId, setTimeoutId] = useState(null);

  // Show suggestions on initial load
  useEffect(() => {
    !addHashtag && debounceFunction('');
  }, []);

  // Update inputValue when searchQuery changes.
  useEffect(() => {
    setInputValue(addHashtag ? `#${searchQuery}` : searchQuery);
  }, [searchQuery, addHashtag]);

  // Focus input when search is shown.
  useEffect(() => {
    if (isShow) {
      inputRef.current.focus();
    }

    // Cleanup function to clear timeout on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isShow, timeoutId]);

  const handleOnChange = (e) => {
    const value = e.target.value?.trim();
    setInputValue(value);
    debounceFunction(value);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      router.replace(`/search?${params.toString()}`);
      setSuggestions((prev) => ({ ...prev, show: false }));
    }
  };

  const onFocus = () => {
    clearTimeout(timeoutId);
    setSuggestions((prev) => ({ ...prev, show: false }));
  };

  const onBlur = (e) => {
    // Check if the active element is the current element
    if (section.current.contains(e.relatedTarget)) {
      return;
    }

    // Close suggestions after a specific time
    const timeout = setTimeout(() => {
      setSuggestions({ data: [], show: false });
      // Hide search if input is empty
      if (!searchQuery) {
        onHideSearch();
      }
    }, 200);
    // Set timeout id to clear it on component unmount
    setTimeoutId(timeout);
  };

  return (
    <Suspense fallback="...loading">
      <section ref={section} className="w-full">
        <label htmlFor="term">
          {''}
          <input
            className={clsx(
              `search-input relative focus:border-none
              bg-surfaceContainerHigh
              text-onSurfaceVariant`,
              {
                'rounded-br-none rounded-bl-none transition-all duration-[800ms]':
                  suggestions.show && suggestions.data?.length > 0,
              },
            )}
            type="text"
            name="term"
            placeholder="ابحث عن اي شيء"
            aria-label="مربع البحث"
            value={inputValue}
            onChange={handleOnChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={inputRef}
            autoComplete="off"
          />
        </label>

        {suggestions.show && suggestions.data?.length > 0 && (
          <ul
            ref={suggestionRef}
            className={`suggestions rounded-tr-none rounded-tl-none block
           bg-surfaceContainerHigh`}
          >
            <li className="text-sm hover:cursor-default">مقترحات قد تعجبك!</li>
            {suggestions.data?.map((suggestion) => (
              <a
                key={suggestion.title}
                href={`/${suggestion.slug}`}
                className="transition-color duration-100 hover:text-primary w-full"
              >
                <li>
                  <Hug>
                    <SearchLine size={24} />
                    {''}
                  </Hug>
                  <div className="truncate w-full">{suggestion.title}</div>
                </li>
              </a>
            ))}
          </ul>
        )}

        <div className="absolute top-[16%] right-2">
          <Hug onClick={onHideSearch}>
            <ArrowRightLine size={20} className="fill-onSurfaceVariant" />
            {''}
          </Hug>
        </div>
        <div className="z-11 absolute top-[16%] left-3 md:left-14">
          {inputValue && (
            <Hug onClick={onHideSearch}>
              <CloseFill size={20} className="fill-onSurfaceVariant" />
              {''}
            </Hug>
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default Search;
