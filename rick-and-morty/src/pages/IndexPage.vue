<template>
  <q-page class="flex-center row">
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
        <template v-slot:loading>
          <div class="row flex-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
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
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS } from '../apollo/queries'
import CharacterCard from '../components/Characters/CharacterCard.vue'
import { ICharacter } from '../components/models'

const current = ref<number>(1)
const charactersList = ref<ICharacter[]>([])

const { result, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
  page: current,
})

const fetchCharacters = async (index: any, done: any) => {
  if (result.value.characters.info.next) {
    current.value += 1
    await fetchMore({
      variables: {
        page: current,
      },
    })?.then((e: { data: { characters: { results: number } } }) => {
      if (e.data.characters.results >= 1) {
        result.value = e.data
        done()
      }
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
}
</style>
