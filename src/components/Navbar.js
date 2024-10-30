'use client';

import { useState, useEffect, useMemo } from 'react';
import Hug from './Hug';
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
    <div className="w-full xl:w-[680px] h-14 px-3 py-2 sticky top-0 z-30 bg-light-surface dark:bg-dark-surface">
      <nav className="flex justify-between items-center">
        <div>
          {/* If home page and search is hidden */}
          {isHomePage &&
            !showSearch &&
            (!theme ? (
              <p>Logo</p>
            ) : (
              <a href="/" className="text-2xl" aria-label="Home Page Link">
                <Logo fill={theme === 'light' || !theme ? 'black' : 'white'} />
              </a>
            ))}
          {/* Show back button instead of logo on other pages */}
          {!showSearch && !isHomePage && (
            <Hug onClick={handleBackClick} label="Back Button">
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
              <Hug
                onClick={() => setShowSearch(true)}
                label="Show Search Button"
              >
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
            {/* Show menu icon when showMenu is false on medium screen and above */}
            {!showMenu && (
              <div className="hidden md:block ">
                <Hug onClick={() => setShowMenu(true)} label="Show Menu Button">
                  <RiMenuLine
                    size="24"
                    className="fill-light-onSurfaceVariant dark:fill-dark-onSurface"
                  />
                </Hug>
              </div>
            )}
            {/* Show menu icon when showMenu is false and when showSearch is false */}
            {!showMenu && !showSearch && (
              <div className="block md:hidden">
                <Hug onClick={() => setShowMenu(true)} label="Show Menu Button">
                  <RiMenuLine
                    size="24"
                    className="fill-light-onSurfaceVariant dark:fill-dark-onSurface"
                  />
                </Hug>
              </div>
            )}

            {showMenu && (
              <>
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center justify-center h-[40px] w-[40px]
                     bg-light-surfaceContainer dark:bg-dark-surfaceContainerLow 
                     rounded-full hover:cursor-pointer"
                  aria-label="Close Menu Button"
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
