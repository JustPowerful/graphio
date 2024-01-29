import { ChangeEvent, FC } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        className={`outline-none border-2 border-slate-900 rounded-md px-2 py-1 ${
          error && error.length > 0 && "border-red-500"
        }`}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && error.length > 0 && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

export default Input;
