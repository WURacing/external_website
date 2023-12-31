<template>
  <div class="relative min-h-screen isolate overflow-hidden flex flex-col items-center bg-gray-900 text-gray-100"
    :style="{ paddingTop: headerHeight + 'px' }">
    <div class="flex flex-col items-center w-full px-8 pb-8 max-w-7xl">

      <!-- Title Section -->
      <div class="p-8 w-full max-w-7xl text-center" data-aos="fade-down" data-aos-duration="1000">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient mb-4">
          MEET OUR SPONSORS
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300">
          Our sponsors make our success possible.
        </p>
        <button type="button" @click="openModal"
          class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400">
          <FontAwesomeIcon icon="file-pdf" class="mr-2" />
          Sponsorship Packet
        </button>
      </div>

      <!-- Sponsor card grid -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <SponsorCard v-for="sponsor in sponsors" :key="sponsor.id" :sponsor="sponsor" />
      </div>

      <!-- Modal for viewing sponsorship packet -->
      <SponsorshipModal :isModalOpen="isModalOpen" @closeModal="closeModal" :source="pdfSource" />
    </div>
  </div>
</template>

<script async setup lang="ts">
import {
  onMounted, ref, type Ref,
} from 'vue';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PDF from '../assets/sponsorship_packet2023.pdf';
import SponsorCard from '../components/SponsorCard.vue';
import SponsorshipModal from '../components/SponsorshipModal.vue';
import {
  Sponsor,
} from '../types/sponsors.ts';

// Modal
const isModalOpen = ref(false);

// PDF
const pdfSource = ref(PDF);

// Sponsors
const prevPage: Ref<String | null> = ref(null);
const currentPage: Ref<number | null> = ref(null);
const nextPage: Ref<String | null> = ref(null);
const totalPages: Ref<number | null> = ref(null);
const sponsors: Ref<Sponsor[]> = ref([]);

// Sample:
// {
//   "current_page": 1,
//     "data": [
//       {
//         "id": 4,
//         "name": "Boeing",
//         "tier": "Diamond",
//         "link": "https://www.boeing.com/",
//         "image_path": "sponsors/boeing.jpg",
//         "created_at": "2023-12-09T21:57:19.000000Z",
//         "updated_at": "2023-12-09T22:00:22.000000Z"
//       }
//     ],
//       "first_page_url": "http://wuracing-api.test/api/v1/sponsors?page=1",
//         "from": 1,
//           "last_page": 1,
//             "last_page_url": "http://wuracing-api.test/api/v1/sponsors?page=1",
//               "links": [
//                 {
//                   "url": null,
//                   "label": "&laquo; Previous",
//                   "active": false
//                 },
//                 {
//                   "url": "http://wuracing-api.test/api/v1/sponsors?page=1",
//                   "label": "1",
//                   "active": true
//                 },
//                 {
//                   "url": null,
//                   "label": "Next &raquo;",
//                   "active": false
//                 }
//               ],
//                 "next_page_url": null,
//                   "path": "http://wuracing-api.test/api/v1/sponsors",
//                     "per_page": 15,
//                       "prev_page_url": null,
//                         "to": 1,
//                           "total": 1
// }

// Methods for modal state management
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const headerHeight = ref(0); // Ref to store the height of the UniversalHeader

onMounted(() => {
  // Calculate the height of the UniversalHeader
  const header = document.querySelector('header'); // Assuming your UniversalHeader has a <header> tag or you need to adjust the selector based on your actual header element
  if (header) {
    headerHeight.value = header.offsetHeight; // Get the outer height of the header
  }

  this?.$axios.get('/sponsors').then((response) => {
    sponsors.value = response.data.data;
    prevPage.value = response.data.prev_page_url;
    currentPage.value = response.data.current_page;
    nextPage.value = response.data.next_page_url;
    totalPages.value = response.data.last_page;
  });

  // Dynamically update page title
  const titles = document.querySelectorAll('[data-title]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        document.title = document.title ?? 'WashU Racing';
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

  // Select all sponsor cards
  const cards = document.querySelectorAll('.sponsor-card');

  // Set initial state of cards to invisible
  gsap.set(cards, { autoAlpha: 0, y: 50 });

  // Create a timeline for the stagger animation
  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: 'racingBounce',
    },
  });

  tl.fromTo(cards, {
    y: 50,
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    y: 0,
    stagger: {
      each: 0.1,
      grid: 'auto',
      from: 'edges',
      amount: 1,
    },
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
