import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

export default function PendingScreen() {
  const router = useRouter();

  const steps = [
    { label: "Хүсэлт илгээсэн", sub: "14:32", status: "done" },
    { label: "Admin хянаж байна", sub: "Хүлээгдэж байна...", status: "active" },
    { label: "Зөвшөөрөл & OTP", sub: "", status: "wait" },
  ];

  return (
    // huslee
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Хүсэлтийн төлөв</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconWrap}>
          <Text style={{ fontSize: 36 }}>⏳</Text>
        </View>
        <Text style={styles.title}>Хүсэлт илгээгдлээ</Text>
        <Text style={styles.subtitle}>
          Admin хянаж зөвшөөрсний дараа{" "}
          <Text style={{ fontWeight: "700", color: C.text }}>9911-2233</Text>{" "}
          дугаарт OTP код илгээнэ.
        </Text>

        {/* Steps */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>БҮРТГЭЛИЙН ТӨЛӨВ</Text>
          {steps.map((step, i) => (
            <View
              key={i}
              style={[
                styles.stepRow,
                i < steps.length - 1 && styles.stepRowBorder,
              ]}
            >
              <View
                style={[
                  styles.stepDot,
                  step.status === "done" && { backgroundColor: C.p600 },
                  step.status === "active" && { backgroundColor: C.amber },
                  step.status === "wait" && { backgroundColor: C.border },
                ]}
              >
                <Text
                  style={[
                    styles.stepDotText,
                    step.status === "wait" && { color: C.muted },
                  ]}
                >
                  {step.status === "done"
                    ? "✓"
                    : step.status === "active"
                      ? "●"
                      : "○"}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.stepLabel,
                    step.status === "wait" && { color: C.muted },
                  ]}
                >
                  {step.label}
                </Text>
                {step.sub ? (
                  <Text style={styles.stepSub}>{step.sub}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Мэдээлэл</Text>
          <Text style={styles.infoText}>
            Зөвшөөрсний дараа push notification болон SMS хоёулаа ирнэ.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/otp")}
        >
          <Text style={styles.btnText}>OTP оруулах →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  topBar: {
    backgroundColor: C.p900,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 20 },
  topTitle: { fontSize: 16, fontWeight: "800", color: "#fff" },
  content: {
    backgroundColor: C.bg,
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.amberBg,
    borderWidth: 2,
    borderColor: C.amberBd,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "900", color: C.text, marginBottom: 8 },
  subtitle: {
    fontSize: 13,
    color: C.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  card: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: C.muted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingBottom: 16,
    marginBottom: 16,
  },
  stepRowBorder: { borderBottomWidth: 1, borderBottomColor: C.divider },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotText: { fontSize: 13, fontWeight: "800", color: "#fff" },
  stepLabel: { fontSize: 13, fontWeight: "700", color: C.text },
  stepSub: { fontSize: 11, color: C.muted, marginTop: 1 },
  infoBox: {
    width: "100%",
    backgroundColor: C.greenBg,
    borderWidth: 1,
    borderColor: C.greenBd,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  infoTitle: { fontSize: 12, fontWeight: "800", color: C.green },
  infoText: { fontSize: 12, color: "#166534", marginTop: 4, lineHeight: 18 },
  btn: {
    width: "100%",
    backgroundColor: C.p700,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
