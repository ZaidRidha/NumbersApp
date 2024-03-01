import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from "react-native";
import CarouselImage1 from "../assets/Images/APMathsCarousel2.png";
import CarouselImage2 from "../assets/Images/APBiology2.png";
import CarouselImage3 from "../assets/Images/APPhysics2.png";
import ButtonImage1 from "../assets/Images/KeyConceptsImg.png";
import ButtonImage2 from "../assets/Images/PastPapersImage.png"; // Assuming you have another image for the second button
import ButtonImage3 from "../assets/Images/PastPapersImage.png"; // Assuming you have another image for the second button
import ButtonImage4 from "../assets/Images/QuizzesImage.png"; // Assuming you have another image for the second button
import QuickOpenImage from "../assets/Images/QuickOpenImage.png";
import { Button } from "react-native-elements";
import ButtonComponent from "../components/ButtonComponent";

const NumbersHome = ({ navigation }) => {
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

  const CustomButton = ({ imageSource, title, subtitle, onPress }) => (
    <View style={styles.customButtonContainer}>
      <Image source={imageSource} style={styles.customButtonImage} />
      <View style={styles.customButtonTextContainer}>
        <Text style={styles.customButtonTitle}>{title}</Text>
        <Text style={styles.customButtonSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.title}>Recent</Text>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title="Key Concepts"
            imageSource={ButtonImage1}
            navigateTo="DetailScreen"
            navigation={navigation}
            buttonStyle={{
              button: { width: "45%", height: 150, backgroundColor: "#D7CADD" }, // Adjust width to make it smaller
              text: { color: "black" },
              image: { width: 100, height: 100, marginTop: 50, marginLeft: 55 }, // Adjust image size here
            }}
          />

          <ButtonComponent
            title="Question Bank"
            imageSource={ButtonImage2}
            navigateTo="AnotherScreen"
            navigation={navigation}
            buttonStyle={{
              button: { width: "45%", height: 150, backgroundColor: "#CDD7FF" }, // Adjust width to make it smaller
              text: { color: "black" },
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title="Past Papers"
            imageSource={ButtonImage3}
            navigateTo="Past Papers"
            navigation={navigation}
            buttonStyle={{
              button: { width: "45%", height: 150, backgroundColor: "#B7E5DD" }, // Adjust width to make it smaller
              text: { color: "black" },
            }}
          />

          <ButtonComponent
            title="Quizzes"
            imageSource={ButtonImage4}
            navigateTo="AnotherScreen"
            navigation={navigation}
            buttonStyle={{
              button: { width: "45%", height: 150, backgroundColor: "#F1F0C0" }, // Adjust width to make it smaller
              text: { color: "black" },
            }}
          />
        </View>
        <Text style={styles.title}>Quick Open</Text>
        <CustomButton
          imageSource={QuickOpenImage}
          title="Quizzes AP Calculus AB"
          subtitle="Challenge yourself with quick Quiz"
          onPress={() => console.log("Button pressed")} // Replace with your navigation logic
        />
        <CustomButton
          imageSource={QuickOpenImage}
          title="Quizzes AP Calculus AB"
          subtitle="Challenge yourself with quick Quiz"
          onPress={() => console.log("Button pressed")} // Replace with your navigation logic
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
    marginVertical: 15,
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "row", // Align buttons horizontally

    justifyContent: "center",
    gap: 20,
    marginTop: 5,
  },

  customButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F0C0",
    padding: 10,
  
    borderRadius: 10,
    margin: 10,
  },
  customButtonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  customButtonTextContainer: {
    flexDirection: "column",
  },
  customButtonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  customButtonSubtitle: {
    fontSize: 14,
  },
  // Add other styles here as needed
});

export default NumbersHome;
