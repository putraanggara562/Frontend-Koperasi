<template>
  <q-page class="bg-brown-1">
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-brown" active-color="black">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Pembelian" icon="shopping_bag" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">
        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data pembelian belum dibayar
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  semua data pembelian belum dibayar.
                </div>
                <div class="row items-center">
                  <q-icon name="payment" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    <vue3-autocounter
                      ref="counter"
                      :startAmount="0"
                      :endAmount="Number(totalHutang)"
                      :duration="3"
                      :autoinit="true"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">
                  Data pembelian
                </div>
                <div class="text-caption text-grey" style="font-size: 11px">
                  berisi semua data pembelian salsafical.
                </div>
                <div class="row items-center">
                  <q-icon name="credit_score" />
                  <div
                    class="text-h6 q-ml-sm text-blue-13"
                    style="font-size: 12px"
                  >
                    <vue3-autocounter
                      ref="counter"
                      :startAmount="0"
                      :endAmount="Number(totalLunas)"
                      :duration="3"
                      :autoinit="true"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col-12 q-pa-sm">
                <q-table
                  title="Master Data Pembelian"
                  aria-label="Text"
                  class="text-h5"
                  :rows="rows"
                  flat
                  :columns="columns"
                  row-key="name"
                  :filter="filter"
                >
                  <template v-slot:top>
                    <div class="col">
                      <div class="col-2 q-table__title">
                        Master Data Pembelian
                      </div>
                      <p class="text-caption">
                        Data pembelian yang di lakukan di dalam sistem
                        salsafical.
                      </p>
                    </div>

                    <q-space />

                    <q-btn
                      flat
                      round
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
                          placeholder="Placeholder"
                          style="width: 300px"
                          color="primary"
                          v-model="filter"
                          dense
                        />
                      </div>
                    </q-slide-transition>
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      label="Tambah Pembelian"
                      :to="{ name: 'pembelian_add' }"
                      size="md"
                      outline
                    />
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="namaSupplier" :props="props">
                        {{ props.row.namaSupplier }}
                      </q-td>
                      <q-td key="keterangan" :props="props">
                        {{ props.row.keterangan }}
                      </q-td>
                      <q-td key="nomorTelepon" :props="props">
                        {{ props.row.nomorTelepon }}
                      </q-td>
                      <q-td key="statusPembelian" :props="props">
                        {{ props.row.statusPembelian }}
                      </q-td>
                      <q-td key="jumlah" :props="props">
                        {{ props.row.jumlah }}
                      </q-td>
                      <q-td key="harga" :props="props">
                        {{ props.row.harga }}
                      </q-td>
                      <q-td key="total" :props="props">
                        {{ props.row.total }}
                      </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn
                          round
                          outline
                          color="red"
                          @click="this.delete(props.row._id)"
                          size="sm"
                          icon="delete"
                          no-caps
                          class="q-ml-sm"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
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
                  <q-icon name="price_change" size="30px" color="brown" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold text-uppercase">
                  Input /Edit Pembelian
                </q-item-label>
                <q-item-label caption>
                  Input atau edit data pembelian
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
                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    v-model="namaSupplier"
                    outlined
                    label="Nama Supplier "
                  />
                  <q-input dense v-model="keterangan" outlined label="Harga" />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="number"
                    v-model="nomorTelepon"
                    outlined
                    label="Nomor Telpon"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="jumlah"
                    outlined
                    label="Jumlah"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="harga"
                    outlined
                    label="Harga"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="total"
                    outlined
                    label="Total"
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
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue3autocounter from "vue3-autocounter";
const columns = [
  {
    name: "namaProduk",
    label: "Nama Produk",
    field: "namaProduk",
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
    name: "keterangan",
    label: "Keterangan",
    field: "keterangan",
    align: "left",
  },
  {
    name: "action",
    label: "Action",
    field: "action",
    align: "center",
  },
];

const rows = [];

export default {
  name: "PenjualanPage",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
  data() {
    return {
      columns,
      rows,
      filter: "",
      pagination: {
        rowsPerPage: 10,
      },
      visibles: false,
      editMode: false,
      dialog: false,
      namaProduk: null,
      harga: null,
      jumlah: null,
      total: null,
      keterangan: null,
      totalHutang: 4000,
      totalLunas: 2000,
      idActive: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    openDialog(editMode, data) {
      this.editMode = editMode;
      if (editMode) {
        this.namaProduk = data.namaProduk;
        this.harga = data.harga;
        this.jumlah = data.jumlah;
        this.total = data.total;
        this.keterangan = data.keterangan;
        this.idActive = data._id;
      } else {
        this.namaProduk = null;
        this.harga = null;
        this.jumlah = null;
        this.total = null;
        this.keterangan = null;
        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.namaProduk = null;
      this.harga = null;
      this.jumlah = null;
      this.total = null;
      this.keterangan = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`penjualan/edit/${this.idActive}`, {
            namaProduk: this.namaProduk,
            harga: this.harga,
            jumlah: this.jumlah,
            total: this.total,
            keterangan: this.keterangan,
          })
          .then((res) => {
            console.log(res);
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
            this.resetDialog();
            this.resetForm();
          });
      } else {
        this.$axios
          .post("penjualan/add", {
            namaProduk: this.namaProduk,
            harga: this.harga,
            jumlah: this.jumlah,
            total: this.total,
            keterangan: this.keterangan,
          })
          .then((res) => {
            console.log(res);
            if ((res.data.sukses = true)) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.dialog = false;
            this.getData();
          });
      }
    },
    getData() {
      this.$axios.get("penjualan/getAll").then((res) => {
        if (res.data.sukses) {
          this.data = res.data.data;
        }
      });
    },
    hapusData(_id) {
      this.$q
        .dialog({
          title: "Konfirmasi",
          message: "Apakah anda yakin ingin menghapus data ini?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$axios.delete(`penjualan/delete/${_id}`).then((res) => {
            if (res.data.sukses) {
              this.$successNotif(res.data.pesan, "positive");
            }
            this.getData();
          });
        });
    },
    onReset() {
      this.namaProduk = null;
      this.harga = null;
      this.jumlah = null;
      this.total = null;
      this.keterangan = null;
    },
  },
};
</script>

<style scoped></style>
