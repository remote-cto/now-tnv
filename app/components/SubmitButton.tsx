import React from "react";

interface SubmitButtonProps {
  loading?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading = false, onClick }) => {
  return (
    <div className="w-full px-4 max-w-screen-lg mx-auto mb-3">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-black text-white text-2xl font-extrabold py-4 px-3 rounded-full hover:bg-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 shadow-md mt-3"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          "SUBMIT"
        )}
      </button>
    </div>
  );
};

export default SubmitButton;