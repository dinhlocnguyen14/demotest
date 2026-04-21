import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { settingsStyles } from "../../assets/styles/settings.styles";
import { COLORS } from "../../constants/colors";

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <ScrollView style={settingsStyles.container} showsVerticalScrollIndicator={false}>
      <View style={settingsStyles.header}>
        <Text style={settingsStyles.headerTitle}>Settings</Text>
      </View>

      {/* PROFILE SECTION */}
      <View style={settingsStyles.profileSection}>
        <View style={settingsStyles.profileCard}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={settingsStyles.avatar}
            contentFit="cover"
            transition={500}
          />
          <View style={settingsStyles.userInfo}>
            <Text style={settingsStyles.userName}>{user?.fullName || "User"}</Text>
            <Text style={settingsStyles.userEmail}>
              {user?.primaryEmailAddress?.emailAddress || "No email provided"}
            </Text>
          </View>
        </View>
      </View>

      {/* ACCOUNT SETTINGS */}
      <View style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Account</Text>
        <View style={settingsStyles.menuContainer}>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="person-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={settingsStyles.menuItem}>
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={[settingsStyles.menuItem, settingsStyles.menuItemLast]}>
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* APP SETTINGS */}
      <View style={settingsStyles.section}>
        <Text style={settingsStyles.sectionTitle}>Preferences</Text>
        <View style={settingsStyles.menuContainer}>
          <TouchableOpacity style={settingsStyles.menuItem}>
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="color-palette-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Theme</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={[settingsStyles.menuItem, settingsStyles.menuItemLast]}>
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="language-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Language</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={settingsStyles.signOutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text style={settingsStyles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={settingsStyles.footer}>
        <Text style={settingsStyles.versionText}>RecipeFinder v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default Settings;

