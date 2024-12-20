<template>
    <div class="mb-10">

        <h1 class="text-left mx-0">Create Your Verse Cards</h1>

        <v-row class="mx-0 ">

            <v-col class="px-0 pt-0" cols="12" md="6">
                <div class="column-content">



                    <v-container fluid class="px-0">
                        <p class="text-left  pb-2">Enter Bibe Verses (separated by commas)</p>

                        <v-textarea v-model="verseInput" bg-color="#ffffff" clear-icon="mdi-close-circle" label="Verses"
                            placeholder="Pslam 23:4, John 3:16 (The Gospel)," min-width="300px" min-height="300rem"
                            clearable no-resize persistent-placeholder counter maxlength="1500"
                            variant="solo"></v-textarea>
                        <v-alert v-show="showWarning" density="compact"
                            text="You can request a maximum of 50 verses at a time! Please try again"
                            title="Too Many Verses" type="warning"></v-alert>
                    </v-container>

                    <v-row class="px-0 mx-0">
                        <v-col class="px-0">
                            <h3 class="text-left font-weight-medium mb-1">Translation</h3>
                            <v-select bg-color="#ffffff" @change="getPreviewVerse" v-model="selectedTranslation"
                                :items="translations" variant="outlined" return-object></v-select>
                        </v-col>

                        <v-col>
                            <h3 class="text-left font-weight-medium mb-1">Card Size</h3>
                            <v-select bg-color="#ffffff" v-model="selectedCardSize" :items="cardSizes"
                                item-value="value" variant="outlined" item-title="text" return-object
                                @change="getPreviewVerse"></v-select>
                        </v-col>

                    </v-row>




                    <v-row class="mx-0">
                        <v-col class="pl-0" cols="6">
                            <h3 class="text-left font-weight-medium mb-1">Font</h3>
                            <v-select bg-color="#ffffff" v-model="selectedFont" :items="fonts" item-value="value"
                                item-title="text" variant="outlined" return-object></v-select>
                        </v-col>
                        <v-col cols="6">
                            <div>
                                <h3 class="text-left font-weight-medium mb-1">Format</h3>
                                <v-row class="pt-2">
                                    <v-checkbox class="text-left" color="primary" v-model="showTopic" hide-details
                                        label="Topic"></v-checkbox>
                                    <v-checkbox class="text-left" color="primary" v-model="showTranslation" hide-details
                                        label="Translation"></v-checkbox>
                                    <v-checkbox class="text-left" color="primary" v-model="showRepeatReference"
                                        hide-details label="Repeat Reference"></v-checkbox>
                                </v-row>

                            </div>

                        </v-col>

                    </v-row>


                    <v-btn v-show="!loading" class="mt-5 text-white bg-primary" size="large"
                        @click="generateAndPrintCards">
                        Print</v-btn>
                    <v-progress-circular v-show="loading" :size="45" color="primary"
                        indeterminate></v-progress-circular>



                </div>



            </v-col>
            <v-col cols="12" md="6">
                <h2 class=" text-center">Preview</h2>
                <div class="column-content my-auto ">

                    <!--                                         PREVIEW              -->


                    <v-card :width="get_previewWidth()" :height="get_previewHeight()" class="cardPreview  border">

                        <v-row justify="space-between">
                            <v-spacer v-show="!showTopic"></v-spacer>
                            <p v-show="showTopic" class="topic" id="topic"
                                :style="{ fontFamily: this.selectedFont.value }"> Christ the
                                Center
                            </p>
                            <p v-show="showTranslation" class="translation" id="translation"
                                :style="{ fontFamily: this.selectedFont.value }">
                                {{ this.selectedTranslation }}</p>
                        </v-row>

                        <v-row>
                            <p class="reference" id="reference" :style="{ fontFamily: this.selectedFont.value }"> 2
                                Corinthians 5:17 </p>
                        </v-row>

                        <v-row class="mt-4">
                            <p class="verse" id="verse" :style="{ fontFamily: this.selectedFont.value }">
                                {{ this.previewText }}</p>
                        </v-row>

                        <v-row class="mt-4" v-show="showRepeatReference" justify="space-between">
                            <v-spacer></v-spacer>
                            <p class="reference2" id="reference2" :style="{ fontFamily: this.selectedFont.value }"> 2
                                Corinthians 5:17 </p>
                        </v-row>

                    </v-card>




                </div>

            </v-col>
        </v-row>


        <h1 class="text-left mx-0 my-10">Verse Packs</h1>
        <h2 class="text-left mx-0 my-5">Navigator's Topical Memory System</h2>
        <v-row class="mx-0 " justify="space-around">
            <VersePackCard title="A: Living the New Life"
                description="Explore key verses that guide new believers in their journey of faith." icon="mdi-cross"
                :addBTN="() => addPack('A')">

                <p class="font-weight-bold">Christ the Center</p>
                <p class="ml-6">2 Corinthians 5:17</p>
                <p class="ml-6">Galatians 2:20</p>

                <p class="font-weight-bold">Obedience to Christ</p>
                <p class="ml-6">Romans 12:1</p>
                <p class="ml-6">John 14:21</p>

                <p class="font-weight-bold">The Word</p>
                <p class="ml-6">2 Timothy 3:16</p>
                <p class="ml-6">Joshua 1:8</p>

                <p class="font-weight-bold">Prayer</p>
                <p class="ml-6">John 15:7</p>
                <p class="ml-6">Philippians 4:6-7</p>

                <p class="font-weight-bold">Fellowship</p>
                <p class="ml-6">Matthew 18:20</p>
                <p class="ml-6">Hebrews 10:24-25</p>

                <p class="font-weight-bold">Witnessing</p>
                <p class="ml-6">Matthew 4:19</p>
                <p class="ml-6">Romans 1:16</p>

            </VersePackCard>

            <VersePackCard title="B: Proclaiming Christ"
                description="Discover scriptures that encourage sharing the Gospel and proclaiming Christ to others."
                icon="mdi-chat" :addBTN="() => addPack('B')">

                <p class="font-weight-bold">All Have Sinned</p>
                <p class="ml-6">Romans 3:23</p>
                <p class="ml-6">Isaiah 53:6</p>

                <p class="font-weight-bold">Sin's Penalty</p>
                <p class="ml-6">Romans 6:23</p>
                <p class="ml-6">Hebrews 9:27</p>

                <p class="font-weight-bold">Christ Paid the Penalty</p>
                <p class="ml-6">Romans 5:8</p>
                <p class="ml-6">1 Peter 3:18</p>

                <p class="font-weight-bold">Salvation is not by Works</p>
                <p class="ml-6">Ephesians 2:8-9</p>
                <p class="ml-6">Titus 3:5</p>

                <p class="font-weight-bold">Must Receive Christ</p>
                <p class="ml-6">John 1:12</p>
                <p class="ml-6">Revelation 3:20</p>

                <p class="font-weight-bold">Assurance of Salvation</p>
                <p class="ml-6">1 John 5:13</p>
                <p class="ml-6">John 5:24</p>
            </VersePackCard>

            <VersePackCard title="C: Reliance On God's Resources"
                description="Dive deeper into the promises and resources that God provides for His people."
                icon="mdi-bookshelf" :addBTN="() => addPack('C')">

                <p class="font-weight-bold">His Spirit</p>
                <p class="ml-6">1 Corinthians 3:16</p>
                <p class="ml-6">1 Corinthians 2:12</p>

                <p class="font-weight-bold">His Strength</p>
                <p class="ml-6">Isaiah 41:10</p>
                <p class="ml-6">Philippians 4:13</p>

                <p class="font-weight-bold">His Faithfulness</p>
                <p class="ml-6">Lamentations 3:22-23</p>
                <p class="ml-6">Numbers 23:19</p>

                <p class="font-weight-bold">His Peace</p>
                <p class="ml-6">Isaiah 26:3</p>
                <p class="ml-6">1 Peter 5:7</p>

                <p class="font-weight-bold">His Provision</p>
                <p class="ml-6">Romans 8:32</p>
                <p class="ml-6">Philippians 4:19</p>

                <p class="font-weight-bold">His Help in Temptation</p>
                <p class="ml-6">Hebrews 2:18</p>
                <p class="ml-6">Psalms 119:9-11</p>

            </VersePackCard>

            <VersePackCard title="D: Being Christ's Disciple"
                description="This pack includes the characteristics and commitments of a disciple of Christ."
                icon="mdi-account-school" :addBTN="() => addPack('D')">

                <p class="font-weight-bold">Put Christ First</p>
                <p class="ml-6">Matthew 6:33</p>
                <p class="ml-6">Luke 9:23</p>

                <p class="font-weight-bold">Separate From the World</p>
                <p class="ml-6">1 John 2:15-16</p>
                <p class="ml-6">Romans 12:2</p>

                <p class="font-weight-bold">Be Steadfast</p>
                <p class="ml-6">1 Corinthians 15:58</p>
                <p class="ml-6">Hebrews 12:3</p>

                <p class="font-weight-bold">Serve Others</p>
                <p class="ml-6">Mark 10:45</p>
                <p class="ml-6">2 Corinthians 4:5</p>

                <p class="font-weight-bold">Give Generously</p>
                <p class="ml-6">Proverbs 3:9-10</p>
                <p class="ml-6">2 Corinthians 9:6-7</p>

                <p class="font-weight-bold">Develop World Vision</p>
                <p class="ml-6">Acts 1:8</p>
                <p class="ml-6">Matthew 28:19-20</p>
            </VersePackCard>

            <VersePackCard title="E: Growth In Christlikeness"
                description="Explore scriptures that guide spiritual growth and character development to become more like Christ."
                icon="mdi-crown" :addBTN="() => addPack('E')">

                <p class="font-weight-bold">Love</p>
                <p class="ml-6">John 13:34-35</p>
                <p class="ml-6">1 John 3:18</p>

                <p class="font-weight-bold">Humility</p>
                <p class="ml-6">Philippians 2:3-4</p>
                <p class="ml-6">1 Peter 5:5-6</p>

                <p class="font-weight-bold">Purity</p>
                <p class="ml-6">Ephesians 5:3</p>
                <p class="ml-6">1 Peter 2:11</p>

                <p class="font-weight-bold">Honesty</p>
                <p class="ml-6">Leviticus 19:11</p>
                <p class="ml-6">Acts 24:16</p>

                <p class="font-weight-bold">Faith</p>
                <p class="ml-6">Hebrews 11:6</p>
                <p class="ml-6">Romans 4:20-21</p>

                <p class="font-weight-bold">Good Works</p>
                <p class="ml-6">Galatians 6:9-10</p>
                <p class="ml-6">Matthew 5:16</p>
            </VersePackCard>
        </v-row>

        <h2 class="text-left mx-0 my-5">Other Packs</h2>
        <v-row class="mx-0 " justify="left">

            <VersePackCard title="5 Assurances" description="Explore key assurances given to us" icon="mdi-cross"
                :addBTN="() => addPack('FiveAssurances')">

                <p class="font-weight-bold">Assurance of Salvation</p>
                <p class="ml-6">1 John 5:11-12 </p>


                <p class="font-weight-bold">Assurance of Answered Prayer</p>
                <p class="ml-6">John 16:24</p>


                <p class="font-weight-bold">Assurance of Victory</p>
                <p class="ml-6">1 Corinthians 10:13</p>


                <p class="font-weight-bold">Assurance of Forgiveness</p>
                <p class="ml-6">1 John 1:9</p>


                <p class="font-weight-bold">Assurance of Guidance</p>
                <p class="ml-6">Proverbs 3:5-6</p>

            </VersePackCard>


        </v-row>
    </div>
