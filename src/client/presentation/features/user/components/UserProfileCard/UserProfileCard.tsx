import React from "react";
import { useUserProfileCardController } from "./UserProfileCard.controller";

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
