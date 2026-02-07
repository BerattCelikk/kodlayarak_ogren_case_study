# NebulaOne — Otomatik Remotion Tanıtım Videosu

> Profesyonel, modüler ve AI destekli Remotion (TypeScript) video örneği.

Bu depo, 1 dakikalık (veya daha uzun) dinamik bir tanıtım videosu oluşturmak için hazırlanmış bir Remotion projesidir. Video içerikleri kısmen yapay zeka tarafından üretilir ve proje, yeniden üretilebilir varlık jenerasyonu ile birlikte gelir.

---

**Öne çıkanlar**

- Modüler React + TypeScript ile yazılmış Remotion kompozisyonları
- AI destekli varlık üretimi (Hugging Face) — metin ve görsel önerileri
- Animasyonlu Intro, Feature kartları, Lower Third ve Outro bileşenleri
- Altyazı (SRT) ve tek kare thumbnail (GIF) çıktı desteği
- `build:final` ve `build:webm` script'leri ile tek komutla render

---

## Hızlı Başlangıç

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. (İsteğe bağlı) AI varlıklarını yeniden üretmek için bir Hugging Face API anahtarı sağlayın:

- Proje kökünde bir `.env` dosyası oluşturun ve aşağıyı ekleyin:

```
HUGGINGFACE_API_KEY=hf_...your_key_here...
```

3. Varlıkları oluşturun (opsiyonel — eğer `.env` yoksa projede hazır `src/assets/generated.json` kullanılacaktır):

```bash
npm run generate:assets
```

4. Geliştirme önizlemesi başlatın:

```bash
npm run start
```

5. Final render (60s, h264):

```bash
npm run build:final
```

6. WebM (VP9) çıktısı üretmek isterseniz:

```bash
npm run build:webm
```

Not: Yerel ortamda `ffmpeg` yüklü değilse altyazıyı videoya gömme veya ileri düzey transkod işlemleri doğrudan yapılamaz. `ffmpeg` yüklü ise ekasyonlar ve örnek komutlar README altında verilmiştir.

---

## Nasıl çalışıyor (kısa teknik özet)

- `src/index.tsx` Remotion kökünü kaydeder ve `src/RemotionVideo.tsx` içindeki `Composition`'ı yükler.
- Kompozisyon, `Intro`, `Feature`, `LowerThird`, `CaptionOverlay`, `Outro` gibi küçük, test edilebilir bileşenlere bölünmüştür.
- `src/generateAssets.ts` Hugging Face Inference API (router) kullanarak metin ve görsel fikirleri talep eder. API çağrıları başarısız olursa script, projeye gömülü `src/assets/generated.json` dosyasına geri döner.
- Render sırasında komponentler, `generated.json` içindeki `theme`, `brand` ve `assets` verilerini kullanır.

---

## Dosya Yapısı (Önemliler)

- `src/` — Tüm Remotion bileşenleri ve kaynak kod
  - `RemotionVideo.tsx` — Ana kompozisyon ve sekans düzeni
  - `components/` — `Intro`, `Feature`, `Outro`, `ProgressBar`, vs.
  - `generateAssets.ts` — AI tabanlı varlık oluşturucu (Node script)
- `src/assets/generated.json` — Jeneratörün ürettiği (veya örnek) içerik
- `out/` — Render edilmiş `final.mp4`, `thumbnail.gif`, `subtitles.srt`, `CREDITS.txt`

---

## Altyazılar ve Thumbnail

- Altyazılar `out/subtitles.srt` olarak sağlanır.
- Tek kare thumbnail GIF `out/thumbnail.gif` içinde mevcuttur.
- Eğer altyazıları videoya gömmek isterseniz ortamınıza `ffmpeg` kurup aşağıdaki örneği kullanabilirsiniz:

```bash
ffmpeg -i out/final.mp4 -i out/subtitles.srt -c copy -c:s mov_text out/final_with_subs.mp4
```

---

## Troubleshooting & Bilinen Sınırlamalar

- Hugging Face API çağrıları bazı modeller için router dönüşleri (410/404) üretebilir. Bu durumda `generateAssets` script'i yerel `generated.json`'a geri döner.
- Eğer `npx remotion` veya CLI komutları çalışmıyorsa `node`/`npm` versiyonunuzu kontrol edin ve `npm install` çalıştırdığınızdan emin olun.
- Ortamda `ffmpeg` yüklü değilse bazı transkod/altyazı işlemleri yapılamaz; Windows için `choco install ffmpeg` veya https://ffmpeg.org/ üzerinden yükleyin.

---

## Güvenlik & Gizlilik

- Projede kullanılan marka adı `NebulaOne` tamamen kurgusaldır — kullanıcı isteğiyle gerçek proje isimleri gizlenmiştir.
- API anahtarınızı asla repoya koymayın. `.env` dosyasını paylaşmayın.

---

## Hızlı İpuçları

- Hızlı test render için küçük kare aralıkları kullanın (ör. `--frames 0-120`) ve `npx remotion render` komutuyla test edin.
- Müzik eklemek isterseniz `src/assets` içine `music.mp3` koyun ve `Intro`/`Outro` bileşenlerinde `Audio` komponentini kullanın.

---

## Sonraki Adımlar (Öneriler)

1. Arka plan müziği ekleyin (kısa telifsiz parça) — volume + ducking ayarı ekleyebilirim.
2. `ffmpeg` ile altyazı gömme ve birkaç WebM/VP9 varyantı üretme.
3. CI pipeline (GitHub Actions) oluşturarak otomatik `build:final` tetikleme.

---

## Lisans

Bu depo örnek amaçlıdır. Proje içindeki varlıkların lisanslarına dikkat edin; Hugging Face veya harici kaynaklardan gelen içerikler için ilgili lisans gereksinimlerini kontrol edin.

---

Teşekkürler — değişiklik yapılmasını isterseniz söyleyin, README'yi isteğinize göre kısaltıp genişletebilirim.
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
