<template>
  <!-- Footer -->
  <footer
    class="bg-stone-900 border-t-4 border-stone-800"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto py-4 sm:py-8 lg:py-12 px-8 sm:px-12 lg:px-16" />

    <!--
      Bottom
    -->
    <div class="bg-stone-800">
      <div class="mx-auto py-4 px-8 sm:px-12 lg:px-16">
        <div class="flex justify-center space-x-6">
          <!--
            Legal
          -->
          <div class="flex items-center text-sm text-stone-300">
            <span>&copy; {{ new Date().getFullYear() }}  WashU Racing - All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import RacingIcon from '@/components/icons/RacingIcon.vue';
</script>
