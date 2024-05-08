import { useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";

import { ToastMessage } from "./types";

type Props = {
  children: React.ReactNode;
  toast: ToastMessage;
  dismiss: () => void;
};

export default function ToastContainer({ toast, dismiss, children }: Props) {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(true);

  function onDismiss() {
    setVisible(false);
    setTimeout(dismiss, 250);
  }

  useEffect(() => {
    if (toast.duration) {
      const timeout = setTimeout(onDismiss, toast.duration);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return (
    <FullWindowOverlay>
      <GestureHandlerRootView>
        {visible && (
          <Animated.View
            entering={SlideInUp}
            exiting={SlideOutUp}
            style={{ top: insets.top + 16, alignItems: "center" }}
          >
            <TouchableOpacity onPress={onDismiss}>{children}</TouchableOpacity>
          </Animated.View>
        )}
      </GestureHandlerRootView>
    </FullWindowOverlay>
  );
}
