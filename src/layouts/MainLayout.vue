<template>
  <q-layout view="hHh LpR lFf" >
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/icon.png" class="icon" />
          </q-avatar>
          Squad Admin
        </q-toolbar-title>
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
            <q-icon name="map" />
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
        <q-item to="/leader" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="explore" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Comandos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/rcon" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="people" />
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
            <q-icon name="warning" />
          </q-item-section>
          <q-item-section>
            <q-item-label>SquadLanes</q-item-label>
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
      <router-view class="bg-page"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'MainLayout',
  setup() {
    const miniState = ref(false);

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
      },
    };
  },
  methods: {},
};
</script>
