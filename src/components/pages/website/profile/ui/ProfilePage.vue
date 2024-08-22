<script setup>
import { computed, reactive, ref } from 'vue'
import { BaseButtonText } from "@/components/base/index.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, getUser } from "@/components/mixins"
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";
import { useScrollLock } from "@/components/composable";
import { watch } from "vue";
import { onMounted } from "vue";
import { areObjectsEqual } from "@/components/mixins";
import { refreshSign } from "@/components/mixins";


let mainFirebaseData = {}
let contactsFirebaseData = {}
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const auth = getAuth();

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
  phone: '',
  password: '',
  nextPassword: ''
})

const signForm = ref({
  email: '',
  password: '',
})

const email = ref('');
const password = ref('');
const mainDataFormValid = ref(false);
const contactsDataFormValid = ref(false);
const signValid = ref(false);
const singDialog = ref(false)
const dateDialog = ref(false)
const bottomSheet = ref(false)
const date = ref(new Date())
const curDate = changeDateFormat(new Date())

onMounted(() => {
  getMainFormData()
  getContactsFormData()
})

watch(dateDialog, () => {
  scrollLock(dateDialog.value)
})

watch(singDialog, () => {
  scrollLock(singDialog.value)
})

watch(bottomSheet, () => {
  scrollLock(bottomSheet.value)
})

watch(date, () => {
  dateDialog.value = false
})

const dateFormat = computed(() => {
  const newDate = changeDateFormat(date.value)

  if (newDate !== curDate) {
    mainFormData.value.birthday = newDate
    return newDate
  }
  return ''
})

function scrollLock(boolean) {
  const { lockScroll, unlockScroll } = useScrollLock()

  if (boolean) {
    lockScroll()
  } else {
    unlockScroll()
  }
}

function changeDateFormat(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  return `${formattedMonth}-${formattedDay}-${year}`;
}

async function getMainFormData() {
  const user = await getUser()
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    mainFormData.value = docSnap.data()
    mainFirebaseData = docSnap.data()
    contactsData.value.spareEmail = docSnap.data().spareEmail
    contactsFirebaseData.spareEmail = docSnap.data().spareEmail
    mainFormData.value.name = user.displayName
    date.value = new Date(mainFirebaseData.birthday)
  }
}

async function getContactsFormData() {
  const user = await getUser()
  if (user) {
    contactsData.value.email = user.email
    contactsFirebaseData.email = user.email
  }
}

async function updateMainFormData() {

  console.log(mainFirebaseData)

  if (!areObjectsEqual(mainFirebaseData, mainFormData.value)) {
    const confirmed = confirm(t('pages.profile.changeData'));

    if (confirmed) {
      if (mainFormData.value.name !== '') {
        await updateProfile(auth.currentUser, {
          displayName: mainFormData.value.name,
        })
      }
      const user = await getUser()
      await setDoc(doc(db, "users", user.uid), mainFormData.value);
      await getMainFormData()
    }
  } else {
    bottomSheet.value = true
  }
}

async function updateContactsData() {
  const user = await getUser()
  const userEmail = user.email
  const userPhone = user.phoneNumber

  if (userEmail !== contactsData.value.email) {
    updateEmail(auth.currentUser, contactsData.value.email).then(() => {
      console.log('Пошту було змінено')
    }).catch((error) => {
      console.error(error)
    });
  }

  if (userPhone !== contactsData.value.phone) {
    console.log("Телефон был изменина")
  }

}

function checkSignIn() {
  refreshSign(signForm.value.email, signForm.value.password)
    .then(() => {
      updateContactsData()
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
        alert('Невірний логін або пароль')

        signForm.value.email = ''
        signForm.value.password = ''
      }
    });
}

function exitAccount() {
  if (confirm(t('pages.profile.alert'))) {
    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/authentication')
    }).catch((error) => {
      console.error(error)
    });
  }
}

