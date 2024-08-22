<script setup>
import { onMounted, ref } from 'vue'
import { BaseButtonText } from "@/components/base/index.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const name = ref('');
const email = ref('');
const password = ref('');
const nextPassword = ref('')
const formValid = ref(false);




async function registration() {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user

    await updateProfile(user, {
      displayName: name.value,
    });

    const userCred = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log('Користувача зареєстровано та оновлено:', user);
  } catch (error) {
    registrationError(error)

    return false
  }

  return true
}

function registrationError(error) {
  console.error('Помилка реєстрації:', error);

  if (error.code === 'auth/email-already-in-use') {
    alert(t('pages.registration.alerts.wrongEmail'))
  } else if (error.code === 'auth/weak-password') {
    alert(t('pages.registration.alerts.wrongPassword'))
  } else {
    alert(t('pages.registration.alerts.wrongRegistration'))
  }
}

const nameRules = [
  value => !!value || t('pages.registration.errors.name.one'),
  value => value.length >= 3 || t('pages.registration.errors.name.two'),
  value => /^[a-zа-яїєі]*$/i.test(value) || t('pages.registration.errors.name.three')
]

const emailRules = [
  value => !!value || t('pages.registration.errors.email.one'),
  value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('pages.registration.errors.email.two')
]

const passwordRules = [
  value => !!value || t('pages.registration.errors.password.one'),
  value => value.length >= 6 || t('pages.registration.errors.password.two'),
  value => value.length <= 20 || t('pages.registration.errors.password.three'),
  value => /^[\w.]{6,20}$/i.test(value) || t('pages.registration.errors.password.four')
]


const nextPasswordRules = [
  value => !!value || t('pages.registration.errors.nextPassword.one'),
  value => value === password.value || t('pages.registration.errors.nextPassword.two')
]

async function submitForm() {
  if (formValid.value) {
    const successSend = await registration()
    if (successSend) {
      router.push('/profile')
    }
  }
}



</script>

<template>
  <div class="registration">
    <div class="registration__content">
      <h1 class="registration__title">{{ $t('pages.registration.mainTitle') }}</h1>

      <div class="registration__main">
        <v-sheet class="mx-auto pa-3 rounded">
          <v-form v-model="formValid" fast-fail @submit.prevent="submitForm">
            <v-text-field class="mb-4" variant="solo-filled" v-model="name" :rules="nameRules"
              :label="$t('pages.registration.name')"></v-text-field>

            <v-text-field class="mb-4" variant="solo-filled" v-model="email" :rules="emailRules"
              :label="$t('pages.registration.email')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="password" :rules="passwordRules"
              :label="$t('pages.registration.password')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="nextPassword"
              :rules="nextPasswordRules" :label="$t('pages.registration.nextPassword')"></v-text-field>

            <v-btn color="#2a2a2a" class="mt-2" type="submit" block>{{ $t('pages.registration.registrationBtn')
              }}</v-btn>

            <p class="registration__bottom-info">{{ $t('pages.registration.signTitle') }}? <BaseButtonText
                to="/authentication">
                <span>{{ $t('pages.registration.signBtn') }}</span>
              </BaseButtonText>
            </p>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './RegistrationPage.scss';
</style>
