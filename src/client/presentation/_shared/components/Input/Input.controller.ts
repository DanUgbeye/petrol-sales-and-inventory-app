import React, { InputHTMLAttributes } from "react";
import { InputProps } from "./Input";

export default function useInputController(props: InputProps) {
  const { type, onKeyDown, onChange, ...restProps } = props;
  const [showPw, setShowPw] = React.useState(false);
  const [modifiedProps, setModifiedProps] = React.useState<InputProps>(props);

  React.useEffect(() => {
    setModifiedProps({
      type: type === "password" ? (showPw ? "text" : "password") : type,
      // autoComplete: type === "email" ? "on" : "off",
      onKeyDown: (e) => {
        if (type === "number" && ["e", "E"].includes(e.key)) {
          e.preventDefault();
        }
        onKeyDown && onKeyDown(e);
      },
      onChange: (e) => {
        if (type === "tel") {
          const validationRegex = /^[0-9+\s]+$/;

          // if input is valid phone number and is less than 15 characters
          if (
            e.target.value &&
            (!validationRegex.test(e.target.value) ||
              e.target.value.length > 15)
          ) {
            e.preventDefault();
            return;
          }
          // remove extra space from telephone numbers
          e.target.value = e.target.value.trim();
        }

        if (onChange) {
          onChange(e);
        }
      },
      ...restProps,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, showPw]);

  return {
    modifiedProps,
    showPw,
    setShowPw,
  };
}
