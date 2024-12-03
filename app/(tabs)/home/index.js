import { View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import {FontAwesome} from "@expo/vector-icons";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}
    >
      <Card>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={() => <FontAwesome name="home" />}
        />
        <Card.Content>
          <Text variant="bodyMedium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            tenetur odit eveniet inventore magnam officia quia nemo porro?
            Dolore sapiente quos illo distinctio nisi incidunt? Eaque officiis
            iusto exercitationem natus?
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Open</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}