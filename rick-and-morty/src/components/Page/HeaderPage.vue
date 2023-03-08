<template>
  <q-header reveal elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <div class="col-1 flex justify-center items-center">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </div>

      <div class="col-9 flex justify-center items-center">
        <router-link to="/">
          <img
            alt="Logo Rick and Morty"
            class="logo-img q-pa-md"
            src="../../assets/images/logorm.png"
          />
        </router-link>
      </div>
      <div class="col-2 flex justify-center items-center">
        <q-input
          label="Pesquisar Personagem"
          dense
          debounce="500"
          v-model="name"
          placeholder="digite um nome"
          clearable
          dark
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer v-model="leftDrawerOpen" bordered class="bg-primary text-white">
    <q-list>
      <q-item-label class="text-white" header> Links </q-item-label>
      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import { ILink } from '../../components/models'

const linksList: ILink[] = [
  {
    title: 'Linkedin',
    caption: '@thiagoftelles',
    icon: 'link',
    link: 'https://www.linkedin.com/in/thiagoftelles/',
  },
  {
    title: 'Github',
    caption: '@ThiagoFTelles',
    icon: 'code',
    link: 'https://github.com/ThiagoFTelles/rick-and-morty',
  },
]
const essentialLinks = linksList

const router = useRouter()

const name = ref<string>('')
const leftDrawerOpen = ref<boolean>(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(name, newValue => {
  if (newValue) {
    router.push({ path: `/characters/${newValue}` })
  }
})
</script>

<style lang="scss">
.logo-img {
  max-width: 170px;
}
</style>
