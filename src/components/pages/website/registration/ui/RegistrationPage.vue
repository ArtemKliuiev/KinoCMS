<script setup>
import { computed, ref } from 'vue'
import { BaseButtonText } from "@/components/base";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/components/mixins";
import { validationRules } from "@/components/mixins/index.js";
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { Tr } from "@/I18n/index.js";

const { t } = useI18n()
const router = useRouter()
const formValid = ref(false);
const registrationForm = ref({
  name: '',
  email: '',
  password: '',
  nextPassword: ''
})

const rules = computed(() => validationRules(t, registrationForm.value.password))

async function registration() {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registrationForm.value.email, registrationForm.value.password);
    const user = userCredential.user

    await setDoc(doc(db, "users", user.uid), {
      role: "user",
      uid: user.uid,
      mainFormData: {
        name: registrationForm.value.name
      }
    });
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

async function submitForm() {
  if (formValid.value) {
    const successSend = await registration()
    if (successSend) {
      await router.push(Tr.i18nRoute({ name: 'profile' }))
    }
  }
}

</script>

<template>
  <div class="registration">
    <div class="registration__content">
      <h1 class="registration__title">{{ t('pages.registration.mainTitle') }}</h1>

      <div class="registration__main">
        <v-sheet class="mx-auto pa-3 rounded">
          <v-form v-model="formValid" fast-fail @submit.prevent="submitForm">
            <v-text-field class="mb-4" variant="solo-filled" v-model="registrationForm.name" :rules="rules.name"
              :label="t('pages.registration.name')"></v-text-field>

            <v-text-field class="mb-4" variant="solo-filled" v-model="registrationForm.email" :rules="rules.email"
              :label="t('pages.registration.email')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="registrationForm.password"
              :rules="rules.necessarilyPassword" :label="t('pages.registration.password')"></v-text-field>

            <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="registrationForm.nextPassword"
              :rules="rules.nextPassword" :label="t('pages.registration.nextPassword')"></v-text-field>

            <v-btn color="#2a2a2a" class="mt-2" type="submit" block>{{ t('pages.registration.registrationBtn')
              }}</v-btn>

            <p class="registration__bottom-info">{{ t('pages.registration.signTitle') }}? <BaseButtonText
                :to="Tr.i18nRoute({ name: 'authentication' })">
                <span>{{ t('pages.registration.signBtn') }}</span>
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
