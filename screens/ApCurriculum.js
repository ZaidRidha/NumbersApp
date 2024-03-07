import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Icon } from "react-native-elements";

const ExpandableButton = ({ subject, onPress }) => (
  <TouchableOpacity style={styles.expandableButton} onPress={onPress}>
    <Text style={styles.expandableButtonText}>{subject}</Text>
    <Icon name="down" type="antdesign" color="#000" />
  </TouchableOpacity>
);
const SubjectDetails = ({ visible, details }) => {
  if (!visible) return null;

  return (
    <View style={styles.detailsContainer}>
      {details.items.map((item) => (
        <Text key={item} style={styles.itemText}>
          {item}
        </Text>
      ))}
    </View>
  );
};

const ApCurriculum = () => {
  const [activeTab, setActiveTab] = useState("Mathematics");

  const [expandedSubjects, setExpandedSubjects] = useState({});

  const toggleSubject = (subject) => {
    setExpandedSubjects((prevExpanded) => ({
      ...prevExpanded,
      [subject]: !prevExpanded[subject],
    }));
  };

  // Data for different subjects
  const subjectData = {
    Mathematics: [
      {
        subject: "AP Calculus AB",
        items: ["Key Concept", "Past Paper", "Question Bank", "Quiz"],
      },
      {
        subject: "AP Calculus BC",
        items: ["Key Concept", "Past Paper", "Question Bank", "Quiz"],
      },

      {
        subject: "AP Precalculus",
        items: ["Key Concept", "Past Paper", "Question Bank", "Quiz"],
      },

      // ... other Mathematics subjects
    ],
    Physics: [
      // ... Physics subjects
    ],
    Biology: [
      // ... Biology subjects
    ],
    Chemistry: [
      // ... Chemistry subjects
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Advanced Placement® (AP)</Text>
      <Text style={styles.description}>
        AP gives students the chance to tackle college-level work while they're
        still in high school—whether they're learning online or in the
        classroom. And through taking AP Exams, students can earn college credit
        and placement.
      </Text>

      <View style={styles.tabContainer}>
        {Object.keys(subjectData).map((subject) => (
          <TouchableOpacity key={subject} onPress={() => setActiveTab(subject)}>
            <Text
              style={[
                styles.tabText,
                activeTab === subject
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              {subject}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        {subjectData[activeTab]?.map((subjectDetail) => (
          <View key={subjectDetail.subject} style={styles.subjectContainer}>
            <ExpandableButton
              subject={subjectDetail.subject}
              onPress={() => toggleSubject(subjectDetail.subject)}
            />
            <SubjectDetails
              visible={expandedSubjects[subjectDetail.subject]}
              details={subjectDetail}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24, // increased font size
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20, // added bottom margin
  },
  description: {
    fontSize: 15, // increased font size
    color: "grey",
    marginTop: 10,
    marginBottom: 40, // increased bottom margin
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabText: {
    textDecorationLine: "underline",
    textDecorationColor: "#008000", // Green underline
    padding: 10,
    fontSize: 15,
  },
  activeTabText: {
    color: "grey", // Gray font for the active tab
    textDecorationColor: "gray", // Green underline
  },
  inactiveTabText: {
    color: "#008000", // Green font for inactive tabs
  },

  expandableButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10, // Maintain horizontal padding
    marginBottom:10,
  },
  subjectContainer: {
    marginTop: 10,
    backgroundColor: "#D7CADD", // Adjust the background color as needed
    borderRadius: 10, // Adjust the border radius as needed
    overflow: "hidden", // Ensures the child components don't overlap the container's border
  },

  // Modify expandableButton and detailsContainer styles to remove borderRadius
  expandableButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10, // Reduced padding for tighter spacing
    backgroundColor: "#D7CADD",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    backgroundColor: "#D7CADD",
    paddingTop: 5, // Reduced padding for tighter spacing at the top
    paddingBottom: 20, // Adjust as needed for padding at the bottom
    paddingHorizontal: 20, // Maintain horizontal padding
  },
  itemText: {
    fontSize: 18,
    paddingBottom: 35, // Reduced marginBottom for tighter item spacing
  },

  // Add additional styling here as needed
});

export default ApCurriculum;
