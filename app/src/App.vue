<template>
  <div class="bg-stone-900 text-gray-100 flex flex-col min-h-full h-screen">
    <!-- Universal Header -->
    <UniversalHeader />
    
    <!-- Main Content -->
    <main class="w-full flex-grow min-h-screen">
      <router-view />
    </main>
    
    <!-- Universal Footer -->
    <UniversalFooter />
  </div>
</template>

<script setup lang="ts">
import UniversalHeader from '@/components/UniversalHeader.vue';
import UniversalFooter from '@/components/UniversalFooter.vue';
import { onBeforeMount } from 'vue';
</script>