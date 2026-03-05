import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../../constants/Colors";

export default function ProfileScreen() {
  const router = useRouter();

  const INFO = [
    ["🏢", "Байр", "А байр"],
    ["🚪", "Орц", "А-орц"],
    ["🔑", "Тоот", "402"],
    ["🏠", "Төлөв", "Өмчлөгч"],
  ];

  const MENU = [
    ["📋", "Миний илгээсэн хүсэлтүүд"],
    ["📞", "Нэмэлт холбоо барих"],
    ["❓", "Тусламж & FAQ"],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header togtoh */}
      <View style={styles.header}>
        <Text style={styles.topTitle}>Профайл</Text>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 30 }}>👤</Text>
          </View>
          <View>
            <Text style={styles.name}>Тулга</Text>
            <Text style={styles.phone}>📱 +976 9911-2233</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>
                ✅ Баталгаажсан · 2023.01.15-аас
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Байрны мэдээлэл */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>БАЙРНЫ МЭДЭЭЛЭЛ</Text>
          {INFO.map(([ic, l, v], i) => (
            <View
              key={i}
              style={[
                styles.infoRow,
                i < INFO.length - 1 && styles.infoRowBorder,
              ]}
            >
              <Text style={styles.infoIcon}>{ic}</Text>
              <Text style={styles.infoLabel}>{l}</Text>
              <Text style={styles.infoValue}>{v}</Text>
            </View>
          ))}
        </View>

        {/* Menu items */}
        {MENU.map(([ic, l], i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={{ fontSize: 18 }}>{ic}</Text>
            </View>
            <Text style={styles.menuLabel}>{l}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.logoutText}>↩ Гарах</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  header: {
    backgroundColor: C.p900,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  userRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  name: { fontSize: 20, fontWeight: "900", color: "#fff" },
  phone: { fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 },
  verifiedBadge: {
    marginTop: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  verifiedText: { fontSize: 10, color: C.p400, fontWeight: "800" },
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { padding: 16, paddingTop: 20, paddingBottom: 32 },
  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: C.muted,
    letterSpacing: 1,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: C.divider },
  infoIcon: { fontSize: 18, marginRight: 12 },
  infoLabel: { flex: 1, fontSize: 13, color: C.muted },
  infoValue: { fontSize: 13, fontWeight: "700", color: C.text },
  menuItem: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.p50,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { flex: 1, fontSize: 13, fontWeight: "700", color: C.text },
  menuArrow: { fontSize: 20, color: C.muted },
  logoutBtn: {
    borderWidth: 1.5,
    borderColor: C.redBd,
    backgroundColor: C.redBg,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 6,
  },
  logoutText: { color: C.red, fontSize: 14, fontWeight: "800" },
});
