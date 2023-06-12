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
              class="d-flex flex-column align-center"
            >
              <v-row>
                <v-avatar
                color="primary"
                  class="ma-6"
                >{{ sec.slice(0, 2) }}</v-avatar>
                <v-col>
                  <h1> {{ secName }} </h1>
                  <p class="text-md-body-1 mb-1 font-weight-thin">
                     {{ sec }}
                  </p>
                  <p
                  class="text-h4"
                  style="font-weight:500"
                >
                  Акция Мосбиржи
                </p>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col
              cols="12"
              sm="8"
            >
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
    const stockData = await $fetch(`https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/${board}/securities/${sec}.json?from=2023-02-01`)
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