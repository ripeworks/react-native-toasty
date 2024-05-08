# react-native-dan-forden

![](./misc/toasty.gif)

---

## Features

- Works on native platforms (iOS, Android), Expo, and Web
- Works with react-navigation and Modal (doesn't get hidden)
- Animations using Reanimated
- Override with your own simple Toast component

## Getting Started

### Installation

```sh
yarn add react-native-dan-forden
```

#### Dependencies

If you are using something like Expo, you should be all set.

If you are using a vanilla React Native setup, you will need some dependencies that you probably should have installed anyways: `react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens`

> Note: dependencies only required for native platforms

### Usage

1. Add `ToastProvider` to your horizontal tree:

```tsx
// App.tsx
import { ToastProvider } from "react-native-dan-forden";

export default function App() {
  return <ToastProvider>...</ToastProvider>;
}
```

2. Use `showToast` when stuff happens:

```tsx
import { showToast } from "react-native-dan-forden";

export default function SignUp() {
  async function onSubmit() {
    try {
      await login();
      showToast({
        type: "success",
        message: "Welcome!",
      });
    } catch (err) {
      showToast({
        type: "danger",
        message: "Your signup failed",
      });
    }
  }

  return (
    <Pressable onPress={onSubmit}>
      <Text>Sign Up</Text>
    </Pressable>
  );
}
```
