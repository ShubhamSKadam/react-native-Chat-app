import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { userChatSlice } from "../store/userChatSlice";

function renderChatData(item, navigation, dispatch) {
  function onPressHandler() {
    dispatch(userChatSlice.actions.setSelectedUser(item.id));
    navigation.navigate("Chats", { item });
  }
  return (
    //container
    <Pressable onPress={() => onPressHandler(item, navigation, dispatch)}>
      <View style={styles.container}>
        {/* Profile Image */}
        <View>
          <Image source={item.profileImage} style={styles.imageProfile} />
        </View>

        {/* Name and recent chat */}
        <View style={styles.nameRecentContainer}>
          <View style={styles.userNameContainer}>
            <Text style={styles.usernameText}>{item.username}</Text>
          </View>

          <View style={styles.chatHistoryContainer}>
            <Text style={styles.grayText}>{item.chatHistory[0].sent}</Text>
            <Text style={styles.grayText}>{item.timeStamp}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const ChatSection = ({ dummyData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => renderChatData(item, navigation, dispatch)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  listContainer: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  imageProfile: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  usernameText: {
    fontSize: 18,
  },
  chatHistoryContainer: {
    flexDirection: "row",
  },
  grayText: {
    color: "gray",
  },
  nameRecentContainer: {
    paddingHorizontal: 8,
  },
  userNameContainer: {
    marginBottom: 5,
  },
});
