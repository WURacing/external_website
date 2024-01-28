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
          {{ eventDetails }}
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
          Details of the competition in {{ eventDetails }}.
        </p>
      </div>

      <!-- Event Details Section -->
      <div class="w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-8">
        <div
          v-for="(event, key) in eventDetails?.events"
          :key="key"
          class="p-4 bg-stone-800 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 class="text-2xl font-bold mb-2">
            {{ event.event_type }}
          </h2>
          <p class="mb-2">
            Points: {{ event.points }}<br>
            Time: {{ event.time }}<br>
            Placement: {{ event.placement }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import backendAPIRequest from '@/services/axios';
import type { EventDetails } from '@/types/Events';

const route = useRoute();
const eventDetails = ref<EventDetails | null>(null);
const headerHeight = ref(0);

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
    getEventDetails(Number(route.params.id));

    // Calculate the header's height and observe changes
    const header = document.querySelector("header");
    if (header) {
        const updateHeaderHeight = () => {
            headerHeight.value = header.offsetHeight;
        };

        updateHeaderHeight();
        new ResizeObserver(updateHeaderHeight).observe(header);
    }

    // Scroll to top of page
    window.scrollTo(0, 0);

});
</script>
