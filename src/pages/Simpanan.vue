<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Simpanan" icon="business_center" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-md-12 col-xs-12">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            :pagination="pagination"
          >
            <template v-slot:top>
              <div class="col">
                <div class="text-weight-bold">SIMPANAN</div>
                <div>Daftar semua simpanan pada saat ini</div>
              </div>

              <q-space />

              <q-btn
                @click="openDialog(false, null)"
                flat
                icon="library_add"
                text-color="blue-7"
              >
                <q-tooltip> Tambah Data </q-tooltip>
              </q-btn>

              <q-btn
                flat
                unelevated
                icon="document_scanner"
                text-color="blue-7"
                @click="exportToCSV()"
              >
                <q-tooltip> Export Data </q-tooltip>
              </q-btn>

              <q-btn
                flat
                color="primary"
                icon="search"
                @click="visibles = !visibles"
                size="md"
                class="q-mr-sm"
              />
              <q-slide-transition>
                <div v-show="visibles">
                  <q-input
                    outlined
                    debounce="300"
                    placeholder="Pencarian"
                    style="width: 200px"
                    color="primary"
                    v-model="filter"
                    dense
                  />
                </div>
              </q-slide-transition>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="kode_transaksi" :props="props">
                  {{ props.row.kode_transaksi }}
                </q-td>
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="nasabah" :props="props">
                  {{ props.row.nasabah }}
                </q-td>
                <q-td key="debit" :props="props">
                  {{ props.row.debit }}
                </q-td>
                <q-td key="kredit" :props="props">
                  {{ props.row.kredit }}
                </q-td>
                <q-td key="saldo" :props="props">
                  {{ props.row.saldo }}
                </q-td>
                <q-td key="pengelola" :props="props">
                  {{ props.row.pengelola }}
                </q-td>
                <q-td key="action" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn
                      flat
                      color="blue-8"
                      size="md"
                      class="q-px-xs"
                      icon="edit"
                      @click="openDialog(true, props.row)"
                    ></q-btn>
                    <q-btn
                      flat
                      color="red"
                      size="md"
                      @click="hapusBarang(props.row._id)"
                      class="q-px-xs"
                      icon="delete"
                    ></q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card
        class="my-card"
        flat
        bordered
        style="width: 600px; max-width: 70vw"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="group_add" size="30px" color="blue-7" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Input /Edit Simpanan
            </q-item-label>
            <q-item-label caption> Input atau edit data simpanan </q-item-label>
          </q-item-section>

          <q-item-section class="col-1">
            <q-btn
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-form @submit="onSubmit()" @reset="onReset()">
          <q-card-section horizontal>
            <q-card-section class="q-gutter-xs fit">
              <q-input
                dense
                type="number"
                v-model="kode_transaksi"
                outlined
                label="Kode Transaksi"
                hint="Kode Transaksi"
              />
              <q-input
                dense
                v-model="nasabah"
                outlined
                label="Nasabah"
                hint="Nasabah"
              />
              <q-input
                dense
                v-model="debit"
                outlined
                label="Debit"
                hint="Debit"
              />
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="q-gutter-xs fit">
              <q-input
                dense
                v-model="kredit"
                outlined
                label="Kredit"
                hint="Kredit"
              />
              <q-input
                dense
                v-model="saldo"
                outlined
                label="Saldo"
                hint="Saldo"
              />
              <q-input
                dense
                v-model="pengelola"
                outlined
                label="Pengelola"
                hint="Pengelola"
              />
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat type="submit" label="Simpan" color="primary" />
            <q-btn flat type="reset" label="Reset" color="grey" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "kode_transaksi",
    label: "Kode Transaksi",
    field: "kode_transaksi",
    align: "left",
  },
  {
    name: "created_at",
    label: "Tanggal",
    field: "created_at",
    align: "left",
  },
  {
    name: "nasabah",
    label: "Nasabah",
    field: "nasabah",
    align: "left",
  },
  {
    name: "debit",
    label: "Debit",
    field: "debit",
    align: "left",
  },
  {
    name: "kredit",
    label: "Kredit",
    field: "kredit",
    align: "left",
  },
  {
    name: "saldo",
    label: "Saldo",
    field: "saldo",
    align: "left",
  },
  {
    name: "pengelola",
    label: "Pengelola",
    field: "pengelola",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
    tarik: "25.000",
  },
];

const rows = [
  {
    kode_transaksi: "001",
    created_at: "01 Juli 2023",
    nasabah: "Gunawan",
    debit: "debit",
    kredit: "kredit",
    saldo: "saldo",
    pengelola: "pengelola",
  },
  {
    kode_transaksi: "002",
    created_at: "02 Juli 2023",
    nasabah: "Andre",
    debit: "debit",
    kredit: "kredit",
    saldo: "saldo",
    pengelola: "pengelola",
  },
];
export default {
  name: "SimpananPage",
  data() {
    return {
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      dialog: false,
      kode_transaksi: null,
      nasabah: null,
      debit: null,
      kredit: null,
      saldo: null,
      pengelola: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    onReset() {
      this.kode_transaksi = null;
      this.nasabah = null;
      this.debit = null;
      this.kredit = null;
      this.saldo = null;
      this.pengelola = null;
    },
  },
};
</script>
