import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      function eventListenerCallback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.view.event.preventDefault();
          }
          callback();
        }
      }
      document.addEventListener("keydown", eventListenerCallback);

      return function () {
        document.removeEventListener("keydown", eventListenerCallback);
      };
    },
    [callback, key]
  );
}
