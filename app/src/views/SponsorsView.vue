<template>
  <div class="relative min-h-screen h-fit isolate overflow-hidden flex justify-center items-center">
    <div
      class="relative min-h-fit isolate overflow-hidden border-t border-stone-600"
    >
      <div
        class="mx-auto w-full py-8 sm:py-16 lg:py-24 px-8 sm:px-12 lg:px-16 space-y-6 sm:space-y-8 text-center"
      >
        <div class="flex flex-col items-center space-y-0">
          <h2
            class="text-2xl tracking-tight text-stone-100 sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient"
            data-title
          >
            OUR SPONSORS
          </h2>

          <a class="text-stone-100 hover:text-stone-200 transition-colors duration-300 ease-in-out" @click="openModal" :href="'#'">
            View Our Sponsorship Packet
          </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <!-- Sponsor cards -->
          <div
            v-for="sponsor in sponsors"
            :key="sponsor.id"
            class="sponsor-card relative w-full bg-stone-100 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out transform filter hover:shadow-xl"
            @mouseenter="animateCard"
            @mouseleave="resetAnimation"
            @focusin="animateCard"
            @focusout="resetAnimation"
          >
            <!-- Image container with gradient overlay -->
            <div class="relative w-full h-48">
              <!-- Sponsor logo image -->
              <img
                :src="sponsor.logo"
                class="absolute inset-0 w-full h-full object-cover"
                alt="Sponsor Logo"
                v-shared-element:[sponsor.id]
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-b from-stone-100/50 to-stone-100/75" />

              <!-- Text content over gradient -->
              <div class="p-4 relative w-full h-full flex flex-col justify-center">
                <!-- Sponsor name -->
                <a
                  :href="sponsor.link"
                  class="text-lg font-extrabold text-stone-800 hover:text-stone-700 transition-colors duration-300 ease-in-out text-gradient"
                  data-title
                >
                  {{ sponsor.name }}
                </a>
                <!-- Sponsor Tier -->
                <p class="text-sm text-stone-900">{{ sponsor.tier }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-stone-900/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-scroll h-screen">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-4xl h-screen transform overflow-hidden rounded-2xl bg-stone-100 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Sponsorship Packet
              </DialogTitle>
              <div class="mt-2 w-full h-full overflow-y-scroll">
                <vue-pdf-embed
                  class="w-full h-screen overflow-y-scroll rounded-2xl shadow-xl"
                  :source="pdfSource"
                />
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import VuePdfEmbed from 'vue-pdf-embed';
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import PDF from '../assets/sponsorship_packet2023.pdf';

const pdfSource = ref(PDF);

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logo: string;
  link: string;
}

onMounted(() => {
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
    defaults: { ease: 'power3.out' },
  });

  // Animate cards into view with a stagger from top-to-bottom
  tl.to(cards, {
    autoAlpha: 1,
    y: 0,
    stagger: {
      each: 0.1,
      grid: 'auto',
      from: 'random',
      amount: 1,
    },
    // Slight randomness to the start time of each animation
    onStart: () => {
      gsap.set(cards, {
        delay: gsap.utils.random(0, 0.2), // Random delay for each card
      });
    },
  });
});

