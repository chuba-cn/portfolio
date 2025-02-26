import React from 'react';

type MenuButtonProps = {
  menuIsOpen: boolean,
  handleMenuClick: () => void;
}

const MenuButton = ({menuIsOpen, handleMenuClick}: MenuButtonProps) => {
  return (
    <button
      className="flex-col justify-center items-center hidden lg:flex"
      onClick={handleMenuClick}
    >
      <span
        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
          menuIsOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
        }`}
      ></span>
      <span
        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
          menuIsOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
          menuIsOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
        }`}
      ></span>
    </button>
  );
}

export default MenuButton