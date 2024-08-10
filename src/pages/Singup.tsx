import { SignUp } from "@clerk/clerk-react";
function CenteredSignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp />
    </div>
  );
}
export default CenteredSignUp;
