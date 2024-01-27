<template>
  <div
    class="relative min-h-screen isolate overflow-hidden flex flex-col items-center bg-stone-900 text-stone-100"
    :style="{ paddingTop: headerHeight + 'px' }"
  >
    <div class="flex flex-col items-center w-full px-8 pb-8 max-w-7xl">
      <!-- Title Section -->
      <div
        class="p-8 w-full max-w-7xl text-center"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient mb-4"
        >
          OUR HISTORY
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
          An overview of our competition history.
        </p>
      </div>

      <!-- Histories Section -->
      <div class="w-full flex flex-col items-center space-y-8">
        <div
          v-for="history in historyData.data"
          :key="history.id"
          class="p-4 bg-stone-800 rounded-lg"
        >
          <!-- Gallery made up images, videos, and pdfs. All you get is the url:
              export interface History {
                  id: number;
                  competition_year: number;
                  place: number;
                  description: string;
                  gallery: string[];
                  created_at?: Date;
                  updated_at?: Date;
              }
            -->
          <div v-for="thumb in history.gallery" :key="thumb">
            <img v-if="thumb.endsWith('.webp')" :src="thumb" />
          </div>

          <h2 class="text-2xl font-bold mb-2">
            {{ history.competition_year }}
          </h2>
          <p class="mb-2">{{ history.description }}</p>
          <button
            type="button"
            @click="getEventDetails(history.id)"
            class="mt-2 bg-stone-700 hover:bg-stone-600 text-stone-100 px-4 py-2 rounded"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type PaginatedHistory, type EventDetails } from '@/types/Events';
import backendAPIRequest from '../services/axios';

const historyData = ref<PaginatedHistory>({
  data: [],
  links: {
    first: '',
    last: '',
    prev: '',
    next: '',
  },
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
});

const headerHeight = ref(0);
const eventDetails = ref<EventDetails | null>(null);

const getEventDetails = async (eventID: number): Promise<void> => {
  const response = await backendAPIRequest<EventDetails>(
    `/histories/${eventID}`,
  );
  eventDetails.value = {
    id: response.data.id,
    history_id: response.data.history_id,
    events: response.data.events,
    created_at: new Date(String(response.data.created_at)),
    updated_at: new Date(String(response.data.updated_at)),
  };
};

onMounted(async () => {
  try {
    const response = await backendAPIRequest<PaginatedHistory>('/histories');
    const histories = response.data.data.map((history) => ({
      id: history.id,
      competition_year: history.competition_year,
      place: history.place,
      description: history.description,
      gallery: history.gallery,
      created_at: new Date(String(history.created_at)),
      updated_at: new Date(String(history.updated_at)),
    }));

    historyData.value = {
      data: histories,
      links: response.data.links,
      meta: response.data.meta,
    };
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
  }

  // Calculate the header's height and observe changes
  const header = document.querySelector('header');
  if (header) {
    const updateHeaderHeight = () => {
      headerHeight.value = header.offsetHeight;
    };

    updateHeaderHeight();
    new ResizeObserver(updateHeaderHeight).observe(header);
  }
});
</script>
