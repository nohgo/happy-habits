export interface IInputBox {
  id: string;
  placeholder: string;
  type?: string;
  pattern?: string;
  invalidError: string;
}

export default function InputBox({
  id,
  placeholder,
  type,
  invalidError,
  pattern,
}: IInputBox) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 inline-block dark:text-grayscale-50">
        {placeholder}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        type={type || "text"}
        pattern={pattern || ".*"}
        required
        className="block h-10 w-72 rounded-sm p-3 outline outline-1 outline-grayscale-400 transition-all hover:outline-accent-border focus:outline-2 focus:outline-accent-border dark:bg-transparent dark:text-white dark:caret-white"
      />
      <span className="hidden text-red-500">{invalidError}</span>
    </div>
  );
}
