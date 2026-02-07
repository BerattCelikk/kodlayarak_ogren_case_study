<!-- prettier-ignore -->
# NebulaOne — Otomatik Remotion Tanıtım Videosu

<img src="src/assets/logo.svg" alt="NebulaOne logo" width="140" />

Bu depo, Remotion (TypeScript) kullanılarak oluşturulmuş, AI destekli bir tanıtım videosu şablonudur. Amaç, kısa ve profesyonel bir promo videosunun tekrarlanabilir bir şablon ile hızlıca oluşturulmasını sağlamaktır. AI tarafından üretilen içerikler kontrollü bir şekilde kullanılmakta ve gerektiğinde yerel örnek veriye geri dönülmektedir.

**Öne çıkanlar**

- Modüler React + TypeScript + Remotion bileşenleri
- AI destekli varlık üretimi (Hugging Face) — metin ve görsel önerileri
- Yeniden kullanılabilir bileşenler: `Intro`, `Feature`, `LowerThird`, `CaptionOverlay`, `Outro`
- Çıktılar: `out/final.mp4`, `out/subtitles.srt`, `out/thumbnail.gif`
- Hazır scriptler: `build:final`, `build:webm`, `generate:assets`

## Hızlı Başlangıç

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

4. Geliştirme önizlemesi başlatma:

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
## Altyazılar ve thumbnail

- Altyazılar: `out/subtitles.srt`
- Thumbnail: `out/thumbnail.gif`

`ffmpeg` ile altyazı gömme örneği:

```bash
ffmpeg -i out/final.mp4 -i out/subtitles.srt -c copy -c:s mov_text out/final_with_subs.mp4
```
## Sorun giderme ve dikkat edilmesi gerekenler

- Hugging Face router bazı modeller için 410/404 döndürebilir; `generateAssets` scripti otomatik fallback ile güvenilir bir davranış sergiler.
- `npx remotion` veya diğer CLI hatalarında öncelikle `npm install` çalıştırılmalıdır.
- `ffmpeg` gerektiğinde Windows için `choco install ffmpeg` veya resmi site üzerinden kurulum önerilir.
## Güvenlik ve gizlilik

- `NebulaOne` kurgusaldır; gerçek marka ve şirket isimleri kullanılmamıştır.
- API anahtarları repoya eklenmemelidir; `.env` dosyaları paylaşılmamalıdır.

## Hızlı ipuçları

- Test render: `npx remotion render src/index.tsx ProductAd --frames 0-120`
- Müzik ekleme: `src/assets/music.mp3` eklenerek bileşenlerde `Audio` kullanılabilir.
## Gelecek adımlar (öneriler)

1. Arka plan müziğinin eklenmesi ve temel mix ayarlarının uygulanması
2. `ffmpeg` kurulumu ve altyazı gömme işlemleri için rehber sağlanması
3. GitHub Actions ile otomatik build pipeline'ı oluşturulması

İstenilen adım belirtilirse ilgili düzenlemeler gerçekleştirilebilir.
# NebulaOne — Benim Otomatik Remotion Tanıtım Videom

Merhaba — bu repo benim hazırladığım, AI destekli ve Remotion (TypeScript) ile oluşturulmuş bir tanıtım videosu projesidir. Amacım kısa, profesyonel ve yeniden üretilebilir bir 1 dakikalık promo şablonu sunmaktı. İçeriklerin bir kısmını yapay zekayla ürettim, ama her şeyi kontrol edilebilir ve yerel olarak yeniden oluşturulabilir hâle getirdim.
---


Neler yaptım ve neden?

- Projeyi modüler tuttum: `Intro`, `Feature`, `LowerThird`, `CaptionOverlay`, `Outro` gibi küçük bileşenlerle hızlıca değişiklik yapabiliyorum.
- AI entegrasyonu (Hugging Face) ile metin/görsel fikirleri otomatik üretebiliyorum; ama API çağrıları başarısız olursa projede hazır bir `src/assets/generated.json` kullanılıyor — böylece render her zaman tutarlı.
- Çıktı olarak `out/final.mp4`, `out/subtitles.srt` ve `out/thumbnail.gif` üretiyorum; `build:webm` script'i ile WebM varyantı da oluşturulabilir.

---


## Hızlı Başlangıç (benim adımlarımla)

1. Bağımlılıkları yükledim/kurun:

```bash
npm install
```

2. Eğer AI varlıklarını tekrar üretmek isterseniz bir Hugging Face anahtarı ekleyin:

`.env` dosyasına:

```
HUGGINGFACE_API_KEY=hf_...your_key_here...
```

3. Varlıkları üretmek (opsiyonel):

```bash
npm run generate:assets
```

4. Önizleme başlatmak için:

```bash
npm run start
```

5. Final videoyu üretmek için (ben bunu `out/final.mp4` olarak kaydettim):

```bash
npm run build:final
```

6. WebM isterseniz:

```bash
npm run build:webm
```

Not: Eğer altyazıları videoya gömmek ya da ileri düzey transkod yapmak isterseniz `ffmpeg` kurmanız gerekiyor; yoksa altyazı ayrı `out/subtitles.srt` olarak kalır.

---


## Nasıl çalışıyor (teknik notlar)

