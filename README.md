<div align="center">
	<h1>NebulaOne — Otomatik Remotion Tanıtım Videosu</h1>
	<img src="src/assets/logo.svg" alt="NebulaOne logo" width="120" />
	<p>
		NebulaOne, Remotion ve TypeScript gücünü arkasına alarak, yapay zeka destekli profesyonel tanıtım videoları 		oluşturmanızı sağlayan modüler bir şablondur. Manuel video kurgu süreçlerini otomatize ederek, veriye dayalı ve ölçeklenebilir bir video üretim hattı sunar.
	</p>
</div>

**Öne çıkanlar**

<div>
- Modüler Mimari: React tabanlı Intro, Feature, Outro gibi bağımsız bileşenlerle tam kontrol.
- AI Entegrasyonu: Hugging Face üzerinden dinamik metin ve görsel önerileri.
- Akıllı Fallback: API hatalarında bile kesintisiz render için generated.json desteği.
- Dinamik Ses Yönetimi: Otomatik ses kısma (ducking) özellikli ortam müziği katmanı.
- Gelişmiş Çıktı Seti: MP4, WebM, SRT (altyazı) ve GIF (thumbnail) formatlarında hazır çıktılar.
</div>

## Hızlı Başlangıç
Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları takip edebilirsiniz:
1. Bağımlılıkların yüklenmesi:

```bash
npm install
```

2. (Opsiyonel) Hugging Face API anahtarının eklenmesi:

```
HUGGINGFACE_API_KEY=hf_...your_key_here...
```

3. AI varlıklarının üretilmesi (opsiyonel):

```bash
npm run generate:assets
```

4. Stüdyoyu Başlatın:

```bash
npm run start
```

5. Final render (ör. `out/final.mp4`):

```bash
npm run build:final
```

6. WebM (VP9) çıktısı oluşturma:

```bash
npm run build:webm
```

Not: Yerel ortamda `ffmpeg` yüklü değilse altyazı gömme ve bazı transkod işlemleri yapılamaz. `ffmpeg` yüklüyse README'deki örnek komutlar kullanılabilir.

## Nasıl çalışır (teknik özet)

- `src/index.tsx` Remotion kökünü kaydeder; ana kompozisyon `src/RemotionVideo.tsx` içerisinde zamanlama ve sekans düzeni ile tanımlıdır.
- Bileşenler bağımsız tasarlanmıştır; tek bir bileşen üzerinde değişiklik yapılarak hızlı test render'ları yapılabilir (`--frames 0-120`).
- `src/generateAssets.ts` Hugging Face router'ına istek gönderir; model erişimi sağlanamazsa `src/assets/generated.json` fallback olarak kullanılır.
- Render sırasında bileşenler `generated.json` içindeki `theme`, `brand` ve asset verilerini kullanır.
## Önemli dosyalar

- `src/RemotionVideo.tsx` — ana kompozisyon ve zamanlama
- `src/components/` — bileşenler (`Intro`, `Feature`, `LowerThird`, `Outro`, vb.)
- `src/generateAssets.ts` — AI tabanlı varlık üreticisi (Node script)
- `src/assets/generated.json` — fallback / örnek içerik
- `out/` — `final.mp4`, `thumbnail.gif`, `subtitles.srt`, `CREDITS.txt`


### Arka plan müziği

- Projede 60s uzunluğunda telifsiz bir ambient parça `src/assets/music.wav` olarak eklendi.
- Müzik, `MusicLayer` bileşeni tarafından oynatılır ve konuşma/altyazı bölümlerinde otomatik olarak kısılır (ducking).
- Eğer farklı bir parça kullanmak isterseniz `src/assets/music.wav` dosyasını değiştirin veya `src/assets/generated.json` içindeki `music` alanını güncelleyin.
## Sorun giderme ve dikkat edilmesi gerekenler

- Hugging Face router bazı modeller için 410/404 döndürebilir; `generateAssets` scripti otomatik fallback ile güvenilir bir davranış sergiler.
- `npx remotion` veya diğer CLI hatalarında öncelikle `npm install` çalıştırılmalıdır.
- `ffmpeg` gerektiğinde Windows için `choco install ffmpeg` veya resmi site üzerinden kurulum önerilir.
## Güvenlik ve gizlilik

- `NebulaOne` kurgusaldır; gerçek marka ve şirket isimleri kullanılmamıştır.
- API anahtarları repoya eklenmemelidir; `.env` dosyaları paylaşılmamalıdır.


---

## Release

Versiyon `v1.0` etiketi oluşturulmuştur. Üretilen çıktı dosyaları repoda `out/` dizininde bulunmaktadır:

- `out/final.mp4` — ana final render
 - `out/final.mp4` — ana final render (60s, müzik ile konsolide edildi)
 - `out/subtitles.srt` — altyazılar
 - `out/thumbnail.gif` — tek kare thumbnail

Not: İstenirse `out/final.mp4` GitHub Release'a eklenebilir; bunun için bir GitHub token gereklidir.

---


## Neler yaptım ve neden?

- Projeyi modüler tuttum: `Intro`, `Feature`, `LowerThird`, `CaptionOverlay`, `Outro` gibi küçük bileşenlerle hızlıca değişiklik yapabiliyorum.
- AI entegrasyonu (Hugging Face) ile metin/görsel fikirleri otomatik üretebiliyorum; ama API çağrıları başarısız olursa projede hazır bir `src/assets/generated.json` kullanılıyor — böylece render her zaman tutarlı.
- Çıktı olarak `out/final.mp4`, `out/subtitles.srt` ve `out/thumbnail.gif` üretiyorum; `build:webm` script'i ile WebM varyantı da oluşturulabilir.

---


## Altyazılar ve Thumbnail

- Ben altyazıları `out/subtitles.srt` olarak bıraktım — tercih ederseniz gömebiliriz.
- Thumbnail tek kare GIF olarak `out/thumbnail.gif` içine kaydedildi.
- `ffmpeg` ile altyazı gömmek isterseniz örnek komut:

```bash
ffmpeg -i out/final.mp4 -i out/subtitles.srt -c copy -c:s mov_text out/final_with_subs.mp4
```

---


## Sorun giderme & dikkat edilmesi gerekenler

- Hugging Face router bazı modeller için hata dönebilir (410/404). Bu durumda script otomatik olarak `src/assets/generated.json`'a döner — yani render her zaman çalışır.
- `npx remotion` çalışmazsa önce `npm install` ve Node sürümünüzü kontrol edin.
- `ffmpeg` yoksa altyazı gömme/transkod işlemleri lokal olarak yapılamaz; Windows için `choco install ffmpeg` veya https://ffmpeg.org/ üzerinden kurabilirsiniz.

---


## Güvenlik & Gizlilik

- Projedeki marka adı `NebulaOne` kurgusaldır — gerçek proje/şirket isimleri gösterilmedi.

---


## Hızlı İpuçları

- Hızlı test render yapmak için kısa frame aralıkları kullanın: `npx remotion render src/index.tsx ProductAd --frames 0-120`.
- Müzik eklemek isterseniz `src/assets/music.mp3` koyun; `Intro`/`Outro`'da `Audio` kullanıyorum.

---
