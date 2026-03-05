import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

const MONTHS = [
  "3-р сар 2025",
  "2-р сар 2025",
  "1-р сар 2025",
  "12-р сар 2024",
  "11-р сар 2024",
];
const DATA = [
  { amount: 15000, paid: false, date: "" },
  { amount: 15000, paid: true, date: "2025.02.20" },
  { amount: 15000, paid: true, date: "2025.01.22" },
  { amount: 14000, paid: true, date: "2024.12.18" },
  { amount: 14000, paid: false, date: "" },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);

  const unpaid = DATA.filter((d) => !d.paid);
  const totalUnpaid = unpaid.reduce((a, d) => a + d.amount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header erhemee*/}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>СӨХ Төлбөр</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryLabel}>Нийт үлдэгдэл өр</Text>
            <Text style={styles.summaryAmount}>
              ₮ {totalUnpaid.toLocaleString()}
            </Text>
            <Text style={styles.summarySub}>
              {unpaid.length} сарын хураамж төлөгдөөгүй
            </Text>
          </View>
          <View style={styles.paidCount}>
            <Text style={styles.paidNum}>
              {DATA.filter((d) => d.paid).length}
            </Text>
            <Text style={styles.paidLabel}>сар төлсөн</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.payNowBtn}
          onPress={() => setModal(true)}
        >
          <Text style={styles.payNowText}>💳 Одоо төлөх</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Төлөөгүй", "Төлсөн"].map((l, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.tabBtn, tab === i && styles.tabBtnActive]}
            onPress={() => setTab(i)}
          >
            <Text style={[styles.tabText, tab === i && styles.tabTextActive]}>
              {l}
              {i === 0 && unpaid.length > 0 && (
                <Text style={styles.tabBadge}> {unpaid.length}</Text>
              )}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {MONTHS.map((m, i) => {
          const d = DATA[i];
          if (tab === 0 && d.paid) return null;
          if (tab === 1 && !d.paid) return null;
          return (
            <View key={i} style={[styles.item, !d.paid && styles.itemUnpaid]}>
              <View style={[styles.itemIcon, !d.paid && styles.itemIconUnpaid]}>
                <Text style={{ fontSize: 22 }}>🏢</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>СӨХ хураамж</Text>
                <Text style={styles.itemMonth}>{m}</Text>
                {d.paid && (
                  <Text style={styles.itemDate}>Төлсөн: {d.date}</Text>
                )}
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.itemAmount, !d.paid && { color: C.red }]}>
                  ₮{d.amount.toLocaleString()}
                </Text>
                <Text style={{ fontSize: 14, marginTop: 3 }}>
                  {d.paid ? "✅" : "❌"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Payment modal */}
      <Modal
        visible={modal}
        transparent
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setModal(false)}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Төлбөрийн хэрэгсэл</Text>
            <Text style={styles.sheetSub}>
              ₮15,000 — 2025 оны 3-р сарын хураамж
            </Text>
            {[
              ["🟦", "QPay", "Хурдан, аюулгүй"],
              ["🟩", "SocialPay", "Khan Bank"],
              ["🏦", "Банкны апп", "Бусад банк"],
            ].map(([ic, l, sub], i) => (
              <TouchableOpacity
                key={i}
                style={styles.payOption}
                onPress={() => setModal(false)}
              >
                <Text style={{ fontSize: 28 }}>{ic}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.payOptionTitle}>{l}</Text>
                  <Text style={styles.payOptionSub}>{sub}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModal(false)}
            >
              <Text style={styles.cancelText}>Болих</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  header: { backgroundColor: C.p900, paddingBottom: 20 },
  topBar: {
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
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLeft: {},
  summaryLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryAmount: { fontSize: 30, fontWeight: "900", color: "#fff" },
  summarySub: { fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 },
  paidCount: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paidNum: { fontSize: 22, fontWeight: "900", color: "#fff" },
  paidLabel: { fontSize: 9, color: "rgba(255,255,255,0.5)" },
  payNowBtn: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  payNowText: { color: C.p700, fontSize: 14, fontWeight: "800" },
  tabs: {
    flexDirection: "row",
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderBottomWidth: 2.5,
    borderBottomColor: "transparent",
  },
  tabBtnActive: { borderBottomColor: C.p600 },
  tabText: { fontSize: 12, fontWeight: "700", color: C.muted },
  tabTextActive: { color: C.p700 },
  tabBadge: { color: C.red },
  list: { padding: 16, backgroundColor: C.bg, flexGrow: 1 },
  item: {
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemUnpaid: { backgroundColor: C.redBg, borderColor: C.redBd },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.p50,
    alignItems: "center",
    justifyContent: "center",
  },
  itemIconUnpaid: { backgroundColor: C.redBd },
  itemTitle: { fontSize: 13, fontWeight: "700", color: C.text },
  itemMonth: { fontSize: 11, color: C.muted, marginTop: 2 },
  itemDate: { fontSize: 11, color: C.green, marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: "900", color: C.text },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: C.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.border,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: C.text,
    marginBottom: 4,
  },
  sheetSub: { fontSize: 12, color: C.muted, marginBottom: 18 },
  payOption: {
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  payOptionTitle: { fontSize: 14, fontWeight: "700", color: C.text },
  payOptionSub: { fontSize: 11, color: C.muted },
  arrow: { fontSize: 18, color: C.muted },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  cancelText: { color: C.muted, fontSize: 14, fontWeight: "700" },
});
