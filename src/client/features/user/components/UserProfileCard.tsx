import React from "react";

export function useUserProfileCardController() {
  const [photo, setPhoto] = React.useState<any>([]);

  function handlePhotoClick() {}

  return {
    photo,
    handlePhotoClick,
  };
}

export interface UserProfileCardProps {}

export default function UserProfileCard(props: UserProfileCardProps) {
  const { handlePhotoClick } = useUserProfileCardController();

  return (
    <div
      onClick={() => {
        handlePhotoClick();
      }}
    >
      UserProfileCard
    </div>
  );
}
