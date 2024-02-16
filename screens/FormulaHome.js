// FormulaHome.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const categories = [
  { key: 'Mathematics', icon: 'calculator', bgColor: '#D1E3C8' },
  { key: 'Physics', icon: 'atom', bgColor: '#C8E3DD' },
  { key: 'Chemistry', icon: 'flask', bgColor: '#E3C8C8' },
  { key: 'Statistics', icon: 'bar-chart', bgColor: '#D1C8E3' },
  { key: 'Biology', icon: 'leaf', bgColor: '#E1E3C8' },
  { key: 'AP Microeconomics', icon: 'university', bgColor: '#EACEAD' },
];

const FormulaHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FORMULA SHEET</Text>
      <View style={styles.searchSection}>
        <Icon name="search" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Formula"
          placeholderTextColor="black"
    
        />
      </View>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.categoryBox, {backgroundColor: item.bgColor}]}>
            <Icon name={item.icon} size={24} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
  },
});

export default FormulaHome;
