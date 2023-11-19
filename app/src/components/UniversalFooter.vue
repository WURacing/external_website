<template>
  <!-- Footer -->
  <footer
    class="bg-stone-900 border-t border-stone-600"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto py-10 sm:py-16 lg:py-20 px-8 sm:px-12 lg:px-16">
      <!--
        Logo
      -->
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <RacingIcon />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import RacingIcon from '@/components/icons/RacingIcon.vue';
</script>
