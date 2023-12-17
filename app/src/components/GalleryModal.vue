<template>
  <!-- Main modal container with headlessui for accessibility and control -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="fixed inset-0 overflow-y-auto" :class="{ 'modal-open': isOpen }">
      <!-- Overlay with AOS fade -->
      <div class="fixed inset-0 bg-gray-100/10" />
      <!-- Modal dialog container with AOS zoom -->
      <div class="relative inset-0 overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-5xl transform rounded-lg bg-gray-900 p-6 shadow-xl transition-all"
          ref="modalContainer">

          <div class="flex justify-between items-center">
            <DialogTitle class="text-2xl font-bold text-gray-100">
              <!-- Render only if selectedItem exists -->
              {{ selectedItem?.name }}
            </DialogTitle>
            <button type="button"
              class="rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200"
              @click="close">
              <font-awesome-icon :icon="['fas', 'times']" class="h-6 w-6 text-gray-100 fill-current" />
            </button>
          </div>
          <div v-if="selectedItem">
            <p class="my-4 text-gray-100">{{ selectedItem.description }}</p>
            <p class="text-sm text-gray-100">{{ selectedItem.date }}</p>
          </div>
          <!-- Content (image or video) if applicable -->
          <!-- ... -->

          <div class="mt-4 text-right">
            <button type="button"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              @click="close">
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle,
} from '@headlessui/vue';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  selectedItem: {
    type: Object,
    required: false,
    default: null,
  },
});

const close = () => {
  emit('close');
};
</script>
