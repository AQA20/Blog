'use client';

const Button = ({
  children,
  title,
  titleStyle = 'text-white',
  style = 'bg-primary',
  onClick = () => null,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${style} bg-primary text-onPrimary rounded-full gap-2 py-2 px-4 my-2`}
    >
      <div className="flex justify-between items-center gap-2">
        <p className={`${titleStyle}`}>{title}</p>
        {children}
      </div>
      {''}
    </button>
  );
};

export default Button;
