import { View, Text } from "react-native";
import { useRecipe } from "./_layout";
import { recipeDetailStyles } from "../../../assets/styles/recipe-detail.styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import { WebView } from "react-native-webview";

export default function OverviewScreen() {
    const { recipe } = useRecipe();

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        const videoId = url.split("v=")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <View style={recipeDetailStyles.tabContent}>
            {/* QUICK STATS */}
            <View style={recipeDetailStyles.statsContainer}>
                <View style={recipeDetailStyles.statCard}>
                    <LinearGradient colors={["#FF6B6B", "#FF8E53"]} style={recipeDetailStyles.statIconContainer}>
                        <Ionicons name="time" size={20} color={COLORS.white} />
                    </LinearGradient>
                    <Text style={recipeDetailStyles.statValue}>{recipe.cookTime}</Text>
                    <Text style={recipeDetailStyles.statLabel}>Prep Time</Text>
                </View>

                <View style={recipeDetailStyles.statCard}>
                    <LinearGradient colors={["#4ECDC4", "#44A08D"]} style={recipeDetailStyles.statIconContainer}>
                        <Ionicons name="people" size={20} color={COLORS.white} />
                    </LinearGradient>
                    <Text style={recipeDetailStyles.statValue}>{recipe.servings}</Text>
                    <Text style={recipeDetailStyles.statLabel}>Servings</Text>
                </View>
            </View>

            {recipe.youtubeUrl && (
                <View style={recipeDetailStyles.sectionContainer}>
                    <View style={recipeDetailStyles.sectionTitleRow}>
                        <LinearGradient colors={["#FF0000", "#CC0000"]} style={recipeDetailStyles.sectionIcon}>
                            <Ionicons name="play" size={16} color={COLORS.white} />
                        </LinearGradient>
                        <Text style={recipeDetailStyles.sectionTitle}>Video Tutorial</Text>
                    </View>

                    <View style={recipeDetailStyles.videoCard}>
                        <WebView
                            style={recipeDetailStyles.webview}
                            source={{ uri: getYouTubeEmbedUrl(recipe.youtubeUrl) }}
                            allowsFullscreenVideo
                        />
                    </View>
                </View>
            )}

            {recipe.area && (
                <View style={recipeDetailStyles.sectionContainer}>
                    <View style={recipeDetailStyles.sectionTitleRow}>
                        <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={recipeDetailStyles.sectionIcon}>
                            <Ionicons name="globe" size={16} color={COLORS.white} />
                        </LinearGradient>
                        <Text style={recipeDetailStyles.sectionTitle}>Cuisine Area</Text>
                    </View>
                    <Text style={[recipeDetailStyles.instructionText, { fontSize: 18 }]}>
                        This is a classic {recipe.area} dish.
                    </Text>
                </View>
            )}
        </View>
    );
}
