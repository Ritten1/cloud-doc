import { useState, useEffect } from "react";

const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const handleKeyDonw = ({ keyCode }) => {
    if (keyCode === targetKeyCode) setKeyPressed(true);
  };

  const handleKeyUp = () => {
    setKeyPressed(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDonw);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDonw);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyPressed;
};

export default useKeyPress;
