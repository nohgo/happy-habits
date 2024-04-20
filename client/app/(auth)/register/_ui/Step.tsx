import InputBox, { IInputBox } from "../../_ui/InputBox";
import Button from "../../_ui/Button";
import Link from "next/link";

export interface IStep extends IInputBox {
  action: (formData: FormData) => void;
  index: number;
  isInvalid: boolean;
  invalidMessage: string;
}

export default function Step({
  action,
  index,
  placeholder,
  id,
  type,
  invalidError,
  isInvalid,
  invalidMessage,
}: IStep) {
  return (
    <form action={action} className="flex flex-col justify-between items-center flex-grow">
      <div className="mt-10 text-3xl dark:text-grayscale-50">
        Register for Happy Habits
      </div>
      <InputBox
        id={id}
        placeholder={placeholder}
        type={type}
        invalidError={invalidError}
      />
      <div>
      <Button text={index === 2 ? "Register" : "Continue"} isInvalid = {isInvalid} invalidMessage={invalidMessage}/>
      <Link
        href="/login"
        className="block underline transition hover:no-underline dark:text-grayscale-50"
      >
        Already have an account? Log in
      </Link>
      </div>
    </form>
  );
}
