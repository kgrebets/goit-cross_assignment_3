import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import BoxList from "./components/BoxList/BoxList";
import Button from "./components/Button/Button";
import { dummyData as initialData } from "./data";
import { colors } from "./constants/colors";
import { Box } from "./models/Box";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  const [query, setQuery] = useState("");
  const [boxes, setBoxes] = useState<Box[]>(initialData);

  const q = query.trim().toLowerCase();
  const filteredBoxes = !q
    ? boxes
    : boxes.filter((b) => {
        const inTitle = b.title.toLowerCase().includes(q);
        const inItems = b.items?.some((it) => it.toLowerCase().includes(q));
        return inTitle || inItems;
      });

  const handleAdd = () => {
    const n = boxes.length + 1;

    const newBox: Box = {
      id: Date.now().toString(),
      title: `New box #${n}`,
      items: [],
    };
    setBoxes((prev) => [newBox, ...prev]);
  };

  const handleOpen = (box: Box) => {
    Alert.alert(
      "Box opened",
      `You selected: ${box.title}\n with ${box.items.length} items`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <BoxList data={filteredBoxes} onPressBox={handleOpen} />

      <View style={styles.addContainer}>
        <Button label="Add box" icon="add" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  addContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
});
