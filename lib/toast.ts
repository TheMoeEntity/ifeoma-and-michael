type ToastType = "success" | "error";

function dispatch(type: ToastType, message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("app:toast", { detail: { type, message } }));
}

export const toast = {
  success: (message: string) => dispatch("success", message),
  error: (message: string) => dispatch("error", message),
};
