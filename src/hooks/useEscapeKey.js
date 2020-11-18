import { useEffect } from "react";

function useEscapeKey(onEscapeKey) {
  useEffect(() => {
    const onKeydown = (event) => {
      if (["Escape", "Esc"].includes(event.key)) {
        onEscapeKey()
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [onEscapeKey]);
}

export default useEscapeKey