</template>


<script>
import jsPDF from "jspdf";
import * as constants from '../constants.js'
import VersePackCard from "../components/VersePackCard.vue";
export default {

    components: {
        VersePackCard,

    },
    setup() {
        return constants;
    },
    data() {
        return {
            // Items to display in v-select
            translations: ['ESV'], //'NIV'  'KJV', 'NLT', 'NKJV'
            // Default selected value
            selectedTranslation: 'ESV',

            selectedCardSize: { text: 'Business Card (2in x 3.5in)', value: 'businessCard' },
            cardSizes: [
                { text: 'Business Card (2in x 3.5in)', value: 'businessCard' },
                { text: 'Index Card (3in x 5in)', value: 'indexCard' },
                { text: 'Custom (2in x 3in)', value: 'customCard' }],

            selectedFont: { text: "Arial", value: "Arial" },
            fonts: [
                { text: "Arial", value: "Arial" },
                { text: "Times New Roman", value: "Times" },
                { text: "Brush Script MT", value: "cursive" },
            ],



            previewText: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come",

            showTranslation: true,
            showTopic: true,
            showRepeatReference: true,
            verseInput: "",
            showWarning: false,
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
    watch: {
        selectedTranslation(newValue) {
            // Watch for changes in selectedItem and call the function
            this.getPreviewVerse();
            // You can perform any logic here based on the change
        },
    },
    methods: {
        test(add) {
            console.log("yEEe")
            this.verseInput += constants.TMS_APack
        },
        addPack(pack) {

            if (pack == "A") {
                this.verseInput += constants.TMS_APack
            } else if (pack == "B") {
                this.verseInput += constants.TMS_BPack
            } else if (pack == "C") {
                this.verseInput += constants.TMS_CPack
            } else if (pack == "D") {
                this.verseInput += constants.TMS_DPack
            } else if (pack == "E") {
                this.verseInput += constants.TMS_EPack
            }
            else if (pack == "All") {
                this.verseInput += constants.TMS_ALL
            }
            else if (pack == "FiveAssurances") {
                this.verseInput += constants.Five_Assurances
            }
        },

        get_previewWidth() {
            const mmToPx = 3.78 // 3.78 px per mm

            console.log(this.selectedCardSize.value)
            if (this.selectedCardSize.value == "indexCard") {
                return this.indexCard_width * mmToPx;
            }
            else if (this.selectedCardSize.value == "customCard") {
                return this.customCard_width * mmToPx;
            } else { //default business
                return this.businessCard_width * mmToPx;
            }

        },
        get_previewHeight() {
            const mmToPx = 3.78 // 3.78 px per mm
            if (this.selectedCardSize.value == "indexCard") {
                return this.indexCard_height * mmToPx;
            }
            else if (this.selectedCardSize.value == "customCard") {
                return this.customCard_height * mmToPx;
            } else { //default business
                return this.businessCard_height * mmToPx;
            }
        },

        async getPreviewVerse() {


            let verse = await this.fetchVerse("John 3:16");
            console.log("Verse: " + verse)
            if (verse && verse.verse) {
                this.previewText = verse.verse
            }
            else this.previewTex = "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come"

        },
        validateForm() {

            const referenceList = this.verseInput.split(","); // SPLit on commas

            if (referenceList.length >= 50) {
                this.showWarning = true
            }

        },
        async generateAndPrintCards() {


            this.validateForm();
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
            let card_width = this.businessCard_width
            let card_height = this.businessCard_height
            let cardsPerColumn = businessCard_PerColumn
            let cardsPerRow = businessCard_PerRow

            if (this.selectedCardSize.value == "indexCard") {
                card_width = this.indexCard_width
                card_height = this.indexCard_height
                cardsPerColumn = indexCard_PerColumn
                cardsPerRow = indexCard_PerRow
            } else if (this.selectedCardSize.value == "customCard") {
                card_width = this.customCard_width
                card_height = this.customCard_height
                cardsPerColumn = customCard_PerColumn
                cardsPerRow = customCard_PerRow

            }


            const marginX = 10; // Horizontal margin from the page edges
            const marginY = 10; // Vertical margin from the page edges

            const referenceList = this.verseInput.split(","); // SPLit on commas
            this.verse_List = [] //reset
            let requests = 0 // delay every X calls

            this.loading = true;
            const delay = (delayInms) => {
                return new Promise(resolve => setTimeout(resolve, delayInms));
            };


            for (let ref of referenceList) {
                let _topic = ref.match(/\(([^)]+)\)/); // get topic is present
                ref = ref.split("(")[0].trim(); // just the verse
                console.log("ref: " + ref);


                if (!(ref === null || ref === undefined || ref.trim() === "")) { //check for empties

                    if (requests >= 10) { // After sending 18 requests, delay for 
                        await delay(100);
                        requests = 0
                    }
                    let verse;
                    let success = false;

                    // Retry logic for Too Many Requests (429)
                    while (!success) {
                        try {
                            verse = await this.fetchVerse(ref); // Attempt to fetch the verse
                            success = true; // Mark as successful if no error
                        } catch (error) {
                            if (error.response && error.response.status === 429) { // Check for 429 status
                                console.warn("Too many requests. Retrying after delay...");
                                await delay(1000); // Wait before retrying
                            } else {
                                console.error("Error fetching verse:", error);
                                throw error; // Rethrow other errors
                            }
                        }
                    }

                    requests = requests + 1
                    console.log("Request: " + requests);
                    if (_topic) {
                        console.log(_topic[1]);
                        verse.topic = _topic[1]
                        console.log(verse);
                    }


                    this.verse_List.push(verse);
                }
            }


            console.log("VERSE LIST")
            console.log(this.verse_List)

            console.log(this.verse_List[0])
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

            console.log("ref: " + _ref)
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


                try {
                    const response = await fetch(`https://api.esv.org/v3/passage/text/?${params}`, options);
                    const data = await response.json();

                    if (data.passages && data.passages[0]) {
                        _verse = data.passages[0].replace(/\n\n+/g, '\n'); // Remove any double new lines (for Psalms)
                    } else {
                        throw new Error("No passages found in the response");
                    }
                } catch (error) {
                    console.error("Error fetching verse:", error);
                    throw error; // Rethrow the error for further handling
                }

                return {  // return verse object                                               !!!! Add Error handling   !!! TODO: 
                    ref: _ref,
                    verse: _verse,
                    topic: ""
                };
            }
            else if (this.selectedTranslation == "NLT") { // NLT
                // https://bolls.life/get-chapter/NIV/22/8/



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
                        _verse = res.passages[0].replace(/\n\n+/g, '\n') // remove any double new lines (for Psalms)
                    })
                    .catch(err => console.error(err));

                return {  // return verse object                                               !!!! Add Error handling   !!! TODO: 
                    ref: _ref,
                    verse: _verse,
                    topic: ""
                };



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

            this.selectedFont.value = this.selectedFont.value.toLowerCase();
            console.log("font: " + this.selectedFont.value)
            if (this.selectedFont.value == "arial") {
                this.selectedFont.value = 'helvetica' // arial doesnt work with jspdf..  helvetica is basically the same
            }


            // Draw the rectangle (business card outline)
            doc.setDrawColor(200, 200, 200); // Gray line
            doc.setLineDashPattern([3, 3], 0); // 2 units dash, 2 units gap
            doc.setLineWidth(0.3);
            doc.rect(x, y, width, height); // x, y, width, height

            // Topic 
            if (this.showTopic) {
                doc.setFont(this.selectedFont.value, "bold");
                doc.setFontSize(topic_FontSize);
                doc.text(verse.topic, x + paddingX, y + 7);
            }
            // Translation 
            if (this.showTranslation) {
                doc.setFont(this.selectedFont.value, "normal");
                doc.setFontSize(translation_FontSize);
                doc.text("ESV", x + width - 10, y + 7);
            }
            // Reference
            doc.setFont(this.selectedFont.value, "normal");
            doc.setFontSize(reference_FontSize);
            doc.text(verse.ref, x + paddingX, y + 13);

            // Verse
            doc.setFont(this.selectedFont.value, "normal");
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
            wrappedText.forEach(line => {
                if (lineY + lineHeight > maxHeight) {
                    return; // Stop if it overflows the card height
                }
                doc.text(line, x + 5, lineY); // Print each line of wrapped text
                lineY += lineHeight; // Increase the Y position to add space between lines
            });


            // 2nd Reference
            if (this.showRepeatReference) {
                doc.setFont(this.selectedFont.value, "normal");
                doc.setFontSize(reference_FontSize);
                doc.text(verse.ref, x + width - 30, lineY + 1);
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
    padding: 20px;
    transition: box-shadow 0.2s ease-in-out;
}

.cardPreview:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

.column-content {


    height: 100%;

    text-align: center;

}

.li {
    list-style: none;

}
</style>