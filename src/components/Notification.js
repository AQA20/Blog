'use client';

import { useEffect, useRef } from 'react';
import Hug from './Hug';
import clsx from 'clsx';
import { debounce } from '@/lib';
import CheckLine from './iconComponents/CheckLine';
import CloseFill from './iconComponents/CloseFill';
import ErrorWarningLine from './iconComponents/ErrorWarningLine';
import FileCopyLine from './iconComponents/FileCopyLine';

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
        return <ErrorWarningLine size={24} className="text-inverseOnSurface" />;
      case 'error':
        return <ErrorWarningLine size={24} className="text-inverseOnSurface" />;
      case 'success':
        return <CheckLine size={24} className="text-inverseOnSurface" />;
      case 'copy':
        return <FileCopyLine size={24} className="text-inverseOnSurface" />;
    }
  };

  return (
    <div
      ref={notificationRef}
      className={clsx(
        'fixed z-20 w-[80%] sm:w-fit bottom-[50px] md:bottom-[30px] pr-4 pl-1 py-[4px] rounded-lg transition-all duration-500 ease-in-out left-1/2 transform -translate-x-1/2',
        {
          'bg-[#c7ad6b]': type === 'warning',
          'bg-[#dc2626]': type === 'error',
          'bg-[#15803d]': type === 'success',
          'bg-inverseSurface': type === 'copy',
          'visible translate-y-0': isShow,
          'invisible translate-y-[200px]': !isShow,
        },
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Icon />
          </div>
          <p className="text-inverseOnSurface">{text}</p>
        </div>
        <div>
          <Hug onClick={onClose}>
            <CloseFill size={24} className="fill-inverseOnSurface" />
          </Hug>
        </div>
      </div>
    </div>
  );
};

export default Notification;
