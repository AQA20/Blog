'use client';

const Hug = ({
  children,
  style = '',
  label = 'button',
  disabled = false,
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[40px] 
      h-[40px] flex justify-center 
      items-center disabled:text-light-outlineVariant 
      disabled:dark:text-dark-outlineVariant ${style}`}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Hug;
