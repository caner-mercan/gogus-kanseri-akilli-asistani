# gogus kanseri akilli asistani
# 🎗️ PembeBot – Göğüs Kanseri Asistanı

PembeBot, göğüs kanseri hakkında temel bilgiler veren ve hücre ölçümlerinden **iyi huylu / kötü huylu** tahmini yapan bir web sitesidir. Saf **HTML, CSS ve JavaScript** ile yazılmıştır; kurulum, sunucu veya kütüphane gerektirmez.

🔗 **Canlı demo:** [https://loquacious-cactus-f6b3be.netlify.app/](https://loquacious-cactus-f6b3be.netlify.app/)

> ⚠️ **Uyarı:** Bu proje yalnızca **eğitim amaçlıdır**. Tıbbi tanı koymaz ve doktor muayenesinin yerini tutmaz. Sağlıkla ilgili herhangi bir şüphe için mutlaka bir sağlık kuruluşuna başvurun.

## ✨ Özellikler

- **Sohbet botu:** Belirtiler, risk faktörleri, kendi kendine muayene, mamografi/tarama, iyi huylu ve kötü huylu farkı, evreler, tedavi, korunma, veri seti, model ve metrikler (recall, precision) hakkında Türkçe cevaplar verir.
- **Canlı tahmin paneli:** 6 hücre ölçümü kaydırıcılarla ayarlanır, model kötü huylu olma olasılığını yüzde olarak gösterir ve sonuca en çok etki eden ölçümleri açıklar.
- **Tamamen tarayıcıda çalışır:** Veri hiçbir sunucuya gönderilmez.
- **Mobil uyumlu** ve **otomatik koyu mod** desteği.

## 📁 Proje yapısı

```
pembebot/
├── index.html   # Sayfa yapısı
├── style.css    # Tasarım ve mobil uyum
├── script.js    # Sohbet botu ve tahmin modeli
└── README.md
```

## 🚀 Çalıştırma

1. Depoyu indirin veya klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADI/DEPO_ADI.git
   ```
2. `index.html` dosyasını tarayıcıda açın. Hepsi bu.

> `index.html`, `style.css` ve `script.js` aynı klasörde kalmalıdır.

## 🌐 GitHub Pages ile yayınlama

1. GitHub'da depoya girin → **Settings** → **Pages**.
2. **Source** bölümünde **Deploy from a branch** seçin.
3. Branch olarak `main`, klasör olarak `/ (root)` seçip **Save**'e basın.
4. Birkaç dakika sonra site şu adreste yayında olur:
   `https://KULLANICI_ADI.github.io/DEPO_ADI/`

## 🧠 Model hakkında

| | |
|---|---|
| **Veri seti** | Wisconsin Breast Cancer (569 örnek: 357 iyi huylu, 212 kötü huylu) |
| **Algoritma** | Lojistik Regresyon (StandardScaler ile ölçeklenmiş) |
| **Kullanılan özellikler** | Yarıçap, doku, pürüzsüzlük, içbükeylik, içbükey nokta, simetri (hepsi *ortalama* değerler) |
| **Bölme** | %80 eğitim / %20 test (`stratify` ile) |
| **Test doğruluğu** | ≈ %94 |

Siteyi hızlı ve hafif tutmak için canlı tahminde 6 özellikli sade bir model kullanılır; model katsayıları `script.js` içindeki `M` nesnesine gömülüdür. Veri hazırlama, 30 özellikli modeller, Logistic Regression ve Random Forest karşılaştırması ile değerlendirme (accuracy, precision, recall, F1, confusion matrix) çalışması Python not defterinde yer almaktadır:

👉 [Makine öğrenmesi not defteri (gögüs_kanseri.ipynb)](https://github.com/caner-mercan/makine-ogrenmesi/blob/main/g%C3%B6g%C3%BCs_kanseri.ipynb)

> Tıbbi problemlerde en kritik metrik genellikle **recall**'dur: hasta birini kaçırmak (yanlış negatif), sağlıklı birine yanlış alarm vermekten çok daha tehlikelidir.

## 🛠️ Botu geliştirme

Bot, anahtar kelime eşleştirmesiyle çalışır. Yeni bir konu eklemek için `script.js` içindeki `KB` listesine şu biçimde bir satır ekleyin:

```js
[["anahtar","kelime"],"Botun vereceği cevap"],
```

Anahtar kelimeleri **küçük harfle ve Türkçe karakter kullanmadan** yazın (ör. `ç` yerine `c`, `ş` yerine `s`); bot kullanıcı yazısını da aynı şekilde sadeleştirir.

## 🗺️ Yol haritası

- [ ] 30 özelliğin tamamıyla tahmin
- [ ] Random Forest modelinin eklenmesi
- [ ] Sonuç için grafikli açıklama ekranı
- [ ] Yapay zekâ destekli gerçek sohbet

## 📜 Lisans ve sorumluluk reddi

Bu proje eğitim amaçlı geliştirilmiştir. Üretilen çıktılar tıbbi tavsiye değildir; kullanımdan doğacak sonuçlardan geliştiriciler sorumlu tutulamaz.

## 👨‍💻 Geliştiriciler

- **Caner Mercan**
- **Hamza Uludağ**
