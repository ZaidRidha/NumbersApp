// FormulaHome.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Icon, SearchBar } from "react-native-elements"; // Import SearchBar her

const FormulaHome = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [displayedContent, setDisplayedContent] = useState([]);
  const searchBarRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState("subjects"); // 'subjects', 'subtopics', 'details'
  const screenWidth = Dimensions.get("window").width;
  const formulaImageWidth = screenWidth * 0.9;
  const formulaImageHeight = formulaImageWidth * (3 / 4); // maintain 4:3 aspect ratio
  const [navigationHistory, setNavigationHistory] = useState([]);

  const extractImageUrl = (htmlString) => {
    const regex = /<img.*?src="([^"]*)"/;
    const match = regex.exec(htmlString);

    return match ? match[1] : null;
  };

  const updateSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      const results = performSearch(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSubjects().then((fetchedSubjects) => {
      setDisplayedContent(fetchedSubjects); // Store the fetched subjects in state
    });
  }, []);

  // Function to fetch subtopics for a given topic slug
  const fetchSubjects = async () => {
    try {
      const response = await fetch(`https://num8ers.cloud/api/formulasubject`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const subjects = await response.json();
      return subjects; // This will now contain all subjects data
    } catch (error) {
      console.error("There was an error fetching the subjects:", error);
      return []; // Return an empty array or appropriate fallback
    }
  };

  const fetchSubtopics = async (subjectName) => {
    try {
      const response = await fetch(
        `https://num8ers.cloud/api/formulatopic/${subjectName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const subtopics = await response.json();
      return subtopics; // Make sure to return the fetched subtopics
    } catch (error) {
      console.error("There was an error fetching the subtopics:", error);
      return []; // Return an empty array in case of error
    }
  };

  const fetchSubtopicDetails = async (subtopicSlug) => {
    try {
      const response = await fetch(
        `https://num8ers.cloud/api/formulasubtopic/${subtopicSlug}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const subtopicDetails = await response.json();
      return subtopicDetails; // Return the fetched details
    } catch (error) {
      console.error("There was an error fetching the subtopic details:", error);
      return []; // Return an empty array in case of error
    }
  };

  const fetchFormulaSheets = async (subtopicDetailSlug) => {
    try {
      const url = `https://num8ers.cloud/api/formulaformula/${subtopicDetailSlug}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const formulaSheets = await response.json();

      return formulaSheets; // Return the fetched formula sheets
    } catch (error) {
      console.error("There was an error fetching the formula sheets:", error);
      return []; // Return an empty array in case of error
    }
  };

  const handlePressOnSubjectOrSubtopic = async (identifier, level) => {
    setNavigationHistory([
      ...navigationHistory,
      { level: currentLevel, content: displayedContent },
    ]);

    if (level === "subjects") {
      // When a subject is selected, fetch its subtopics
      const subtopics = await fetchSubtopics(identifier);
      setDisplayedContent(subtopics || []);
      setCurrentLevel("subtopics"); // Now displaying subtopics, so update the level
    } else if (level === "subtopics") {
      // When a subtopic is selected, fetch its details
      const details = await fetchSubtopicDetails(identifier); // Assuming identifier is a slug for subtopics
      setDisplayedContent(details || []);
      setCurrentLevel("details"); // Now displaying details, so update the level
    } else if (level === "details") {
      // New block to fetch formula sheets when a detail is selected
      const formulaSheets = await fetchFormulaSheets(identifier); // Passing the subtopic detail slug
      setDisplayedContent(formulaSheets || []);
      setCurrentLevel("formulas"); // Setting the level to 'formulas' to indicate we are now showing formula sheets
    }
  };

  const performSearch = (query) => {
    console.log("searching");
  };

  const resetToOriginalSheet = () => {
    setCurrentCategory(null);
    setCurrentSubCategory(null);
    setSearchQuery("");
    if (searchBarRef.current) {
      searchBarRef.current.clear();
    }
  };

  const handleBack = () => {
    const history = [...navigationHistory];
    const previousState = history.pop();
    setNavigationHistory(history);

    if (previousState) {
        setCurrentLevel(previousState.level);
        setDisplayedContent(previousState.content);
    }
};

  return (
    <View style={styles.container}>
      {
    navigationHistory.length > 0 && (
        <TouchableOpacity onPress={handleBack}>
            <Text>Back</Text>
        </TouchableOpacity>
    )
}
      <TouchableOpacity onPress={resetToOriginalSheet}>
        <Text style={styles.title}>FORMULA SHEET</Text>
      </TouchableOpacity>
      <SearchBar
        placeholder="Search Here..."
        onChangeText={updateSearch}
        value={searchQuery}
        lightTheme // Use lightTheme or remove this prop for default theme
        round // Optional: for rounded search bar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        ref={searchBarRef} // Attach the ref to the SearchBar
      />

      <FlatList
        data={displayedContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Check if the current level is 'formulas' to decide on rendering logic
          if (currentLevel === "formulas") {
            const imageUrl = extractImageUrl(item.description); // Extract the image URL
            console.log(imageUrl);
            if (imageUrl) {
              return (
                <View style={styles.formulaImageContainer}>
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: formulaImageWidth,
                      height: formulaImageHeight,
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            } else {
              // In case no image URL could be extracted
              return (
                <View style={styles.formulaSheetBox}>
                  <Text>No image found</Text>
                </View>
              );
            }
          } else {
            // This handles subjects and subtopics as before
            return (
              <TouchableOpacity
                style={styles.categoryBox}
                onPress={() =>
                  handlePressOnSubjectOrSubtopic(item.slug, currentLevel)
                }
              >
                <Image
                  source={{ uri: item.photo }}
                  style={styles.categoryIcon}
                  resizeMode="contain"
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },

  formulaImageContainer: {
    alignItems: "center", // Center the image horizontally
    justifyContent: "center", // Center the image vertically (if you have flex:1)
    marginVertical: 20, // Add some vertical margin
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
  searchBarContainer: {
    backgroundColor: "white", // Match the background color or make it transparent
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginBottom: 10,
  },
  searchBarInputContainer: {
    backgroundColor: "#EFEFEF", // Light grey or any color you prefer
  },
  searchBarInput: {
    color: "black", // Adjust text color as needed
  },
  categoryBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    backgroundColor: "#C8E3DD",
  },
  categoryIcon: {
    marginRight: 10,
    width: 30,
    height: 30,
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
