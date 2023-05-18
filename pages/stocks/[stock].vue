<template>
  <v-app>
    <v-card
      style="margin-left: 7.3vw; margin-right: 7.3vw;"
    >
      <v-card>
        <div
          class="ma-6"
        >
          <v-row>
            <v-col
              cols="4"
            >
              <v-row>
                <img
                  style="border-radius: 12px"
                  class="ma-6"
                  width="100"
                  height="100"
                >
                <v-col>
                  <h1> {{ secName }} </h1>
                  <p class="text-md-body-1 mb-1 font-weight-thin">
                     {{ sec }}
                  </p>
                  <div
                    class="ma-0 px-2 py-1 pt-2 d-flex justify-center"
                    :style="[{'border': 'solid 1px green'}]"
                    style="border-radius: 16px;width: fit-content;"
                  >
                    <p class="text-md-body-1 mb-1 font-weight-thin">
                      Profit:
                    </p>
                    <v-icon
                      class="ml-2"
                      color="green"
                    >
                      mdi-trending-up
                    </v-icon>
                    <v-icon
                      color="red"
                    >
                      mdi-trending-down
                    </v-icon>
                    <p
                      class="text-md-body-2 mb-0 pa-0 ml-1 font-weight-thin"
                      :style="[{ 'color': 'green' }]"
                    >%
                    </p>
                  </div>
                </v-col>
              </v-row>
              <v-col>
                <p
                  style="font-weight:500"
                >
                  Description:
                </p>
                <p
                  class="text--secondary"
                >
                </p>
                <p
                  style="font-weight:500"
                >
                  Currency:
                </p>
                <p
                  style="font-weight:500"
                >
                  Stock:
                  
                </p>
                <span>
                  <p style="font-weight:500">
                    Trades:
                    <v-icon
                      color="green"
                    >
                      mdi-swap-horizontal
                    </v-icon></p>
                  <p style="font-weight:500">Time:
                    <v-icon
                      color="green"
                    >
                      mdi-clock-time-three-outline
                    </v-icon>
                    <span> Days</span>
                  </p>
                  <p style="font-weight:500"> Timeframe:
                    <v-icon
                      color="green"
                    >
                      mdi-clock-time-three-outline
                    </v-icon>
                    <span></span>
                  </p>
                </span>
                <p
                  style="font-weight:500"
                >
                  API key:
                </p>
                <v-row
                  no-gutters
                  style="flex-wrap: nowrap;"
                >
                  <v-btn
                    class="white--text"
                    color="primary"
                    width="170px"
                    height="48px"
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    class="white--text ml-6"
                    color="error"
                    width="170px"
                    height="48px"
                  >
                    Delete
                  </v-btn>
                </v-row>
              </v-col>
            </v-col>
            <v-spacer />
            <v-col
              cols="12"
              sm="8"
            >
              <v-row
                class="mt-6 mb-3 justify-end align-end"
              >
                <p
                  class="mb-2"
                  style="font-weight:500;"
                >
                  Currently rents: <span class="mx-3" style="font-weight:400;"> users</span>
                </p>
                <v-icon
                  class="ma-2"
                  color="green"
                >
                  mdi-star
                </v-icon>
                <v-icon
                  class="ma-2"
                  color="green"
                >
                  mdi-star-outline
                </v-icon>
                <div
                  class="ma-0 px-2 py-2 mx-6 d-flex justify-center align-start"
                  style="border-radius: 16px;width: fit-content"
                  :style="[{ 'border': 'solid 1px green' }]"
                >
                  <v-icon
                    class="mr-2"
                    :color="'green'"
                  >
                    mdi-circle
                  </v-icon>
                  <p
                    class="ma-0 text-body-2"
                  >
                    Online
                  </p>

                </div>
              </v-row>
              <div class="lw-chart" ref="chartContainer"></div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4"
            />
            <v-col
              cols="8"
            ></v-col>
          </v-row>
        </div>
      </v-card>
    </v-card>

  </v-app>
</template>
<script setup>

const route = useRoute()
const board = route.params.stock.slice(0, 4)
const sec = route.params.stock.slice(4, 8)

const nuxtApp = useNuxtApp();
const createChart = nuxtApp.createChart;

let chart;
let secName = ref()
const chartContainer = ref();

onMounted(async () => {
    
    // Create the Lightweight Charts Instance using the container ref.
    chart = createChart(chartContainer.value, {
      rightPriceScale: { visible: true },
      leftPriceScale: { visible: true },
      width: window.innerWidth * 0.55,
      height: 400,
      crosshair: { mode: 0 },
      timeScale: {
        timeVisible: true,
        secondsVisible: false
      }
    })
    const candlestickSeries = chart.addCandlestickSeries()
    const stockData = await $fetch(`https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/${board}/securities/${sec}.json`)
    secName.value = stockData?.history?.data[0][2]
    const formattedData = stockData?.history?.data.map((el) => { return { time: el[1], open: el[6], high: el[8], low: el[7], close: el[11] }})
    candlestickSeries.setData(formattedData)
    chart.timeScale().fitContent()
});

onUnmounted(() => {
    if (chart) {
        chart.remove();
        chart = null;
    }
})

</script>
<style scoped>
    .lw-chart {
        height: 400px;
    }
</style>