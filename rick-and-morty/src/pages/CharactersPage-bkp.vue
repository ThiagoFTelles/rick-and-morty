<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-table
      ref="tableRef"
      grid
      title="Personagens"
      :rows="characters"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      :visible-columns="visibleColumns"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <q-card v-ripple class="my-card cursor-pointer q-hoverable q-ma-md">
          <span class="q-focus-helper"></span>
          <img :alt="props.row.name" :src="props.row.image" />
          <q-card-section>
            <div class="text-h6 name">{{ props.row.name }}</div>
            <div class="text-subtitle2">{{ props.row.gender }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ props.row.status }}
          </q-card-section>
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts" context="module">
import { ref, watch } from 'vue'
import { QTable, QTableColumn, QCard } from 'quasar'
import { useQuery } from '@vue/apollo-composable'
import { ICharacter } from '../components/models'
import { GET_ALL_CHARACTERS } from '../apollo/queries'

const characters = ref<ICharacter[]>([])
const page = ref<number>(1)
const { result } = useQuery(GET_ALL_CHARACTERS, { page })
watch(result, newValue => {
  characters.value = newValue.characters.results
})
const filter = ref('')

const columns: QTableColumn<ICharacter>[] = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    align: 'left',
    field: (row: { name: string }) => row.name,
    format: (val: string) => val,
    sortable: true,
  },
  {
    name: 'image',
    align: 'center',
    label: 'Foto',
    field: 'image',
    format: (val: string) => val,
    sortable: false,
  },
]

/* Remove a coluna 'image' do filtro,
pois se você filtrar por "Rick" ou "Morty"
todos aparecerão por causa do link da imagem.
Ex: https://rickandmortyapi.com/api/character/avatar/4.jpeg */

const visibleColumns: string[] = ['name']
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
