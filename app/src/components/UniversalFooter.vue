<template>
  <!-- Footer -->
  <footer
    class="bg-stone-900 border-t border-stone-600"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto px-6 py-8 sm:py-12 lg:px-8 lg:py-16">
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
import RacingIcon from '@/components/icons/RacingIcon.vue'
</script>
