<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__main">
        <div class="footer__column footer__application">
          <h3>{{ $t('footer.appTitle') }}</h3>

          <a class="footer__app" target="_blank" href="https://play.google.com/store/games?hl=ua">
            <v-icon icon="mdi mdi-google-play"></v-icon>

            <span>Google play</span>
          </a>

          <a class="footer__app" target="_blank" href="https://apps.apple.com/ru/developer/apple/id284417353?mt=12">
            <v-icon icon="mdi mdi-apple"></v-icon>

            <span>App store</span>
          </a>
        </div>

        <div class="footer__column footer__poster">
          <h3>{{ $t('footer.posterTitle') }}</h3>

          <div class="footer__links">
            <RouterLink to="/schedule">{{ $t('websitePages.schedule') }}</RouterLink>
            <RouterLink to="/soon">{{ $t('websitePages.soon') }}</RouterLink>
            <RouterLink to="/cinemas">{{ $t('websitePages.cinemas') }}</RouterLink>
            <RouterLink to="/promotions">{{ $t('websitePages.promotions') }}</RouterLink>
          </div>
        </div>

        <div class="footer__column footer__about-cinema">
          <h3>{{ $t('footer.aboutCinemaTitle') }}</h3>

          <div class="footer__links">
            <RouterLink to="/news">{{ $t('websitePages.news') }}</RouterLink>
            <RouterLink to="/advertisement">{{ $t('websitePages.advertisement') }}</RouterLink>
            <RouterLink to="/cafe">{{ $t('websitePages.cafe') }}</RouterLink>
            <RouterLink to="/">{{ $t('websitePages.contacts') }}</RouterLink>
          </div>
        </div>


        <div class="footer__column footer__social-networks">
          <h3>{{ $t('footer.socialTitle') }}</h3>

          <div class="footer__networks">
            <a class="footer__social-link" target="_blank" href="https://uk-ua.facebook.com/">

              <v-icon icon="mdi mdi-facebook"></v-icon>
            </a>

            <a class="footer__social-link" target="_blank" href="https://x.com/?lang=ru&mx=2">

              <v-icon icon="mdi mdi-twitter"></v-icon>
            </a>

            <a class="footer__social-link" target="_blank" href="https://www.instagram.com/">

              <v-icon icon="mdi mdi-instagram"></v-icon>
            </a>

            <a class="footer__social-link" target="_blank" href="https://www.linkedin.com/">

              <v-icon icon="mdi mdi-linkedin"></v-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom-line">
        <p>{{ $t('footer.bottomInfo') }}</p>

        <RouterLink to="/admin/statistics">{{ $t('footer.forAdmin') }}</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import './WebsiteFooter.scss';
</style>