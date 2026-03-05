import { Tabs } from "expo-router";
import { Text } from "react-native";
import { C } from "../../constants/Colors";

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.p700,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: {
          backgroundColor: C.card,
          borderTopColor: C.border,
          borderTopWidth: 1.5,
          paddingBottom: 14,
          paddingTop: 6,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Нүүр",
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="newsfeed"
        options={{
          title: "Мэдэгдэл",
          tabBarIcon: ({ focused }) => <TabIcon icon="📰" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="complaint"
        options={{
          title: "Хүсэлт",
          tabBarIcon: ({ focused }) => <TabIcon icon="✉️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профайл",
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
