const Button = ({ children, onClick, type = "button", disabled, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-gray-300 disabled:cursor-not-allowed ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
