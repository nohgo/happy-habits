import { useEffect, useState } from "react";

interface IInputBox {
  id: string;
  placeholder: string;
  hasPressed: boolean;
  set: Function;
}

export default function InputBox({
  id,
  placeholder,
  hasPressed,
  set,
}: IInputBox) {
  const [value, setValue] = useState("");
  useEffect(() => {
    if (hasPressed) {
      set(value);
    }
  }, [hasPressed]);
  return (
    <div>
      <label htmlFor={id} className="block">
        {placeholder}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        className="p-3 block rounded-sm focus:border-accent-border border border-black focus:outline-none w-72 h-10"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
