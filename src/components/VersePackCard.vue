<template>
    <v-card class="pa-3 my-3 border card-container hover-card" flat width="300px" min-height="125px"
        style="background-color: #f3f4f6;">
        <div class="card-content popup-wrapper">
            <!-- Icon, Title, and Description -->



            <v-row no-gutters>
                <v-col>
                    <!-- Existing Icon -->
                    <v-icon size="40" class=" mt-4">{{ icon }}</v-icon>
                </v-col>

                <!-- Add Button: Shown only on hover -->
                <v-btn class="add-btn" icon variant="flat" size="small" @click="handleAdd">
                    <v-icon icon="mdi-plus" color="primary"></v-icon>
                </v-btn>
                <transition name="fade">
                    <div v-if="showPopup" class="added-popup">Added</div>
                </transition>
            </v-row>

            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
        </div>

        <!-- Expanded Content -->
        <transition name="expand">
            <div v-if="expanded" class="expanded-text">
                <slot />
            </div>
        </transition>

        <!-- Toggle Button -->
        <div class="card-footer">
            <v-btn variant="text" color="primary" class="ma-0 pa-0 text-button" @click="toggleExpanded">
                <v-icon size="24" class="arrow-icon" :class="{ rotated: expanded }">
                    mdi-chevron-down
                </v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "VersePackCard",

    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        additionalText: {
            type: String,
            default: "",
        },
        addBTN: {
            type: Function,
            default: null, // No function is required
        },
    },
    data() {
        return {
            expanded: false,
            showAddButton: false, // Controls button visibility
            showPopup: false,
        };
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
        },
        handleMouseEnter() {
            this.showAddButton = true; // Show button on hover
        },
        handleMouseLeave() {
            this.showAddButton = false; // Hide button on hover
        },
        handleAdd() {
            this.addBTN(); // Trigger the passed-in function
            this.showPopup = true; // Show the "Added" popup
            setTimeout(() => {
                this.showPopup = false; // Hide it after a delay
            }, 2000); // Popup disappears after 2 seconds
        }
    },
};
</script>

<style scoped>
/* Card Layout */
.card-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    /* Ensures full height */
    position: relative;
    overflow: visible;
}

/* Content Section */
.card-content {
    flex-grow: 1;
    /* Allows the content to take available space */
}

/* Footer Section */
.card-footer {
    position: relative;
    bottom: 0;
    text-align: center;
    margin-top: auto;
}

/* Smooth Transition for Expanded Section */
.expand-enter-active,
.expand-leave-active {
    transition: max-height 1s ease, opacity 1s ease;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 450px;
    /* Adjust as needed */
    opacity: 1;
}

.expanded-text {
    margin-top: 10px;
    color: #555;
}

/* Rotating Arrow Icon */
.arrow-icon {
    transition: transform 0.3s ease;
}

.arrow-icon.rotated {
    transform: rotate(180deg);
}

.hover-card {
    position: relative;
    /* Enables positioning relative to the card */
   
    transition: box-shadow 0.2s ease-in-out;
}

.hover-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Add Button Styling */
.add-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    /* Positions the button in the upper-right corner */
    opacity: 0;
    /* Initially hidden */
    transition: opacity 0.2s ease-in-out;
}

.hover-card:hover .add-btn {
    opacity: 1;
    /* Show button on hover */
}

.popup-wrapper {
    position: relative;
    z-index: 1;
    /* Ensure the popup is above other content */
}

.added-popup {
    position: absolute;
    top: -30px;
    /* Render above the card */
    right: -30px;
    /* Align with the button */
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 100;
    /* Ensure it renders above all content */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    opacity: 1;
    transition: opacity 0.5s ease;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>