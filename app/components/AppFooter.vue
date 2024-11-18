<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <UFooter>
    <template #left>
      {{ footer.credits }}
    </template>
    <template #center>
      <div class="text-xs text-gray-500 text-center">
        The website is jointly operated by A2ZAI LTD No:16078579 Registered address at 83 Green Lanes, London, England, N13 4BS
      </div>
    </template>
    <template #right>
      <UColorModeButton v-if="footer?.colorMode" />

      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
