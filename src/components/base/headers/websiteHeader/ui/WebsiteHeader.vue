<script setup>
import { BaseSvg } from "@/components/base";
import { UiDropDown, BurgerMenu } from "@/components/ui";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useScrollLock } from "@/components/composable";
import { useRoute, useRouter } from 'vue-router';
import { useUrlQuery } from "@/components/composable";
import { BaseButtonText } from "@/components/base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Tr } from "@/I18n/index.js";


const { t, locale, availableLocales } = useI18n()
console.log(availableLocales)
const auth = getAuth();
const { setQueryParam } = useUrlQuery()
const route = useRoute();
const router = useRouter()
const burger = ref(false)
const dropdownTitle = locale.value
const currentUser = ref('')

onMounted(() => {
  checkAuth()
})

const supportedLocales = Tr.supportedLocales

const switchLanguage = async (event) => { // <--- 1
  const newLocale = event.target.value // <--- 2
  await Tr.switchLanguage(newLocale) // <--- 3
}


function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user.email
    } else {
      currentUser.value = ''
      console.log('Користувач не авторизований')
    }
  });
}

async function changeLang(e) {
  let lang = e
  if (e === 'ua') {
    lang = 'uk'
  }
  // locale.value = lang
  // router.replace({ query: { lang: lang } })
  // setQueryParam("lang", lang)
  await Tr.switchLanguage(lang)

  try {
    await router.replace({ params: { locale: lang } })
  } catch (e) {
    console.log(e)
    await router.push("/")
  }
}

function burgerChange(close) {
  if (close) {
    burger.value = !burger.value
  } else {
    burger.value = false
  }

  useScrollLock(burger.value)
}

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__main">
        <div class="header__row">
          <BaseButtonText @click="burgerChange(false)" class="header__logo hover active"
            :to="Tr.i18nRoute({ name: 'main' })">
            <BaseSvg id="logo" />

            <span>Kino <br> CMS</span>
          </BaseButtonText>

          <div class="header__search">
            <v-autocomplete hide-details="true" :label="t('vuetify.search')"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" variant="solo">
            </v-autocomplete>
          </div>

          <BurgerMenu showDesktop="true" @click="burgerChange" :open="burger" />
        </div>

        <div class="header__row header__menu" :class="{ header__menu_active: burger }">
          <ul class="header__pages">
            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'poster' })"> {{ t('websitePages.poster')
                }}</BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'schedule' })"> {{
                t('websitePages.schedule') }}</BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'soon' })"> {{ t('websitePages.soon') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'cinemas' })"> {{
                t('websitePages.cinemas') }}</BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'promotions' })"> {{
                t('websitePages.promotions') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'news' })"> {{ t('websitePages.news') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'advertisement' })"> {{
                t('websitePages.advertisement') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'cafe' })"> {{ t('websitePages.cafe') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText @click="burgerChange" :to="Tr.i18nRoute({ name: 'application' })"> {{
                t('websitePages.application') }}
              </BaseButtonText>
            </li>

            <li>
              <BaseButtonText v-if="currentUser.length === 0" @click="burgerChange"
                :to="Tr.i18nRoute({ name: 'authentication' })"> {{
                  t('websitePages.authentication') }}
              </BaseButtonText>

              <BaseButtonText v-else @click="burgerChange" :to="Tr.i18nRoute({ name: 'profile' })"> {{
                t('websitePages.profile') }}
              </BaseButtonText>
            </li>
          </ul>

          <div class="header__dropdown">
            <UiDropDown :title="dropdownTitle" :list="['ua', 'ru']" small="true" @submit="changeLang" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>



<style lang="scss" scoped>
@import './WebsiteHeader.scss';
</style>