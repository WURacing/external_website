<template>
  <div
    class="relative min-h-screen isolate overflow-hidden flex flex-col items-center bg-rose-950 text-stone-900"
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
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient-light mb-4"
        >
          MEET OUR SPONSORS
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
          Our sponsors make our success possible.
        </p>
        <button
          type="button"
          class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-stone-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          @click="openModal"
        >
          <FontAwesomeIcon
            icon="file-pdf"
            class="mr-2"
          />
          Sponsorship Packet
        </button>
      </div>

      <!-- Sponsor card grid -->
      <div class="mt-8 w-full max-w-7xl">
        <div
          class="grid grid-cols-6 items-center gap-8 mt-4 mx-auto justify-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <SponsorCard
            v-for="sponsor in sponsorsData.data"
            :key="sponsor.id"
            :sponsor="sponsor"
            class="sponsor-card transition-transform duration-500 hover:scale-105"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center items-center space-x-4">
          <button
            type="button"
            :disabled="!sponsorsData.prev_page_url"
            class="px-4 py-2 rounded-md bg-stone-800 text-stone-100 hover:bg-stone-700 disabled:opacity-50"
            @click="prevPage"
          >
            Prev
          </button>
          <p class="text-stone-100">
            Page {{ sponsorsData.current_page }} of
            {{ sponsorsData.last_page }}
          </p>
          <button
            type="button"
            :disabled="!sponsorsData.next_page_url"
            class="px-4 py-2 rounded-md bg-stone-800 text-stone-100 hover:bg-stone-700 disabled:opacity-50"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Modal for viewing sponsorship packet -->
      <SponsorshipModal
        :is-modal-open="isModalOpen"
        :source="pdfSource"
        @close-modal="closeModal"
      />
    </div>
  </div>
</template>

<script async setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { AxiosResponse } from "axios";
import PDF from "@/assets/sponsorship_packet2024.pdf";
import SponsorCard from "@/components/SponsorCard.vue";
import SponsorshipModal from "@/components/SponsorshipModal.vue";
import { type Sponsor } from "@/types/Sponsors";
import makeBackendAPIRequest from "@/services/axios";
import { type Pagination } from "@/types/Pagination";

// (alias) type SponsorTier = "Diamond" | "Platinum" | "Gold" | "Silver" | "Bronze"

// Modal
const isModalOpen = ref(false);

// PDF
const pdfSource = ref(PDF);

// Sponsors
const sponsorsData: Ref<Pagination<Sponsor>> = ref({
    current_page: 1,
    data: [],
    first_page_url: "",
    from: null,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 12,
    prev_page_url: null,
    to: null,
    total: 0,
});

const fetchSponsors = (url: string) => {
    makeBackendAPIRequest<Pagination<Sponsor>>(url ?? "/sponsors")
        .then((response: AxiosResponse<Pagination<Sponsor>>) => {
            // Map the response data to correctly match the Sponsor type
            const sponsors = response.data.data.map((sponsor: Sponsor) => ({
                ...sponsor,
                image_path: sponsor.image_path
                    ? import.meta.env.VITE_APP_BACKEND_URL + 'storage/' + sponsor.image_path
                    : "https://placehold.co/600x400",
                created_at: sponsor.created_at,
                updated_at: sponsor.updated_at,
            }));

            // Update the sponsorsData ref
            sponsorsData.value = {
                current_page: response.data.current_page,
                data: sponsors,
                first_page_url: response.data.first_page_url,
                from: response.data.from,
                last_page: response.data.last_page,
                last_page_url: response.data.last_page_url,
                links: response.data.links,
                next_page_url: response.data.next_page_url,
                path: response.data.path,
                per_page: response.data.per_page,
                prev_page_url: response.data.prev_page_url,
                to: response.data.to,
                total: response.data.total,
            };
        })
        .catch((error) => {
            console.error(error);
        });
};

// Pagination methods
const prevPage = () => {
    if (sponsorsData.value.prev_page_url) {
        fetchSponsors(sponsorsData.value.prev_page_url);
    }
};

const nextPage = () => {
    if (sponsorsData.value.next_page_url) {
        fetchSponsors(sponsorsData.value.next_page_url);
    }
};

// Methods for modal state management
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const headerHeight = ref(0); // Ref to store the height of the UniversalHeader

onMounted(() => {
    // Calculate the height of the UniversalHeader
    const header = document.querySelector("header"); // Assuming your UniversalHeader has a <header> tag or you need to adjust the selector based on your actual header element
    if (header) {
        headerHeight.value = header.offsetHeight; // Get the outer height of the header
    }

    // Fetch sponsors
    fetchSponsors("/sponsors");

    // Dynamically update page title
    const titles = document.querySelectorAll("[data-title]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                document.title = document.title ?? "WashU Racing";
            }
        });
    });

    titles.forEach((title) => {
        observer.observe(title);
    });

    // Make each letter of all titles uppercase
    titles.forEach((title) => {
        // eslint-disable-next-line no-param-reassign
        title.innerHTML = title.innerHTML.toUpperCase();
    });
});
</script>

<style scoped>
.text-gradient {
    background: linear-gradient(to right, #d63030, #942020);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>
../types/Sponsors
../types/Sponsors
