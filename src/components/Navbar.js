'use client';

import { useState, useEffect } from 'react';
import Hug from './Hug';
import Link from 'next/link';
import Search from './Search';
import Menu from './Menu';
import { useRouter, usePathname, useParams } from 'next/navigation';
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

const menuItems = [
  { name: 'الرئيسية', url: '/', icon: <RiHome2Line size={24} /> },
  { name: 'الهاشتاقات', url: '/tags', icon: <RiHashtag size={24} /> },
];

const subMenuItems = {
  'طابع الواجهة': [
    {
      name: 'تلقائي',
      onClick: () => null,
      icon: <RiContrastFill size={24} />,
    },
    {
      name: 'وضع الليل',
      onClick: () => null,
      icon: <RiMoonLine size={24} />,
    },
    {
      name: 'وضع النهار',
      onClick: () => null,
      icon: <RiSunLine size={24} />,
    },
  ],
};

const footerItems = [
  { name: 'شروط الخدمة', url: '/policy?index=1' },
  { name: 'سياسة الخصوصية', url: '/policy?index=2' },
  { name: 'سياسة الكوكيز', url: '/policy?index=3' },
];

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [tag, setTag] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const params = useParams();
  const isHomePage = path === '/';

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    if (path.includes('tags') && params.tag) {
      setTag(`#${decodeURIComponent(params.tag)}`);
      setShowSearch(true);
    }
  }, [params.tag, path, showSearch]);

  return (
    <div className="w-full md:w-[680px] h-14 px-3 bg-white sticky top-0 z-10 py-2">
      <nav className="flex justify-between items-center">
        <div>
          {/* If home page show logo and search is hidden */}
          {!showSearch && isHomePage && (
            <Link href="/" className="text-2xl">
              لوجو
            </Link>
          )}
          {/* Show back button instead of logo on other pages */}
          {!showSearch && !isHomePage && (
            <Hug onClick={handleBackClick}>
              <RiArrowRightLine
                size={24}
                className="fill-light-onSurfaceVariant"
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
                  className="fill-light-onSurfaceVariant"
                />
              </Hug>
            </div>
          )}
          {/* Show search input when showSearch is true */}
          {showSearch && <Search tag={tag} isShow={showSearch} />}
          <div className="relative">
            {/* Show menu ico when showMenu is true */}
            {!showMenu && (
              <Hug onClick={() => setShowMenu(true)}>
                <RiMenuLine size="24" className="fill-light-onSurfaceVariant" />
              </Hug>
            )}

            {showMenu && (
              <button
                onClick={() => setShowMenu(false)}
                className="flex items-center justify-center h-[40px] w-[40px]  bg-light-surfaceContainer rounded-full hover:cursor-pointer"
              >
                <RiCloseLine size={24} className="text-light-onSurface" />
              </button>
            )}

            {showMenu && (
              <div className="absolute left-1 top-14">
                <Menu
                  onClose={() => setShowMenu(false)}
                  menuItems={menuItems}
                  subMenuItems={subMenuItems}
                  footerItems={footerItems}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
