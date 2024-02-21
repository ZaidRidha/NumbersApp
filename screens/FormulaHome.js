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

const detailedCategories = {
  Mathematics: {
    icon: "calculator",
    type: "font-awesome",
    bgColor: "#D1E3C8",
    subCategories: {
      Algebra: {
        imagePath: require("../assets/Images/algebra-icon.png"),
        subSubCategories: [
          "Properties of Exponents",
          "Radical Properties",
          "Operations with polynomials",
          "Product Formulas",
          "Factoring Formulas",
          "Binomial theorem",
          "Operations with algebraic fractions",
          "Linear equations",
          "Properties of inequality",
          "General formula",
          "Properties of logarithms",
          "Summation theorems",
          "Taylor and Maclaurin Series",
          "Summary of series criteria",
          "Properties of complex numbers",
          "Modulus & argument of a complex number",
          "Conjugate of a complex number",
          "Representations of a complex number",
          "Complex number operations",
          "De Moivre’s formula",
        ],
      },
      Geometry: {
        imagePath: require("../assets/Images/geo-icon.png"),
        subSubCategories: [
          "Angles in a polygon",
          "Quadrilateral area & perimeter",
          "Area & perimeter of triangles",
          "Area & perimeter of the circle",
          "Volume of geometric bodies",
          "Equation of the line",
          "Distance between two points",
          "Distance from a point to a line",
          "Midpoint between two points",
          "Circumference",
          "Parabola with vertex at the origin",
          "Parabola with vertex different from the origin",
          "Ellipse with center at the origin",
          "Ellipse with different center of origin",
          "Hyperbola",
        ],
      },
      Trigonometry: {
        imagePath: require("../assets/Images/trig-icon.png"),
        subSubCategories: [
          "Trigonometric functions of common angles",
          "Law of sines & law of cosines",
          "Fundamental trigonometric identities",
          "Trigonometric identities of addition & subtraction of angles",
          "Double & half angle trigonometric identities",
          "Trigonometric identities of sum to product & product to sum",
          "Other trigonometric identities",
          "Sine & cosine values",
          "Surface of a triangle & a spherical polygon",
          "Spherical trigonometry: law of sines",
          "Spherical trigonometry: Cosine rule for sides",
          "Spherical trigonometry: Cosine rule for angles",
          "Spherical trigonometry: Cotangent theorem",
          "Spherical trigonometry: Half - angle",
          "Delambre - Gauss Analogies",
          "Napier’s analogies",
        ],
      },
      "Differential Calculus": {
        imagePath: require("../assets/Images/diff-icon.png"),
        subSubCategories: [
          "Properties of limits",
          "Properties of trigonometric limits",
          "Basic derivative rules",
          "Derivatives of logarithmic functions",
          "Derivatives of exponential functions",
          "Derivatives of trigonometric functions",
          "Derivatives of inverse trigonometric functions",
          "Derivatives of hyperbolic functions",
          "Derivatives of inverse hyperbolic functions",
          "Criterion of the first & second derivative",
        ],
      },
      "Integral Calculus": {
        imagePath: require("../assets/Images/integ-icon.png"),
        subSubCategories: [
          "Basic integration rules",
          "Change of variables",
          "Integrals of hyperbolic functions",
          "Integrals that result in inverse trigonometric functions",
          "Fundamental theorem of calculus",
          "Integration of parts",
          "Integration by trigonometric substitution",
          "Integration by partial fractions",
          "Integrals of trigonometric functions",
        ],
      },
      "Multivariable Calculus": {
        imagePath: require("../assets/Images/multi-icon.png"),
        subSubCategories: [
          "Limit, derivative & integral of a vector function",
          "Properties of limits of functions of several variables",
          "Derivative of vector function",
          "Arc length",
          "Areas under the curve",
          "Area of a surface of revolution",
          "Partial derivatives",
          "Directional Derivatives, gradient of a function and total differential",
          "Differential operators",
          "Vector identities",
          "Fubini’s theorem",
          "Variable change",
          "Integral in cylindrical coordinates",
          "Line integrals",
          "Integral theorems",
        ],
      },
      "Probability and Statistics": {
        imagePath: require("../assets/Images/prob-icon.png"),
        subSubCategories: [
          "Measures of central tendency for ungrouped data",
          "Measures of dispersion for ungrouped data",
          "Measures of position for ungrouped data",
          "Measures of central tendency for grouped data",
          "Quantile calculation for grouped data",
          "Statistical moments",
          "Geometric mean",
          "Probability",
          "Combinations and permutations",
          "Binomial distribution",
          "Poisson distribution",
          "Geometric distribution",
          "Hypergeometric distribution",
          "Normal distribution",
          "Exponential distribution",
          "Student’s distribution",
          "Inferential statistics",
          "Confidence intervals",
          "Sample Size",
        ],
      },
      "Linear Algebra": {
        imagePath: require("../assets/Images/lin-icon.png"),
        subSubCategories: [
          "Properties of matrix",
          "Identity matrix",
          "Triangular matrix",
          "Symmetric matrix",
          "Transpose of a matrix",
          "Adjoint matrix",
          "Inverse matrix",
          "Orthogonal matrix",
          "Addition & subtraction of matrices",
          "Matrix multiplication",
          "Determinants",
          "Cramer’s Rule",
          "Sarrus Rule",
          "Vectors & their magnitude",
          "Operations with vectors & their properties",
          "Unit vector",
          "Midpoint between two points in space",
          "Angle Between vectors",
          "Dot product & its properties",
          "Vector projections",
          "Cross product & its properties",
          "Vector normalization",
        ],
      },
      "Differential Equations": {
        imagePath: require("../assets/Images/diff-icon.png"),
        subSubCategories: [
          "Properties of the constant of integration",
          "Separable differential equation",
          "Homogeneous differential equation",
          "Differential equations with coefficients of parallel lines",
          "Differential equations with coefficients of non-parallel lines",
          "Exact Differential equations",
          "First order linear differential equation",
          "Higher order linear differential equations",
          "Differential equations with constant coefficients",
        ],
      },
      "Fourier Series": {
        imagePath: require("../assets/Images/four-icon.png"),
        subSubCategories: [
          "Fourier series",
          "Even symmetry",
          "Odd symmetry",
          "Half-wave symmetry",
          "Even Quarter wave symmetry",
          "Odd Quarter wave symmetry",
          "Unit Impulse function",
          "Heaviside step function",
          "Complex form of Fourier series",
          "Fourier transform",
          "Fourier sine & cosine transform",
          "Convolution",
          "Fourier transform table 1",
          "Fourier transform table 2",
          "Laplace transform",
          "Laplace transform table 1",
          "Laplace transform table 2",
        ],
      },
      "Discrete Mathematics": {
        imagePath: require("../assets/Images/disc-icon.png"),
        subSubCategories: [
          "Logical connectors",
          "Conjunction",
          "Disjunction",
          "Negation",
          "Conditional",
          "Biconditional",
          "Laws of propositional logic",
          "Laws of set theory",
          "Laws of Boolean Algebra",
        ],
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
