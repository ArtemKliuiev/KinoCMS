<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BaseButtonText } from "@/components/base/index.js";
import {validationRules} from "@/components/mixins/index.js";

const { t } = useI18n({ useScope: 'global' })
const rules = validationRules(t)
const router = useRouter()
const email = ref('artem.klu@gamil.com');
const password = ref('artem1999');
const formValid = ref(false);

async function submitForm() {
  if (formValid.value) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.push('/profile')
      })
      .catch((error) => {
        console.error(error)
      });
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__content">
      <h1 class="auth__title">{{ $t('pages.auth.mainTitle') }}</h1>

      <div class="auth__main">
        <v-sheet class="mx-auto pa-3 rounded">
          <v-form v-model="formValid" fast-fail @submit.prevent="submitForm">
            <v-text-field class="mb-4" variant="solo-filled" v-model="email" :rules="rules.email"
              :label="$t('pages.auth.email')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="password" :rules="rules.necessarilyPassword"
              :label="$t('pages.auth.password')"></v-text-field>

            <v-btn color="#2a2a2a" class="mt-2" type="submit" block>{{ $t('pages.auth.authBtn') }}</v-btn>

            <p class="auth__bottom-info">{{ $t('pages.auth.signTitle') }}? <BaseButtonText to="/registration">
                <span>{{ $t('pages.auth.signBtn') }}</span>
              </BaseButtonText>
            </p>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './AuthPage.scss';
</style>