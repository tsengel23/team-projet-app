import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { C } from "../../constants/Colors";

const { width: SCREEN_W } = Dimensions.get("window");

// ── POST CARD ─────────────────────────────────────────────────────────────────
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
        styles.postCard,
        {
          backgroundColor: BG[type] || C.card,
          borderColor: BD[type] || C.border,
          height: 250,
        },
      ]}
    >
      <View style={styles.postHeader}>
        <View style={[styles.badgePill, { backgroundColor: badge.bg }]}>
          <Text style={styles.badgeText}>{badge.label}</Text>
        </View>
        <Text style={styles.postTime}>{time}</Text>
      </View>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postBody}>{body}</Text>
      {poll && (
        <View style={{ marginTop: 10 }}>
          {poll.map((o, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.pollLabelRow}>
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
          <Text style={styles.pollMeta}>142 оршин суугч санал өгсөн</Text>
        </View>
      )}
      <View
        style={[styles.reactionRow, { borderTopColor: BD[type] || C.border }]}
      >
        {["👍", "❤️", "😮", "😢", "😡"].map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => setReaction(reaction === e ? null : e)}
            style={[styles.emojiBtn, reaction === e && styles.emojiBtnActive]}
          >
            <Text style={{ fontSize: 18 }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ── POST CAROUSEL ─────────────────────────────────────────────────────────────
function PostCarousel({
  posts,
  onViewAll,
}: {
  posts: Post[];
  onViewAll: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const cardW = SCREEN_W - 32;

  return (
    <View style={{ marginBottom: 14, height: "auto" }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📰 Мэдэгдэл & Зар</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>Бүгдийг харах →</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setIdx(Math.round(e.nativeEvent.contentOffset.x / cardW))
        }
        snapToInterval={cardW}
        decelerationRate="fast"
      >
        {posts.map((p, i) => (
          <View
            key={i}
            style={{
              width: cardW,
              gap: 12,
              marginRight: i === posts.length - 1 ? 0 : 12,
            }}
          >
            <PostCard {...p} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotRow}>
        {posts.map((_, i) => (
          <View key={i} style={[styles.dot, i === idx && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();

  const posts: Post[] = [
    {
      type: "urgent",
      title: "Лифтний засвар",
      body: "Маргааш 10:00–14:00 В блокын 2-р лифт засвартай.",
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
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Сайн байна уу 👋</Text>
            <Text style={styles.username}>Тулга</Text>
          </View>
          <View style={styles.bellWrap}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>3</Text>
            </View>
          </View>
        </View>

        {/* User info pill togtoh*/}
        <View style={styles.infoPill}>
          {[
            ["🏢", "А байр"],
            ["🚪", "А-орц"],
            ["🔑", "402 тоот"],
            ["🏠", "Өмчлөгч"],
          ].map(([ic, v], i) => (
            <View key={i} style={styles.infoItem}>
              <Text style={{ fontSize: 14 }}>{ic}</Text>
              <Text style={styles.infoText}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={styles.body}>
          {/* Шилэн данс erhemee */}
          <TouchableOpacity
            style={styles.fundCard}
            onPress={() => router.push("/fund-detail")}
          >
            <View style={styles.fundTop}>
              <Text style={styles.fundLabel}>🏦 Шилэн данс</Text>
              <Text style={styles.fundMore}>Дэлгэрэнгүй →</Text>
            </View>
            <Text style={styles.fundAmount}>₮ 12,450,000</Text>
            <View style={styles.fundBreak}>
              {[
                ["Цэвэрлэгээ", "45%", C.p400],
                ["Засвар", "20%", C.p500],
                ["Тохижилт", "10%", "#FCD34D"],
                ["Нөөц", "25%", "rgba(255,255,255,0.3)"],
              ].map(([l, p, col], i) => (
                <View key={i} style={styles.fundItem}>
                  <View
                    style={[styles.fundDot, { backgroundColor: col as string }]}
                  />
                  <Text style={styles.fundItemLabel}>{l}</Text>
                  <Text style={[styles.fundItemPct, { color: col as string }]}>
                    {p}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {/* Post carousel  ah*/}
          <PostCarousel
            posts={posts}
            onViewAll={() => router.push("/(tabs)/newsfeed")}
          />

          {/* СӨХ Хураамж erhemee*/}
          <View style={styles.payCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏢 СӨХ Хураамж</Text>
              <TouchableOpacity onPress={() => router.push("/payment")}>
                <Text style={styles.viewAll}>Бүгдийг харах →</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.unpaidBadge}>
              <View>
                <Text style={styles.unpaidMonth}>
                  2025 оны 3-р сарын төлбөр
                </Text>
                <Text style={styles.unpaidAmount}>₮ 15,000</Text>
              </View>
              <View style={styles.unpaidTag}>
                <Text style={styles.unpaidTagText}>Төлөөгүй</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payBtnText}>Одоо төлөх</Text>
            </TouchableOpacity>
          </View>

          {/* Яаралтай тусламж khuslee*/}
          <View style={styles.emergCard}>
            <Text style={styles.sectionTitle}>🆘 Яаралтай тусламж</Text>
            <View style={styles.emergGrid}>
              {[
                ["👮", "Цагдаа", "102"],
                ["🚑", "Түргэн тусламж", "103"],
                ["🚒", "Гал унтраах", "101"],
                ["🏥", "СӨХ дуудлага", "7700-XXXX"],
              ].map(([ic, l, n], i) => (
                <TouchableOpacity key={i} style={styles.emergItem}>
                  <Text style={{ fontSize: 22 }}>{ic}</Text>
                  <View>
                    <Text style={styles.emergLabel}>{l}</Text>
                    <Text style={styles.emergNum}>{n}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const blue = "#2563EB";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.p900 },
  header: {
    backgroundColor: C.p900,
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: "600" },
  username: { fontSize: 22, fontWeight: "900", color: "#fff", marginTop: 2 },
  bellWrap: { position: "relative" },
  bellBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.red,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: C.p700,
  },
  bellBadgeText: { color: "#fff", fontSize: 9, fontWeight: "900" },
  infoPill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 0,
  },
  infoItem: { alignItems: "center", gap: 4 },
  infoText: { fontSize: 10, fontWeight: "700", color: "rgba(255,255,255,0.9)" },
  body: { backgroundColor: C.bg, padding: 16, paddingTop: 20 },
  fundCard: {
    backgroundColor: C.p900,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    overflow: "hidden",
  },
  fundTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  fundLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.6)",
  },
  fundMore: { fontSize: 11, color: C.p400, fontWeight: "700" },
  fundAmount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 14,
  },
  fundBreak: { flexDirection: "row", gap: 8 },
  fundItem: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    gap: 4,
  },
  fundDot: { width: 10, height: 10, borderRadius: 5 },
  fundItemLabel: { fontSize: 9, color: "rgba(255,255,255,0.5)" },
  fundItemPct: { fontSize: 12, fontWeight: "800" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: C.text },
  viewAll: { fontSize: 11, color: C.p600, fontWeight: "700" },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badgePill: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: "auto",
  },
  badgeText: { fontSize: 9, fontWeight: "800", color: "#fff" },
  postTime: { fontSize: 10, color: C.muted },
  postTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: C.text,
    marginBottom: 4,
  },
  postBody: { fontSize: 12, color: C.sub, lineHeight: 18 },
  pollLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  pollLabel: { fontSize: 12, fontWeight: "600", color: C.text },
  pollBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: C.border,
    overflow: "hidden",
  },
  pollFill: { height: "100%", backgroundColor: C.p600, borderRadius: 4 },
  pollMeta: { fontSize: 10, color: C.muted, marginTop: 4 },
  reactionRow: {
    flexDirection: "row",
    gap: 6,
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 12,
  },
  emojiBtn: { padding: 4, borderRadius: 8 },
  emojiBtnActive: { backgroundColor: C.p100 },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.border },
  dotActive: { width: 20, backgroundColor: C.p600 },
  payCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.border,
  },
  unpaidBadge: {
    backgroundColor: C.redBg,
    borderWidth: 1,
    borderColor: C.redBd,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  unpaidMonth: { fontSize: 11, color: C.muted },
  unpaidAmount: { fontSize: 22, fontWeight: "900", color: C.red },
  unpaidTag: {
    backgroundColor: C.red,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  unpaidTagText: { fontSize: 11, fontWeight: "700", color: "#fff" },
  payBtn: {
    backgroundColor: C.p700,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  payBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  emergCard: {
    backgroundColor: C.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: C.border,
  },
  emergGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  emergItem: {
    width: "47%",
    backgroundColor: C.redBg,
    borderWidth: 1,
    borderColor: C.redBd,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emergLabel: { fontSize: 10, color: C.muted },
  emergNum: { fontSize: 13, fontWeight: "900", color: C.red },
});
