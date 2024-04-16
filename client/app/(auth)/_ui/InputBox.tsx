interface IInputBox {
  id: string;
  placeholder: string;
  hidden?: boolean;
}

export default function InputBox({ id, placeholder, hidden }: IInputBox) {
  return (
    <div className={`${hidden ? "hidden" : ""}`}>
      <label htmlFor={id} className="block dark:text-grayscale-50">
        {placeholder}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        required
        className="p-3 block rounded-sm focus:border-accent-border border border-black focus:outline-none w-72 h-10"
      />
    </div>
  );
}
