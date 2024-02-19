// FormulaHome.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const detailedCategories = {
  Mathematics: {
    icon: "calculator",
    type: "font-awesome",
    bgColor: "#D1E3C8",
    subCategories: {
      Algebra: {
        imagePath: require("../assets/Images/algebra-icon.png"),
        subSubCategories: ["Properties of Exponents", "Radical Properties"],
      },
      Geometry: {
        imagePath: require("../assets/Images/geo-icon.png"),
        subSubCategories: ["Angles", "Circles", "Triangles"],
      },
      Trigonometry: {
        imagePath: require("../assets/Images/trig-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Differential Calculus": {
        imagePath: require("../assets/Images/diff-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Integral Calculus": {
        imagePath: require("../assets/Images/integ-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Multivariable Calculus": {
        imagePath: require("../assets/Images/multi-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Probability and Statistics": {
        imagePath: require("../assets/Images/prob-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Linear Algebra": {
        imagePath: require("../assets/Images/lin-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Differential Equations": {
        imagePath: require("../assets/Images/diff-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Fourier Series": {
        imagePath: require("../assets/Images/four-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Discrete Mathematics": {
        imagePath: require("../assets/Images/disc-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Beta and Gamma Functions": {
        imagePath: require("../assets/Images/b-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
      "Z Transform": {
        imagePath: require("../assets/Images/z-icon.png"),
        subSubCategories: [], // Add subSubCategories here
      },
    },
  },
  Physics: { icon: "atom", type: "fontisto", bgColor: "#C8E3DD" },
  Chemistry: {
    icon: "flask",
    type: "material-community",
    bgColor: "#E3C8C8",
  },
  Statistics: {
    icon: "bar-chart",
    type: "font-awesome",
    bgColor: "#D1C8E3",
  },
  Biology: {
    icon: "leaf",
    type: "material-community",
    bgColor: "#E1E3C8",
  },
  "AP Microeconomics": {
    icon: "university",
    type: "font-awesome",
    bgColor: "#EACEAD",
  },
};

const FormulaHome = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  const handleCategoryPress = (category) => {
    setCurrentCategory(category);
    setCurrentSubCategory(null); // Reset sub-category selection
  };

  const handleSubCategoryPress = (subCategory) => {
    setCurrentSubCategory(subCategory);
  };

  const renderContent = () => {
    let data = [];
    let renderItem = ({ item }) => <View />;

    if (currentSubCategory) {
      const subCategoryDetails =
        detailedCategories[currentCategory].subCategories[currentSubCategory];
      data = subCategoryDetails.subSubCategories.map((subSubCategory) => ({
        key: subSubCategory,
        name: subSubCategory,
        imagePath: subCategoryDetails.imagePath,
      }));
      renderItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.subCategoryBox, { backgroundColor: "#D1E3C8" }]}
        >
          <Image source={item.imagePath} style={styles.subCategoryImage} />
          <Text style={styles.subCategoryText}>{item.name}</Text>
        </TouchableOpacity>
      );
    } else if (currentCategory) {
      const subCategories = detailedCategories[currentCategory].subCategories;
      data = Object.keys(subCategories).map((key) => ({
        key,
        ...subCategories[key],
      }));
      renderItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.subCategoryBox, { backgroundColor: "#D1E3C8" }]}
          onPress={() => handleSubCategoryPress(item.key)}
        >
          <Image source={item.imagePath} style={styles.subCategoryImage} />
          <Text style={styles.subCategoryText}>{item.key}</Text>
        </TouchableOpacity>
      );
    } else {
      data = Object.keys(detailedCategories).map((key) => ({
        key,
        ...detailedCategories[key],
      }));
      renderItem = ({ item }) => (
        <TouchableOpacity
          style={[styles.categoryBox, { backgroundColor: item.bgColor }]}
          onPress={() => handleCategoryPress(item.key)}
        >
          <Icon
            name={item.icon}
            type={item.type}
            size={24}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>{item.key}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FORMULA SHEET</Text>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  categoryBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subCategoryBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15, // Slightly smaller padding
    borderRadius: 8, // Slightly smaller border radius
    marginBottom: 8,
    elevation: 2, // Slightly less elevation
  },
  subCategoryText: {
    fontSize: 16, // Slightly smaller font size
    fontWeight: "bold",
  },
  subCategoryImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default FormulaHome;
