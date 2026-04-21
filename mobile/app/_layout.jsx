import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { COLORS } from "../constants/colors";
import SafeScreen from "../components/SafeScreen";
import { saveAccountToRecent } from "../utils/accountStorage";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();

  // Save current user to recent accounts list
  useEffect(() => {
    if (isSignedIn && user) {
      saveAccountToRecent(user);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isSignedIn && inAuthGroup) {
      // Redirect to home if signed in and in auth group
      router.replace("/(tabs)");
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect to sign-in if not signed in and not in auth group
      router.replace("/(auth)/sign-in");
    }
  }, [isSignedIn, isLoaded, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeScreen>
        <InitialLayout />
      </SafeScreen>
    </ClerkProvider>
  );
}


