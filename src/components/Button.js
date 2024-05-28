'use client';

const Button = ({
  children,
  title,
  titleStyle = 'text-white',
  style = 'bg-light-primary',
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${style} dark:bg-dark-primary dark:text-dark-onPrimary  rounded-full gap-2 py-2 px-4 my-2`}
    >
      <div className="flex justify-between items-center gap-2">
        <p className={`${titleStyle} dark:text-dark-onPrimary`}>{title}</p>
        {children}
      </div>
    </button>
  );
};

export default Button;
