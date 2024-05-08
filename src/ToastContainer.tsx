import { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

import { ToastMessage } from "./types";

type Props = {
  children: React.ReactNode;
  toast: ToastMessage;
  dismiss: () => void;
};

export default function ToastContainer({ toast, dismiss, children }: Props) {
  const [slide, setSlide] = useState(false);

  function onDismiss() {
    setSlide(false);
    setTimeout(dismiss, 250);
  }

  useEffect(() => {
    if (toast.duration) {
      const timeout = setTimeout(onDismiss, toast.duration);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  useEffect(() => {
    setSlide(true);
  }, []);

  return (
    <View pointerEvents="none" style={styles.container}>
      <Pressable
        pointerEvents="auto"
        style={[styles.pressable, slide && styles.pressableIn]}
        onPress={onDismiss}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // @ts-ignore
    position: "fixed",
    alignItems: "center",
    width: "100%",
    zIndex: 10000,
  },
  pressable: {
    // @ts-ignore
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    transform: [
      {
        // @ts-ignore
        translateY: "-100%",
      },
    ],
  },
  pressableIn: {
    transform: [{ translateY: 16 }],
  },
});
