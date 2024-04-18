'use client';

import { useEffect, useState, useRef } from 'react';
import Hug from './Hug';
import clsx from 'clsx';
import { debounce } from '@/lib';
import {
  RiCheckLine,
  RiCloseFill,
  RiErrorWarningLine,
  RiFileCopyLine,
} from '@remixicon/react';

const Notification = ({
  isShow,
  onShow,
  onClose,
  text,
  type,
  autoHide = true,
}) => {
  const notificationRef = useRef(null);

  const handleMouseEnter = () => {
    onShow();
  };

  const handleTouchStart = () => {
    onShow();
  };

  useEffect(() => {
    // Save notification ref to use it in cleanup function
    const element = notificationRef.current;
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('touchstart', handleTouchStart);

    // Automatically hide the notification after specified ms;
    const hideAuto = debounce(onClose, 5000);
    isShow && autoHide && hideAuto();

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('touchstart', handleTouchStart);
    };
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
        'fixed max-w-sm md:max-w-md top-16 right-2 px-4 py-2 rounded-lg transition-opacity duration-[5000ms]',
        {
          'bg-[#fbbf24]': type === 'warning',
          'bg-[#dc2626]': type === 'error',
          'bg-[#15803d]': type === 'success',
          'bg-light-inverseSurface': type === 'copy',
        }
      )}
      style={{ opacity: isShow ? 1 : 0 }}
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
