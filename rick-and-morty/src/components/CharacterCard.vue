<template>
  <q-card v-ripple class="my-card cursor-pointer q-hoverable">
    <span class="q-focus-helper"></span>
    <img :alt="character.name" :src="character.image" />
    <q-card-section>
      <div class="text-h6 name">{{ character.name }}</div>
      <div class="text-subtitle2">{{ character.gender }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ character.status }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ICharacter } from './models'

defineProps<{
  character: ICharacter
}>()
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}
</style>
