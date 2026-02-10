// import * as React from "react";

// const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener("change", onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener("change", onChange);
//   }, []);

//   return !!isMobile;
// }


import * as React from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9); // simple unique id
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
