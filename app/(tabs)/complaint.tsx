import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../../constants/Colors";

type Status = "approved" | "pending" | "rejected";
const SM: Record<Status, { l: string; c: string; bg: string; bd: string }> = {
  approved: { l: "Зөвшөөрсөн", c: C.green, bg: C.greenBg, bd: C.greenBd },
  pending: { l: "Хүлээгдэж байна", c: C.amber, bg: C.amberBg, bd: C.amberBd },
  rejected: { l: "Татгалсан", c: C.red, bg: C.redBg, bd: C.redBd },
};

const HISTORY = [
  {
    cat: "🔧 Засвар",
    title: "Хаалга эвдэрсэн",
    status: "approved" as Status,
    date: "2023.10.25",
  },
  {
    cat: "🧹 Цэвэрлэгээ",
    title: "Орцны цэвэрлэгээ хийгдэхгүй",
    status: "pending" as Status,
    date: "2023.10.20",
  },
  {
    cat: "🔧 Засвар",
    title: "Цонхны шил хагарсан",
    status: "rejected" as Status,
    date: "2023.10.15",
    reason: "Тухайн тоотын хариуцлагад хамаарна",
  },
];

function NewComplaint({ onBack }: { onBack: () => void }) {
  const [cat, setCat] = useState<string | null>(null);
  const [text, setText] = useState("");

  return (
    // nansaa
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Санал хүсэлт илгээх</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={styles.fieldLabel}>Ангилал сонгох *</Text>
        <View style={styles.catGrid}>
          {[
            ["🔧", "Засвар"],
            ["🧹", "Цэвэрлэгээ"],
            ["💡", "Санал"],
            ["❓", "Бусад"],
          ].map(([ic, l]) => (
            <TouchableOpacity
              key={l}
              style={[styles.catBtn, cat === l && styles.catBtnActive]}
              onPress={() => setCat(l)}
            >
              <Text style={{ fontSize: 24 }}>{ic}</Text>
              <Text
                style={[styles.catLabel, cat === l && styles.catLabelActive]}
              >
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.fieldLabel}>Дэлгэрэнгүй тайлбар *</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Асуудлаа дэлгэрэнгүй бичнэ үү..."
          placeholderTextColor={C.muted}
          multiline
          numberOfLines={5}
          maxLength={500}
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.charCount}>{text.length} / 500</Text>

        {(cat === "Засвар" || cat === "Цэвэрлэгээ") && (
          <View>
            <Text style={styles.fieldLabel}>Зураг хавсаргах</Text>
            <TouchableOpacity style={styles.photoBtn}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>📷</Text>
              <Text style={styles.photoBtnText}>Зураг нэмэх</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={onBack}>
          <Text style={styles.submitText}>Илгээх ✉</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function ComplaintScreen() {
  const [view, setView] = useState<"list" | "new">("list");
  if (view === "new") return <NewComplaint onBack={() => setView("list")} />;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <View style={{ width: 36 }} />
        <Text style={styles.topTitle}>Санал & Хүсэлт</Text>
        <View style={styles.bellWrap}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>3</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        <TouchableOpacity style={styles.newBtn} onPress={() => setView("new")}>
          <Text style={styles.newBtnText}>✉ Шинэ хүсэлт илгээх</Text>
        </TouchableOpacity>
        <Text style={styles.histTitle}>Миний илгээсэн хүсэлтүүд</Text>
        {HISTORY.map((h, i) => {
          const s = SM[h.status];
          return (
            <View key={i} style={styles.histCard}>
              <View style={styles.histHeader}>
                <Text style={styles.histCat}>{h.cat}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: s.bg, borderColor: s.bd },
                  ]}
                >
                  <Text style={[styles.statusText, { color: s.c }]}>{s.l}</Text>
                </View>
              </View>
              <Text style={styles.histTitle2}>{h.title}</Text>
              <Text style={styles.histDate}>{h.date}</Text>
              {"reason" in h && h.reason && (
                <View style={styles.reasonBox}>
                  <Text style={styles.reasonText}>💬 {h.reason}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  topBar: {
    backgroundColor: C.p900,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitle: { fontSize: 16, fontWeight: "800", color: "#fff" },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#fff", fontSize: 20 },
  bellWrap: { position: "relative" },
  bellBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
  },
  bellBadgeText: { color: "#fff", fontSize: 8, fontWeight: "900" },
  listContent: { backgroundColor: C.bg, padding: 16, flexGrow: 1 },
  newBtn: {
    backgroundColor: C.p700,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  newBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  histTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: C.text,
    marginBottom: 12,
  },
  histCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  histHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  histCat: { fontSize: 11, fontWeight: "700", color: C.muted },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: { fontSize: 10, fontWeight: "800" },
  histTitle2: {
    fontSize: 14,
    fontWeight: "700",
    color: C.text,
    marginBottom: 4,
  },
  histDate: { fontSize: 11, color: C.muted },
  reasonBox: {
    marginTop: 10,
    backgroundColor: C.redBg,
    borderWidth: 1,
    borderColor: C.redBd,
    borderRadius: 8,
    padding: 10,
  },
  reasonText: { fontSize: 12, color: C.red },
  formContent: { backgroundColor: C.bg, padding: 22, paddingBottom: 48 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: C.sub,
    marginBottom: 8,
    marginTop: 4,
  },
  catGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  catBtn: {
    width: "47%",
    padding: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    gap: 4,
    backgroundColor: C.card,
  },
  catBtnActive: { borderColor: C.p600, backgroundColor: C.p50 },
  catLabel: { fontSize: 13, fontWeight: "700", color: C.muted },
  catLabelActive: { color: C.p700 },
  textarea: {
    backgroundColor: C.bg,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 14,
    padding: 12,
    fontSize: 13,
    color: C.text,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 6,
  },
  charCount: { fontSize: 11, color: C.muted, marginBottom: 16 },
  photoBtn: {
    backgroundColor: C.bg,
    borderWidth: 2,
    borderColor: C.border,
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  photoBtnText: { fontSize: 13, fontWeight: "700", color: C.muted },
  submitBtn: {
    backgroundColor: C.p700,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
