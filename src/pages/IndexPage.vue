<template>
  <q-page>
    <div class="q-pa-md">
      <q-card class="q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-8" active-color="black">
          <q-breadcrumbs-el label="Dashboard" icon="home" />
        </q-breadcrumbs>
      </q-card>
      <div class="row items-center q-col-gutter-md q-pt-md">
        <div class="col-12 col-md-4 col-sm-6 col-xs-12 col-lg-4">
          <q-card flat style="padding: 33px 0px 24px 0px" class="bg-blue">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="white"
                  text-color="blue-8"
                  icon="business_center"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  SALDO
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah saldo pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white"
                  ><strong>Rp. {{ saldo }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <q-card flat style="padding: 33px 0px 24px 0px" class="bg-green">
            <q-item>
              <q-item-section avatar>
                <q-btn round color="white" text-color="green" icon="payments" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  DEBIT
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah debit pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white"
                  ><strong>Rp. {{ debit }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>

        <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card flat style="padding: 33px 0px 24px 0px" class="bg-orange-6">
            <q-item>
              <q-item-section avatar>
                <q-btn
                  round
                  color="white"
                  text-color="orange-6"
                  icon="price_change"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold q-mb-sm text-white">
                  KREDIT
                </q-item-label>
                <q-item-label caption class="text-white">
                  Jumlah kredit pada bulan ini
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white"
                  ><strong>Rp. {{ kredit }}</strong>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div class="row items-center q-col-gutter-md q-py-md">
        <div class="col-md-12 col-xs-12">
          <q-card class="q-mt-sm">
            <q-card-section class="text-h6 q-pb-none">
              <q-item>
                <q-item-section avatar class="">
                  <q-icon color="blue" name="fas fa-chart-line" size="44px" />
                </q-item-section>

                <q-item-section>
                  <div class="text-weight-bold">Grafik Pertumbuhan Usaha</div>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section class="row">
              <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
                <div class="row">
                  <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
                    <q-item>
                      <q-item-section top avatar>
                        <q-avatar
                          color="blue"
                          text-color="white"
                          icon="business_center"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-h6 text-blue text-bold">
                          {{ saldo }}
                        </q-item-label>
                        <q-item-label caption>Saldo</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
                    <q-item>
                      <q-item-section top avatar>
                        <q-avatar
                          color="green-6"
                          text-color="white"
                          icon="payments"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-h6 text-green-6 text-bold">
                          {{ debit }}
                        </q-item-label>
                        <q-item-label caption>Debit</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
                    <q-item>
                      <q-item-section top avatar>
                        <q-avatar
                          color="orange-6"
                          text-color="white"
                          icon="price_change"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-h6 text-orange-6 text-bold">
                          {{ kredit }}
                        </q-item-label>
                        <q-item-label caption>Kredit</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
                <div>
                  <div
                    ref="saleschart"
                    id="saleschart"
                    style="height: 250px"
                  ></div>
                </div>
              </div>
              <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
                <q-item>
                  <q-item-section avatar class="">
                    <q-icon
                      color="blue"
                      name="fas fa-gift"
                      class="q-pl-md"
                      size="24px"
                    />
                  </q-item-section>

                  <q-item-section>
                    <div class="text-h6">Pertumbuhan Uang</div>
                  </q-item-section>
                </q-item>
                <div>
                  <div ref="piechart" id="piechart" style="height: 250px"></div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {},
  setup() {
    return {
      saldo: "200.000",
      debit: "100.000",
      kredit: "50.000",
      sales_options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Saldo",
            type: "bar",
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29],
            color: "#389CEC",
          },
          {
            name: "Debit",
            type: "bar",
            data: [124, 100, 20, 120, 117, 70, 110, 90, 50, 90, 20, 50],
            color: "#4CAF50",
          },
          {
            name: "Kredit",
            type: "bar",
            data: [17, 2, 0, 29, 20, 10, 23, 0, 8, 20, 11, 30],
            color: "#f88c2b",
          },
        ],
      },
      pie_options: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["Saldo", "Debit", "Kredit"],
        },
        series: [
          {
            name: "Sales",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 335,
                name: "Saldo",
                itemStyle: {
                  color: "#389CEC",
                },
              },
              {
                value: 310,
                name: "Debit",
                itemStyle: {
                  color: "#4CAF50",
                },
              },
              {
                value: 135,
                name: "Kredit",
                itemStyle: {
                  color: "#f88c2b",
                },
              },
            ],
          },
        ],
      },
      sales_chart: null,
      pie_chart: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let salesChart = document.getElementById("saleschart");
      echarts.dispose(salesChart);
      this.sales_chart = echarts.init(salesChart, "light");
      this.sales_chart.setOption(this.sales_options);

      let piechart = document.getElementById("piechart");
      echarts.dispose(piechart);
      this.pie_chart = echarts.init(piechart, "light");
      this.pie_chart.setOption(this.pie_options);
    },
    onResize() {
      if (this.sales_chart) {
        this.sales_chart.resize();
      }
      if (this.pie_chart) {
        this.pie_chart.resize();
      }
    },
  },
});
</script>
