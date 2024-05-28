'use client';

import { RiArrowLeftSLine } from '@remixicon/react';
import { useReducer, useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

const SubMenu = ({ items }) => {
  // Define reducer function to manage state for each submenu
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, [action.name]: action.value };
      default:
        return state;
    }
  };

  // Initialize initialState using useMemo
  const initialState = useMemo(() => {
    const initState = {};
    Object.entries(items).forEach(([name]) => {
      initState[name] = false; // Initial state for each submenu
    });
    return initState;
  }, [items]);

  const [subMenus, dispatch] = useReducer(reducer, initialState);

  const handleSubMenuClick = (name) => {
    dispatch({
      type: 'SET_STATE',
      name,
      value: !subMenus[name],
    });
  };

  return (
    <li>
      {Object.entries(items).map(([name, items]) => (
        <ul key={name}>
          <button
            onClick={() => handleSubMenuClick(name)}
            className="h-[48px] w-full flex justify-between items-center py-3 pr-6 pl-4 transition-colors
            duration-300 hover:cursor-pointer hover:text-light-primary hover:dark:first:text-dark-primary"
          >
            {name}
            <div
              className={clsx('transition-transform duration-300', {
                'transform -rotate-90': subMenus[name] === true,
              })}
            >
              <RiArrowLeftSLine size={24} />
            </div>
          </button>

          {subMenus[name] === true &&
            items.map((item, index) => (
              <li
                key={item?.url || index}
                className="h-[48px] menu-link px-4 py-3 gap-2"
              >
                {item?.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`menu-link px-4 py-3 gap-2 hover-pointer ${item.style}`}
                  >
                    <div>{item?.icon}</div>
                    <div>{item.name}</div>
                  </button>
                ) : (
                  <div className="menu-link px-4 py-3 gap-2">
                    <div>{item?.icon}</div>
                    <Link
                      href={item.url}
                      className={`text-2xl hover-pointer ${item.style}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                )}
              </li>
            ))}
        </ul>
      ))}
    </li>
  );
};
export default SubMenu;
