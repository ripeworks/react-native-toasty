import { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";

import { ToastMessage } from "./types";

type Props = {
  children: React.ReactNode;
  toast: ToastMessage;
  dismiss: () => void;
};

function PlatformOverlay({ children }: { children: React.ReactNode }) {
  if (Platform.OS === "ios") {
    return (
      <FullWindowOverlay>
        <GestureHandlerRootView>{children}</GestureHandlerRootView>
      </FullWindowOverlay>
    );
  }

  return <View style={styles.overlayContainer}>{children}</View>;
}

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
    <PlatformOverlay>
      {visible && (
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutUp}
          style={[styles.container, { top: insets.top + 16 }]}
        >
          <TouchableOpacity onPress={onDismiss}>{children}</TouchableOpacity>
        </Animated.View>
      )}
    </PlatformOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
    zIndex: 10000,
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 10000,
  },
});
