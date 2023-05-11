<template>
  <v-app>
    <v-main>
      <div>
        <v-card
          flat
          style="margin-left: 8vw; margin-right: 8vw; background-color: transparent;"
        >
          <v-row
            no-gutters
            class="d-flex flex-column"
          >
            <h1
            class="mt-4">Калькуляторы</h1>
            <v-card>
              <v-tabs
                v-model="calculator"
                color="deep-purple-accent-4"
                align-tabs="center"
              >
                <v-tab value="mortgage">Ипотека</v-tab>
                <v-tab value="credit">Кредит</v-tab>
                <v-tab value="investment">Инвестиции</v-tab>
              </v-tabs>

              <v-card-text>
                <v-window v-model="calculator">
                  <v-window-item value="mortgage">
                    <v-row>
                      <v-col
                        cols="12"
                        lg="6"
                      >
                        <h2>Ипотечный калькулятор</h2>
                        <v-text-field
                          class="mt-4"
                          v-model="mortgageCalc.percentage"
                          suffix="%"
                          hide-details
                          label="Процент ипотеки"
                          outlined
                        />
                        <v-slider
                          v-model="mortgageCalc.percentage"
                          class="mt-4"
                          min="3"
                          max="30"
                          step="0.1"
                          :thumb-label="true"
                          thumb-color="green"
                          label="%"
                        />
                        <v-text-field
                          class="mt-4"
                          v-model="mortgageTotal"
                          hide-details
                          suffix="₽"
                          label="Стоимость недвижимости"
                          outlined
                        />
                        <v-slider
                          v-model="mortgageCalc.total"
                          class="mt-8"
                          min="500000"
                          max="30000000"
                          step="100000"
                          label="₽"
                        />
                        <v-text-field
                          class="mt-4"
                          v-model="mortgageInitialFee"
                          hide-details
                          suffix="₽"
                          label="Первоначальный взнос"
                          outlined
                        />
                        <v-slider
                          v-model="mortgageCalc.initialFee"
                          class="mt-8"
                          :min="mortgageCalc.total / 100 * 15"
                          :max="mortgageCalc.total / 100 * 95"
                          step="100000"
                          label="₽"
                        />
                        <v-text-field
                          class="mt-4"
                          v-model="mortgageCalc.duration"
                          hide-details
                          suffix="лет"
                          label="Срок ипотеки"
                          outlined
                        />
                        <v-slider
                          v-model="mortgageCalc.duration"
                          class="mt-8"
                          step="1"
                          min="1"
                          :max="30"
                          label="лет"
                        />
                      </v-col>
                      <v-spacer />
                      <v-col
                        cols="12"
                        lg="6"
                      >
                        <p
                          class="mb-2"
                        >
                          Ежемесячный платеж
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(mortgagePayment) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Размер ипотеки
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(totalPayment) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Переплата
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(overPay) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Переплата в процентах
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(overPayPercentage) }}% </h1>
                      </v-col>
                    </v-row>
                  </v-window-item>
                  <v-window-item value="credit">
                    <v-row>
                      <v-col
                        cols="12"
                        lg="6"
                      >
                        <h2>Кредитный калькулятор</h2>
                        <v-text-field
                          class="mt-4"
                          v-model="creditCalc.percentage"
                          suffix="%"
                          hide-details
                          label="Процент кредита"
                          outlined
                        />
                        <v-slider
                          v-model="creditCalc.percentage"
                          class="mt-4"
                          min="3"
                          max="30"
                          step="0.1"
                          :thumb-label="true"
                          thumb-color="green"
                          label="%"
                        />
                        <v-text-field
                          v-model="creditTotal"
                          hide-details
                          label="Сумма кредита"
                          suffix="₽"
                          outlined
                        />
                        <v-slider
                          v-model="creditCalc.total"
                          class="mt-8"
                          min="30000"
                          max="3000000"
                          step="10000"
                          label="₽"
                        />
                        <v-text-field
                          v-model="creditCalc.duration"
                          hide-details
                          label="Срок кредита"
                          suffix="лет"
                          outlined
                        />
                        <v-slider
                          v-model="creditCalc.duration"
                          class="mt-8"
                          step="0.25"
                          min="1"
                          :max="30"
                          label="лет"
                        />
                      </v-col>
                      <v-spacer />
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <p
                          class="mb-2"
                        >
                          Ежемесячный платеж
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(creditPayment) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Размер кредита
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(creditCalc.total) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Переплата
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(creditOverPay) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Переплата в процентах
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(creditOverPayPercentage) }}% </h1>
                      </v-col>
                    </v-row>
                  </v-window-item>

                  <v-window-item value="investment">
                    <v-row>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <h2>Калькулятор инвестиций</h2>
                        <v-text-field
                          v-model="investmentCalc.percentage"
                          class="mt-4"
                          suffix="%"
                          hide-details
                          label="Процент инвестиций"
                          outlined
                        />
                        <v-slider
                          v-model="investmentCalc.percentage"
                          class="mt-4"
                          min="3"
                          max="30"
                          step="0.1"
                          :thumb-label="true"
                          thumb-color="green"
                          label="%"
                        />
                        <v-text-field
                          v-model="initialInvestment"
                          hide-details
                          suffix="₽"
                          label="Первоначальные вложения"
                          outlined
                        />
                        <v-slider
                          v-model="investmentCalc.total"
                          class="mt-8"
                          min="5000"
                          max="1000000"
                          step="5000"
                          label="₽"
                        />
                        <v-checkbox label="С реинвестициями" v-model="investmentCalc.withReinvestments" hide-details></v-checkbox>
                        <v-text-field
                          v-model="investmentCalc.reinvestmentsValue"
                          :disabled="!investmentCalc.withReinvestments"
                          hide-details
                          suffix="₽"
                          label="Реинвестиции в месяц"
                          outlined
                        />
                        <v-slider
                          v-model="investmentCalc.reinvestmentsValue"
                          :disabled="!investmentCalc.withReinvestments"
                          class="mt-4"
                          min="0"
                          max="100000"
                          step="500"
                          label="₽"
                        />
                        <v-text-field
                          v-model="investmentCalc.duration"
                          hide-details
                          suffix="лет"
                          label="Срок инвестиций"
                          outlined
                        />
                        <v-slider
                          v-model="investmentCalc.duration"
                          class="mt-8"
                          step="1"
                          min="1"
                          :max="30"
                          label="лет"
                        />
                      </v-col>
                      <v-spacer />
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <p
                          class="my-2 mt-6"
                        >
                          Итоговая сумма
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(totalInvestment) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Итого от первонального вложения
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(initialInvestmentWithInterest) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Итого от реинвестиций
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(totalReinvestedWithInterest) }} </h1>
                        <p
                          class="my-2 mt-6"
                        >
                          Прибыль в процентах
                        </p>
                        <h1> {{ new Intl.NumberFormat().format(investmentProfitPercentage) }}% </h1>
                      </v-col>
                      <v-col
                      cols="12">
                      <apexchart type="bar" :options="options" :series="series"></apexchart>
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
            <v-spacer />
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
  const calculator:any = ref(null)
  const mortgageCalc  = reactive(
     {
        percentage: 3,
        total: 500000,
        initialFee: 75000,
        duration: 1
      }
  )
  watch(() => mortgageCalc.total, () => {
    if (mortgageCalc.initialFee > mortgageCalc.total) {
      mortgageCalc.initialFee = mortgageCalc.total / 100 * 85
    }
  })
  const mortgageTotal = computed(() => new Intl.NumberFormat().format(mortgageCalc.total))
  const mortgageInitialFee = computed(() => new Intl.NumberFormat().format(mortgageCalc.initialFee))
  const totalPayment = computed(() => mortgageCalc.total - mortgageCalc.initialFee)
  const overPay = computed(() => totalPayment.value * (mortgageCalc.percentage / 100) * mortgageCalc.duration)
  const overPayPercentage = computed(() => totalPayment.value / totalPayment.value * (mortgageCalc.percentage) * mortgageCalc.duration)
  const durationInMonths = computed(() => mortgageCalc.duration * 12)
  const mortgagePayment = computed(() => Math.floor((totalPayment.value + totalPayment.value * (mortgageCalc.percentage / 100) * mortgageCalc.duration) / durationInMonths.value))
  
  const creditCalc  = reactive(
     {
        percentage: 3,
        total: 30000,
        duration: 1
      }
  )
  const creditTotal = computed(() => new Intl.NumberFormat().format(creditCalc.total))
  const creditOverPay = computed(() => creditCalc.total * (creditCalc.percentage / 100) * creditCalc.duration)
  const creditOverPayPercentage = computed(() => creditCalc.total / creditCalc.total * (creditCalc.percentage) * creditCalc.duration)
  const creditDurationInMonths = computed(() => creditCalc.duration * 12)
  const creditPayment = computed(() => Math.floor((creditCalc.total + creditCalc.total * (creditCalc.percentage / 100) * creditCalc.duration) / creditDurationInMonths.value))

  const investmentCalc = reactive(
    {
      percentage: 10,
      total: 10000,
      duration: 10,
      withReinvestments: false,
      reinvestmentsValue: 0
    }
  )
  watch(() => investmentCalc.withReinvestments, () => {
    if (investmentCalc.withReinvestments === false) {
      reinvestmentsBuffer.value = investmentCalc.reinvestmentsValue
      investmentCalc.reinvestmentsValue = 0
    } else {
      investmentCalc.reinvestmentsValue = reinvestmentsBuffer.value
    }
  })

  const reinvestmentsBuffer = ref(0)

  const initialInvestment = computed(() => new Intl.NumberFormat().format(investmentCalc.total))
  const totalReinvested = computed(() => investmentCalc.reinvestmentsValue * 12 * investmentCalc.duration)
  const initialInvestmentWithInterest = computed(() => investmentCalc.total * Math.pow(1 + investmentCalc.percentage / 100, investmentCalc.duration))
  const totalReinvestedWithInterest = computed(() => (investmentCalc.reinvestmentsValue * 12 * ((Math.pow(1 + investmentCalc.percentage / 100, investmentCalc.duration)) - 1))/(investmentCalc.percentage / 100))
  const totalInvestment = computed(() => initialInvestmentWithInterest.value + totalReinvestedWithInterest.value)
  const investmentProfitPercentage = computed(() => totalInvestment.value / (investmentCalc.total + totalReinvested.value) * 100 - 100)
  
  let dates: number[] = reactive([])
  let investmentsPerDates: number[] = reactive([])
  let reinvestmentsPerDates: number[] = reactive([])

  watch(() => investmentCalc, () => {

      dates = []
      investmentsPerDates = []
      reinvestmentsPerDates = []

    for (let i = 0; i < investmentCalc.duration + 1; i++) {
      investmentsPerDates.push(Math.floor(investmentCalc.total * Math.pow(1 + investmentCalc.percentage / 100, i)))
    }
    series[0].data = investmentsPerDates
    for (let i = 0; i < investmentCalc.duration + 1; i++) {
      reinvestmentsPerDates.push(Math.floor((investmentCalc.reinvestmentsValue * 12 * ((Math.pow(1 + investmentCalc.percentage / 100, i)) - 1))/(investmentCalc.percentage / 100)))
    }
    series[1].data = reinvestmentsPerDates
    for (let i = 0; i < investmentCalc.duration + 1; i++) {
      dates.push(new Date().getFullYear() + i)
    }
    console.log(dates)
    options.xaxis.categories = dates
  },
  {deep: true})

  const options = reactive(
    {
      chart: {
        id: 'vuechart-example',
        stacked: true,
      },
      xaxis: {
        categories: Array.from({length:31},(v,k)=>k+2023)
      }
    }
  )
  const series = reactive(
    [{
      name: 'Первоначальные вложения',
      data: investmentsPerDates
    },
    {
      name: 'Реинвестиции',
      data: reinvestmentsPerDates
    }]
  )
</script>