- `src/index.tsx` kök bileşeni kaydediyor; asıl düzen `src/RemotionVideo.tsx` içinde. Orada zamanlama ve sekans düzeni var.
- Bileşenler bağımsız, bu yüzden tek bir bileşeni düzenleyip hızlı test render'ı (ör. `--frames 0-120`) yapabilirsiniz.
- `src/generateAssets.ts` Hugging Face router'ına istek atıyor; eğer model erişimi yoksa script hazır `src/assets/generated.json`'a düşüyor. Bu sayede render akışı bozulmuyor.
- Render sırasında komponentler `generated.json` içindeki `theme`, `brand` ve görsel/başlık verilerini okuyor.

---


## Önemli dosyalar

- `src/RemotionVideo.tsx` — ana kompozisyon ve zamanlama
- `src/components/` — bileşenler (`Intro`, `Feature`, `LowerThird`, `Outro`, vs.)
- `src/generateAssets.ts` — AI destekli varlık üretimi (Node script)
- `src/assets/generated.json` — eğer AI çağrısı başarısız olursa kullanılan örnek veri
- `out/` — `final.mp4`, `thumbnail.gif`, `subtitles.srt`, `CREDITS.txt`

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
- API anahtarınızı kesinlikle repoya eklemeyin. `.env` dosyasını paylaşmayın.

---


## Hızlı İpuçları

- Hızlı test render yapmak için kısa frame aralıkları kullanın: `npx remotion render src/index.tsx ProductAd --frames 0-120`.
- Müzik eklemek isterseniz `src/assets/music.mp3` koyun; `Intro`/`Outro`'da `Audio` kullanıyorum.

---


## Bir sonraki adım olarak benden ne istersiniz?

1. Arka plan müziğini ekleyip mix ve ducking ayarlarını yapayım mı?
2. `ffmpeg` kurulumunda yardımcı olup altyazıları gömelim mi?
3. GitHub Actions ekleyip otomatik render pipeline'ı oluşturalım mı?

Seçin, ben hallederim.

---

## Lisans

Bu depo örnek amaçlıdır. Proje içindeki varlıkların lisanslarına dikkat edin; Hugging Face veya harici kaynaklardan gelen içerikler için ilgili lisans gereksinimlerini kontrol edin.

---

Teşekkürler — README'yi sizin üslubunuza göre ilk-kişiliğe çevirdim. Düzeltmek istediğiniz bir yer varsa söyleyin, hemen güncellerim.
# Remotion AI-Driven Promo (sample)

This repository contains a Remotion (TypeScript) project scaffold that builds a dynamic 60+ second promotional video. The composition consumes a JSON file of generated assets (copy and images). A Node script shows how to use OpenAI to generate those assets.

Quick overview
- `src/RemotionVideo.tsx` — main composition and sequencing
- `src/components/*` — modular components (Intro, Feature, Outro)
- `src/assets/generated.json` — sample generated content used by the video (fictional brand)
 - `src/assets/generated.json` — sample generated content used by the video (fictional brand). You can set `"theme": "cool"` or `"theme": "warm"` to switch color palettes.
 - `src/assets/generated.json` — sample generated content used by the video (fictional brand). You can set `"theme": "cool"` or `"theme": "warm"` to switch color palettes.
- `src/generateAssets.ts` — Node script that uses OpenAI to generate copy and images

Final render
1. Ensure dependencies are installed:

```bash
npm install
```

2. (Optional) Generate or update AI assets:

```bash
npm run generate:assets
```

3. Produce a final MP4 (60s composition):

```bash
npm run build:final
```

The output will be `out/final.mp4`.

Getting started
1. Install dependencies:

```bash
npm install
```

2. (Optional) Generate AI assets (requires HUGGINGFACE_API_KEY or OPENAI_API_KEY):

```bash
# Option 1: set HF token as environment variable
export HUGGINGFACE_API_KEY="hf_..."
npm run generate:assets

# Option 2 (Windows PowerShell): create .env (already created) and add your token
# then run:
# npm run generate:assets
```

This writes `src/assets/generated.json` and (optionally) downloads generated images to `src/assets/images/` if the generator supports image creation.

3. Preview the video in Remotion:

```bash
npm run start
```

4. Render a final MP4 (example):

```bash
npm run build
```

Notes on AI integration
- The `generateAssets.ts` script uses the OpenAI SDK to produce structured JSON for on-screen text and (optionally) images for each feature. The video components read `src/assets/generated.json` at build time, so rendering is fully automatable once assets exist.
- Keep `OPENAI_API_KEY` private; never commit it to source control.

- Components are split to be reusable and composable. The composition timing (frames) is set to produce a ~60s video at 30fps (1800 frames). Adjust durations in `src/RemotionVideo.tsx` as needed.
Design & Modularity
- Components are split to be reusable and composable. The composition timing (frames) is set to produce a ~60s video at 30fps (1800 frames). Adjust durations in `src/RemotionVideo.tsx` as needed.

Enhancements added
- `src/assets/logo.svg` — small neutral logo shown in the intro/outro.
- `src/components/ProgressBar.tsx` — an overlay progress bar showing play progress.
- Optional background music: drop `music.mp3` into `src/assets/` and uncomment the `<Audio>` line in `src/RemotionVideo.tsx` to enable.
- Components are split to be reusable and composable. The composition timing (frames) is set to produce a ~60s video at 30fps (1800 frames). Adjust durations in `src/RemotionVideo.tsx` as needed.

If you'd like, I can:
- Run `npm install` and preview the composition here (requires network). 
- Customize typography, colors, or create a brand-safe color palette.
- Wire the script to other image APIs (Stable Diffusion) or run the generation for you if you provide an API key.
