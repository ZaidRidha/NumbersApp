import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // You might need to install @react-native-picker/picker
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const ApCurriculum = () => {
  const [selectedSubject, setSelectedSubject] = useState("AP Calculus AB");

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Advanced Placement® (AP)</Text>
      <Text style={styles.description}>
        AP gives students the chance to tackle college-level work while they're
        still in high school—whether they're learning online or in the
        classroom. And through taking AP Exams, students can earn college credit
        and placement.
      </Text>

      <View style={styles.tabContainer}>
        {/* Tabs for each subject */}
        <TouchableOpacity style={styles.tab}>
          <Text>Mathematics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Physics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Biology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Chemistry</Text>
        </TouchableOpacity>
      </View>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />

      {/* You would add additional pickers or lists for each tab as needed */}
    </View>
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
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    backgroundColor: "#e1e1e1", // Placeholder color, adjust as needed
  },

  dropdownContainer: {
    // Styles for your dropdown container
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdown: {
    // Styles for your dropdown
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  dropdown: {
    margin: 16,
    height: 60, // Increased height for a 'fatter' dropdown
    backgroundColor: "#D7CADD", // Updated background color
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  // Add additional styling here as needed
});

export default ApCurriculum;
