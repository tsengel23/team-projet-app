import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../constants/Colors";

const TOTAL_ROOMS = 124;
const PAID_ROOMS = 108;
const PAID_PCT = Math.round((PAID_ROOMS / TOTAL_ROOMS) * 100);

const MONTHS = [
  { m: "3-р сар", income: 1200000, expense: 380000 },
  { m: "2-р сар", income: 1150000, expense: 420000 },
  { m: "1-р сар", income: 1180000, expense: 350000 },
  { m: "12-р сар", income: 1100000, expense: 310000 },
  { m: "11-р сар", income: 1090000, expense: 390000 },
];

export default function FundDetailScreen() {
  const router = useRouter();

  // erhemee Animated progress
  const anim = useRef(new Animated.Value(0)).current;
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: PAID_PCT,
      duration: 1200,
      useNativeDriver: false,
    }).start();

    anim.addListener(({ value }) => setDisplayPct(Math.round(value)));
    return () => anim.removeAllListeners();
  }, []);

  const barWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const barColor = PAID_PCT >= 80 ? C.p600 : PAID_PCT >= 50 ? C.amber : C.red;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Шилэн данс</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Нийт үлдэгдэл */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Нийт хуримтлал</Text>
          <Text style={styles.totalAmount}>₮ 12,450,000</Text>
          <Text style={styles.totalSub}>2025 оны 3-р сарын байдлаар</Text>
        </View>

        {/* Оршин суугчдын төлбөр — animate progress */}
        <View style={styles.card}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.cardTitle}>Оршин суугчдын төлбөр</Text>
              <Text style={styles.progressSub}>
                <Text style={styles.progressNum}>{PAID_ROOMS}</Text>
                <Text style={{ color: C.muted }}> / {TOTAL_ROOMS} айл</Text>
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.bigPct, { color: barColor }]}>
                {displayPct}
                <Text style={styles.bigPctSign}>%</Text>
              </Text>
              <Text style={styles.pctLabel}>төлсөн</Text>
            </View>
          </View>

          {/* Том progress bar */}
          <View style={styles.barTrack}>
            <Animated.View
              style={[
                styles.barFill,
                { width: barWidth, backgroundColor: barColor },
              ]}
            >
              {displayPct > 18 && (
                <Text style={styles.barText}>{displayPct}%</Text>
              )}
            </Animated.View>
          </View>

          {/* Paid / Unpaid тоо */}
          <View style={styles.countRow}>
            <View
              style={[
                styles.countBox,
                { backgroundColor: C.greenBg, borderColor: C.greenBd },
              ]}
            >
              <Text style={{ fontSize: 18 }}>✅</Text>
              <View>
                <Text style={[styles.countNum, { color: C.green }]}>
                  {PAID_ROOMS}
                </Text>
                <Text style={styles.countLabel}>Төлсөн</Text>
              </View>
            </View>
            <View
              style={[
                styles.countBox,
                { backgroundColor: C.redBg, borderColor: C.redBd },
              ]}
            >
              <Text style={{ fontSize: 18 }}>❌</Text>
              <View>
                <Text style={[styles.countNum, { color: C.red }]}>
                  {TOTAL_ROOMS - PAID_ROOMS}
                </Text>
                <Text style={styles.countLabel}>Төлөөгүй</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Зарцуулалтын бүтэц */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Зарцуулалтын бүтэц</Text>
          {[
            ["Цэвэрлэгээ", 45, C.p400],
            ["Засвар", 20, C.p500],
            ["Тохижилт", 10, "#FCD34D"],
            ["Нөөц", 25, C.border],
          ].map(([l, p, col], i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles.breakRow}>
                <Text style={styles.breakLabel}>{l as string}</Text>
                <Text
                  style={[
                    styles.breakPct,
                    { color: col === C.border ? C.muted : (col as string) },
                  ]}
                >
                  {p as number}%
                </Text>
              </View>
              <View style={styles.breakTrack}>
                <View
                  style={[
                    styles.breakFill,
                    { width: `${p}%` as any, backgroundColor: col as string },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Сарын орлого & зарлага — хэвтээ scroll */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Сарын орлого & зарлага</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MONTHS.map((m, i) => (
              <View key={i} style={styles.monthBox}>
                <Text style={styles.monthName}>{m.m}</Text>
                {[
                  ["Орсон", m.income, C.green],
                  ["Гарсан", m.expense, C.red],
                ].map(([l, v, col], j) => (
                  <View key={j} style={{ marginBottom: 8 }}>
                    <Text style={styles.monthRowLabel}>{l as string}</Text>
                    <Text style={[styles.monthAmt, { color: col as string }]}>
                      ₮{((v as number) / 1_000_000).toFixed(2)}M
                    </Text>
                    <View style={styles.monthBarTrack}>
                      <View
                        style={[
                          styles.monthBarFill,
                          {
                            width:
                              `${Math.round(((v as number) / 1_500_000) * 100)}%` as any,
                            backgroundColor: col as string,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <Text style={styles.scrollHint}>← Гүйлгэж харна →</Text>
        </View>
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
  content: { backgroundColor: C.bg, padding: 16, paddingBottom: 32 },

  totalCard: {
    backgroundColor: C.p900,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden",
  },
  totalLabel: { fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 },
  totalAmount: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 2,
  },
  totalSub: { fontSize: 11, color: "rgba(255,255,255,0.4)" },

  card: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: C.text,
    marginBottom: 12,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  progressSub: { fontSize: 12, color: C.muted, marginTop: 4 },
  progressNum: { fontSize: 20, fontWeight: "900", color: C.text },
  bigPct: { fontSize: 36, fontWeight: "900", lineHeight: 40 },
  bigPctSign: { fontSize: 18 },
  pctLabel: { fontSize: 10, color: C.muted },

  barTrack: {
    height: 36,
    borderRadius: 18,
    backgroundColor: C.bg,
    overflow: "hidden",
    marginBottom: 14,
  },
  barFill: {
    height: "100%",
    borderRadius: 18,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 14,
  },
  barText: { fontSize: 13, fontWeight: "900", color: "#fff" },

  countRow: { flexDirection: "row", gap: 10 },
  countBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  countNum: { fontSize: 18, fontWeight: "900" },
  countLabel: { fontSize: 10, color: C.muted },

  breakRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  breakLabel: { fontSize: 12, fontWeight: "600", color: C.text },
  breakPct: { fontSize: 12, fontWeight: "600" },
  breakTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: C.bg,
    overflow: "hidden",
  },
  breakFill: { height: "100%", borderRadius: 4 },

  monthBox: {
    width: 120,
    backgroundColor: C.bg,
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
  },
  monthName: {
    fontSize: 11,
    fontWeight: "700",
    color: C.muted,
    marginBottom: 10,
    textAlign: "center",
  },
  monthRowLabel: { fontSize: 9, color: C.muted, marginBottom: 2 },
  monthAmt: { fontSize: 12, fontWeight: "800", marginBottom: 3 },
  monthBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: C.border,
    overflow: "hidden",
  },
  monthBarFill: { height: "100%", borderRadius: 2 },
  scrollHint: {
    fontSize: 10,
    color: C.muted,
    textAlign: "center",
    marginTop: 10,
  },
});
