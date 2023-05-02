<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Master Data" icon="widgets" />
          <q-breadcrumbs-el label="Peminjaman" icon="payments" />
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
                <div class="text-weight-bold">PEMINJAMAN</div>
                <div>Daftar semua peminjaman pada saat ini</div>
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
                <q-td key="namaPeminjam" :props="props">
                  {{ props.row.namaPeminjam }}
                </q-td>
                <q-td key="keterangan" :props="props">
                  {{ props.row.keterangan }}
                </q-td>
                <q-td key="jumlah" :props="props">
                  {{ props.row.jumlah }}
                </q-td>
                <q-td key="bunga" :props="props">
                  {{ props.row.bunga }}
                </q-td>
                <q-td key="total" :props="props">
                  {{ props.row.total }}
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
              Input /Edit Peminjaman
            </q-item-label>
            <q-item-label caption>
              Input atau edit data peminjaman
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
                v-model="namaPeminjam"
                outlined
                label="Nama Peminjam"
                hint="Nama Peminjam"
              />
              <q-input
                dense
                v-model="keterangan"
                outlined
                label="Keterangan"
                hint="Keterangan"
              />
              <q-input
                dense
                v-model="jumlah"
                outlined
                label="Jumlah"
                hint="Jumlah"
              />
            </q-card-section>

            <q-separator vertical />

            <q-card-section class="q-gutter-xs fit">
              <q-input
                dense
                v-model="bunga"
                outlined
                label="Bunga (%)"
                hint="Bunga (%)"
              />
              <q-input
                dense
                v-model="total"
                outlined
                label="Total"
                hint="Total"
              />
              <q-input
                dense
                v-model="created_at"
                outlined
                label="Tangal"
                hint="Tangal"
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
    name: "namaPeminjam",
    label: "Nama Peminjam",
    field: "namaPeminjam",
    align: "left",
  },
  {
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: "jumlah",
    align: "left",
  },
  {
    name: "bunga",
    label: "Bunga (%)",
    field: "bunga",
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
    namaPeminjam: "Gunawan",
    keterangan: "pinjaman awal bulan",
    jumlah: "50.000",
    bunga: "5%",
    total: "55.000",
  },
  {
    created_at: "02 Juli 2023",
    namaPeminjam: "Andre",
    keterangan: "pinjaman akhir bulan",
    jumlah: "100.000",
    bunga: "5%",
    total: "110.000",
  },
];
export default {
  name: "PeminjamanPage",
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
      dipinjam: null,
      dibayar: null,
      sisa_pembayaran: null,
      durasi_perbulan: null,
      created_at: null,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    onReset() {
      this.kode_transaksi = null;
      this.nasabah = null;
      this.dipinjam = null;
      this.dibayar = null;
      this.sisa_pembayaran = null;
      this.durasi_perbulan = null;
      this.created_at = null;
      this.pengelola = null;
    },
  },
};
</script>
