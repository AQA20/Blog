'use client';

import Link from 'next/link';
import SubMenu from './SubMenu';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const Menu = ({ onClose, menuItems, subMenuItems, footerItems = [] }) => {
  const menuRef = useRef(null);
  const path = usePathname();
  const searchParams = useSearchParams();

  // Convert searchParams to a string for stable dependency
  const searchParamsString = searchParams.toString();

  const activeClass = (url) => {
    return url === path ? 'active' : '';
  };

  const footerActiveClass = (item) => {
    return searchParamsString && item.url.includes(searchParamsString)
      ? 'active'
      : '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Clicked outside the target element
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="w-[280px] text-onSurface">
      <ul className="py-2 bg-surfaceContainer rounded-lg">
        {menuItems.map((item, index) => (
          <li key={index} className="h-[48px] menu-link px-4 py-3">
            {item?.url ? (
              <Link
                href={item.url}
                className={`flex gap-2 hover-pointer ${activeClass(item.url)}`}
              >
                <div>{item?.icon}</div>
                <div>{item.name}</div>
              </Link>
            ) : (
              <div
                className="flex gap-2 hover-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={null}
                onClick={item.onClick}
              >
                <div>{item?.icon}</div>
                <button>{item.name}</button>
              </div>
            )}
          </li>
        ))}
        {Object.keys(subMenuItems).length > 0 && (
          <hr className="border-outlineVariant my-2" />
        )}
        <SubMenu items={subMenuItems} />
      </ul>
      {footerItems.length > 0 && (
        <ul className="mt-1 py-2 bg-surfaceContainer rounded-lg">
          {footerItems.map((item, index) => (
            <li
              key={index}
              className="h-[40px] text-sm menu-link px-4 py-3 gap-2"
            >
              <Link
                className={`hover-pointer ${footerActiveClass(item)}`}
                href={item.url}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
