<template>
  <!-- Main container -->
  <div
    class="relative min-h-screen h-fit isolate overflow-hidden flex justify-center items-center bg-gray-900 text-white">
    <div class="relative min-h-full max-w-7xl w-full p-8">
      <!-- Section title and view packet link -->
      <div class="flex flex-col items-center space-y-6">
        <h2 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl" data-title>Meet Our Sponsors
        </h2>
        <a class="underline hover:text-gray-300" @click="openModal" :href="'#'">View Our Sponsorship Packet</a>
      </div>

      <!-- Sponsor card grid -->
      <div
        class="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
      >
        <SponsorCard v-for="sponsor in sponsors" :key="sponsor.id" :sponsor="sponsor" />
      </div>

      <!-- Modal for viewing sponsorship packet -->
      <SponsorshipModal :isModalOpen="isModalOpen" @closeModal="closeModal" :source="pdfSource" />
    </div>
  </div></template>

<script async setup lang="ts">
import {
  onMounted, ref, type Ref,
} from 'vue';
import { gsap } from 'gsap';
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
const sponsors: Ref<Sponsor[]> = ref([]);

// Methods for modal state management
const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

sponsors.value = [
  {
    id: 'boeing',
    name: 'Boeing',
    tier: 'Diamond',
    link: 'https://www.boeing.com/',
  },
  {
    id: 'anysys',
    name: 'Ansys',
    tier: 'Diamond',

    link: 'https://www.ansys.com/',
  },
  {
    id: 'evonik',
    name: 'Evonik',
    tier: 'Diamond',

    link: 'https://www.evonik.com/en',
  },
  {
    id: 'spartan',
    name: 'Spartan Light Metal Products',
    tier: 'Diamond',

    link: 'https://www.spartanlmp.com/',
  },
  {
    id: 'washu-student-union',
    name: 'WashU Student Union',
    tier: 'Diamond',

    link: 'https://su.wustl.edu/',
  },
  {
    id: 'solidworks',
    name: 'Solidworks',
    tier: 'Diamond',

    link: 'https://www.solidworks.com/',
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    tier: 'Diamond',

    link: 'https://www.atlassian.com/',
  },
  {
    id: 'altium',
    name: 'Altium',
    tier: 'Platinum',

    link: 'https://www.altium.com/',
  },
  {
    id: 'siemens',
    name: 'Siemens',
    tier: 'Platinum',

    link: 'https://www.siemens.com/us/en.html',
  },
  {
    id: 'vi-grade',
    name: 'VI-Grade',
    tier: 'Platinum',

    link: 'https://www.vi-grade.com/en/',
  },
  {
    id: 'gamma-technologies',
    name: 'Gamma Technologies',
    tier: 'Platinum',

    link: 'https://www.gtisoft.com/',
  },
  {
    id: 'emerson',
    name: 'Emerson',
    tier: 'Gold',

    link: 'https://www.emerson.com/en-us',
  },
  {
    id: 'mohela',
    name: 'MOHELA',
    tier: 'Gold',

    link: 'https://www.mohela.com/',
  },
  {
    id: '3dconnexion',
    name: '3DConnexion',
    tier: 'Gold',

    link: 'https://www.3dconnexion.com/',
  },
  {
    id: 'zoltek',
    name: 'Zoltek',
    tier: 'Gold',

    link: 'https://zoltek.com/',
  },
  {
    id: 'oz-racing',
    name: 'OZ Racing',
    tier: 'Silver',

    link: 'https://www.ozracing.com/',
  },
  {
    id: 'hoosier',
    name: 'Hoosier',
    tier: 'Silver',

    link: 'https://www.hoosiertire.com/',
  },
  {
    id: 'bp-fab',
    name: 'BP Fab',
    tier: 'Silver',

    link: 'https://www.bpfab.com/',
  },
  {
    id: 'texense',
    name: 'Texense',
    tier: 'Silver',

    link: 'https://www.texense.com/',
  },
  {
    id: 'rapidharness',
    name: 'RapidHarness',
    tier: 'Silver',

    link: 'https://rapidharness.com/',
  },
  {
    id: 'fpco',
    name: 'FPCO',
    tier: 'Silver',

    link: 'https://www.fpco.com/',
  },
  {
    id: 'zimmeman',
    name: 'Zimmeman',
    tier: 'Silver',

    link: 'https://www.zimmermanhonda.com/',
  },
  {
    id: 'skf',
    name: 'SKF',
    tier: 'Silver',

    link: 'https://www.skf.com/us',
  },
  {
    id: 'aurora-bearing-company',
    name: 'Aurora Bearing Company',
    tier: 'Silver',

    link: 'https://www.aurorabearing.com/',
  },
  {
    id: 'washington-university-in-st-louis-james-mckelvey-school-of-engineering',
    name: 'James McKelvey School of Engineering',
    tier: 'Silver',

    link: 'https://engineering.wustl.edu/',
  },
  {
    id: 'the-womens-society-of-washington-university',
    name: 'The Women\'s Society of Washington University',
    tier: 'Silver',

    link: 'https://womensociety.wustl.edu/',
  },
  {
    id: 'archway-anodize',
    name: 'Archway Anodize',
    tier: 'Silver',

    link: 'https://www.archwayanodize.com/',
  },
  {
    id: 'gateway-motorsports-park',
    name: 'Gateway Motorsports Park',
    tier: 'Silver',

    link: 'https://www.gatewaymsp.com/',
  },
  {
    id: 'kartplex',
    name: 'Kartplex',
    tier: 'Silver',

    link: 'https://www.gatewaykartplex.com/',
  },
  {
    id: 'perficient',
    name: 'Perficient',
    tier: 'Bronze',

    link: 'https://www.perficient.com/',
  },
  {
    id: 'porsche-st-louis',
    name: 'Porsche St. Louis',
    tier: 'Bronze',

    link: 'https://porschestlouis.com/',
  },
  {
    id: 'syndicate-performance',
    name: 'Syndicate Performance',
    tier: 'Bronze',

    link: 'https://syndicateperformance.com/',
  },
  {
    id: 'wegner-motorsports',
    name: 'Wegner Motorsports',
    tier: 'Bronze',

    link: 'https://wegnerautomotive.com/',
  },
  {
    id: 'odum-performance',
    name: 'Odum Performance',
    tier: 'Bronze',

    link: 'https://odumperformance.com/',
  },
  {
    id: 'performance-electronics',
    name: 'Performance Electronics',
    tier: 'Bronze',

    link: 'https://pe-ltd.com/',
  },
  {
    id: 'pingel',
    name: 'Pingel',
    tier: 'Bronze',

    link: 'https://pingelonline.com/',
  },
  {
    id: 'tms-titanium',
    name: 'TMS Titanium',
    tier: 'Bronze',

    link: 'https://tmstitanium.com/',
  },
  {
    id: 'lmi-aerospace',
    name: 'Lmi Aerospace',
    tier: 'Bronze',

    link: 'https://www.lmiaerospace.com/',
  },
  {
    id: 'calspan',
    name: 'Calspan',
    tier: 'Bronze',

    link: 'https://www.calspan.com/',
  },
  {
    id: 'optimumg',
    name: 'OptimumG',
    tier: 'Bronze',

    link: 'https://www.optimumg.com/',
  },
  {
    id: 'denco-powder-coating',
    name: 'Denco Powder Coating',
    tier: 'Bronze',

    link: 'https://dencopowdercoating.com/',
  },
  {
    id: 'atl-aero-tec-laboratories',
    name: 'ATL Aero Tec Laboratories',
    tier: 'Bronze',

    link: 'https://atlinc.com/',
  },
  {
    id: 'msc-software',
    name: 'MSC Software',
    tier: 'Bronze',

    link: 'https://www.mscsoftware.com/',
  },
  {
    id: 'sauer-st-louis',
    name: 'Sauer ET St. Louis',
    tier: 'Bronze',

    link: 'https://www.sauercompressors.com/',
  },
  {
    id: 'clearwater-composites',
    name: 'Clearwater Composites, LLC',
    tier: 'Bronze',

    link: 'https://clearwatercomposites.com/',
  },
  {
    id: 'micro-measurements',
    name: 'Micro Measurements',
    tier: 'Bronze',

    link: 'https://www.micro-measurements.com/',
  },
  {
    id: 'busch',
    name: 'Busch',
    tier: 'Bronze',

    link: 'https://www.busch.com/',
  },
  {
    id: 'fibre-glast',
    name: 'Fibre Glast',
    tier: 'Bronze',

    link: 'https://www.fibreglast.com/',
  },
  {
    id: 'composite-envisions',
    name: 'Composite Envisions',
    tier: 'Bronze',

    link: 'https://compositeenvisions.com/',
  },
];

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
    defaults: {
      duration: 0.5,
      ease: 'bounce.out',
    },
  });

  tl.fromTo(cards, {
    y: 50,
    autoAlpha: 0,
  }, {
    autoAlpha: 1,
    y: 0,
    stagger: {
      each: 0.05,
      grid: 'auto',
      from: 'random',
      amount: 0.5,
    },
    // Slight randomness to the start time of each animation
    onStart: () => {
      gsap.set(cards, {
        delay: gsap.utils.random(0, 0.1), // Random delay for each card
      });
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

.bg-diamond { /* Diamond background */
  @apply bg-gradient-to-r from-red-600 to-red-800;
}

.ring-diamond { /* Diamond ring */
  @apply ring-4 ring-red-600;
}

.badge-diamond { /* Diamond badge */
  @apply opacity-100 text-blue-200;
}

.text-diamond { /* Diamond text */
  @apply text-stone-100;
}

.bg-platinum { /* Platinum background */
  @apply bg-gradient-to-r from-orange-500 to-orange-700;
}

.ring-platinum { /* Platinum ring */
  @apply ring-4 ring-orange-600;
}

.badge-platinum { /* Platinum badge */
  @apply opacity-100 text-zinc-200;
}

.text-platinum { /* Platinum text */
  @apply text-stone-100;
}

.bg-gold { /* Gold background */
  @apply bg-gradient-to-r from-yellow-500 to-yellow-700;
}

.ring-gold { /* Gold ring */
  @apply ring-4 ring-yellow-500;
}

.badge-gold { /* Gold badge */
  @apply opacity-100 text-yellow-200;
}

.text-gold { /* Gold text */
  @apply text-stone-100;
}

.bg-silver { /* Silver background */
  @apply bg-gradient-to-r from-gray-400 to-gray-600;
}

.ring-silver { /* Silver ring */
  @apply ring-4 ring-gray-500;
}

.badge-silver { /* Silver badge */
  @apply opacity-100 text-gray-200;
}

.text-silver { /* Silver text */
  @apply text-stone-100;
}

.bg-bronze { /* Bronze background */
  @apply bg-gradient-to-r from-gray-600 to-gray-800;
}

.ring-bronze { /* Bronze ring */
  @apply ring-4 ring-gray-700;
}

.badge-bronze { /* Bronze badge */
  @apply opacity-100 text-gray-200;
}

.text-bronze { /* Bronze text */
  @apply text-stone-100;
}
</style>
