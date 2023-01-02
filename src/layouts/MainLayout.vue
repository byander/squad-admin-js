<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-dark text-white q-electron-drag">
      <!-- <q-bar class="q-electron-drag">
      </q-bar> -->
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/icon.png" class="icon" />
          </q-avatar>
          Squad Admin
        </q-toolbar-title>
        <q-btn dense flat icon="minimize" @click="minimize"></q-btn>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"></q-btn>
        <q-btn dense flat icon="close" @click="closeApp"></q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      v-model="drawer"
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      side="left"
      bordered
      class="bg-drawer text-white"
      :width="200"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="collections_bookmark" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Regras</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/maps" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Votação</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/layers" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="layers" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Layers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/commands" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="explore" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Comandos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/rcon" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rcon</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/messages" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Avisos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/lanes" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="map" />
          </q-item-section>
          <q-item-section>
            <q-item-label>SquadLanes</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          active-class="q-item-no-link-highlighting"
          class="absolute-bottom"
        >
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption">
              Dica: Pressione Alt+V para ativar sobreposição no jogo
            </q-item-label>
            <q-slider
              color="blue"
              :min="0.5"
              :max="1"
              :step="0.1"
              v-model="opacity"
              @change="setOpacity"
              label
            ></q-slider>
          </q-item-section>
        </q-item>
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="blue"
          icon="chevron_left"
          @click="miniState = true"
        ></q-btn>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view class="bg-page" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MainLayout',

  setup() {
    const miniState = ref(false);
    const opacity = ref(0.7);

    function minimize() {
      if (process.env.MODE === 'electron') {
        window.api.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === 'electron') {
        window.api.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === 'electron') {
        window.api.close();
      }
    }

    return {
      drawer: ref(false),
      opacity,
      miniState,
      minimize,
      toggleMaximize,
      closeApp,

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
      },
    };
  },
  methods: {
    setOpacity() {
      if (process.env.MODE === 'electron') {
        window.api.opacity(this.opacity);
      }
    },
  },
};
</script>
