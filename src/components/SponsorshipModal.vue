<template>
  <!-- Main modal container with headlessui for accessibility and control -->
  <TransitionRoot
    appear
    :show="isModalOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-50"
      :class="{ 'modal-open': isModalOpen }"
      @close="closeModal"
    >
      <!-- Overlay with AOS fade -->
      <div class="fixed inset-0 bg-stone-100/10" />
      <!-- Modal dialog container with AOS zoom -->
      <div
        class="relative inset-0 overflow-y-auto flex items-center justify-center p-4"
      >
        <DialogPanel
          id="sponsorship-modal"
          class="w-full max-w-4xl transform rounded-lg bg-stone-900 p-6 shadow-xl transition-all"
        >
          <!--
          Modal header with close button
          -->
          <div class="flex justify-between items-center">
            <DialogTitle class="text-2xl font-bold text-stone-100">
              Sponsorship Packet
            </DialogTitle>
            <button
              type="button"
              class="rounded-md p-2 inline-flex items-center justify-center text-stone-100 hover:text-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-200"
              @click="closeModal"
            >
              <font-awesome-icon
                :icon="['fas', 'times']"
                class="h-6 w-6 text-stone-100 fill-current"
              />
            </button>
          </div>
          <!-- PDF Embed container with GSAP-powered scroll fade -->
          <div
            id="pdf-container"
            class="mt-4 w-full h-80vh bg-stone-900 rounded shadow overflow-y-auto"
          >
            <vue-pdf-embed
              class="w-full rounded"
              :source="source"
            />
          </div>
          <!-- Closing section with a button enhanced with GSAP hover scale -->
          <div class="mt-4 text-right">
            <button
              type="button"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border border-transparent rounded-md hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-stone-500"
              @mouseenter="scaleButton"
              @mouseleave="resetButtonScale"
              @focusin="scaleButton"
              @focusout="resetButtonScale"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { onMounted, defineProps, defineEmits, watch } from "vue";
import {
    TransitionRoot,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AOS from "aos";
import gsap from "gsap";
import vuePdfEmbed from "vue-pdf-embed";

const props = defineProps({
    isModalOpen: {
        type: Boolean,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
    emit("closeModal");
};

onMounted(() => {
    AOS.init();

    watch(
        () => props.isModalOpen,
        (newValue: boolean) => {
            if (newValue) {
                const modalContainer =
                    document.getElementById("sponsorship-modal");
                const pdfContainer = document.getElementById("pdf-container");

                // Scroll fade animation
                gsap.fromTo(
                    modalContainer,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "racingBounce",
                    },
                );

                gsap.fromTo(
                    pdfContainer,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "racingBounce",
                    },
                );
            }
        },
    );
});

const scaleButton = (event) => {
    gsap.to(event.target, { scale: 1.05, duration: 0.2 });
};

const resetButtonScale = (event) => {
    gsap.to(event.target, { scale: 1, duration: 0.2 });
};
</script>

<style scoped>
.modal-open {
    overflow: hidden;
}

/* Custom styles for vue-pdf-embed */
.vue-pdf-embed .vue-pdf-embed__pdf {
    max-height: 80vh;
    /* Maximum height for the PDF */
}
</style>
