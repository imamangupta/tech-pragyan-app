import { useEffect } from "react";

const useUnloadConfirmation = (message: string = "Are you sure you want to leave?") => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message; // For older browsers

        // my defore delete tha code


    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]);
};

export default useUnloadConfirmation;
