import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>🏘</Text>
        </View>
        <Text style={styles.appName}>E-СӨХ</Text>
        <Text style={styles.tagline}>Орон сууцны ухаалаг платформ</Text>
      </View>

      {/* Form */}
      <View style={styles.body}>
        <Text style={styles.title}>Нэвтрэх</Text>
        <Text style={styles.subtitle}>
          Бүртгэлтэй утасны дугаараа оруулна уу
        </Text>

        {/* Phone input */}
        <View style={styles.inputRow}>
          <Text style={styles.flag}>🇲🇳 +976</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="9911-2233"
            placeholderTextColor={C.muted}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push("/otp")}
        >
          <Text style={styles.btnPrimaryText}>Нэвтрэх →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => router.push("/qr-scan")}
        >
          <Text style={styles.btnSecondaryText}>Бүртгэл үүсгэх</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Апп татах холбоос авахын тулд{"\n"}СӨХ-ийн дарга/ажилтантай холбогдоно
          уу
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  header: {
    backgroundColor: C.p900,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  logoEmoji: { fontSize: 44 },
  appName: {
    fontSize: 34,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
  },
  tagline: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 },
  body: {
    flex: 1,
    backgroundColor: C.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingTop: 36,
  },
  title: { fontSize: 20, fontWeight: "800", color: C.text, marginBottom: 6 },
  subtitle: { fontSize: 13, color: C.muted, marginBottom: 24 },
  inputRow: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  flag: { fontSize: 14, color: C.muted, fontWeight: "700" },
  divider: { width: 1, height: 20, backgroundColor: C.border },
  input: { flex: 1, fontSize: 14, color: C.text },
  btnPrimary: {
    backgroundColor: C.p700,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  btnPrimaryText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  btnSecondary: {
    padding: 15,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.p600,
    alignItems: "center",
  },
  btnSecondaryText: { color: C.p700, fontSize: 15, fontWeight: "800" },
  hint: {
    textAlign: "center",
    marginTop: "auto",
    paddingTop: 24,
    fontSize: 11,
    color: C.muted,
    lineHeight: 18,
  },
});
