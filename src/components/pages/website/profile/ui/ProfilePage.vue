<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { getAuth, signOut, updatePassword, updateProfile, updateEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { validationRules, db, getUser, refreshSign } from "@/components/mixins";
import { useScrollLock, useObjectsEqual, useDateFormat } from "@/components/composable";


const { t } = useI18n()
const router = useRouter()
const auth = getAuth();
const mainFormSkeleton = ref(true)
const contactsFormSkeleton = ref(true)
const mainDataFormValid = ref(false);
const contactsDataFormValid = ref(false);
const signValid = ref(false);
const singDialog = ref(false)
const dateDialog = ref(false)
const bottomSheet = ref(false)
const snackbar = ref(false)
const date = ref(new Date())
const curDate = useDateFormat(new Date())
let mainFirebaseData = {}
let contactsFirebaseData = {}

const mainFormData = ref({
  name: '',
  lastName: '',
  nickName: '',
  address: '',
  phone: '',
  sex: '',
  city: '',
  birthday: ''
})
const contactsData = ref({
  email: '',
  spareEmail: '',
  password: '',
  nextPassword: ''
})
const signForm = ref({
  email: '',
  password: '',
})

onMounted(() => {
  getMainFormData()
  getContactsFormData()
})

const rules = computed(() => validationRules(t, contactsData.value.password));

const dateFormat = computed(() => {
  const newDate = useDateFormat(date.value)

  if (newDate !== curDate) {
    mainFormData.value.birthday = newDate
    return newDate
  }

  return ''
})

watch(dateDialog, () => {
  useScrollLock(dateDialog.value, true)
})

watch(singDialog, () => {
  useScrollLock(singDialog.value, true)
  cleanSignForm()
})

watch(bottomSheet, () => {
  useScrollLock(bottomSheet.value)
})

watch(date, () => {
  dateDialog.value = false
})

async function getMainFormData() {
  const user = await getUser()
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().mainFormData

    if (data) {
      mainFormData.value = data
      mainFirebaseData = docSnap.data().mainFormData 
      mainFormSkeleton.value = false

      if (data.birthday) {
        date.value = new Date(mainFirebaseData.birthday)
      }
    }
  }
}

async function getContactsFormData() {
  const user = await getUser()
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  cleanContactsForm()

  if(docSnap.data()){
    contactsFormSkeleton.value = false
  }

  if (docSnap.data().contactsFormData?.spareEmail) {
    contactsData.value.spareEmail = docSnap.data().contactsFormData.spareEmail
    contactsFirebaseData.spareEmail = docSnap.data().contactsFormData.spareEmail

  }

  if (user) {
    contactsData.value.email = user.email
    contactsFirebaseData.email = user.email
  }
}

async function updateMainFormData() {
  if (!useObjectsEqual(mainFirebaseData, mainFormData.value)) {
    const confirmed = confirm(t('pages.profile.changeData'));

    if (confirmed) {
      const user = await getUser()

      await setDoc(doc(db, "users", user.uid), {
        mainFormData: mainFormData.value
      }, { merge: true });

      await getMainFormData()
    }
  } else {
    bottomSheet.value = true
  }

  snackbar.value = true
}

async function updateContactsData() {
  singDialog.value = false
  const user = await getUser()
  const userEmail = user.email

  if (userEmail !== contactsData.value.email) {
    updateEmail(auth.currentUser, contactsData.value.email).then(() => {
      console.log('Пошту було змінено')
    }).catch((error) => {
      console.error(error)
    });

    await setDoc(doc(db, "users", user.uid), {
      contactsFormData: {
        email: contactsData.value.email
      }
    }, { merge: true });
  }

  if (contactsData.value.spareEmail !== contactsFirebaseData.spareEmail) {
    await setDoc(doc(db, "users", user.uid), {
      contactsFormData: {
        spareEmail: contactsData.value.spareEmail
      }
    }, { merge: true });
  }

  if (contactsData.value.password.length !== 0) {
    const user = auth.currentUser;
    const newPassword = contactsData.value.password;

    updatePassword(user, newPassword).then(() => {
    }).catch((error) => {
      console.error(error)
    });
  }

  snackbar.value = true

  await getContactsFormData()
}

function checkSignIn() {
  refreshSign(signForm.value.email, signForm.value.password)
    .then(() => {
      updateContactsData()
    })
    .catch(error => {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/missing-password' ||
        error.code === 'auth/user-mismatch'
      ) {
        alert(t('pages.profile.alert.wrongLogin'))
      } else if (error.code === 'auth/too-many-requests') {
        alert(t('pages.profile.alert.tooManyRequests'))
      } else {
        alert(t('pages.profile.alert.errorLogin'))
      }
    });
}

function cleanSignForm() {
  signForm.value = {
    email: '',
    password: ''
  }
}

function cleanContactsForm() {
  contactsData.value = {
    email: '',
    spareEmail: '',
    password: '',
    nextPassword: ''
  }
}

function exitAccount() {
  if (confirm(t('pages.profile.alert.exit'))) {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/authentication')
    }).catch((error) => {
      console.error(error)
    });
  }
}

function checkNewData() {
  if (!useObjectsEqual(contactsData.value, contactsFirebaseData, true)) {
    singDialog.value = true
  } else {
    bottomSheet.value = true
  }
}

function submitFormMainData() {
  if (mainDataFormValid.value) {
    updateMainFormData()
  }
}

function submitFormContactsData() {
  if (contactsDataFormValid.value) {
    checkNewData()
  }
}

function submitFormSingIn() {
  if (signValid.value) {
    checkSignIn()
  }
}

</script>

