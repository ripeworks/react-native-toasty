export type ToastMessage = {
  id: string;
  message: string;
  description?: string;
  type: "default" | "info" | "success" | "danger";
  duration?: number;
  // action
};

export type ToastParams = Omit<ToastMessage, "id">;

export type ToastProps = ToastMessage & { dismiss: () => void };
