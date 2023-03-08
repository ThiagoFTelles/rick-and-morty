<template>
  <q-page class="row items-center justify-evenly">
    <span v-if="character">
      <img :alt="character.name" :src="character.image" />
      <p>name: {{ character.name }}</p>
      <p>status: {{ character.status }}</p>
      <p>species: {{ character.species }}</p>
      <p>gender: {{ character.gender }}</p>
      <h3>Episodes</h3>
      <ul>
        <li v-for="episode in character.episode" :key="episode.id">
          {{ episode.id }} - {{ episode.name }}
        </li>
      </ul>
    </span>
  </q-page>
</template>

<script setup lang="ts" context="module">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { ICharacter } from '../components/models'
import { GET_CHARACTER_BY_ID } from '../apollo/queries'

const route = useRoute()
const { id } = route.params

const character = ref<ICharacter>()

const { result } = useQuery(GET_CHARACTER_BY_ID, { id })
watch(result, newValue => {
  character.value = newValue.character
})
</script>
