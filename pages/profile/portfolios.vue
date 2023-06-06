<template>
  <v-dialog
    scrollable
    v-model="showCreatePortfolioForm"
    width="auto">
      <v-card
        v-if="showCreatePortfolioForm"
        class="d-flex align-center flex-column"
      >
        <h1>
          Создание портфеля
        </h1>
        <v-row
        style="width: 800px;"
        class="pa-2"
        v-for="(portfolio, index) in customPortfolio"
        v-bind:index="index"
        :key="portfolio.id"
        no-gutters>
          <v-col
          cols="4">
            <v-autocomplete
              variant="outlined"
              class="ma-2"
              return-object
              item-title="name"
              item-value="name"
              :items="portfolios"
              v-model="customPortfolio[index]"
            ></v-autocomplete>
          </v-col>
          <v-col
          cols="2">
            <v-text-field
            variant="outlined"
            v-model="portfolio.quantity"
            class="ma-2"
            outlined
            label="Количество">
            </v-text-field>
          </v-col>
          <v-col
          cols="4"
          v-if="customPortfolio[index]"
          class="ma-2">
          {{ portfolio.id }}
            <span>
              <span
              class="text-h6"
              style="white-space: nowrap;">
                Цена акции:
            </span>
              {{ portfolio.price }} <span v-if=portfolio.price>₽</span>
            </span>
            <div  v-if="portfolio.price && portfolio.quantity">
              <span>
                <div class="text-h5">
                  Итого: {{ portfolio.price * portfolio.quantity }}₽
                </div>
              </span>
            </div>
          </v-col>
          <v-col
          cols="1"
          class="ma-auto">
            <v-btn variant="outlined" icon="mdi-delete" size="small"
            @click="customPortfolio.splice(index, 1)"
            >
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
        class="ma-2"
        @click="addNewSecurity">
          Добавить новую акцию
        </v-btn>
        <div>
          <v-card
            v-if="customPortfolio.length > 1 && customPortfolio[1].name != ''"
            class="mb-2"
            min-height="200px"
          >
            <apexchart width="380" type="donut" :options="customOptions" :series="customPieChartSeries" />
          </v-card>
        </div>
        <v-btn
          v-if="customPortfolio.length > 1 && customPortfolio[1].name != ''"
          class="ma-4"
          @click="confirmCreateDialog = true; this.isGenerated = false"
        >
          Создать
        </v-btn>
        <div
        class="text--secondary text-subtitle mb-2">
          или
        </div>
        <div
        class="text-h5">
          Сгенерировать портфель
        </div>
        <v-col
          cols="6"
        >
          <v-text-field
            v-model="createPortfolioForm.amount"
            name="name"
            label="Сумма депозита (в рублях)"
          />
        </v-col>
        <v-btn
          class="ma-4"
          @click="createPortfolio"
        >
          Генерация
        </v-btn>
        <v-card
          v-if="generatedPortfolio.length > 0"
          min-height="200px"
          class="mb-6"
        >
          <apexchart width="380" type="donut" :options="options" :series="pieChartSeries" />
          <div
          class="d-flex justify-center">
            <v-btn
            class="ma-4"
            @click="confirmCreateDialog = true; this.isGenerated = true"
            >
              Создать
            </v-btn>
          </div>
        </v-card>
      </v-card>
  </v-dialog>
  <v-dialog
    v-model="confirmCreateDialog"
    width="40vw">
    <v-card
    class="pa-8">
      <div
      class="text-h5">
        Имя и описание портфеля
      </div>
      <v-text-field
      v-model="portfolioName"
      label="Имя"></v-text-field>
      <v-text-field
      v-model="portfolioDescription"
      label="Описание"></v-text-field>
      <v-btn
      @click="savePortfolio">
        Подтвердить
      </v-btn>
    </v-card>
  </v-dialog>
  <v-app>
    <v-main>
      <div>
    <v-card
      v-if="!createdPortfolios"
      class="d-flex align-center justify-center flex-column"
      style="margin-left: 7.5vw; margin-right: 7.5vw; margin-top: 8vh; padding-bottom: 4vh;"
    >
      <h1
        class="mb-16"
      >
        Вы еще не создали инвестиционный портфель
      </h1>
      <v-btn
        class="mb-8"
        @click="showCreatePortfolioForm = true"
      >
        Создать
      </v-btn>

    </v-card>
    <v-card
      v-else
      class="d-flex align-center justify-center flex-column"
      style="margin-left: 7.5vw; margin-right: 7.5vw; margin-top: 8vh; padding-bottom: 4vh;">
      <h1
        class="mb-16"
      >
          Созданные портфели
      </h1>
      <v-row>
        <v-card
        class="pa-8 ma-4"
        v-for="portfolio in createdPortfolios">
          <div
          class="text-h5">{{ portfolio.name }}</div>
          <div class="text-h6"> {{ portfolio.description }}</div>
          <apexchart width="380" type="donut" :options="{labels: portfolio.portfolio_object.map((el) => { return el.name })} " :series="portfolio.portfolio_object.map((el) => { return el.totalPrice })" />
        </v-card>
      </v-row>
      <v-btn
        class="mb-8 mt-4"
        @click="showCreatePortfolioForm = true"
      >
        Создать новый
      </v-btn>
    </v-card>
  </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'AppDashboard',
  data () {
    return {
      generatedPortfolio: [],
      portfolios: [],
      confirmCreateDialog: false,
      portfolioName: null,
      portfolioDescription: null,
      createdPortfolios: [],
      customPortfolio: [{name: '', quantity: 1}],
      createPortfolioForm: {
        amount: 1000
      },
      showCreatePortfolioForm: false,
      options: {
        labels: []
      },
      pieChartSeries: [],
      customOptions: {
        labels: []
      },
      customPieChartSeries: [],
      supabase: null,
      userData: null,
      isGenerated: false
    }
  },
  watch: {
    'createPortfolioForm.amount': function () {
      if (typeof this.createPortfolioForm.amount === 'number') {
        console.log('done')
      } else {
        this.createPortfolioForm.amount = Number(this.createPortfolioForm.amount)
      }
    },
    customPortfolio: {
      handler() {
        this.customPieChartSeries = this.customPortfolioChart.map((el) => { return el.totalPrice })
        this.customOptions = {labels: this.customPortfolioChart.map((el) => { return el.name })} 
      },
      deep: true
    }
  },
  computed: {
    customPortfolioChart: function () {
      return this.customPortfolio.map((el) => { return {name: el.name, quantity: Number(el.quantity), totalPrice: el.price * el.quantity} })
    },
    generatedPortfolioChart: function () {
      return this.generatedPortfolio.map((el) => { return {name: el.name, quantity: Number(el.quantity), totalPrice: el.price * el.quantity} })
    }
  },
  async mounted () {
    this.supabase = useSupabaseClient()
    this.userData = useSupabaseUser()

    let { data: portfolio, error } = await this.supabase
      .from('portfolio')
      .select('*')
      if (portfolio) {
        this.createdPortfolios = portfolio
        console.log(portfolio)
      }
    const secData = await $fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities.json')
    this.portfolios = secData.securities.data.map((el) => { return { short: el[0], name: el[2], price: el[3], type: el[7], quantity: 1 } }).filter(el => typeof el.price === 'number')
  },

  methods: {
    createPortfolio () {
      this.generatedPortfolio = []
      let parts = Math.floor(Math.random() * 6)
      if (parts < 2) {
        parts = 2
      }
      let totalAmount
      if (parts < 20) {
        totalAmount = this.createPortfolioForm.amount / (0.8 - parts / 100)
      } else {
        totalAmount = this.createPortfolioForm.amount / (1 - parts / 100)
      }
      console.log('all', totalAmount)
      for (let i = 0; i < parts; i++) {
        const partAmount = totalAmount / parts
        totalAmount = totalAmount - partAmount
        console.log('part', totalAmount)
        let num
        do {
          num = Math.floor(Math.random() * this.portfolios.length)
        } while (this.portfolios[num].price > partAmount)
        this.generatedPortfolio.push(
          {
            name: this.portfolios[num].name,
            short: this.portfolios[num].short,
            price: this.portfolios[num].price,
            quantity: Math.floor(partAmount / this.portfolios[num].price),
            totalPrice: Math.floor(partAmount / this.portfolios[num].price * this.portfolios[num].price)
          })
        console.log(`total: ${totalAmount}, part: ${partAmount}`)
      }
      this.pieChartSeries = this.generatedPortfolio.map((el) => { return el.totalPrice })
      this.options = {labels: this.generatedPortfolio.map((el) => { return el.name })} 
      console.log('custom', this.customPortfolio)
      console.log('custom for chart', this.customPortfolioChart)
      console.log('generated', this.generatedPortfolio)
    },
    async savePortfolio () {
      if (this.isGenerated === true) {
        const { data, error } = await this.supabase
        .from('portfolio')
        .insert([
          { portfolio_object: this.generatedPortfolioChart, user_id: this.userData.identities[0].user_id, name: this.portfolioName, description: this.portfolioDescription},
        ])
        this.confirmCreateDialog = false
      } else {
        const { data, error } = await this.supabase
        .from('portfolio')
        .insert([
          { portfolio_object: this.customPortfolioChart, user_id: this.userData.identities[0].user_id, name: this.portfolioName, description: this.portfolioDescription},
        ])
        this.confirmCreateDialog = false
      }

    },
    addNewSecurity () {
      this.customPortfolio.push({name: '', quantity: 1})
    }
  }
}
</script>