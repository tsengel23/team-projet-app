import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

export default function SignupScreen() {
  const router = useRouter();
  const { orgId, orgName, building } = useLocalSearchParams<{
    orgId: string;
    orgName: string;
    building: string;
  }>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [buildingNum, setBuildingNum] = useState("");
  const [ortsNum, setOrtsNum] = useState("");
  const [toot, setToot] = useState("");
  const [ownerType, setOwnerType] = useState<"owner" | "rent">("owner");

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Бүртгэл үүсгэх</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* QR-аас уншсан байр */}
        <View style={styles.qrBadge}>
          <View style={styles.qrBadgeIcon}>
            <Text style={{ fontSize: 20 }}>🏢</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.qrOrgName}>{orgName || "Сансар хотхон"}</Text>
            <Text style={styles.qrBuilding}>
              {building || "А байр"} · QR-аар баталгаажсан 🔒
            </Text>
          </View>
          <Text style={{ fontSize: 20 }}>✅</Text>
        </View>

        {/* Нэр */}
        <View style={styles.field}>
          <Text style={styles.label}>Хэрэглэгчийн нэр</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="Бат-Эрдэнэ Дорж"
              placeholderTextColor={C.muted}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* Утас */}
        <View style={styles.field}>
          <Text style={styles.label}>Утасны дугаар</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>📱</Text>
            <TextInput
              style={styles.input}
              placeholder="9911-2233"
              placeholderTextColor={C.muted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* 1. Байрны дугаар */}
        <View style={styles.field}>
          <Text style={styles.label}>Байрны дугаар</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>🏗</Text>
            <TextInput
              style={styles.input}
              placeholder="1-р байр / А блок"
              placeholderTextColor={C.muted}
              value={buildingNum}
              onChangeText={setBuildingNum}
            />
          </View>
        </View>

        {/* 2. Орцны дугаар — input */}
        <View style={styles.field}>
          <Text style={styles.label}>Орцны дугаар</Text>
          <View style={[styles.inputRow, ortsNum ? styles.inputRowActive : {}]}>
            <Text style={styles.inputIcon}>🚪</Text>
            <TextInput
              style={styles.input}
              placeholder="А-орц, 2-орц гэх мэт"
              placeholderTextColor={C.muted}
              value={ortsNum}
              onChangeText={setOrtsNum}
            />
            {ortsNum.length > 0 && (
              <TouchableOpacity onPress={() => setOrtsNum("")}>
                <Text style={styles.clearBtn}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. Хаалганы тоот */}
        <View style={styles.field}>
          <Text style={styles.label}>Хаалганы тоот</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>🔑</Text>
            <TextInput
              style={styles.input}
              placeholder="402"
              placeholderTextColor={C.muted}
              keyboardType="number-pad"
              value={toot}
              onChangeText={setToot}
            />
          </View>
        </View>

        {/* Өмчлөлийн төлөв */}
        <View style={styles.field}>
          <Text style={styles.label}>Өмчлөлийн төлөв</Text>
          <View style={styles.toggleRow}>
            {(
              [
                ["owner", "🏠 Өмчлөгч"],
                ["rent", "🔑 Түрээслэгч"],
              ] as const
            ).map(([k, l]) => (
              <TouchableOpacity
                key={k}
                style={[
                  styles.toggleBtn,
                  ownerType === k && styles.toggleBtnActive,
                ]}
                onPress={() => setOwnerType(k)}
              >
                <Text
                  style={[
                    styles.toggleText,
                    ownerType === k && styles.toggleTextActive,
                  ]}
                >
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => router.push("/pending")}
        >
          <Text style={styles.submitText}>Хүсэлт илгээх →</Text>
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
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { padding: 22, paddingBottom: 48 },
  qrBadge: {
    backgroundColor: C.greenBg,
    borderWidth: 1.5,
    borderColor: C.greenBd,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  qrBadgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
  },
  qrOrgName: { fontSize: 13, fontWeight: "800", color: C.green },
  qrBuilding: { fontSize: 12, color: "#166534", marginTop: 1 },
  field: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: "700", color: C.sub, marginBottom: 6 },
  inputRow: {
    backgroundColor: C.card,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputRowActive: { borderColor: C.p600 },
  inputIcon: { fontSize: 16 },
  input: { flex: 1, fontSize: 14, color: C.text },
  clearBtn: { fontSize: 16, color: C.muted },
  toggleRow: { flexDirection: "row", gap: 10 },
  toggleBtn: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    backgroundColor: C.card,
  },
  toggleBtnActive: { borderColor: C.p600, backgroundColor: C.p50 },
  toggleText: { fontSize: 13, fontWeight: "700", color: C.muted },
  toggleTextActive: { color: C.p700 },
  submitBtn: {
    backgroundColor: C.p700,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
  },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
