<template>
  <v-app>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-card
        flat
        style="margin-left: 7.3vw; margin-right: 7.3vw;"
        class="main-card"
      >
        <h1>
          Treasurer
        </h1>
        <div
          style="z-index: 1; position:relative"
          width="90vw"
        >
          <v-data-table
            :headers="stocksTableHeaders"
            :items="stocksTableData"
            :items-per-page="10"
            @click:row="redirect"
            class="elevation-0"
          >
          </v-data-table>
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'TreasurerFrontendstocks',
  data () {
    return {
      stocksTableData: [],
      stocksTableTotalstocks: 0,
      stocksTableTotalPages: 1,
      stocksTableHeaders: [
        { title: 'Аббревиатура', key: 'short' },
        { title: 'Название', key: 'name' },
        { title: 'Цена', key: 'price' },
        { title: 'Тип', key: 'type' }
      ],
      stocksTableData: []
    }
  },
  watch: {
  },
  async mounted () {
    let data = await $fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities.json')
    console.log(data)
    this.stocksTableData = data.securities.data.map((el) => { return { short: el[0], board: el[1], name: el[2], price: el[3], type: el[7] } }).filter(el => typeof el.price === 'number')
    console.log(this.stocksTableData)
  },
  methods: {
    redirect (item, row) {
      // let rowData = JSON.parse(JSON.stringify(row))
      // console.log(rowData.item.value.board)
      useRouter().push({ path: `/stocks/${row.item.value.board}${row.item.value.short}`})
      console.log(row.item.value)
    }
  }
}
</script>

<style>

.v-chip.v-size--default {
  border-radius: 12px;
}
.main-card.v-card.v-card--flat.v-sheet.theme--light {
  background-color: transparent;
}
.v-data-table-header {
  width: 90vw;
}
</style>
