<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-card style="width: 100%" class="border px-10 pt-0 pb-3" title="Print Verse Cards">
          <v-row>
            <!-- VERSE INPUT -->
            <v-col>
              <v-row class="px-4">
                <v-col>
                  <p class="text-center">
                    Enter the verse references below separated by commas. Optionally, add
                    parentheses after to include a topic.
                  </p>
                </v-col>
                <v-col cols="6">
                  <v-select
                    bg-color="#f6f7fb"
                    label="Select Translation"
                    v-model="selectedTranslation"
                    :items="translations"
                  ></v-select>
                </v-col>
              </v-row>
              <v-container fluid>
                <v-textarea
                  v-model="verseInput"
                  bg-color="#f6f7fb"
                  clear-icon="mdi-close-circle"
                  label="Verses"
                  placeholder="Pslam 23:4, John 3:16 (The Gospel),"
                  min-width="30rem"
                  min-height="300rem"
                  clearable
                  no-resize
                  persistent-placeholder
                ></v-textarea>
              </v-container>
            </v-col>

            <v-col cols="3">
              <h3 class="text-center font-weight-medium">Format</h3>
              <v-checkbox
                class="text-left"
                color="primary"
                v-model="showTopic"
                hide-details
                label="Topic"
              ></v-checkbox>
              <v-checkbox
                class="text-left"
                color="primary"
                v-model="showTranslation"
                hide-details
                label="Translation"
              ></v-checkbox>
              <v-checkbox
                class="text-left"
                color="primary"
                v-model="showRepeatReference"
                hide-details
                label="Repeat Reference"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <h3 class="text-center font-weight-medium">Size</h3>
              <v-radio-group inline v-model="cardSize" class="mt-1">
                <v-radio
                  class="text-left"
                  color="primary"
                  label="Business Card (2in x 3.5in)"
                  value="businessCard"
                >
                </v-radio>
                <v-radio
                  class="text-left"
                  color="primary"
                  label="Index Card (3in x 5in)"
                  value="indexCard"
                >
                </v-radio>
                <v-radio
                  class="text-left"
                  color="primary"
                  label="Custom (2in x 3in)"
                  value="customCard"
                >
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <h3 class="text-center font-weight-medium">Font</h3>
              <v-radio-group inline center-affix v-model="font" class="mt-1">
                <v-radio class="text-left" color="primary" label="Arial" value="Arial"></v-radio>
                <v-radio
                  class="text-left"
                  color="primary"
                  label="Times New Roman"
                  value="Times"
                ></v-radio>
                <v-radio class="text-left" color="primary" label="Brush Script MT " value="cursive">
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-btn
            v-show="!loading"
            class="mt-1 text-white bg-primary"
            size="large"
            @click="generateAndPrintCards"
          >
            Print</v-btn
          >
          <v-progress-circular
            v-show="loading"
            :size="45"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="border px-2" style="min-height: 100%" title="Packs">
          Topical Memory System:
          <v-btn style="width: 100%" large class="text-body-2 my-1" @click="addPack('A')">
            A: Living The New Life</v-btn
          >
          <v-btn style="width: 100%" large class="text-body-2 my-1" @click="addPack('B')">
            B: Proclaiming Christ</v-btn
          >
          <v-btn style="width: 100%" large class="text-body-2 my-1" @click="addPack('C')">
            C: Reliance On God's Resources</v-btn
          >
          <v-btn style="width: 100%" large class="text-body-2 my-1" @click="addPack('D')">
            D: Being Christ's Disciple</v-btn
          >
          <v-btn style="width: 100%" large class="text-body-2 my-1" @click="addPack('E')">
            E: Growth In Christlikeness</v-btn
          >
        </v-card>
      </v-col>
    </v-row>

    <h3 class="mt-10">Preview</h3>
    <!--                                         PREVIEW              -->
    <v-card :width="get_previewWidth()" :height="get_previewHeight()" class="cardPreview border">
      <v-row justify="space-between">
        <v-spacer v-show="!showTopic"></v-spacer>
        <p v-show="showTopic" class="topic" id="topic" :style="{ fontFamily: font }">
          Christ the Center
        </p>
        <p
          v-show="showTranslation"
          class="translation"
          id="translation"
          :style="{ fontFamily: font }"
        >
          ESV
        </p>
      </v-row>

      <v-row>
        <p class="reference" id="reference" :style="{ fontFamily: font }">2 Corinthians 5:17</p>
      </v-row>

      <v-row class="mt-4">
        <p class="verse" id="verse" :style="{ fontFamily: font }">
          Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold,
          the new has come
        </p>
      </v-row>

      <v-row class="mt-4" v-show="showRepeatReference" justify="space-between">
        <v-spacer></v-spacer>
        <p class="reference2" id="reference2" :style="{ fontFamily: font }">2 Corinthians 5:17</p>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import * as constants from "../constants.js";
