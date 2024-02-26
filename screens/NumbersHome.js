import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import CarouselImage1 from "../assets/Images/APMathsCarousel2.png";
import CarouselImage2 from "../assets/Images/APBiology2.png";
import CarouselImage3 from "../assets/Images/APPhysics2.png";

const NumbersHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  // Data for the carousel
  const carouselData = [
    { id: "1", image: CarouselImage1, title: "AP Mathematics (AP)" },
    { id: "2", image: CarouselImage2, title: "AP Biology (AP)" },
    { id: "3", image: CarouselImage3, title: "IB Physics (IB)" },
  ];

  // Render function for carousel item
  const renderCarouselItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.textBackground}>
        <Text style={styles.imageText}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Explore:</Text>
        <FlatList
          data={carouselData}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        />
        {/* Other components will go here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
  carousel: {
    height: 200,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselImage: {
    width: 350,
    height: 200,
    resizeMode: "cover",
  },
  textBackground: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    opacity: 0.9,
  },
  imageText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    position: "relative",
  },
  // ...other styles
});

export default NumbersHome;
