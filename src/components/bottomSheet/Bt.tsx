import "react-native-gesture-handler";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";

export default function Index() {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["50%"];

  function handlePressModal() {
    bottomSheetModalRef.current.present();
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.contentContainer}>
        <Button title="Present Modal" onPress={handlePressModal} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.bottomSheetContent}>
            <Text>seeeee</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContent: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
