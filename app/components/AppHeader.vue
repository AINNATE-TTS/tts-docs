<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<NavItem[]>("navigation", []);

const { header } = useAppConfig();
const staticLogo = ref(false);
onMounted(() => {
  if (process.client) {
    setTimeout(() => {
      staticLogo.value = !staticLogo.value;
    }, 3000);
  }
});
</script>

<template>
  <UHeader @mouseenter="staticLogo = false" @mouseleave="staticLogo = true">
    <template #logo>
      <template v-if="header?.logo?.dark || header?.logo?.light">
        <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      </template>
      <template v-else>
        <div class="flex flex-row items-center gap-2">
          <BaseSoundWave
            :static="staticLogo"
            class="cursor-pointer"
            @click="navigateTo('/docs/api-reference/getting-started')"
          />
          <span class="block md:hidden">TTSOpenAI</span>
          <span class="hidden md:block">Text To Speech OpenAI</span>
          <UBadge label="Docs" variant="subtle" />
        </div>
      </template>
    </template>

    <template v-if="header?.search" #center>
      <UContentSearchButton class="hidden lg:flex" />
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" :label="null" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