function checkNewData() {
  if (!areObjectsEqual(contactsData.value, contactsFirebaseData, true)) {
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

////////////////////////////////////////////////////////////////////////////////////////////

const mainDataRules = {
  name: [
    value => value.length >= 3 || value.length === 0 || t('pages.profile.errors.name.one'),
    value => value.length <= 20 || t('pages.profile.errors.name.two'),
    value => /^[a-zа-яїєі]*$/i.test(value) || t('pages.profile.errors.name.three')
  ],
  phone: [
    value => {
      if (!value) return true;
      return /^(0\d{9}|380\d{9})$/.test(value) || t('pages.profile.errors.phone.one');
    }
  ],
  address: [
    value => value.length >= 3 || value.length === 0 || t('pages.profile.errors.address.one'),
    value => value.length <= 30 || t('pages.profile.errors.address.two'),
    value => /^[\s\wa-zа-яїєі.,/-]*$/i.test(value) || t('pages.profile.errors.address.three')
  ]
};

const contactsRules = {
  email: [
    value => !!value || t('pages.profile.errors.email.one'),
    value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('pages.profile.errors.email.two')
  ],
  spareEmail: [
    value => {
      if (!value) return true;
      return /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('pages.profile.errors.email.two')
    }
  ],
  password: [
    value => {
      if (value.length === 0) return true;
      return (value.length >= 6 && value.length <= 20) || t('pages.profile.errors.password.one');
    },
    value => /^[\w.]*$/i.test(value) || t('pages.profile.errors.password.three')
  ],
  nextPassword: [
    value => {
      if (!contactsData.value.password) return true; // Если исходный пароль пустой
      return value.length > 0 || t('pages.profile.errors.nextPassword.one');
    },
    value => value === contactsData.value.password || t('pages.profile.errors.nextPassword.two')
  ]
};

</script>

<template>
  <div class="profile">
    <div class="profile__content">
      <h1 class="profile__title">{{ $t('pages.profile.mainTitle') }}</h1>

      <div class="profile__main">
        <v-sheet class="mx-auto rounded mb-10">

          <v-form v-model="mainDataFormValid" fast-fail @submit.prevent="submitFormMainData">
            <v-container>
              <h2 class="profile__form-title">{{ $t('pages.profile.form.title.one') }}</h2>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mainFormData.name" :rules="mainDataRules.name"
                    :label="$t('pages.profile.form.name')" required variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="mainFormData.lastName" :rules="mainDataRules.name"
                    :label="$t('pages.profile.form.lastName')" required variant="solo-filled"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="mainFormData.nickName" :rules="mainDataRules.name"
                    :label="$t('pages.profile.form.nickName')" required variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="mainFormData.phone" :rules="mainDataRules.phone"
                    :label="$t('pages.profile.form.phone')" required variant="solo-filled"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols=" 12" md="6">
                  <v-text-field v-model="mainFormData.address" :rules="mainDataRules.address"
                    :label="$t('pages.profile.form.address')" required variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field @focus="dateDialog = true" v-model="dateFormat"
                    :label="$t('pages.profile.form.birthday')" required variant="solo-filled"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-select :label="$t('pages.profile.form.sex.title')" v-model="mainFormData.sex"
                    :items="[$t('pages.profile.form.sex.one'), $t('pages.profile.form.sex.two')]"
                    variant="solo-filled"></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select v-model="mainFormData.city" :label="$t('pages.profile.form.city.title')" :items="[
                    $t('pages.profile.form.city.kyiv'),
                    $t('pages.profile.form.city.lviv'),
                    $t('pages.profile.form.city.odessa'),
                    $t('pages.profile.form.city.dnipro'),
                    $t('pages.profile.form.city.kharkiv'),
                  ]" variant="solo-filled">
                  </v-select>
                </v-col>
              </v-row>

              <v-btn color="#2a2a2a" class="mt-5" type="submit" block>{{ $t('pages.profile.saveBtn')
                }}</v-btn>
            </v-container>
          </v-form>
        </v-sheet>

        <v-sheet class="mx-auto rounded ">
          <v-form v-model="contactsDataFormValid" fast-fail @submit.prevent="submitFormContactsData">
            <v-container>
              <h2 class="profile__form-title">{{ $t('pages.profile.form.title.two') }}</h2>

              <v-row>
                <v-col cols=" 12" md="6">
                  <v-text-field v-model="contactsData.email" :rules="contactsRules.email"
                    :label="$t('pages.profile.form.email')" variant="solo-filled"></v-text-field>
                </v-col>

                <v-col cols=" 12" md="6">
                  <v-text-field v-model="contactsData.spareEmail" :rules="contactsRules.spareEmail"
                    :label="$t('pages.profile.form.spareEmail')" variant="solo-filled"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="contactsData.password" type="password" :rules="contactsRules.password"
                    :label="$t('pages.profile.form.password')" variant="solo-filled">
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field v-model="contactsData.nextPassword" type="password" :rules="contactsRules.nextPassword"
                    :label="$t('pages.profile.form.nextPassword')" variant="solo-filled">
                  </v-text-field>
                </v-col>
              </v-row>

              <v-btn color="#2a2a2a" class="mt-5" type="submit" block>{{ $t('pages.profile.saveBtn') }}</v-btn>

              <v-btn color="#d32f2f" @click="exitAccount" class="mt-5" type="submit" block>{{
                $t('pages.profile.exitBtn') }}</v-btn>
            </v-container>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </div>

  <v-dialog v-model="dateDialog" width="auto">
    <v-date-picker v-model="date"></v-date-picker>
  </v-dialog>

  <v-dialog v-model="singDialog" width="auto">

    <div class="sing-dialog">
      <v-sheet class="mx-auto pa-5 rounded">
        <v-form v-model="signValid" fast-fail @submit.prevent="submitFormSingIn">
          <h3> {{ $t('pages.profile.signTitle') }}</h3>

          <v-text-field class="mb-4" variant="solo-filled" v-model="signForm.email" :rules="contactsRules.email"
            :label="$t('pages.auth.email')"></v-text-field>

          <v-text-field class="mb-4" type="password" variant="solo-filled" v-model="signForm.password"
            :rules="contactsRules.password" :label="$t('pages.auth.password')"></v-text-field>

          <v-btn color="#2a2a2a" class="mt-2" type="submit" block>{{ $t('pages.auth.authBtn') }}</v-btn>
        </v-form>
      </v-sheet>
    </div>

  </v-dialog>

  <v-bottom-sheet v-model="bottomSheet">
    <v-card :title="$t('pages.profile.bottomSheet.title')" :text="$t('pages.profile.bottomSheet.text')"></v-card>
  </v-bottom-sheet>
</template>

<style lang="scss" scoped>
@import './ProfilePage.scss';
</style>