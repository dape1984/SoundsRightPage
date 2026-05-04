#!/bin/bash
# Convert screenshots to App Store required dimensions
# Source: various iPhone sizes (1206×2622, 1284×2778, 1320×2868)
# Target: 1242×2688, 2688×1242, 1284×2778, 2778×1284

cd "$(dirname "$0")"
SRC_DIR="."
OUT_1242_2688="1242x2688"
OUT_2688_1242="2688x1242"
OUT_1284_2778="1284x2778"
OUT_2778_1284="2778x1284"

for img in ArticlePractice.png ArticlePracticeList.png ArticleTest.png DialoguePractice.png \
  DialoguePracticeList.png DialogueTest.png Home.png HomeProMax.png wordsoftheday.png WordPractice.png \
  WordPracticeList.png WordTest.png \
  soundsrightcn_home.png soundsrightcn_char_practice.png soundsrightcn_char_test.png \
  soundsrightcn_word_practice.png soundsrightcn_word_test.png \
  soundsrightcn_dialogue_practice.png soundsrightcn_dialogue_practice_2.png \
  soundsrightcn_dialogue_test.png soundsrightcn_article_list.png \
  soundsrightcn_article_practice.png soundsrightcn_article_test.png; do
  [ ! -f "$img" ] && continue
  echo "Processing $img ..."
  # Portrait 1242×2688
  sips -z 2688 1242 --out "$OUT_1242_2688/$img" "$img"
  # Portrait 1284×2778
  sips -z 2778 1284 --out "$OUT_1284_2778/$img" "$img"
  # Landscape: rotate -90 then resize to 2688×1242 (sips -z height width)
  tmp="/tmp/rot_$$_$img"
  sips -r -90 "$img" --out "$tmp" && sips -z 1242 2688 --out "$OUT_2688_1242/$img" "$tmp"
  rm -f "$tmp"
  sips -r -90 "$img" --out "$tmp" && sips -z 1284 2778 --out "$OUT_2778_1284/$img" "$tmp"
  rm -f "$tmp"
done
echo "Done. Output in $OUT_1242_2688, $OUT_2688_1242, $OUT_1284_2778, $OUT_2778_1284"
