# E-СӨХ Mobile App

React Native + Expo Router ашигласан E-СӨХ платформын mobile апп.

---

## 🚀 Эхлүүлэх заавар

### 1. Node.js шаардлага
Node.js **v18** буюу түүнээс дээш хувилбар суулгасан байх ёстой.
```bash
node --version   # v18.x.x буюу дээш байх ёстой
```

### 2. Хамааралтай сангуудыг суулгах
```bash
npm install
```

### 3. Expo апп эхлүүлэх
```bash
npx expo start
```

Гарч ирсэн QR кодыг **Expo Go** аппаар уншуулна.

---

## 📱 Утсан дээр харах

| Платформ | Арга |
|----------|------|
| Android  | Expo Go → QR уншуулах |
| iPhone   | Камер апп → QR уншуулах |

> ⚠️ **Чухал:** PC болон утас **нэг WiFi сүлжээнд** байх ёстой!
> Ажиллахгүй бол: `npx expo start --tunnel`

---

## 📁 Файлын бүтэц

```
e-soh-app/
├── app/
│   ├── _layout.tsx          # Root navigation
│   ├── index.tsx            # Нэвтрэх дэлгэц
│   ├── qr-scan.tsx          # QR уншуулах
│   ├── signup.tsx           # Бүртгэлийн форм
│   ├── pending.tsx          # Хүсэлтийн төлөв
│   ├── otp.tsx              # OTP баталгаажуулалт
│   ├── payment.tsx          # СӨХ төлбөр
│   ├── fund-detail.tsx      # Шилэн данс
│   └── (tabs)/
│       ├── _layout.tsx      # Tab navigation
│       ├── index.tsx        # Нүүр хуудас
│       ├── feed.tsx         # Мэдэгдэл & Зар
│       ├── complaint.tsx    # Санал & Хүсэлт
│       └── profile.tsx      # Профайл
├── constants/
│   └── Colors.ts            # Өнгөний тогтмол утгууд
├── app.json                 # Expo тохиргоо
├── babel.config.js
└── package.json
```

---

## 🗺️ Дэлгэцийн урсгал

```
Нэвтрэх
├── Нэвтрэх → OTP → Нүүр хуудас
└── Бүртгэл үүсгэх → QR уншуулах → Бүртгэлийн форм → Хүсэлт → OTP → Нүүр хуудас

Нүүр хуудас (tabs)
├── Нүүр → Шилэн данс дэлгэрэнгүй
├── Нүүр → СӨХ төлбөр
├── Мэдэгдэл & Зар
├── Санал & Хүсэлт
└── Профайл
```

---

## 🔑 Камерын зөвшөөрөл

QR уншуулах функц бодит утсан дээр л ажиллана.
Эмуляторт тест хийхэд камер ажиллахгүй тул
**Expo Go + бодит утас** ашиглахыг зөвлөж байна.

---

## 🛠️ Хөгжүүлэлтийн дараагийн алхмууд

- [ ] Backend API холболт (Supabase / Firebase)
- [ ] Push notification (Expo Notifications)
- [ ] QPay / SocialPay интеграц
- [ ] Admin dashboard (веб апп)
- [ ] Real QR code генератор
# team-projet-app
