<template>
  <q-page class="flex-center row">
    <div class="row">
      <div class="column">
        <h4 class="text-white">Resultados de pesqusia para "{{ name }}"</h4>
      </div>
    </div>
    <div class="q-pa-sm text-center">
      <q-dialog>
        <q-card class="text-center bg-black text-white">
          <q-card-section>
            <div class="text-h6">Erro: {{ error?.message }}</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div
      class="q-pa-md row items-start justify-center"
      :key="charactersList.length"
    >
      <q-infinite-scroll
        @load="fetchCharacters"
        :initial-index="1"
        class="flex q-gutter-xl infinite-scroll"
      >
        <q-item
          class="flex flex-center col-md-3 col-sm-4 col-12 q-my-md q-pa-md character"
          v-for="(item, key) in charactersList"
          :key="key"
          :to="`/character/${item.id}`"
        >
          <CharacterCard :character="item" />
        </q-item>
      </q-infinite-scroll>
    </div>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
      :duration="800"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script setup lang="ts" context="module">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_CHARACTERS_BY_NAME } from '../apollo/queries'
import CharacterCard from '../components/Characters/CharacterCard.vue'
import { ICharacter } from '../components/models'

const current = ref<number>(1)

const route = useRoute()
const { name } = route.params
const searchName = ref(name)

const { result, error, refetch } = useQuery(GET_CHARACTERS_BY_NAME, {
  page: current.value,
  name: searchName.value,
})

const charactersList = ref<ICharacter[]>([])

watch(
  () => route.params.name,
  newVal => {
    charactersList.value = []
    searchName.value = newVal
    current.value = 1
    refetch({
      page: current.value,
      name: newVal,
    })
  },
)

// const setPage = async (val: any) => {
//   if (fetchMore) {
//     fetchMore({
//       variables: {
//         page: val,
//       },
//     })?.then((e: { data: { characters: { results: number } } }) => {
//       if (e.data.characters.results >= 1) {
//         console.log(e.data)
//         result.value = e.data
//       }
//     })
//   }
// }

const fetchCharacters = async (index: any, done: any) => {
  if (result.value.characters.info.next) {
    current.value += 1
    refetch({
      page: current.value,
      name: searchName.value,
    })
  } else {
    done()
  }
}

watch(result, newValue => {
  if (newValue) {
    charactersList.value.push(...newValue.characters.results)
  }
})
</script>

<style lang="scss">
.infinite-scroll {
  place-content: center;
  .invisible {
    display: none;
  }
}
</style>
