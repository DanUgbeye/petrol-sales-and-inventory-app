import React from "react";

export function useUserProfileCardController() {
  const [photo, setPhoto] = React.useState<any>([]);

  function handlePhotoClick() {}

  return {
    photo,
    handlePhotoClick,
  };
}
