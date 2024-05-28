import { useCallback, useEffect, useState } from "react";

import Toast from "./Toast";
import ToastContainer from "./ToastContainer";
import type { ToastMessage, ToastParams, ToastProps } from "./types";

let showToast = (params: ToastParams) => {
  // eslint-disable-next-line no-console
  console.warn("ToastProvider is not setup");
};

type Props = {
  children: React.ReactNode;
  ToastComponent?: React.ElementType<ToastProps>;
};

export default function ToastProvider({
  children,
  ToastComponent = Toast,
}: Props) {
  const [alerts, setAlerts] = useState<ToastMessage[]>([]);

  const dismiss = useCallback(
    (id: string) => {
      setAlerts((prevState) => {
        const alertIndex = prevState.findIndex((a) => a.id === id);
        if (alertIndex < 0) return prevState;

        return [
          ...prevState.slice(0, alertIndex),
          ...prevState.slice(alertIndex + 1),
        ];
      });
    },
    [alerts]
  );

  useEffect(() => {
    showToast = (params: ToastParams) => {
      setAlerts((prev) => [
        ...prev,
        {
          ...params,
          id: `${new Date().getTime()}${Math.floor(
            (1 + Math.random()) * 0x10000
          )
            .toString(16)
            .substring(1)}`,
          duration: params.duration ?? 5000,
        },
      ]);
    };
  }, []);

  return (
    <>
      {children}
      {alerts.map((alert) => (
        <ToastContainer
          key={alert.id}
          toast={alert}
          dismiss={() => dismiss(alert.id)}
        >
          <ToastComponent {...alert} dismiss={() => dismiss(alert.id)} />
        </ToastContainer>
      ))}
    </>
  );
}

export { showToast };
