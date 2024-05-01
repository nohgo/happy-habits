import ContainerBox from "../../../_ui/ContainerBox";
import AuthBasic from "../../../_ui/AuthBasic";

export const metadata = {
  title: "Success",
  description: "Email Sent Successfully",
};

export default function page() {
  return (
    <AuthBasic>
      <ContainerBox>
        <div className="mt-10 text-3xl dark:text-grayscale-50">Success</div>
      </ContainerBox>
    </AuthBasic>
  );
}
