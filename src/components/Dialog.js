'use client';

import { useEffect, useRef } from 'react';
import Button from './Button';

const Dialog = ({
  children,
  okButtonTitle,
  closeButtonTitle,
  onOk,
  onClose = () => null,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.show();
  }, []);

  const handleClose = () => {
    onClose();
    dialogRef.current.close();
  };

  const handleActionClick = () => {
    onOk();
    dialogRef.current.close();
  };

  return (
    <dialog
      className="
      fixed 
      bottom-1
      left-1
      right-1
      w-sm 
      md:w-[1080px]
      p-6 
      border 
      border-solid 
      border-light-outlineVariant
      dark:border-dark-outlineVariant
      bg-light-surfaceContainerHigh
      dark:bg-dark-surfaceContainerHigh 
      rounded-lg
      "
      ref={dialogRef}
    >
      <div>{children}</div>
      <footer className="flex items-center gap-2">
        <Button onClick={handleActionClick} title={okButtonTitle} />
        <Button
          style="bg-transparent border border-light-primary"
          titleStyle="text-light-primary"
          onClick={handleClose}
          title={closeButtonTitle}
        />
      </footer>
    </dialog>
  );
};

export default Dialog;
