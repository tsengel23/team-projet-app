import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

export default function OtpScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["2", "4", "", ""]);

  const handleDigit = (digit: string) => {
    const idx = code.findIndex((c) => c === "");
    if (idx === -1) return;
    const next = [...code];
    next[idx] = digit;
    setCode(next);
  };

  const handleDelete = () => {
    const idx = [...code].reverse().findIndex((c) => c !== "");
    if (idx === -1) return;
    const realIdx = 3 - idx;
    const next = [...code];
    next[realIdx] = "";
    setCode(next);
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>OTP Баталгаажуулалт</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <Text style={{ fontSize: 32 }}>📱</Text>
        </View>
        <Text style={styles.title}>Кодоо оруулна уу</Text>
        <Text style={styles.subtitle}>
          <Text style={{ fontWeight: "700", color: C.text }}>9911-2233</Text>{" "}
          дугаарт 4 оронтой код явуулсан
        </Text>

        {/* Code boxes */}
        <View style={styles.codeRow}>
          {code.map((v, i) => (
            <View
              key={i}
              style={[
                styles.codeBox,
                i === code.findIndex((c) => c === "") && styles.codeBoxActive,
              ]}
            >
              <Text style={styles.codeText}>{v}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.resend}>
          Дахин илгээх{" "}
          <Text style={{ color: C.p600, fontWeight: "700" }}>00:42</Text>
        </Text>

        {/* Numpad */}
        <View style={styles.numpad}>
          {digits.map((d, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.numBtn, d === "" && { opacity: 0 }]}
              onPress={() =>
                d === "⌫" ? handleDelete() : d !== "" && handleDigit(d)
              }
              disabled={d === ""}
            >
              <Text style={styles.numText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, code.every((c) => c !== "") && styles.btnActive]}
          onPress={() => router.replace("/(tabs)")}
          disabled={!code.every((c) => c !== "")}
        >
          <Text style={styles.btnText}>Нэвтрэх ✓</Text>
        </TouchableOpacity>
      </View>
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
  body: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    padding: 28,
    paddingTop: 40,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.blueBg,
    borderWidth: 2,
    borderColor: C.blueBd,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: { fontSize: 20, fontWeight: "900", color: C.text, marginBottom: 8 },
  subtitle: {
    fontSize: 13,
    color: C.muted,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  codeRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  codeBox: {
    width: 64,
    height: 72,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: C.border,
    backgroundColor: C.card,
    alignItems: "center",
    justifyContent: "center",
  },
  codeBoxActive: { borderColor: C.p600, backgroundColor: C.p50 },
  codeText: { fontSize: 28, fontWeight: "900", color: C.text },
  resend: { fontSize: 12, color: C.muted, marginBottom: 32 },
  numpad: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 240,
    gap: 12,
    marginBottom: 24,
  },
  numBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  numText: { fontSize: 20, fontWeight: "700", color: C.text },
  btn: {
    width: "100%",
    backgroundColor: C.border,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  btnActive: { backgroundColor: C.p700 },
  btnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
