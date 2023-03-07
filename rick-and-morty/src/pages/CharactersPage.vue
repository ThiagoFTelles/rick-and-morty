<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 350px"
    id="scroll-area-with-virtual-scroll-1"
  >
    <q-virtual-scroll class="scroll" :items="characters" v-slot="{ item }">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-col cols="12" sm="6" md="4" lg="3">
          <q-item
            class="q-pa-none"
            :key="item.id"
            :to="`/character/${item.id}`"
          >
            <CharacterCard :character="item" />
          </q-item>
        </q-col>
      </div>
    </q-virtual-scroll>
  </q-scroll-area>
</template>

<script setup lang="ts" context="module">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ICharacter } from '../components/models'
import { GET_ALL_CHARACTERS } from '../apollo/queries'
import CharacterCard from '../components/Characters/CharacterCard.vue'

const characters = ref<ICharacter[]>([])
const page = ref<number>(1)
const { result } = useQuery(GET_ALL_CHARACTERS, { page })
watch(result, newValue => {
  characters.value = newValue.characters.results
})

const thumbStyle = {
  right: '5px',
  borderRadius: '8px',
  backgroundColor: '#027be3',
  width: '8px',
  opacity: '0.75',
}

const barStyle = {
  right: '2px',
  borderRadius: '14px',
  backgroundColor: '#027be3',
  width: '14px',
  opacity: '0.2',
  marginTop: '-3px',
  marginBottom: '-3px',
  paddingTop: '3px',
  paddingBottom: '3px',
}
// const charDummy: ICharacter = {
//   gender: 'Male',
//   id: '1',
//   image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
//   name: 'Rick Sanchez',
//   status: 'Alive',
// }
</script>
