<template>
  <div class="relative min-h-screen isolate overflow-hidden flex flex-col items-center bg-gray-900 text-gray-100"
    :style="{ paddingTop: headerHeight + 'px' }">
    <div class="flex flex-col items-center w-full px-8 pb-8 max-w-7xl">

      <!-- Title Section -->
      <div class="p-8 w-full max-w-7xl text-center" data-aos="fade-down" data-aos-duration="1000">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gradient mb-4">
          MEET OUR TEAM
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-300">
          We are a team of passionate students at Washington University in St. Louis.
        </p>
      </div>

      <!-- Team Grid -->
      <div
        class="team-grid mb-16 p-8 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        data-aos="fade-up" data-aos-duration="1000">
        <TeamMemberCard v-for="member in teamMembers" :key="member.id" :member="member" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamMemberCard from '@/components/TeamMemberCard.vue';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// Sample data for team members
const teamMembers: TeamMember[] = [
  // Populate with actual team member data
];

const headerHeight = ref(0);

onMounted(() => {
  AOS.init();
  gsap.registerPlugin(ScrollTrigger);

  // Calculate the header's height if necessary
  const header = document.querySelector('header');
  headerHeight.value = header ? header.offsetHeight : 0;
});
</script>