// Modal
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const sponsors: Sponsor[] = [
  {
    id: 'boeing',
    name: 'Boeing',
    tier: 'Diamond',
    logo: '../assets/sponsors/boeing.jpg?w=700&format=webp&as=src',
    link: 'https://www.boeing.com/',
  },
  {
    id: 'anysys',
    name: 'Ansys',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.ansys.com/',
  },
  {
    id: 'evonik',
    name: 'Evonik',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.evonik.com/en',
  },
  {
    id: 'spartan',
    name: 'Spartan Light Metal Products',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.spartanlmp.com/',
  },
  {
    id: 'washu-student-union',
    name: 'WashU Student Union',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://su.wustl.edu/',
  },
  {
    id: 'solidworks',
    name: 'Solidworks',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.solidworks.com/',
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    tier: 'Diamond',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.atlassian.com/',
  },
  {
    id: 'altium',
    name: 'Altium',
    tier: 'Platinum',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.altium.com/',
  },
  {
    id: 'siemens',
    name: 'Siemens',
    tier: 'Platinum',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.siemens.com/us/en.html',
  },
  {
    id: 'vi-grade',
    name: 'VI-Grade',
    tier: 'Platinum',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.vi-grade.com/en/',
  },
  {
    id: 'gamma-technologies',
    name: 'Gamma Technologies',
    tier: 'Platinum',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.gtisoft.com/',
  },
  {
    id: 'emerson',
    name: 'Emerson',
    tier: 'Gold',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.emerson.com/en-us',
  },
  {
    id: 'mohela',
    name: 'MOHELA',
    tier: 'Gold',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.mohela.com/',
  },
  {
    id: '3dconnexion',
    name: '3DConnexion',
    tier: 'Gold',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.3dconnexion.com/',
  },
  {
    id: 'zoltek',
    name: 'Zoltek',
    tier: 'Gold',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://zoltek.com/',
  },
  {
    id: 'oz-racing',
    name: 'OZ Racing',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.ozracing.com/',
  },
  {
    id: 'hoosier',
    name: 'Hoosier',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.hoosiertire.com/',
  },
  {
    id: 'bp-fab',
    name: 'BP Fab',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.bpfab.com/',
  },
  {
    id: 'texense',
    name: 'Texense',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.texense.com/',
  },
  {
    id: 'rapidharness',
    name: 'RapidHarness',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://rapidharness.com/',
  },
  {
    id: 'fpco',
    name: 'FPCO',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.fpco.com/',
  },
  {
    id: 'zimmeman',
    name: 'Zimmeman',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.zimmermanhonda.com/',
  },
  {
    id: 'skf',
    name: 'SKF',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.skf.com/us',
  },
  {
    id: 'aurora-bearing-company',
    name: 'Aurora Bearing Company',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.aurorabearing.com/',
  },
  {
    id: 'washington-university-in-st-louis-james-mckelvey-school-of-engineering',
    name: 'James McKelvey School of Engineering',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://engineering.wustl.edu/',
  },
  {
    id: 'the-womens-society-of-washington-university',
    name: 'The Women\'s Society of Washington University',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://womensociety.wustl.edu/',
  },
  {
    id: 'archway-anodize',
    name: 'Archway Anodize',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.archwayanodize.com/',
  },
  {
    id: 'gateway-motorsports-park',
    name: 'Gateway Motorsports Park',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.gatewaymsp.com/',
  },
  {
    id: 'kartplex',
    name: 'Kartplex',
    tier: 'Silver',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.gatewaykartplex.com/',
  },
  {
    id: 'perficient',
    name: 'Perficient',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.perficient.com/',
  },
  {
    id: 'porsche-st-louis',
    name: 'Porsche St. Louis',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://porschestlouis.com/',
  },
  {
    id: 'syndicate-performance',
    name: 'Syndicate Performance',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://syndicateperformance.com/',
  },
  {
    id: 'wegner-motorsports',
    name: 'Wegner Motorsports',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://wegnerautomotive.com/',
  },
  {
    id: 'odum-performance',
    name: 'Odum Performance',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://odumperformance.com/',
  },
  {
    id: 'performance-electronics',
    name: 'Performance Electronics',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://pe-ltd.com/',
  },
  {
    id: 'pingel',
    name: 'Pingel',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://pingelonline.com/',
  },
  {
    id: 'tms-titanium',
    name: 'TMS Titanium',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://tmstitanium.com/',
  },
  {
    id: 'lmi-aerospace',
    name: 'Lmi Aerospace',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.lmiaerospace.com/',
  },
  {
    id: 'calspan',
    name: 'Calspan',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.calspan.com/',
  },
  {
    id: 'optimumg',
    name: 'OptimumG',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.optimumg.com/',
  },
  {
    id: 'denco-powder-coating',
    name: 'Denco Powder Coating',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://dencopowdercoating.com/',
  },
  {
    id: 'atl-aero-tec-laboratories',
    name: 'ATL Aero Tec Laboratories',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://atlinc.com/',
  },
  {
    id: 'msc-software',
    name: 'MSC Software',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.mscsoftware.com/',
  },
  {
    id: 'sauer-st-louis',
    name: 'Sauer ET St. Louis',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.sauercompressors.com/',
  },
  {
    id: 'clearwater-composites',
    name: 'Clearwater Composites, LLC',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://clearwatercomposites.com/',
  },
  {
    id: 'micro-measurements',
    name: 'Micro Measurements',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.micro-measurements.com/',
  },
  {
    id: 'busch',
    name: 'Busch',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.busch.com/',
  },
  {
    id: 'fibre-glast',
    name: 'Fibre Glast',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://www.fibreglast.com/',
  },
  {
    id: 'composite-envisions',
    name: 'Composite Envisions',
    tier: 'Bronze',
    logo: 'https://via.placeholder.com/300x150',
    link: 'https://compositeenvisions.com/',
  },
];
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #d63030, #942020);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
