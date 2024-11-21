<template>
    <div>
        <v-card style="width: 100%;" class="border pa-10 pt-0" title="Print Verse Cards">

            <v-row>

                <v-col>
                    <v-row class="px-4">


                        <v-col>
                            <p class="">Enter the verse references below separated by commas </p>
                        </v-col>
                        <v-col cols="6">
                            <v-select label="Select Translation" v-model="selectedTranslation"
                                :items="translations"></v-select>
                        </v-col>

                    </v-row>
                    <v-container fluid>
                        <v-textarea v-model="verseInput" clear-icon="mdi-close-circle" label="Verses"
                            placeholder="Pslam 23:4, John 3:16" min-width="30rem" min-height="300rem" clearable
                            no-resize persistent-placeholder></v-textarea>
                    </v-container>
                </v-col>

                <v-col>
                    <h3 class="text-center font-weight-medium">Font</h3>
                    <v-radio-group inline center-affix v-model="font" class="mt-1">

                        <v-radio label="Arial" value="Arial"></v-radio>
                        <v-radio label="Times New Roman" value="Times"></v-radio>
                        <v-radio label="Brush Script MT " value="cursive"></v-radio>
                    </v-radio-group>
                    <h3 class="text-center font-weight-medium ">Format</h3>
                    <v-checkbox v-model="showTopic" hide-details label="Topic" :disabled="true"></v-checkbox>
                    <v-checkbox v-model="showTranslation" hide-details label="Translation"></v-checkbox>
                    <v-checkbox v-model="showRepeatReference" hide-details label="Repeat Reference"></v-checkbox>


                </v-col>
            </v-row>

            <v-btn @click="generateAndPrintCards"> print</v-btn>


        </v-card>

        <h3 class="mt-10">Preview</h3> <!--                                         PREVIEW              -->
        <v-card width="336px" height="192px" class="cardPreview border">

            <v-row justify="space-between">
                <v-spacer v-show="!showTopic"></v-spacer>
                <p v-show="showTopic" class="topic" id="topic" :style="{ fontFamily: font }"> Christ the Center </p>
                <p v-show="showTranslation" class="translation" id="translation" :style="{ fontFamily: font }"> ESV</p>
            </v-row>

            <v-row>
                <p class="reference" id="reference" :style="{ fontFamily: font }"> 2 Corinthians 5:17 </p>
            </v-row>

            <v-row class="mt-4">
                <p class="verse" id="verse" :style="{ fontFamily: font }"> Therefore, if anyone is in Christ, he is a
                    new creation.
                    The old has passed away; behold, the new has come</p>
            </v-row>

            <v-row class="mt-4" v-show="showRepeatReference" justify="space-between">
                <v-spacer></v-spacer>
                <p class="reference2" id="reference2" :style="{ fontFamily: font }"> 2 Corinthians 5:17 </p>
            </v-row>

        </v-card>

    </div>
</template>


<script>
import jsPDF from "jspdf";