export default {
  setup() {
    return constants;
  },
  data() {
    return {
      // Items to display in v-select
      translations: ["ESV", "KJV", "NLT", "NKJV"], //'NIV'
      // Default selected value
      selectedTranslation: "ESV",
      font: "Arial",
      cardSize: "businessCard",
      showTranslation: true,
      showTopic: true,
      showRepeatReference: true,
      verseInput: "",

      loading: false,
      verse_List: [],

      businessCard_width: 88.9, // Width of the business card (in mm)
      businessCard_height: 50.8, // Height of the business card (in mm)
      indexCard_width: 127, //  (in mm)
      indexCard_height: 76.2, //  (in mm)
      customCard_width: 76.2, //  (in mm)
      customCard_height: 50.8, //  (in mm)
    };
  },

  methods: {
    addPack(pack) {
      if (pack == "A") {
        this.verseInput += constants.TMS_APack;
      } else if (pack == "B") {
        this.verseInput += constants.TMS_BPack;
      } else if (pack == "C") {
        this.verseInput += constants.TMS_CPack;
      } else if (pack == "D") {
        this.verseInput += constants.TMS_DPack;
      } else if (pack == "E") {
        this.verseInput += constants.TMS_EPack;
      } else if (pack == "All") {
        this.verseInput += constants.TMS_ALL;
      }
    },

    get_previewWidth() {
      const mmToPx = 3.78; // 3.78 px per mm
      if (this.cardSize == "indexCard") {
        return this.indexCard_width * mmToPx;
      } else if (this.cardSize == "customCard") {
        return this.customCard_width * mmToPx;
      } else {
        //default business
        return this.businessCard_width * mmToPx;
      }
    },
    get_previewHeight() {
      const mmToPx = 3.78; // 3.78 px per mm
      if (this.cardSize == "indexCard") {
        return this.indexCard_height * mmToPx;
      } else if (this.cardSize == "customCard") {
        return this.customCard_height * mmToPx;
      } else {
        //default business
        return this.businessCard_height * mmToPx;
      }
    },
    async generateAndPrintCards() {
      // 20 unit padding around entire document

      // Create a new jsPDF instance
      const doc = new jsPDF({
        unit: "mm", // Millimeters as the unit
        format: "letter", // Standard A4 size (210mm x 297mm)
      });

      const businessCard_PerRow = 2; // Two cards per row
      const businessCard_PerColumn = 5; // Three cards per column

      const indexCard_PerRow = 1;
      const indexCard_PerColumn = 3;

      const customCard_PerRow = 2;
      const customCard_PerColumn = 5;

      // default to business card
      let card_width = this.businessCard_width;
      let card_height = this.businessCard_height;
      let cardsPerColumn = businessCard_PerColumn;
      let cardsPerRow = businessCard_PerRow;

      if (this.cardSize == "indexCard") {
        card_width = this.indexCard_width;
        card_height = this.indexCard_height;
        cardsPerColumn = indexCard_PerColumn;
        cardsPerRow = indexCard_PerRow;
      } else if (this.cardSize == "customCard") {
        card_width = this.customCard_width;
        card_height = this.customCard_height;
        cardsPerColumn = customCard_PerColumn;
        cardsPerRow = customCard_PerRow;
      }

      const marginX = 10; // Horizontal margin from the page edges
      const marginY = 10; // Vertical margin from the page edges

      const referenceList = this.verseInput.split(","); // SPLit on commas
      this.verse_List = []; //reset
      let requests = 0; // delay every X calls

      this.loading = true;
      const delay = (delayInms) => {
        return new Promise((resolve) => setTimeout(resolve, delayInms));
      };

      for (let ref of referenceList) {
        let _topic = ref.match(/\(([^)]+)\)/); // get topic is present
        ref = ref.split("(")[0].trim(); // just the verse
        console.log("ref: " + ref);

        if (!(ref === null || ref === undefined || ref.trim() === "")) {
          //check for empties

          if (requests >= 18) {
            // After sending 18 requests, delay for
            await delay(100);
            requests = 0;
          }
          let verse = await this.fetchVerse(ref);

          requests = requests + 1;
          console.log("TOPICC");
          if (_topic) {
            console.log(_topic[1]);
            verse.topic = _topic[1];
            console.log(verse);
          }

          this.verse_List.push(verse);
        }
      }

      console.log("VERSE LIST");
      console.log(this.verse_List);

      console.log(this.verse_List[0]);
      let index = 0; // Initialize the index to keep track of verse_List
      const cardsPerPage = cardsPerRow * cardsPerColumn;

      for (let page = 0; index < this.verse_List.length; page++) {
        console.log("Adding page: " + (page + 1));
        if (page > 0) doc.addPage(); // Add a new page for every iteration after the first

        // Loop through rows and columns for the current page
        for (let row = 0; row < cardsPerColumn; row++) {
          for (let col = 0; col < cardsPerRow; col++) {
            if (index >= this.verse_List.length) break; // Stop if all cards are drawn

            // Calculate the position of each card
            const x = marginX + col * card_width; // Horizontal position
            const y = marginY + row * card_height; // Vertical position

            console.log(`Drawing card at index: ${index}, row: ${row}, col: ${col}`);
            this.drawBusinessCard(doc, x, y, card_width, card_height, this.verse_List[index]);

            index++; // Move to the next item in the verse_List
          }
        }
      }

      this.loading = false;
      window.open(doc.output("bloburl"), "_blank");
    },

    async fetchVerse(_ref) {
      let _verse = "";

      if (this.selectedTranslation == "ESV") {
        // ESV

        const params = new URLSearchParams({
          q: _ref, // the Verses to request
          "include-headings": false,
          "include-footnotes": false,
          "include-verse-numbers": false,
          "include-short-copyright": false,
          "include-passage-references": false,
        });
        const options = {
          method: "GET",
          headers: { accept: "application/json", Authorization: this.$ESV_API_KEY },
        };

        await fetch(`https://api.esv.org/v3/passage/text/?${params}`, options)
          .then((res) => res.json())
          .then((res) => {
            _verse = res.passages[0].replace(/\n\n+/g, "\n"); // remove any double new lines (for Psalms)
          })
          .catch((err) => console.error(err));

        return {
          // return verse object                                               !!!! Add Error handling   !!! TODO:
          ref: _ref,
          verse: _verse,
          topic: "",
        };
      } else if (this.selectedTranslation == "NLT") {
        // NLT
        // https://bolls.life/get-chapter/NIV/22/8/
      } else if (this.selectedTranslation == "NKJV") {
        // NKJV

        const options = {
          method: "GET",
          headers: { accept: "application/json", Authorization: this.$NKJV_API_KEY },
        };
        fetch("https://bolls.life/get-chapter/NLT/22/8/", options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err));
      } else if (this.selectedTranslation == "KJV" || this.selectedTranslation == "ASV") {
        // KJV and ASV

        const options = {
          method: "GET",
          headers: { accept: "application/json", Authorization: this.$GEN_API_KEY },
        };
        fetch("https://bolls.life/get-chapter/NLT/22/8/", options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.error(err));
      }
    },

    drawBusinessCard(doc, x, y, width, height, verse) {
      const paddingX = 5; // left padding

      const topic_FontSize = 12;
      const translation_FontSize = 10;
      const reference_FontSize = 10;
      const verse_FontSize = 9;

      this.font = this.font.toLowerCase();
      if (this.font == "arial") {
        this.font = "helvetica"; // arial doesnt work with jspdf..  helvetica is basically the same
      }

      // Draw the rectangle (business card outline)
      doc.setDrawColor(200, 200, 200); // Gray line
      doc.setLineDashPattern([3, 3], 0); // 2 units dash, 2 units gap
      doc.setLineWidth(0.3);
      doc.rect(x, y, width, height); // x, y, width, height

      // Topic
      if (this.showTopic) {
        doc.setFont(this.font, "bold");
        doc.setFontSize(topic_FontSize);
        doc.text(verse.topic, x + paddingX, y + 7);
      }
      // Translation
      if (this.showTranslation) {
        doc.setFont(this.font, "normal");
        doc.setFontSize(translation_FontSize);
        doc.text("ESV", x + width - 10, y + 7);
      }
      // Reference
      doc.setFont(this.font, "normal");
      doc.setFontSize(reference_FontSize);
      doc.text(verse.ref, x + paddingX, y + 13);

      // Verse
      doc.setFont(this.font, "normal");
      let maxHeight = y + height - 2; // Ensure 10mm padding at the bottom of the card
      let fontSize = verse_FontSize; // Start with a default font size
      let wrappedText = doc.splitTextToSize(verse.verse.trim(), width - 10); // 10mm for left and right margin
      let lineHeight = fontSize * 0.4; // Increase line height by adjusting the spacing between lines
      let lineY = y + 20;

      doc.setFontSize(verse_FontSize);

      // Function to check if the text fits within the available height
      function textFits(wrappedText, lineHeight, lineY, maxHeight) {
        const totalTextHeight = wrappedText.length * lineHeight;
        return lineY + totalTextHeight <= maxHeight;
      }

      // Adjust font size if the text overflows
      while (!textFits(wrappedText, lineHeight, lineY, maxHeight) && fontSize > 6) {
        fontSize--; // Decrease font size
        doc.setFontSize(fontSize);
        lineHeight = fontSize * 0.4; // Adjust line height based on font size
        wrappedText = doc.splitTextToSize(verse.verse.trim(), width - 10); // Rewrap text
      }

      // draw Text
      wrappedText.forEach((line) => {
        if (lineY + lineHeight > maxHeight) {
          return; // Stop if it overflows the card height
        }
        doc.text(line, x + 5, lineY); // Print each line of wrapped text
        lineY += lineHeight; // Increase the Y position to add space between lines
      });

      // 2nd Reference
      if (this.showRepeatReference) {
        doc.setFont(this.font, "normal");
        doc.setFontSize(reference_FontSize);
        doc.text(verse.ref, x + width - 30, lineY + 1);
      }
    },
  },
};
</script>

<style scoped>
.cardPreview {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  padding: 30px;
}

.topic {
  font-family: helvetica;
  font-weight: bold;
  font-size: 16px;
}

.translation {
  font-family: helvetica;
  font-size: 14px;
}

.reference {
  font-family: helvetica;
  font-size: 14px;
}

.verse {
  font-family: helvetica;
  text-align: left;
  font-size: 12px;
  /*   16px - 3 - 13   */
  line-height: 1.5;
}

.reference2 {
  font-family: helvetica;
  font-size: 14px;
}
</style>
