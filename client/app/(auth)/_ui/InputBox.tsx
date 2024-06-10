import { useState } from "react";
import Image from "next/image";

export interface IInputBox {
  id: string;
  placeholder: string;
  type?: string;
  pattern?: string;
  invalidError: string;
  min?: string;
}

export default function InputBox({
  id,
  placeholder,
  type,
  invalidError,
  pattern,
  min,
}: IInputBox) {
  const [isVisible, setIsVisible] = useState(
    type === "password" ? false : true,
  );

  return (
    <div>
      <label htmlFor={id} className="mb-1 inline-block dark:text-grayscale-50">
        {placeholder}
      </label>
      <div className="relative w-fit">
        <input
          id={id}
          name={id}
          placeholder={placeholder}
          type={isVisible ? type || "text" : "password"}
          pattern={pattern || ".*"}
          required
          className={`block h-10 w-72 rounded-sm p-3 outline outline-1 outline-grayscale-400 transition-all hover:outline-accent-border focus:outline-2 focus:outline-accent-border`}
          min={min || ""}
        />
        <button
          type="button"
          className={`${type === "password" ? "dark:hidden" : "hidden"} absolute inset-y-0 right-0 my-auto h-4 cursor-default pr-3 hover:opacity-75 active:invert`}
          onMouseDown={() => setIsVisible(!isVisible)}
          onMouseUp={() => setIsVisible(!isVisible)}
        >
          <Image
            src="/eyeball-light-mode.svg"
            alt="Show Password"
            width={20}
            height={20}
          ></Image>
        </button>
        <button
          type="button"
          className={`${type === "password" ? "hidden dark:block" : "hidden"} absolute inset-y-0 right-0 my-auto h-4 cursor-default pr-3 hover:opacity-75 active:invert`}
          onMouseDown={() => setIsVisible(!isVisible)}
          onMouseUp={() => setIsVisible(!isVisible)}
        >
          {" "}
          <Image
            src="/eyeball-dark-mode.svg"
            alt="Show Password"
            width={20}
            height={20}
          ></Image>
        </button>
      </div>
      <span className="hidden text-red-500">{invalidError}</span>
    </div>
  );
}
