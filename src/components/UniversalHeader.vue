<template>
  <!--
    Header
  -->
  <header class="absolute inset-x-0 top-0 z-50">
    <!--
      Desktop Header
    -->
    <nav
      class="flex items-center justify-between p-6 px-8 sm:px-12 lg:px-16"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a
          href="/"
          class="-m-1.5 p-1.5"
        >
          <span class="sr-only"> WashU Racing </span>
          <RacingIcon />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-400"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="h-6 w-6 text-stone-100"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink
          to="/"
          class="text-sm font-semibold leading-6 text-stone-100 hover:text-red-500"
        >
          Home
        </RouterLink>
        <Popover class="relative">
          <PopoverButton
            class="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-stone-100 hover:text-red-500 rounded-md focus-visible:outline-0 focus-visible:ring-0"
          >
            <span>Learn More</span>
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="h-2 w-2 text-stone-100"
              aria-hidden="true"
            />
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel
              class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4"
            >
              <div
                class="w-56 shrink rounded-xl bg-stone-100 p-4 text-sm font-semibold leading-6 text-stone-900 shadow-lg ring-1 ring-stone-900/5"
              >
                <RouterLink
                  v-for="item in isDropdown(true).value"
                  :key="item.name"
                  :to="item.to"
                  class="block p-2 hover:text-red-500"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <RouterLink
          v-for="item in isDropdown(false).value"
          :key="item.name"
          :to="item.to"
          class="text-sm font-semibold leading-6 text-stone-100 hover:text-red-500"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </nav>

    <!--
      Mobile menu, show/hide based on mobile menu state.
    -->
    <Dialog
      as="div"
      class="lg:hidden"
      :open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    >
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-stone-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-stone-900/10"
      >
        <div class="flex items-center justify-between">
          <a
            href="#"
            class="-m-1.5 p-1.5"
          >
            <span class="sr-only"> WashU Racing </span>
            <RacingIcon />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-stone-400"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <font-awesome-icon
              :icon="['fas', 'times']"
              class="h-6 w-6 text-stone-100"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-stone-500/100">
            <div class="space-y-2 py-6">
              <RouterLink
                to="/"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-stone-100 hover:bg-stone-50"
              >
                Home
              </RouterLink>
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 bg-stone-100 hover:bg-stone-50"
              >
                {{ item.name }}
              </RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverPanel,
} from "@headlessui/vue";
import RacingIcon from "@/components/icons/RacingIcon.vue";

const mobileMenuOpen = ref(false);

const navigation = [
    {
        name: "Gallery",
        to: "/gallery",
        isDropdown: true,
    },
    {
        name: "History",
        to: "/history",
        isDropdown: true,
    },
    {
        name: "Team",
        to: "/team",
        isDropdown: true,
    },
    {
        name: "Sponsors",
        to: "/sponsors",
        isDropdown: false,
    },
];

// eslint-disable-next-line vue/max-len
const isDropdown = (getDropdown: boolean) =>
    computed(() =>
        navigation.filter((item) => item.isDropdown === getDropdown),
    );
</script>
