<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-item
      class="q-pa-none"
      v-for="character in characters"
      :key="character.id"
      :to="`/character/${character.id}`"
    >
      <CharacterCard :character="character" />
    </q-item>
  </div>
</template>

<script setup lang="ts" context="module">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ICharacter } from '../components/models'
import { GET_ALL_CHARACTERS } from '../apollo/queries'
import CharacterCard from '../components/CharacterCard.vue'

const characters = ref<ICharacter[]>([])
const page = ref<number>(1)
const { result } = useQuery(GET_ALL_CHARACTERS, { page })
watch(result, newValue => {
  characters.value = newValue.characters.results
})
</script>
