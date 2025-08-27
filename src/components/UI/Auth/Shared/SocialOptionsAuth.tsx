import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { BubbleButton } from "../../Buttons/BubbleButton";
export const SocialOptionsAuth = () => (
  <div>
    <div className="mb-3 flex gap-3">
      <BubbleButton className="flex w-full justify-center py-3">
        <FaFacebook />
      </BubbleButton>
      <BubbleButton className="flex w-full justify-center py-3">
        <FaGoogle />
      </BubbleButton>
      <BubbleButton className="flex w-full justify-center py-3">
        <FaTwitter />
      </BubbleButton>
      <BubbleButton className="flex w-full justify-center py-3">
        <FaGithub />
      </BubbleButton>
    </div>
  </div>
);
