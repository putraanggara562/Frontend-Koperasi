<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Nasabah" icon="group_add" />
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
                <div class="text-weight-bold">NASABAH</div>
                <div>Daftar semua nasabah pada saat ini</div>
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
                @click="exportTable()"
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
                <q-td key="no_anggota" :props="props">
                  {{ props.row.no_anggota }}
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.nama }}
                </q-td>
                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
                <q-td key="kelamin" :props="props">
                  {{ props.row.kelamin }}
                </q-td>
                <q-td key="status" :props="props">
                  {{ props.row.status }}
                </q-td>
                <q-td key="JumlahPinjaman" :props="props">
                  {{ props.row.JumlahPinjaman }}
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
              Input /Edit Nasabah
            </q-item-label>
            <q-item-label caption> Input atau edit data nasabah </q-item-label>
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
                v-model="alamat"
                outlined
                label="Alamat"
                hint="Alamat"
              />
              <q-input dense v-model="nama" outlined label="Nama" hint="Nama" />
              <q-input
                dense
                type="email"
                v-model="email"
                outlined
                label="Email"
                hint="Email"
              />
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="q-gutter-xs fit">
              <q-input
                dense
                v-model="kelamin"
                outlined
                label="Jenis Kelamin"
                hint="Jenis Kelamin"
              />
              <q-select
                dense
                outlined
                key="value"
                v-model="status"
                option-label="label"
                :options="optionStatus"
                label="Status"
                :rules="[(val) => val !== null || 'Status tidak boleh kosong']"
              />
              <q-input
                dense
                v-model="jumlahPinjaman"
                outlined
                label="Jumlah Pinjaman"
                hint="Jumlah Pinjaman"
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
import { exportFile } from "quasar";

const columns = [
  {
    name: "no_anggota",
    label: "No Anggota",
    field: "no_anggota",
    align: "left",
  },
  {
    name: "nama",
    label: "Nama",
    field: "nama",
    align: "left",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left",
  },
  {
    name: "alamat",
    label: "Alamat",
    field: "alamat",
    align: "left",
  },
  {
    name: "kelamin",
    label: "Kelamin",
    field: "kelamin",
    align: "left",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
  },
  {
    name: "JumlahPinjaman",
    label: "Jumlah Pinjaman",
    field: "JumlahPinjaman",
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
    no_anggota: "001",
    nama: "01 Juli 2023",
    email: "Gunawan",
    alamat: "alamat",
    kelamin: "kelamin",
    status: "status",
    JumlahPinjaman: "Rp.0",
  },
  {
    no_anggota: "002",
    nama: "02 Juli 2023",
    email: "Andre",
    alamat: "alamat",
    kelamin: "kelamin",
    status: "status",
    JumlahPinjaman: "Rp.0",
  },
];
export default {
  name: "NasabahPage",
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
      no_anggota: null,
      nama: null,
      email: null,
      alamat: null,
      kelamin: null,
      status: null,
      optionStatus: [
        {
          label: "Aktif",
          value: 0,
        },
        {
          label: "Tidak Aktif",
          value: 3,
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    onReset() {
      this.no_anggota = null;
      this.nama = null;
      this.email = null;
      this.alamat = null;
      this.kelamin = null;
      this.status = null;
    },
    exportTable() {
      const content = ["No Anggota; Nama; Email; Alamat; Kelamin; Status"]
        .concat(
          this.rows.map((row) => {
            return `${row.no_anggota};${row.nama};${row.email};${row.alamat};${row.kelamin};${row.status}`;
          })
        )
        .join("\r\n");
      const status = exportFile("daftar-nasabah.csv", content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>
