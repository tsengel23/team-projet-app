import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { C } from "../constants/Colors";

export default function QRScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Камерын зөвшөөрөл шаардана
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Ачаалж байна...</Text>
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permText}>Камерын зөвшөөрөл шаардлагатай</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Зөвшөөрөх</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // QR уншсан үед дуудагдана
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    // QR-аас org мэдээллийг задлах
    // Жишээ QR утга: esoh://register?org_id=ORG_123&name=Сансар+хотхон&building=А+байр
    try {
      const url = new URL(data);
      const orgId = url.searchParams.get("org_id") || "ORG_123";
      const orgName = url.searchParams.get("name") || "Сансар хотхон";
      const building = url.searchParams.get("building") || "А байр";

      router.push({
        pathname: "/signup",
        params: { orgId, orgName, building },
      });
    } catch {
      // URL биш бол default утга ашиглана
      router.push({
        pathname: "/signup",
        params: {
          orgId: "ORG_123",
          orgName: "Сансар хотхон",
          building: "А байр",
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topTitle}>QR Уншуулах</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Viewfinder */}
        <View style={styles.finderWrap}>
          <View style={styles.finder}>
            {/* Corner marks */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <Text style={styles.hint}>
            {scanned
              ? "✅ Уншлаа! Шилжиж байна..."
              : "QR кодыг дөрвөлжин дотор байрлуулна уу"}
          </Text>
        </View>

        {/* Bottom hint */}
        <View style={styles.bottomHint}>
          <Text style={styles.bottomText}>
            Байрны үүдэнд буй QR кодыг уншуулна уу
          </Text>
        </View>
      </View>
    </View>
  );
}

const FINDER_SIZE = 260;
const CORNER_SIZE = 36;
const CORNER_WIDTH = 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  permText: {
    fontSize: 16,
    color: C.text,
    marginBottom: 16,
    textAlign: "center",
  },
  permBtn: { backgroundColor: C.p700, padding: 14, borderRadius: 12 },
  permBtnText: { color: "#fff", fontWeight: "700" },
  overlay: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  backText: { color: "#fff", fontSize: 24 },
  topTitle: { fontSize: 15, fontWeight: "800", color: "#fff" },
  finderWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  finder: { width: FINDER_SIZE, height: FINDER_SIZE, marginBottom: 24 },
  hint: { fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "center" },
  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: "#fff",
    borderWidth: 0,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  bottomHint: {
    margin: 24,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 14,
  },
  bottomText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    textAlign: "center",
  },
});