<template>
  <div class="profile">
    <div class="profile__content">
      <h1 class="profile__title">{{ t('pages.profile.mainTitle') }}</h1>

      <div class="profile__main">
        <v-sheet class="mx-auto rounded mb-10">

          <v-form v-model="mainDataFormValid" fast-fail @submit.prevent="submitFormMainData">
            <v-container>
              <h2 class="profile__form-title">{{ t('pages.profile.form.title.one') }}</h2>

              <div v-if="mainFormSkeleton" class="profile__skeleton">
                <v-row >
                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px"></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px"></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px"></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col cols="12" md="6" class="mb-4">
                    <v-skeleton-loader width="100%" height="56px"></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-4">
                    <v-skeleton-loader width="100%" height="56px" class="mb-3"></v-skeleton-loader>
                  </v-col>
                </v-row>
              </div>

              <div v-else class="profile__form">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="mainFormData.name" :rules="rules.name" :label="t('pages.profile.form.name')"
                      required variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="mainFormData.lastName" :rules="rules.name"
                      :label="t('pages.profile.form.lastName')" required variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="mainFormData.nickName" :rules="rules.nickname"
                      :label="t('pages.profile.form.nickName')" required variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="mainFormData.phone" :rules="rules.phone" :label="t('pages.profile.form.phone')"
                      required variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols=" 12" md="6">
                    <v-text-field v-model="mainFormData.address" :rules="rules.address"
                      :label="t('pages.profile.form.address')" required variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field @focus="dateDialog = true" v-model="dateFormat"
                      :label="t('pages.profile.form.birthday')" required variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-select :label="t('pages.profile.form.sex.title')" v-model="mainFormData.sex"
                      :items="[t('pages.profile.form.sex.one'), t('pages.profile.form.sex.two')]"
                      variant="solo-filled"></v-select>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select v-model="mainFormData.city" :label="t('pages.profile.form.city.title')" :items="[
                      t('pages.profile.form.city.kyiv'),
                      t('pages.profile.form.city.lviv'),
                      t('pages.profile.form.city.odessa'),
                      t('pages.profile.form.city.dnipro'),
                      t('pages.profile.form.city.kharkiv'),
                    ]" variant="solo-filled">
                    </v-select>
                  </v-col>
                </v-row>
              </div>

              <v-btn color="#2a2a2a" class="mt-5" type="submit" block>{{ t('pages.profile.saveBtn')
                }}</v-btn>
            </v-container>
          </v-form>
        </v-sheet>

        <v-sheet class="mx-auto rounded ">
          <v-form v-model="contactsDataFormValid" fast-fail @submit.prevent="submitFormContactsData">
            <v-container>
              <h2 class="profile__form-title">{{ t('pages.profile.form.title.two') }}</h2>

              <div v-if="contactsFormSkeleton" class="profile__skeleton">
                <v-row>
                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>
                </v-row>

                <v-row >
                  <v-col cols="12" md="6" class="mb-5">
                    <v-skeleton-loader width="100%" height="56px" ></v-skeleton-loader>
                  </v-col>

                  <v-col cols="12" md="6" class="mb-6">
                    <v-skeleton-loader width="100%" height="56px"></v-skeleton-loader>
                  </v-col>
                </v-row>
              </div>

              <div v-else class="profile__form">
                <v-row>
                  <v-col cols=" 12" md="6">
                    <v-text-field v-model="contactsData.email" :rules="rules.email" :label="t('pages.profile.form.email')"
                      variant="solo-filled"></v-text-field>
                  </v-col>

                  <v-col cols=" 12" md="6">
                    <v-text-field v-model="contactsData.spareEmail" :rules="rules.spareEmail"
                      :label="t('pages.profile.form.spareEmail')" variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="contactsData.password" type="password" :rules="rules.password"
                      :label="t('pages.profile.form.password')" variant="solo-filled">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model="contactsData.nextPassword" type="password" :rules="rules.nextPassword"
                      :label="t('pages.profile.form.nextPassword')" variant="solo-filled">
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>


              <v-btn color="#2a2a2a" class="mt-5" type="submit" block>{{ t('pages.profile.saveBtn') }}</v-btn>

              <v-btn color="#d32f2f" @click="exitAccount" class="mt-5" block>{{
                t('pages.profile.exitBtn') }}</v-btn>
            </v-container>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </div>

  <v-dialog v-model="dateDialog" width="auto">
    <v-date-picker :max="curDate" v-model="date"></v-date-picker>
  </v-dialog>

  <v-dialog v-model="singDialog" width="auto">

    <div class="sing-dialog">
      <v-sheet class="mx-auto pa-5 rounded">
        <v-form v-model="signValid" fast-fail @submit.prevent="submitFormSingIn">
          <h3> {{ t('pages.profile.signTitle') }}</h3>

          <v-text-field class="mb-4" variant="solo-filled" v-model="signForm.email" :rules="rules.email"
            :label="t('pages.auth.email')"></v-text-field>

          <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="signForm.password"
            :rules="rules.necessarilyPassword" :label="t('pages.auth.password')"></v-text-field>

          <v-btn color="#2a2a2a" class="mt-2" type="submit" block>{{ t('pages.profile.saveBtn') }}</v-btn>
        </v-form>
      </v-sheet>
    </div>

  </v-dialog>

  <v-snackbar multi-line timeout="1500" class="profile__snackbar" color="#424242" v-model="snackbar">
    <div class="profile__snackbar-text">
      {{ t('pages.profile.snackbar.text') }}
    </div>
  </v-snackbar>

  <v-bottom-sheet v-model="bottomSheet">
    <v-card :title="t('pages.profile.bottomSheet.title')" :text="t('pages.profile.bottomSheet.text')"></v-card>
  </v-bottom-sheet>
</template>

<style lang="scss" scoped>
@import './ProfilePage.scss';
</style>