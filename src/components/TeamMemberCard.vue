<template>
  <div
    class="team-member-card relative rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl bg-stone-800 group"
    data-aos="zoom-in"
    @mouseenter="animateCard"
    @mouseleave="resetCardAnimation"
    @focusin="animateCard"
    @focusout="resetCardAnimation"
  >
    <!-- Member image -->
    <div class="h-auto w-full aspect-w-1 aspect-h-1 overflow-hidden">
      <img
        :src="member.photo_path"
        :alt="member.name + ' Profile Picture'"
        class="object-cover h-full w-full"
      >
    </div>

    <!-- Member Info -->
    <div class="p-4 text-center">
      <h3 class="text-xl font-bold text-stone-100 mb-2">
        {{ member.name }}
      </h3>
      <p class="text-md text-stone-300">
        {{ member.role }}
      </p>
      <a
        :href="'mailto:' + member.email"
        class="text-sm text-stone-200 hover:text-stone-100 transition duration-200 transform hover:scale-110"
      >
        <FontAwesomeIcon :icon="['fas', 'envelope']" />

        <span class="sr-only">Email {{ member.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import AOS from "aos";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { type TeamMember } from "@/types/TeamMembers";

// Define the member prop structure according to your team member model
defineProps({
    member: {
        type: Object as () => TeamMember,
        required: true,
    },
});

onMounted(() => {
    AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
    });
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

<style scoped>
.team-member-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
