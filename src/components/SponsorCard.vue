<template>
  <!-- In grid -->
  <a
    class="sponsor-card relative h-auto w-full rounded-lg aspect-w-1 aspect-h-1 overflow-hidden shadow-lg transition-transform hover:shadow-2xl bg-stone-400 group"
    :class="tierSizeClass(sponsor.tier)"
    :href="sponsor.link"
    target="_blank"
    rel="noopener noreferrer"
    @mouseenter="animateCard"
    @mouseleave="resetCardAnimation"
    @focusin="animateCard"
    @focusout="resetCardAnimation"
  >
    <br>
    <!-- Sponsor image -->
    <div
      class="w-full flex justify-center items-center overflow-hidden"
    >
      <img
        :src="sponsor.image_path || 'https://placehold.co/600x400'"
        :alt="sponsor.name + ' logo'"
        class="object-center h-auto w-full"
      >
    </div>
    <!-- Sponsor Info -->
    <div class="p-4 pt-6 w-full items-center justify-end">

      <!-- Sponsor Tier Badge -->
      <TierBadge :tier="sponsor.tier" />
    </div>
  </a>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import AOS from "aos";
import { type Sponsor, type SponsorTier } from "@/types/Sponsors";
import TierBadge from "@/components/TierBadge.vue";

// type SponsorTier = 'Diamond' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

defineProps<{ sponsor: Sponsor }>();

const tierSizeClass = (tier: SponsorTier) => {
    switch (tier) {
        // Diamond, platinum, and gold sponsors are large
        // Silver is medium
        // Bronze is small
        case "Diamond":
        case "Platinum":
        case "Gold":
            return "col-span-2 row-span-1";
        case "Silver":
            return "col-span-2 row-span-1";
        case "Bronze":
            return "col-span-2 row-span-1";
        default:
            return "";
    }
};

onMounted(() => {
    gsap.fromTo(
        ".sponsor-card",
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
        },
    );

    AOS.init({
        once: true,
    });

    AOS.refresh();
});

const animateCard = (event: Event) => {
    const card = event.currentTarget as HTMLElement;
    gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power1.out" });
};

const resetCardAnimation = (event: Event) => {
    const card = event.currentTarget as HTMLElement;
    gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
};
</script>

<style>
.sponsor-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
