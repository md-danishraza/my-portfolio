import { memo } from "react";

const ProfileImage = memo(({ profile }) => (
  <image
    href={profile}
    x="-25"
    y="-25"
    width="250"
    height="250"
    // preserveAspectRatio="xMidYMid slice"
  />
));

export default ProfileImage;
