<template>
  <q-page padding>
    <h6 class="doc-heading doc-h2 text-grey-3">Avisos gerais no BroadCast</h6>
    <div class="q-gutter-sm col-12">
      <q-input
        outlined
        dense
        dark
        color="grey-3"
        label="Comando"
        v-model="command"
        type="textarea"
        rows="3"
      >
      </q-input>

      <!-- <div class="row">
        <div class="col-3">
          <q-btn
            color="blue"
            label="Nova mensagem"
            v-on:click="newItem"
          ></q-btn>
        </div>
      </div> -->
    </div>

    <q-dialog v-model="messageDialog">
      <q-card dark style="max-width: 600px; width: 600px; height: 300px">
        <q-card-section>
          <div class="text-h6">{{ messageType }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="message"
            outlined
            dense
            dark
            type="textarea"
            color="grey-3"
            label="Mensagem"
          >
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="blue" v-close-popup></q-btn>
          <q-btn
            flat
            label="OK"
            color="blue"
            @click="saveMessage"
            v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-pt-md">
      <q-table
        class="my-sticky-header-column-table table-height"
        dense
        color="text-grey-3"
        card-class="bg-drawer text-grey-4"
        :rows="data"
        :columns="columns"
        row-key="message"
        :rows-per-page-options="[0]"
        :filter="filter"
        :filter-method="customFilter"
        @row-click="onRowClick"
        wrap-cells
        v-model:selected="selected"
      >
        <template v-slot:top>
          <div style="width: 100%" class="row">
            <div class="col-12">
              <q-input
                dense
                dark
                label-color="grey-3"
                label="Pesquisar"
                v-model="search"
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click="clearField"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </template>
        <!-- <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="blue" icon="edit" @click="editItem(props)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn color="red" icon="delete" @click="deleteItem(props)">
              <q-tooltip>Deletar</q-tooltip>
            </q-btn>
          </q-td>
        </template> -->
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { copyToClipboard, Notify } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'MessagesPage',

  setup() {
    const command = ref('');
    const message = ref('');
    const selected = ref([]);
    const search = ref('');
    const data = ref([]);
    const messageDialog = ref(false);
    const messageType = ref('');

    return {
      command,
      message,
      selected,
      search,
      data,
      messageDialog,
      messageType: 'Nova mensagem',
      columns: [
        {
          name: 'message',
          required: true,
          label: 'Mensagem',
          align: 'left',
          field: (row) => row.mensagem,
          format: (val) => `${val}`,
          sortable: false,
          style: 'max-width: 600px',
        },
        {
          align: 'left',
          name: 'actions',
          label: 'Ações',
        },
      ],
    };
  },

  computed: {
    filter() {
      return {
        search: this.search,
      };
    },
  },

  mounted() {
    this.readData();
  },

  methods: {
    readData() {
      return window.api.getMessages().then((response: never[]) => {
        this.data = response;
      });
    },

    clearField() {
      this.search = '';
    },

    onRowClick(evt, row) {
      if (evt.target.nodeName === 'TD') {
        this.command = `adminbroadcast ${row.mensagem}`;
        copyToClipboard(this.command);
        Notify.create({
          type: 'positive',
          timeout: 1000,
          progress: true,
          message: 'Copiado para a área de transferência',
          actions: [{ icon: 'close', color: 'white' }],
        });
      }
    },

    customFilter(rows, terms) {
      this.lowerSearch = terms.search ? terms.search.toLowerCase() : '';

      const filteredRows = rows.filter((row, i) => {
        let ans = false;
        let s1 = true;
        if (this.lowerSearch != '') {
          s1 = false;
          let s1_values = Object.values(row);
          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());

          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(this.lowerSearch)) {
              s1 = true;
              break;
            }
          }
        }
        ans = false;
        if (s1) {
          ans = true;
        }
        return ans;
      });

      return filteredRows;
    },

    newItem() {
      this.messageType = 'Nova mensagem';
      this.message = '';
      this.messageDialog = true;
    },

    saveMessage() {
      window.api.insertData('avisos', this.message);
      this.readData();
    },

    editItem(row) {
      this.messageType = 'Editar mensagem';
      this.messageDialog = true;
      this.message = row.row.mensagem;
    },

    deleteItem(row) {
      // Ignore a header row and index start 0
      let rowNumber = row.rowIndex + 2;
      console.log(rowNumber);
      window.api.deleteData('avisos', rowNumber);
      this.readData();
    },
  },
};
</script>

<style>
.icon {
  border-radius: 0 !important;
  height: 80% !important;
  width: 80% !important;
}
textarea {
  resize: none !important;
}

.table-height {
  height: calc(100vh - 300px) !important;
}
</style>
