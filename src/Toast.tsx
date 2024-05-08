import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ToastProps } from "./types";

export default function Toast({ type, message, description }: ToastProps) {
  const typeStyles = useMemo(() => {
    switch (type) {
      case "danger": {
        return {
          view: styles.viewDanger,
          text: styles.textDanger,
        };
      }
      case "info": {
        return {
          view: styles.viewInfo,
          text: styles.textInfo,
        };
      }
      case "success": {
        return {
          view: styles.viewSuccess,
          text: styles.textSuccess,
        };
      }
      default: {
        return {
          view: styles.viewDefault,
          text: styles.textDefault,
        };
      }
    }
  }, [type]);

  return (
    <View style={[styles.toast, typeStyles.view]}>
      <Text style={[styles.message, typeStyles.text]}>{message}</Text>
      {!!description && (
        <Text style={[styles.description, typeStyles.text]}>{description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    borderRadius: 6,
    gap: 4,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 16,
    paddingBottom: 16,
    // shadow-sm
    // max-w-2xl
  },
  message: {
    fontWeight: "500",
  },
  description: {
    lineHeight: 20,
  },
  viewDanger: {
    backgroundColor: "#fef2f2",
  },
  viewDefault: {
    backgroundColor: "#f9fafb",
  },
  viewInfo: {
    backgroundColor: "#eff6ff",
  },
  viewSuccess: {
    backgroundColor: "#f0fdf4",
  },
  textDanger: {
    color: "#991b1b",
  },
  textDefault: {
    color: "#1f2937",
  },
  textInfo: {
    color: "#1d4ed8",
  },
  textSuccess: {
    color: "#166534",
  },
});
