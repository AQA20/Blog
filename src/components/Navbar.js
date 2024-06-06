'use client';

import { useState, useEffect, useMemo } from 'react';
import Hug from './Hug';
import Link from 'next/link';
import Search from './Search';
import Menu from './Menu';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  RiMenuLine,
  RiCloseLine,
  RiSearchLine,
  RiArrowRightLine,
  RiHome2Line,
  RiHashtag,
  RiContrastFill,
  RiMoonLine,
  RiSunLine,
} from '@remixicon/react';
import { useTheme } from 'next-themes';
import Logo from './Logo';

const menuItems = [
  { name: 'الرئيسية', url: '/', icon: <RiHome2Line size={24} /> },
  { name: 'الهاشتاقات', url: '/tags', icon: <RiHashtag size={24} /> },
];

const subMenuItems = (setTheme, theme) => ({
  'طابع الواجهة': [
    {
      name: 'تلقائي',
      onClick: () => setTheme('system'),
      icon: <RiContrastFill size={24} />,
      style: theme === 'system' ? 'active' : '',
    },
    {
      name: 'وضع الليل',
      onClick: () => setTheme('dark'),
      icon: <RiMoonLine size={24} />,
      style: theme === 'dark' ? 'active' : '',
    },
    {
      name: 'وضع النهار',
      onClick: () => setTheme('light'),
      icon: <RiSunLine size={24} />,
      style: theme === 'light' ? 'active' : '',
    },
  ],
});

const footerItems = [
  { name: 'شروط الخدمة', url: '/policy?index=1' },
  { name: 'سياسة الخصوصية', url: '/policy?index=2' },
  { name: 'سياسة الكوكيز', url: '/policy?index=3' },
];

const Navbar = () => {
  const searchParams = useSearchParams();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { setTheme, theme } = useTheme();
  const isHomePage = path === '/';
  const subMenuItemsMemo = useMemo(
    () => subMenuItems(setTheme, theme),
    [theme],
  );

  const handleBackClick = () => {
    router.back();
  };

  //Memoizes the search query value.
  const searchQuery = useMemo(
    () => searchParams.get('search')?.toString(),
    [searchParams],
  );

  useEffect(() => {
    searchQuery && setShowSearch(true);
    return () => {
      setShowSearch(false);
      setShowMenu(false);
    };
  }, [searchQuery, path]);

  return (
    <div
      className="w-full xl:w-[680px] h-14 px-3 py-2 sticky top-0 z-20 bg-white dark:bg-surface"
      style={{ backgroundColor: theme === 'dark' ? '#0F1417' : 'white' }}
    >
      <nav className="flex justify-between items-center">
        <div>
          {/* If home page show logo and search is hidden */}
          {isHomePage && !showSearch && (
            <Link href="/" className="text-2xl">
              <Logo fill={theme === 'light' ? 'black' : 'white'} />
            </Link>
          )}
          {/* Show back button instead of logo on other pages */}
          {!showSearch && !isHomePage && (
            <Hug onClick={handleBackClick}>
              <RiArrowRightLine
                size={24}
                className="fill-light-onSurfaceVariant dark:fill-dark-onSurface"
              />
            </Hug>
          )}
        </div>

        <div className="flex justify-items-center gap-2">
          {!showSearch && (
            <div className="rounded-full">
              <Hug onClick={() => setShowSearch(true)}>
                <RiSearchLine
                  size="24"
                  className="fill-light-onSurfaceVariant dark:fill-dark-onSurface"
                />
              </Hug>
            </div>
          )}
          {/* Show search input when showSearch is true */}
          {showSearch && (
            <Search
              isShow={showSearch}
              onHideSearch={() => setShowSearch(false)}
            />
          )}
          <div className="relative">
            {/* Show menu ico when showMenu is true */}
            {!showMenu && (
              <Hug onClick={() => setShowMenu(true)}>
                <RiMenuLine
                  size="24"
                  className="fill-light-onSurfaceVariant dark:fill-dark-onSurface"
                />
              </Hug>
            )}

            {showMenu && (
              <>
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center justify-center h-[40px] w-[40px]
                     bg-light-surfaceContainer dark:bg-dark-surfaceContainerLow 
                     rounded-full hover:cursor-pointer"
                >
                  <RiCloseLine
                    size={24}
                    className="text-light-onSurface dark:text-dark-onSurface"
                  />
                </button>
                <div className="absolute left-1 top-14">
                  <Menu
                    onClose={() => setShowMenu(false)}
                    menuItems={menuItems}
                    subMenuItems={subMenuItemsMemo}
                    footerItems={footerItems}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