export default {
    data() {
        return {
            // Items to display in v-select
            translations: ['ESV', 'KJV', 'NLT', 'NKJV'], //'NIV'
            // Default selected value
            selectedTranslation: 'ESV',
            font: 'Helvetica',
            showTranslation: true,
            showTopic: false,
            showRepeatReference: true,
            verseInput: "",

            verse_List: []
        };

    },

    methods: {
        async generateAndPrintCards() {

            // 20 unit padding around entire document

            // Create a new jsPDF instance
            const doc = new jsPDF({
                unit: "mm", // Millimeters as the unit
                format: "letter", // Standard A4 size (210mm x 297mm)
            });

            const card_width = 88.9; // Width of the business card (in mm)
            const card_height = 50.8; // Height of the business card (in mm)

            // How many business cards fit horizontally and vertically on A4
            const cardsPerRow = 2; // Two cards per row
            const cardsPerColumn = 3; // Three cards per column

            const marginX = 10; // Horizontal margin from the page edges
            const marginY = 10; // Vertical margin from the page edges

            const referenceList = this.verseInput.split(","); // SPLit on commas
            this.verse_List = [] //reset
            for (let ref of referenceList) {
                console.log("ref: " + ref);
                let verse = await this.fetchVerse(ref);
                console.log(verse);
                this.verse_List.push(verse);
            }

            console.log("VERSE LIST")
            console.log(this.verse_List)

            console.log(this.verse_List[0])
            // Loop through rows and columns to place each card
            for (let row = 0; row < cardsPerColumn; row++) {
                for (let col = 0; col < cardsPerRow; col++) {
                    // Calculate the position of each card
                    const x = marginX + col * (card_width); // 10mm space between cards
                    const y = marginY + row * (card_height); // 10mm space between cards

                    let index = (row * 2) + col
                    console.log("index: " + index)
                    console.log(this.verse_List[index])
                    if (this.verse_List[index] != null) {
                        // Create the business card content (draw lines and text)
                        console.log("Drawing Card at index: " + index)
                        this.drawBusinessCard(doc, x, y, card_width, card_height, this.verse_List[index]);
                    }

                }
            }

            // Open the print dialog for the generated PDF
            //doc.autoPrint();
            window.open(doc.output("bloburl"), "_blank");
        },


        async fetchVerse(_ref) {

            let _verse = ""

            if (this.selectedTranslation == "ESV") { // ESV 

                const params = new URLSearchParams({
                    'q': _ref, // the Verses to request 
                    'include-headings': false,
                    'include-footnotes': false,
                    'include-verse-numbers': false,
                    'include-short-copyright': false,
                    'include-passage-references': false
                });
                const options = { method: 'GET', headers: { accept: 'application/json', Authorization: this.$ESV_API_KEY } };


                await fetch(`https://api.esv.org/v3/passage/text/?${params}`, options)
                    .then(res => res.json())
                    .then(res => {
                        _verse = res.passages[0]
                    })
                    .catch(err => console.error(err));

                return {  // return verse object                                               !!!! Add Error handling   !!! TODO: 
                    ref: _ref,
                    verse: _verse,
                    topic: ""
                };
            }
            else if (this.selectedTranslation == "NLT") { // NLT
                // https://bolls.life/get-chapter/NIV/22/8/
            }
            else if (this.selectedTranslation == "NKJV") { // NKJV

                const options = { method: 'GET', headers: { accept: 'application/json', Authorization: this.$NKJV_API_KEY } };
                fetch('https://bolls.life/get-chapter/NLT/22/8/', options)
                    .then(res => res.json())
                    .then(res => { console.log(res); })
                    .catch(err => console.error(err));
            }
            else if (this.selectedTranslation == "KJV" || this.selectedTranslation == "ASV") { // KJV and ASV

                const options = { method: 'GET', headers: { accept: 'application/json', Authorization: this.$GEN_API_KEY } };
                fetch('https://bolls.life/get-chapter/NLT/22/8/', options)
                    .then(res => res.json())
                    .then(res => { console.log(res); })
                    .catch(err => console.error(err));
            }

        },


        drawBusinessCard(doc, x, y, width, height, verse) {
            const paddingX = 5; // left padding

            const topic_FontSize = 12;
            const translation_FontSize = 10;
            const reference_FontSize = 10;
            const verse_FontSize = 9;


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
            doc.setFontSize(verse_FontSize);
            const wrappedText = doc.splitTextToSize(verse.verse.trim(), width - 10); // 10mm for left and right margin
            const lineHeight = 5; // Increase line height by adjusting the spacing between lines
            let lineY = y + 20;
            wrappedText.forEach(line => {
                doc.text(line, x + 5, lineY); // Print each line of wrapped text
                lineY += lineHeight; // Increase the Y position to add space between lines
            });


            // 2nd Reference
            if (this.showRepeatReference) {
                doc.setFont(this.font, "normal");
                doc.setFontSize(reference_FontSize);
                doc.text(verse.ref, x + width - 30, lineY + 2);
            }


        }
    }

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