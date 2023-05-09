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
                      <q-td key="namaInventaris" :props="props">
                        {{ props.row.namaInventaris }}
                      </q-td>
                      <q-td key="jumlah" :props="props">
                        {{ props.row.jumlah }}
                      </q-td>
                      <q-td key=" masaManfaat" :props="props">
                        {{ props.row. masaManfaat }}
                      </q-td>
                      <q-td key=" tahunPerolehan" :props="props">
                        {{ props.row. tahunPerolehan }}
                      </q-td>
                      <q-td key=" nilaiPerolehan" :props="props">
                        {{ props.row. nilaiPerolehan }}
                      </q-td>
                      <q-td key="akumulasiPenyusutan" :props="props">
                        {{ props.row.akumulasiPenyusutan }}
                      </q-td>
                      <q-td key=" nilaiSisaInventori" :props="props">
                        {{ props.row. nilaiSisaInventori }}
                      </q-td>
                      <q-td key=" dasarPenyusutan" :props="props">
                        {{ props.row. dasarPenyusutan }}
                      </q-td>
                      <q-td key="  tarif" :props="props">
                        {{ props.row.  tarif }}
                      </q-td>
                      <q-td key=" sisaManfaat" :props="props">
                        {{ props.row. sisaManfaat }}
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
                    v-model=" namaInventaris"
                    outlined
                    label="Nama Inventaris "
                  />
                  <q-input dense v-model="jumlah" outlined label="Jumlah" />
                </q-card-section>

                <q-separator vertical />

                <q-card-section class="q-gutter-md fit">
                  <q-input
                    dense
                    type="number"
                    v-model="masaManfaat"
                    outlined
                    label="Masa Manfaat"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="tahunPerolehan"
                    outlined
                    label="Tahun Perolehan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="nilaiPerolehan"
                    outlined
                    label="Nilai Perolehan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="akumulasiPenyusutan"
                    outlined
                    label="Akumulasi Penyusutan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="nilaiSisaInventori"
                    outlined
                    label="Nilai Sisa Inventori"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="dasarPenyusutan"
                    outlined
                    label="Dasar Penyusutan"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="tarif"
                    outlined
                    label="Tarif"
                  />
                  <q-input
                    dense
                    type="number"
                    v-model="sisaManfaat"
                    outlined
                    label="Sisa Manfaat"
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
    name: "namaInventaris",
    label: "Nama Inventaris",
    field: "namaInventaris",
    align: "left",
  },
  {
    name: "jumlah",
    label: "jumlah",
    field: " jumlah",
    align: "left",
  },
  {
    name: "nomorTelepon",
    label: "Nomor Telepon",
    field: "nomorTelepon",
    align: "left",
  },
  {
    name: "statusPembelian",
    label: "Status Pembelian",
    field: "statusPembelian",
    align: "left",
  },
  {
    name: "jumlah",
    label: "Jumlah",
    field: "jumlah",
    align: "left",
  },
  {
    name: "masaManfaat",
    label: "Masa Manfaat",
    field: "masaManfaat",
    align: "left",
  },
  {
    name: "tahunPerolehan",
    label: "Tahun Perolehan",
    field: "tahunPerolehan",
    align: "left",
  },
  {
    name: "nilaiPerolehan",
    label: "Nilai Perolehan",
    field: "nilaiPerolehan",
    align: "left",
  },
  {
    name: "akumulasiPenyusutan",
    label: "Akumulasi Penyusutan",
    field: "akumulasiPenyusutan",
    align: "left",
  },
  {
    name: "nilaiSisaInventori",
    label: "Nilai Sisa Inventori",
    field: " nilaiSisaInventori",
    align: "left",
  },
  {
    name: "dasarPenyusutan",
    label: "Dasar Penyusutan",
    field: "dasarPenyusutan",
    align: "left",
  },
  {
    name: "tarif",
    label: "Tarif",
    field: "tarif",
    align: "left",
  },
  {
    name: "sisaManfaat",
    label: "Sisa Manfaat",
    field: "sisaManfaat",
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
      namaInventaris: null,
      jumlah: null,
      masaManfaat: null,
      tahunPerolehan: null,
      nilaiPerolehan: null,
      akumulasiPenyusutan: 4000,
      nilaiSisaInventori: 2000,
      dasarPenyusutan: 2000,
      tarif: 2000,
      sisaManfaat: 2000,
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
        this.namaInventaris = data.namaInventaris;
        this.jumlah = data.jumlah;
        this.masaManfaat = data.masaManfaat;
        this.tahunPerolehan = data.tahunPerolehan;
        this.nilaiPerolehan = data.nilaiPerolehan;
        this.akumulasiPenyusutan = data.akumulasiPenyusutan;
        this.nilaiSisaInventori = data.nilaiSisaInventori;
        this.dasarPenyusutan = data.dasarPenyusutan;
        this.tarif = data.tarif;
        this.sisaManfaat = data.sisaManfaat;
        this.idActive = data._id;
      } else {
        this.namaInventaris = null;
        this.jumlah = null;
        this.masaManfaat = null;
        this.tahunPerolehan = null;
        this.nilaiPerolehan = null;
        this.akumulasiPenyusutan = null;
        this.nilaiSisaInventori = null;
        this.dasarPenyusutan = null;
        this.tarif = null;
        this.sisaManfaat = null;

        this.idActive = null;
      }
      this.dialog = true;
    },
    resetDialog() {
      this.editMode = false;
      this.dialog = false;
    },
    resetForm() {
      this.namaInventaris = null;
      this.jumlah = null;
      this.masaManfaat = null;
      this.tahunPerolehan = null;
      this.nilaiPerolehan = null;
      this.akumulasiPenyusutan = null;
      this.nilaiSisaInventori = null;
      this.dasarPenyusutan = null;
      this.tarif = null;
      this.sisaManfaat = null;
    },
    onSubmit() {
      if (this.editMode) {
        this.$axios
          .put(`penjualan/edit/${this.idActive}`, {
            namaInventaris: this.namaInventaris,
            jumlah: this.jumlah,
            masaManfaat: this.masaManfaat,
            tahunPerolehan: this.tahunPerolehan,
            nilaiPerolehan: this.nilaiPerolehan,
            akumulasiPenyusutan: this.akumulasiPenyusutan,
            nilaiSisaInventori: this.nilaiSisaInventori,
            dasarPenyusutan: this.dasarPenyusutan,
            tarif: this.tarif,
            sisaManfaat: this.sisaManfaat,
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
            namaInventaris: this.namaInventaris,
            jumlah: this.jumlah,
            masaManfaat: this.masaManfaat,
            tahunPerolehan: this.tahunPerolehan,
            nilaiPerolehan: this.nilaiPerolehan,
            akumulasiPenyusutan: this.akumulasiPenyusutan,
            nilaiSisaInventori: this.nilaiSisaInventori,
            dasarPenyusutan: this.dasarPenyusutan,
            tarif: this.tarif,
            sisaManfaat: this.sisaManfaat,
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
      this.namaInventaris = null;
      this.jumlah = null;
      this.masaManfaat = null;
      this.statusPembelian = null;
      this.tahunPerolehan = null;
      this.nilaiPerolehan = null;
      this.akumulasiPenyusutan = null;
      this.nilaiSisaInventori = null;
      this.dasarPenyusutan = null;
      this.tarif = null;
      this.sisaManfaat = null;
    },
  },
};
</script>

<style scoped></style>
