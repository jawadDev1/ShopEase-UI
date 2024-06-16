import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useRef, useState } from "react";
import MasonryList from "reanimated-masonry-list";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

import Card from "../components/Card";

import { AVATAR_URL, CATEGORIES, IMAGES, PRODUCTS } from "../constants";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackDrop";
import FilterView from "../components/FilterView";
import { TabStackScreenProps } from "../navigators/TabsNavigator";

const HomeScreen = ({ navigation }: TabStackScreenProps<"Home">) => {

  const { colors } = useTheme();
  // Handle Selected Category
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: AVATAR_URL }}
            resizeMode="cover"
          />
          <View style={styles.subContainer}>
            <Text
              style={[styles.greetText, { color: colors.text }]}
              numberOfLines={1}
            >
              Hi, James
            </Text>
            <Text style={[styles.text, { color: colors.text }]}>
              Discover fashion that suit your style
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.notification, { borderColor: colors.border }]}
          >
            <Icons name="notifications" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={[styles.search, { borderColor: colors.border }]}
          >
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <Text style={[styles.searchText, { color: colors.text }]}>
              Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openFilterModal}
            style={[styles.notification, { backgroundColor: colors.primary }]}
          >
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>
        {/* Grid Collection Section */}
        <View style={styles.collection}>
          {/* Title Bar */}
          <View style={styles.titleBar}>
            <Text style={[styles.titleText, {color: colors.text}]}>New Collections</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, {color: colors.primary, opacity: 0.7}]}>See all</Text>
            </TouchableOpacity>
          </View>
          {/* Grid */}
          <View style={styles.grid}>
            {/* Card */}

            <Card
              imgUrl={IMAGES.img1}
              onPress={() =>
                navigation.navigate("Details", {
                  id: "2332",
                  img: IMAGES.img1,
                  
                })
              }
            />

            <View style={styles.right}>
              <Card
                imgUrl={IMAGES.img2}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: "3432",
                    img: IMAGES.img2,
                  })
                }
              />
              <Card
                imgUrl={IMAGES.img3}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: "3432",
                    img: IMAGES.img3,
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* Categories Slider */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            gap: 12,
          }}
          data={CATEGORIES}
          keyExtractor={(_, i): any => i.toString()}
          renderItem={({ item, index }) => {
            const isSelected = index == categoryIndex;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isSelected ? colors.background : colors.text,
                      opacity: isSelected ? 1 : 0.5,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Mansory List */}
        <MasonryList
          data={PRODUCTS}
          keyExtractor={(item, i): string => i.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', {
              id: "2332",
              img: item.img,
              title: item.title,
              price: item.price
            })} style={{ padding: 6 }} key={i} activeOpacity={0.9}>
              <View
                style={[
                  styles.mansoryCard,
                  { aspectRatio: i === 0 ? 1 : 2 / 3 },
                ]}
              >
                <Image
                  source={{ uri: item.img }}
                  resizeMode="cover"
                  style={[StyleSheet.absoluteFill, styles.mansoryImage]}
                />
                <View style={[StyleSheet.absoluteFill, { padding: 8 }]}>
                  <View style={styles.mansoryCardTop}>
                    <Text
                      style={[styles.mansoryCardTitle, { color: colors.text }]}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={[
                        styles.favorite,
                        { backgroundColor: colors.background },
                      ]}
                    >
                      <Icons
                        name="favorite-border"
                        size={20}
                        color={colors.text}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <BlurView intensity={15} style={styles.mansoryCardBottom}>
                    <Text style={styles.mansoryCardBottomText}>{item.price}</Text>
                    <TouchableOpacity style={styles.addToCart}>
                      <Icons name="shopping-basket" size={20} color={"#000"} />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      {/* Bottom Sheet */}
      <BottomSheetModal
        snapPoints={["80%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle= {{ borderRadius: 24, backgroundColor: colors.card }}
        handleIndicatorStyle= {{ backgroundColor: colors.primary}}
      >
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: 24,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 8,
  },
  avatar: {
    width: 52,
    aspectRatio: 1,
    borderRadius: 26,
  },
  subContainer: {
    flex: 1,
  },
  greetText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  text: {
    opacity: 0.5,
  },
  notification: {
    width: 52,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26,
    borderWidth: 1,
  },
  // Search Section
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    opacity: 0.5,
  },
  // Grid Collection Section
  collection: {
    paddingHorizontal: 24,
  },
  titleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  seeAllText: {},
  grid: {
    flexDirection: "row",
    height: 200,
    gap: 12,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    gap: 12,
  },

  // Categories Section
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 100,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Mansory List Secion
  mansoryCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 24,
  },
  mansoryImage: {},
  mansoryCardTop: {
    flexDirection: "row",
    gap: 8,
  },
  mansoryCardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { height: 2, width: 0},
    textShadowRadius: 4,
  },
  favorite: {
    borderRadius: 100,
    height: 32,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mansoryCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 100,
    overflow: "hidden",
  },
  mansoryCardBottomText: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  addToCart: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
});
