import React from "react";

const ToggleDarkMode = (props) => {
  const { on = true, onClick, ...rest } = props;
  return (
    <label className="flex items-center cursor-pointer select-none gap-x-3">
      <div className="flex items-center justify-center text-white rounded-full cursor-pointer w-14 h-14 bg-slate-800 gap-x-3">
        <input
          type="checkbox"
          checked={on}
          className="hidden"
          onChange={() => {}}
          onClick={onClick}
        />
        {on ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
      <span className="text-slate-900 dark:text-white">
        {on ? "DarkMode" : "LightMode"}
      </span>
    </label>
  );
};

import PropTypes from "prop-types";
ToggleDarkMode.propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default ToggleDarkMode;