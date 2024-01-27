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
          MEET OUR TEAM
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-stone-300">
          Meet the people who make our success possible.
        </p>
      </div>

      <!-- Team member card grid -->
      <div class="mt-8 w-full max-w-7xl">
        <div
          v-for="category in teamMemberCategories"
          :key="category"
          class="mt-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2
            class="text-2xl font-bold mb-4"
            v-if="
              teamMembersData.filter((member) => member.category === category)
                .length > 0
            "
          >
            {{ category }}
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <TeamMemberCard
              v-for="member in teamMembersData.filter(
                (member) => member.category === category,
              )"
              :key="member.id"
              :member="member"
              class="team-member-card transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script async setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import TeamMemberCard from '../components/TeamMemberCard.vue';
import {
  type TeamMember,
  type TeamMemberCategory,
} from '../types/TeamMembers.ts';
import makeBackendAPIRequest from '../services/axios.ts';

const teamMembersData: Ref<TeamMember[]> = ref([]);
const teamMemberCategories: TeamMemberCategory[] = [
  'Executive Board',
  'System Leads',
  'Advisors',
  'Alumni',
  'Members',
];

const fetchTeamMembers = () => {
  makeBackendAPIRequest<TeamMember[]>('/team-members')
    .then((response) => {
      // Map the response data to the teamMembersData ref
      response.data.map((member) => {
        teamMembersData.value.push({
          id: member.id,
          name: member.name,
          role: member.role,
          email: member.email,
          photoPath: import.meta.env.VITE_APP_BACKEND_URL + member.photo_path,
          category: member.category,
          createdAt: new Date(member.created_at),
          updatedAt: new Date(member.updated_at),
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const headerHeight = ref(0); // Ref to store the height of the UniversalHeader

onMounted(() => {
  // Calculate the height of the UniversalHeader
  const header = document.querySelector('header'); // Assuming your UniversalHeader has a <header> tag or you need to adjust the selector based on your actual header element
  if (header) {
    headerHeight.value = header.offsetHeight; // Get the outer height of the header
  }
  fetchTeamMembers();
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
