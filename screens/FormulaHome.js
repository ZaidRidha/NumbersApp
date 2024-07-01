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
import { Icon, SearchBar } from "react-native-elements"; // Import SearchBar here
import { useNavigation } from "@react-navigation/native";

const FormulaHome = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [displayedContent, setDisplayedContent] = useState([]);
  const searchBarRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState("subjects"); // 'subjects', 'subtopics', 'details'
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [selectedSubjectName, setSelectedSubjectName] = useState("Formulas"); // Default title
  const formulaImageWidth = 500;
  const formulaImageHeight = 500;
  const [navigationHistory, setNavigationHistory] = useState([]);
  const navigation = useNavigation();
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

  const formatSubjectName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
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
      { level: currentLevel, content: displayedContent, subjectName: selectedSubjectName },
    ]);
    if (level === "subjects") {
      // When a subject is selected, fetch its subtopics
      const subtopics = await fetchSubtopics(identifier);
      setDisplayedContent(subtopics || []);
      setCurrentLevel("subtopics"); // Now displaying subtopics, so update the level
      setSelectedSubjectName(identifier); // Update the title with the selected subject name
    } else if (level === "subtopics") {
      // When a subtopic is selected, fetch its details
      setSelectedSubjectName(identifier); // Update the title with the selected subject name
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
      setSelectedSubjectName(previousState.subjectName || "Formulas"); // Update the subject name
    } else {
      setCurrentLevel("subjects");
      fetchSubjects().then((fetchedSubjects) => {
        setDisplayedContent(fetchedSubjects);
      });
      setSelectedSubjectName("Formulas");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {navigationHistory.length > 0 ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-back" type="material" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}
        <Text style={styles.title}>FORMULA SHEET</Text>
        {/* Adjust this spacer's style based on whether the back button is visible */}
        <View
          style={
            navigationHistory.length > 0
              ? styles.backButton
              : styles.backButtonPlaceholder
          }
        />
      </View>
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
      <View style={styles.flatlistContainer}>
        {["subjects", "subtopics", "details"].includes(currentLevel) && (
          <Text style={styles.sectionHeader}>
            {formatSubjectName(selectedSubjectName)}
          </Text>
        )}
        <FlatList
          data={displayedContent}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1} // Ensure single column for all levels
          key={"oneColumn"} // Change the key to force re-render
          horizontal={false} // Ensure vertical scrolling
          style={currentLevel === "details" ? styles.detailsList : {}}
          renderItem={({ item }) => {
            // Check if the current level is 'formulas' to decide on rendering logic
            if (currentLevel === "formulas") {
              const imageUrl = extractImageUrl(item.description); // Extract the image URL
              console.log(imageUrl);
              if (imageUrl) {
                return (
                  <TouchableOpacity
                    style={styles.formulaImageContainer}
                    onPress={() =>
                      navigation.navigate("MaximiseSheet", {
                        imageUrl: imageUrl,
                      })
                    }
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={{
                        width: formulaImageWidth,
                        height: formulaImageHeight,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
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
                  style={
                    currentLevel === "subjects"
                      ? styles.subjectBox
                      : currentLevel === "subtopics"
                      ? styles.subjectBox // Assuming you want the same style for subjects and subtopics
                      : currentLevel === "details"
                      ? styles.detailsBox // Smaller style for details level
                      : styles.categoryBox // Default or fallback style
                  }
                  onPress={() =>
                    handlePressOnSubjectOrSubtopic(item.slug, currentLevel)
                  }
                >
                  {currentLevel === "subjects" && (
                    <>
                      <Text style={styles.subjectText}>{item.name}</Text>
                      <Image
                        source={{ uri: item.photo }}
                        style={styles.subjectImage} // Use the absolute positioning style here
                        resizeMode="contain"
                      />
                    </>
                  )}
                  {currentLevel === "subtopics" && (
                    <>
                      <Text style={styles.subtopicText}>{item.name}</Text>
                      <Image
                        source={{ uri: item.photo }}
                        style={styles.subtopicImage} // Use the absolute positioning style here
                        resizeMode="contain"
                      />
                    </>
                  )}
                  {currentLevel === "details" && (
                    <>
                      <Text style={styles.detailsText}>{item.name}</Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  flatlistContainer: {
    padding: 16,
    backgroundColor: "#4F4F4F",
    borderRadius: 10,
  },
  formulaImageContainer: {
    alignItems: "center", // Center the image horizontally
    marginVertical: 20, // Add some vertical margin
  },
  topSection: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center children vertically in the container
    marginBottom: 16, // Add some space below the section
    // Add padding or margin here if needed for general spacing
  },
  backButtonPlaceholder: {
    width: 24, // Match the back button's width
    opacity: 0, // Make it invisible
  },
  backButton: {
    width: 24, // Explicitly define the back button's width for clarity and consistency
    marginRight: 16, // If you have specific margin settings for the backButton, ensure it's considered
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center", // Center the text within the flex space
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
    backgroundColor: "#4F4F4F",
    borderRadius: 20,
  },
  searchBarInputContainer: {
    backgroundColor: "#4F4F4F",
    height: 30, // Smaller height for the input field
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
  subjectBox: {
    flexDirection: "column", // Stack items vertically
    justifyContent: "flex-start", // Align items to the start vertically
    alignItems: "flex-start", // Align items to the start horizontally
    paddingVertical: 80,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    backgroundColor: "#D1E3C8",
    position: "relative",
  },
  detailsBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Center text vertically
    padding: 15, // Increased padding to give more space for text
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#D1E3C8",
    width: "100%", // Full width for stacking vertically
    height: 60, // Adjust height if necessary
  },
  detailsText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center text horizontally
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 25,
    color: "white", // Adjust text color according to your theme
  },
  horizontalList: {
    flexGrow: 0, // Prevents the FlatList from trying to fill the vertical space
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
  subjectText: {
    position: "absolute",
    top: 15,
    left: 15,
    fontSize: 28,
  },
  subtopicText: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: 14,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden", // Add this line
  },
  subjectImage: {
    position: "absolute",
    bottom: 15,
    right: 60, // Adjust this value as needed
    width: 100, // Set your desired width
    height: 100, // Set your desired height
  },
  subtopicImage: {
    position: "absolute",
    bottom: 15,
    right: 60, // Adjust this value as needed
    width: 100, // Set your desired width
    height: 100, // Set your desired height
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
