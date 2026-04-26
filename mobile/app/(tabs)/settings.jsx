import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../context/ThemeContext";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { settingsStyles } from "../../assets/styles/settings.styles";
import { COLORS, THEMES } from "../../constants/colors";

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  // State for Edit Profile Modal
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Theme Context
  const { themeName, changeTheme } = useTheme();

  // State for Theme Picker Modal
  const [isThemeVisible, setThemeVisible] = useState(false);

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

  const handleComingSoon = (feature) => {
    Alert.alert(
      "Coming Soon",
      `${feature} will be available in a future update. Stay tuned!`,
      [{ text: "OK", style: "default" }]
    );
  };

  const openEditProfile = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setImage(user?.imageUrl || null);
    setEditProfileVisible(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
    }
  };

  const handleUpdateProfile = async () => {
    if (!firstName.trim()) {
      Alert.alert("Error", "First name cannot be empty");
      return;
    }

    setIsUpdatingProfile(true);
    try {
      // Update Name
      await user.update({
        firstName,
        lastName,
      });

      // Update Image if changed
      if (imageBase64) {
        await user.setProfileImage({
          file: `data:image/jpeg;base64,${imageBase64}`,
        });
      }

      setEditProfileVisible(false);
      setImageBase64(null); // Reset base64 after update
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleThemeSelect = async (newTheme) => {
    setThemeVisible(false);
    await changeTheme(newTheme);
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
          <TouchableOpacity 
            style={settingsStyles.menuItem}
            onPress={openEditProfile}
          >
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="person-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={settingsStyles.menuItem}
            onPress={() => handleComingSoon("Notifications")}
          >
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[settingsStyles.menuItem, settingsStyles.menuItemLast]}
            onPress={() => handleComingSoon("Privacy & Security")}
          >
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
          <TouchableOpacity 
            style={settingsStyles.menuItem}
            onPress={() => setThemeVisible(true)}
          >
            <View style={settingsStyles.menuIconContainer}>
              <Ionicons name="color-palette-outline" size={22} color={COLORS.primary} />
            </View>
            <Text style={settingsStyles.menuItemText}>Theme</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[settingsStyles.menuItem, settingsStyles.menuItemLast]}
            onPress={() => handleComingSoon("Language Settings")}
          >
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

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={isEditProfileVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditProfileVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={settingsStyles.modalOverlay}
        >
          <View style={settingsStyles.modalContent}>
            <View style={settingsStyles.modalHeader}>
              <Text style={settingsStyles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditProfileVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={settingsStyles.editAvatarContainer}>
                <Image 
                  source={{ uri: image }} 
                  style={settingsStyles.editAvatar} 
                />
                <TouchableOpacity 
                  style={settingsStyles.editAvatarButton}
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={20} color={COLORS.primary} />
                  <Text style={settingsStyles.editAvatarButtonText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <Text style={settingsStyles.inputLabel}>First Name</Text>
              <TextInput
                style={settingsStyles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor={COLORS.textLight}
              />

              <Text style={settingsStyles.inputLabel}>Last Name</Text>
              <TextInput
                style={settingsStyles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor={COLORS.textLight}
              />

              <TouchableOpacity
                style={[
                  settingsStyles.saveButton,
                  isUpdatingProfile && settingsStyles.saveButtonDisabled
                ]}
                onPress={handleUpdateProfile}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={settingsStyles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* THEME PICKER MODAL */}
      <Modal
        visible={isThemeVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setThemeVisible(false)}
      >
        <View style={settingsStyles.modalOverlay}>
          <View style={settingsStyles.modalContent}>
            <View style={settingsStyles.modalHeader}>
              <Text style={settingsStyles.modalTitle}>Select Theme</Text>
              <TouchableOpacity onPress={() => setThemeVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.keys(THEMES).map((themeKey) => {
                const themeData = THEMES[themeKey];
                const isActive = COLORS.primary === themeData.primary;
                return (
                  <TouchableOpacity
                    key={themeKey}
                    style={settingsStyles.themeItem}
                    onPress={() => handleThemeSelect(themeKey)}
                  >
                    <View style={[settingsStyles.themeColorPreview, { backgroundColor: themeData.primary }]} />
                    <Text style={[settingsStyles.themeName, isActive && { fontWeight: "bold" }]}>
                      {themeKey}
                    </Text>
                    {isActive && (
                      <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

export default Settings;

