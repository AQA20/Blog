'use client';

import { useEffect, useRef } from 'react';
import Hug from './Hug';
import clsx from 'clsx';
import { debounce } from '@/lib';
import {
  RiCheckLine,
  RiCloseFill,
  RiErrorWarningLine,
  RiFileCopyLine,
} from '@remixicon/react';

const Notification = ({ isShow, onClose, text, type, autoHide = true }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    // Automatically hide the notification after specified ms;
    const hideAuto = debounce(onClose, 5000);
    isShow && autoHide && hideAuto();
  }, [isShow]);

  const Icon = () => {
    switch (type) {
      case 'warning':
        return (
          <RiErrorWarningLine
            size={24}
            className="text-light-inverseOnSurface"
          />
        );
      case 'error':
        return (
          <RiErrorWarningLine
            size={24}
            className="text-light-inverseOnSurface"
          />
        );
      case 'success':
        return (
          <RiCheckLine size={24} className="text-light-inverseOnSurface" />
        );
      case 'copy':
        return (
          <RiFileCopyLine size={24} className="text-light-inverseOnSurface" />
        );
    }
  };

  return (
    <div
      ref={notificationRef}
      className={clsx(
        'fixed w-[80%] sm:w-fit bottom-[50px] md:bottom-[30px]  pr-4 pl-1 py-[4px] rounded-lg transition-all duration-500 ease-in-out left-1/2 transform -translate-x-1/2',
        {
          'bg-[#c7ad6b]': type === 'warning',
          'bg-[#dc2626]': type === 'error',
          'bg-[#15803d]': type === 'success',
          'bg-light-inverseSurface': type === 'copy',
          'visible translate-y-0': isShow,
          'invisible translate-y-[200px]': !isShow,
        }
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Icon />
          </div>
          <p className="text-light-inverseOnSurface">{text}</p>
        </div>
        <div>
          <Hug onClick={onClose}>
            <RiCloseFill size={24} className="fill-light-inverseOnSurface" />
          </Hug>
        </div>
      </div>
    </div>
  );
};

export default Notification;
