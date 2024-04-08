'use client';

const Hug = ({ children, onClick = () => null }) => {
  return (
    <button
      onClick={onClick}
      className="w-[40px] h-[40px] flex justify-center items-center"
    >
      {children}
    </button>
  );
};

export default Hug;
