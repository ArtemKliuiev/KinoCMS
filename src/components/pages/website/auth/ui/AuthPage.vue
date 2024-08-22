<script setup>
import { ref } from 'vue'
import { BaseButtonText } from "@/components/base/index.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const email = ref('');
const password = ref('');
const formValid = ref(false);

async function signIn() {

}

const emailRules = [
  value => !!value || t('pages.auth.errors.email.one'),
  value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('pages.auth.errors.email.two')
]

const passwordRules = [
  value => !!value || t('pages.auth.errors.password.one'),
  value => value.length >= 6 || t('pages.auth.errors.password.two'),
  value => value.length <= 20 || t('pages.auth.errors.password.three'),
  value => /^[\w.]{6,20}$/i.test(value) || t('pages.auth.errors.password.four')
]

async function submitForm() {
  if (formValid.value) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push('/profile')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
            <v-text-field class="mb-4" variant="solo-filled" v-model="email" :rules="emailRules"
              :label="$t('pages.auth.email')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="password" :rules="passwordRules"
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