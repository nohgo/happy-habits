interface IInputBox {
  id: string;
  placeholder: string;
}

export default function InputBox({ id, placeholder }: IInputBox) {
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
      />
    </div>
  );
}
