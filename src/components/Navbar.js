'use client';

import Hug from './Hug';
import Link from 'next/link';
import { RiSearchLine } from '@remixicon/react';
import { RiMenuLine } from '@remixicon/react';
import Search from './Search';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { RiArrowRightLine } from '@remixicon/react';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [tag, setTag] = useState(null);
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  const isHomePage = path === '/';

  useEffect(() => {
    if (path.includes('tags') && params.tag) {
      setTag(`#${decodeURIComponent(params.tag)}`);
      setShowSearch(true);
    }
  }, [params.tag, path]);

  return (
    <section className="w-full md:w-[680px] h-14 px-3 bg-white sticky top-0 py-2 z-10">
      <nav className="flex justify-between items-center py-1">
        <div>
          {/* If home page show logo */}
          {!showSearch && isHomePage && (
            <Link href="/" className="text-2xl">
              لوجو
            </Link>
          )}
          {/* Show back button instead of logon on other page */}
          {!showSearch && !isHomePage && (
            <Hug onClick={() => router.back()}>
              <RiArrowRightLine
                size={24}
                className="fill-light-onSurfaceVariant"
              />
            </Hug>
          )}
          {/* Show search input when showSearch is true */}
          {showSearch && <Search tag={tag} />}
        </div>

        <div className="flex justify-items-center gap-2">
          {!showSearch && (
            <div className="rounded-full">
              <Hug onClick={() => setShowSearch(true)}>
                <RiSearchLine
                  size="24"
                  className="fill-light-onSurfaceVariant"
                />
              </Hug>
            </div>
          )}

          <div>
            <Hug>
              <RiMenuLine size="24" className="fill-light-onSurfaceVariant" />
            </Hug>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
