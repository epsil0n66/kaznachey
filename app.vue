<template>
  <v-app light>
  <v-app-bar
    app
    color="white"
    elevation="1"
  >
    <div
      class="d-none d-lg-block"
      style="width:10vw"
    />
    <p
      style="font-weight: 800; color:#1867C0; font-size: 30px; line-height: 28px; margin: 0; letter-spacing: -3px; cursor: pointer;"
      @click="$router.push('/')"
    >
      Казначей
    </p>
    <v-spacer />
    <NuxtLink
    :to="'/login'">
      
    </NuxtLink>
    <button
        v-for="(item, index) in navLinks"
        :key="index"
        color="black"
        class="text-sm-body-2 text-lg-body-1"
        style="line-height:64px; margin: 0 2vw 0"
        @click="$router.push(item.to)"
      >
        {{ item.name }}
      </button>
    <v-spacer />
    <v-col
      class="d-flex align-center"
    >
    <img
    v-if="profile"
    :src="profile"
    style="height: 35px; width: 35px; border-radius: 12px;"
    class="mr-3"/>
    <span v-if="name">{{ name }}</span>
    <v-btn color="blue" v-if="user" @click="logout">logout</v-btn>
    <v-btn color="success" v-else @click="login">sign in</v-btn>
    </v-col>
  </v-app-bar>
  <v-main
  ><NuxtPage />
  </v-main>
  <v-footer
    color="#1F1F1F"
  >
  </v-footer>
</v-app>
</template>
<script setup lang="ts">

  const navLinks = [
      { name: 'Главная', to: '/stocks' },
      { name: 'Калькуляторы', to: '/calculators' },
      { name: 'Портфели', to: '/profile/dashboard' }
  ]
  const supabase = useSupabaseClient()

  const user = useSupabaseUser()

  const name = computed(() => user.value?.user_metadata.full_name)

  const profile = computed(() => user.value?.user_metadata.avatar_url)

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) {
      console.error(error)
    }

  }
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    } 
  }

</script>
