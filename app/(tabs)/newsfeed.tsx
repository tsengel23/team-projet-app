import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../../constants/Colors";

const BADGE: Record<string, { label: string; bg: string }> = {
  urgent: { label: "🚨 ЯАРАЛТАЙ", bg: C.red },
  meeting: { label: "📋 ХУРАЛ", bg: C.green },
  poll: { label: "📊 САНАЛ", bg: C.blue },
  ad: { label: "📣 ЗАР", bg: C.amber },
};
const BG: Record<string, string> = {
  urgent: C.redBg,
  meeting: C.greenBg,
  poll: C.blueBg,
  ad: C.amberBg,
};
const BD: Record<string, string> = {
  urgent: C.redBd,
  meeting: C.greenBd,
  poll: C.blueBd,
  ad: C.amberBd,
};

type Post = {
  type: string;
  title: string;
  body: string;
  time: string;
  poll?: { label: string; pct: number }[];
};

function PostCard({ type, title, body, time, poll }: Post) {
  const [reaction, setReaction] = useState<string | null>(null);
  const badge = BADGE[type] || BADGE.ad;
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: BG[type] || C.card,
          borderColor: BD[type] || C.border,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
          <Text style={styles.badgeText}>{badge.label}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {poll && (
        <View style={{ marginTop: 10 }}>
          {poll.map((o, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={styles.pollLabel}>{o.label}</Text>
                <Text style={[styles.pollLabel, { color: C.p600 }]}>
                  {o.pct}%
                </Text>
              </View>
              <View style={styles.pollBar}>
                <View
                  style={[styles.pollFill, { width: `${o.pct}%` as any }]}
                />
              </View>
            </View>
          ))}
          <Text style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
            142 оршин суугч санал өгсөн
          </Text>
        </View>
      )}
      <View
        style={[styles.reactionRow, { borderTopColor: BD[type] || C.border }]}
      >
        {["👍", "❤️", "😮", "😢", "😡"].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => setReaction(reaction === e ? null : e)}
            style={[
              styles.emojiBtn,
              reaction === e && { backgroundColor: C.p100 },
            ]}
          >
            <Text style={{ fontSize: 18 }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const FILTERS = [
  { k: "all", l: "Бүгд" },
  { k: "urgent", l: "🚨 Яаралтай" },
  { k: "meeting", l: "📋 Хурал" },
  { k: "poll", l: "📊 Санал" },
  { k: "ad", l: "📣 Зар" },
];

const POSTS: Post[] = [
  {
    type: "urgent",
    title: "Цахилгаан таслах мэдэгдэл",
    body: "2025.03.16 10:00–14:00 засварын улмаас таслагдана.",
    time: "1 ц өмнө",
  },
  {
    type: "meeting",
    title: "СӨХ-ийн ээлжит хурал",
    body: "2025.04.01 Мягмар 18:00 цагт 1-р давхарт болно.",
    time: "3 ц өмнө",
  },
  {
    type: "poll",
    title: "Тоглоомын талбайн шинэчлэл",
    body: "Аль өнгийг сонгох вэ?",
    time: "Өчигдөр",
    poll: [
      { label: "Ногоон ба Цэнхэр", pct: 64 },
      { label: "Улаан ба Шар", pct: 36 },
    ],
  },
  {
    type: "ad",
    title: "Хуучин зурагт зарна",
    body: "Samsung 43' 120,000₮-д зарна. 9988-7766.",
    time: "2 өдрийн өмнө",
  },
  {
    type: "meeting",
    title: "Цэвэрлэгээний хуваарь",
    body: "3-р орцны цэвэрлэгээ энэ долоо хоногт хийгдэнэ.",
    time: "3 өдрийн өмнө",
  },
];

export default function FeedScreen() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? POSTS : POSTS.filter((p) => p.type === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Мэдэгдэл & Зар</Text>
        <View style={styles.bellWrap}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>3</Text>
          </View>
        </View>
      </View>
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.k}
              onPress={() => setFilter(f.k)}
              style={[
                styles.filterBtn,
                filter === f.k && styles.filterBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f.k && styles.filterTextActive,
                ]}
              >
                {f.l}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.list} contentContainerStyle={{ padding: 16 }}>
        {visible.map((p, i) => (
          <PostCard key={i} {...p} />
        ))}
        <TouchableOpacity style={styles.newAd}>
          <Text style={{ fontSize: 24, marginBottom: 6 }}>✏️</Text>
          <Text style={styles.newAdText}>Зар оруулах</Text>
        </TouchableOpacity>
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
  filterBar: {
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.border,
    marginRight: 6,
    backgroundColor: C.card,
  },
  filterBtnActive: { borderColor: C.p600, backgroundColor: C.p50 },
  filterText: { fontSize: 12, fontWeight: "700", color: C.muted },
  filterTextActive: { color: C.p700 },
  list: { flex: 1, backgroundColor: C.bg },
  card: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 9, fontWeight: "800", color: "#fff" },
  time: { fontSize: 10, color: C.muted },
  title: { fontSize: 14, fontWeight: "800", color: C.text, marginBottom: 4 },
  body: { fontSize: 12, color: C.sub, lineHeight: 18 },
  pollLabel: { fontSize: 12, fontWeight: "600", color: C.text },
  pollBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: C.border,
    overflow: "hidden",
  },
  pollFill: { height: "100%", backgroundColor: C.p600, borderRadius: 4 },
  reactionRow: {
    flexDirection: "row",
    gap: 6,
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 12,
  },
  emojiBtn: { padding: 4, borderRadius: 8 },
  newAd: {
    backgroundColor: C.card,
    borderWidth: 2,
    borderColor: C.border,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  newAdText: { fontSize: 13, fontWeight: "800", color: C.text },
});
