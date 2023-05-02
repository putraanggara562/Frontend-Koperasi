<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Pengeluaran" icon="price_change" />
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
                <div class="text-weight-bold">PENGELUARAN</div>
                <div>Daftar semua pengeluaran pada saat ini</div>
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
                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>
                <q-td key="namaBarangJasa" :props="props">
                  {{ props.row.namaBarangJasa }}
                </q-td>
                <q-td key="gambar" :props="props">
                  <q-item>
                    <q-item-section>
                      <q-avatar square>
                        <img :src="props.row.gambar" />
                      </q-avatar>
                    </q-item-section>
                  </q-item>
                </q-td>
                <q-td key="deskripsi" :props="props">
                  {{ props.row.deskripsi }}
                </q-td>
                <q-td key="harga" :props="props">
                  Rp {{ props.row.harga }}
                </q-td>
                <q-td key="jumlah" :props="props">
                  Rp {{ props.row.jumlah }}
                </q-td>
                <q-td key="total" :props="props">
                  Rp {{ props.row.total }}
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
              Input /Edit Pengeluaran
            </q-item-label>
            <q-item-label caption>
              Input atau edit data pengeluaran
            </q-item-label>
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
                v-model="created_at"
                outlined
                label="Tanggal"
                hint="Tanggal"
              />
              <q-input
                dense
                v-model="namaBarangJasa"
                outlined
                label="Nama Barang / Jasa"
                hint="Nama Barang / Jasa"
              />
              <q-input
                dense
                v-model="deskripsi"
                outlined
                label="Deskripsi"
                hint="Deskripsi"
              />
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="q-gutter-xs fit">
              <q-input
                dense
                v-model="harga"
                outlined
                label="Harga"
                hint="Harga"
              />
              <q-input
                dense
                v-model="jumlah"
                outlined
                label="Jumlah"
                hint="Jumlah Pengeluaran"
              />
              <q-input
                dense
                v-model="total"
                outlined
                label="Total"
                hint="Total Pengeluaran"
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
    name: "created_at",
    label: "Tanggal",
    field: "created_at",
    align: "left",
  },
  {
    name: "namaBarangJasa",
    label: "Nama Barang / Jasa",
    field: "namaBarangJasa",
    align: "left",
  },
  {
    name: "gambar",
    label: "Gambar",
    field: "gambar",
    align: "center",
  },
  {
    name: "deskripsi",
    label: "Deskripsi",
    field: "deskripsi",
    align: "left",
  },
  {
    name: "harga",
    label: "Harga",
    field: "harga",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: "jumlah",
    align: "left",
  },
  {
    name: "total",
    label: "Total",
    field: "total",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

const rows = [
  {
    created_at: "01 Juli 2023",
    namaBarangJasa: "Nama Barang",
    gambar: require("src/assets/bag.jpg"),
    deskripsi: "beli barang barang",
    harga: "50.000",
    jumlah: "50.000",
    total: "50.000",
  },
  {
    created_at: "04 Juli 2023",
    namaBarangJasa: "Nama Jasa",
    gambar: require("src/assets/laptop.jpg"),
    deskripsi: "beli barang jasa",
    harga: "100.000",
    jumlah: "100.000",
    total: "100.000",
  },
];
export default {
  name: "PinjamanPage",
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
      created_at: null,
      namaBarangJasa: null,
      gambar: null,
      deskripsi: null,
      harga: null,
      jumlah: null,
      total: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    onReset() {
      this.created_at = null;
      this.namaBarangJasa = null;
      this.gambar = null;
      this.deskripsi = null;
      this.harga = null;
      this.jumlah = null;
      this.total = null;
    },
  },
};
</script>
