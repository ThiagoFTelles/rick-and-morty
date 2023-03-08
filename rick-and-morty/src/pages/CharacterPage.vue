<template>
  <q-page class="row items-center justify-evenly text-white">
    <span v-if="character">
      <h2 class="text-weight-bolder text-center">{{ character.name }}</h2>
      <img :alt="character.name" :src="character.image" />
      <div><b>Status: </b> {{ character.status }}</div>
      <div><b>Spécie: </b> {{ character.species }}</div>
      <div><b>Gênero: </b> {{ character.gender }}</div>
      <h3 class="q-my-md text-center"><b>Episódios</b></h3>
      <ul>
        <li
          v-for="episode in character.episode"
          :key="episode.id"
          class="text-weight-bold"
        >
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

<style lang="scss" scoped>
img {
  border-radius: 10px;
}
ul {
  padding: 0;
  margin: 0;
  max-width: 700px;
  position: relative;
  margin-bottom: 15px;
}

ul::before {
  content: '';
  width: 0.5rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 8%;
  background: peachpuff;
  z-index: -1;
}

li {
  padding: 0.5rem 1.5rem 1rem;
  border-radius: 1.5rem;
  background: peachpuff;
  color: tomato;
}

li + li {
  margin-top: 1rem;
}

::marker {
  font-weight: 600;
  color: tomato;
  font-size: 1.5rem;
}
</style>
