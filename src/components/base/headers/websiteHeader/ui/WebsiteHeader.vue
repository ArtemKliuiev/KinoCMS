<script setup>
import { BaseSvg } from "@/components/base";
import { UiMenu, UiDropDown, BurgerMenu } from "@/components/ui";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
//composible для localstorage
//RouterLink переделать на BaseButtonText

const burger = ref(false)
const { t, locale } = useI18n({ useScope: 'global' })
const dropdownTitle = locale.value

function changeLang(e) {
  locale.value = e
  localStorage.setItem('lang', locale.value)
}

</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__main">
        <div class="header__row">
          <RouterLink class="header__logo hover active" to="/">
            <BaseSvg id="logo" />

            <span>Kino <br> CMS</span>
          </RouterLink>

          <div class="header__search">
            <v-autocomplete hide-details="true" :label="t('vuetify.search')"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" variant="solo">
            </v-autocomplete>
          </div>

          <BurgerMenu showDesktop="true" @click="burger = !burger" :open="burger" />
        </div>

        <div class="header__row header__menu" :class="{ header__menu_active: burger }">
          <ul class="header__pages">
            <li>
              <RouterLink @click="burger = !burger" to="/poster"> {{ $t('websitePages.poster') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/schedule"> {{ $t('websitePages.schedule') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/soon"> {{ $t('websitePages.soon') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/cinemas"> {{ $t('websitePages.cinemas') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/promotions"> {{ $t('websitePages.promotions') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/news"> {{ $t('websitePages.news') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/advertisement"> {{ $t('websitePages.advertisement') }}
              </RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/cafe"> {{ $t('websitePages.cafe') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/application"> {{ $t('websitePages.application') }}</RouterLink>
            </li>

            <li>
              <RouterLink @click="burger = !burger" to="/authentication"> {{ $t('websitePages.authentication') }}
              </RouterLink>
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