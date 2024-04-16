import InputBox, { IInputBox } from "../../_ui/InputBox";
import Button from "../../_ui/Button";

export interface IStep extends IInputBox {
  action: (formData: FormData) => void;
  index: number;
}

export default function Step({
  action,
  index,
  placeholder,
  id,
  type,
  invalidError,
}: IStep) {
  return (
    <form action={action}>
      <InputBox
        id={id}
        placeholder={placeholder}
        type={type}
        invalidError={invalidError}
      />
      <Button text={index === 2 ? "Register" : "Continue"} />
    </form>
  );
}
