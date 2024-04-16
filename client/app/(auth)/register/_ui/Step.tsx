import InputBox from "../../_ui/InputBox";
import Button from "../../_ui/Button";

interface IStep {
  action: (formData: FormData) => void;
  index: number;
  placeholder: string;
  id: string;
}

export default function Step({ action, index, placeholder, id }: IStep) {
  return (
    <form action={action}>
      <InputBox id={id} placeholder={placeholder} />
      <Button text={index === 2 ? "Register" : "Continue"} />
    </form>
  );
}
