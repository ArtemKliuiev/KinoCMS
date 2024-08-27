<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRoute } from "vue-router";
import { useDateFormat, useObjectsEqual } from "@/components/composable"
import { db, adminValidationRules } from "@/components/mixins";
import { UIBreadcrumbs } from "@/components/ui/index.js";

let userFirebaseData = {}
const rules = adminValidationRules()
const route = useRoute();
const uid = route.params.uid;
const userFormValid = ref(false)
const dateDialog = ref(false)
const date = ref(new Date())
const snackbar = ref(false)
const bottomSheet = ref(false)
const curDate = useDateFormat(new Date())
const breadcrumbs = [
    {
        title: 'Користувачі',
        to: '/admin/users'
    },
    {
        title: 'Редагування користувача',
        disabled: true
    }
]
const userFormData = ref({
    name: '',
    lastName: '',
    nickName: '',
    address: '',
    phone: '',
    sex: '',
    city: '',
    birthday: ''
})

onMounted(() => {
    getUserData()
})

const dateFormat = computed(() => {
    const newDate = useDateFormat(date.value)

    if (newDate !== curDate) {
        userFormData.value.birthday = newDate
        return newDate
    }
    return ''
})

watch(date, () => {
    dateDialog.value = false
})

async function getUserData() {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data().mainFormData

        if (data) {
            userFormData.value = data
            userFirebaseData = docSnap.data().mainFormData

            if (data.birthday) {
                date.value = new Date(userFirebaseData.birthday)
            }
        }
    }
}

async function updateMainFormData() {
    if (!useObjectsEqual(userFirebaseData, userFormData.value)) {
        const confirmed = confirm('Зберегти зміни');

        if (confirmed) {
            await setDoc(doc(db, "users", uid), {
                mainFormData: userFormData.value
            }, { merge: true });

            await getUserData()
        }

        snackbar.value = true
    } else {
        bottomSheet.value = true
    }
}


function submitUserFormValid() {
    if (userFormValid.value) {
        updateMainFormData()
    }
}

</script>

<template>
    <div class="user">
        <UIBreadcrumbs class="user__breadcrumbs" :breadcrumbs="breadcrumbs" />

        <h1 class="user__title">Редагування користувача</h1>

        <div class="user__form">
            <v-sheet class="mx-auto rounded">
                <v-form v-model="userFormValid" fast-fail @submit.prevent="submitUserFormValid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="userFormData.name" :rules="rules.name" label="Ім'я" required
                                    variant="solo-filled"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="userFormData.lastName" :rules="rules.name" label="Прізвище"
                                    required variant="solo-filled"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="userFormData.nickName" :rules="rules.nickname" label="nickname"
                                    required variant="solo-filled"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="userFormData.phone" :rules="rules.phone" label="Телефон" required
                                    variant="solo-filled"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols=" 12" md="6">
                                <v-text-field v-model="userFormData.address" :rules="rules.address" label="Адреса"
                                    required variant="solo-filled"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field @focus="dateDialog = true" v-model="dateFormat" label="День народження"
                                    required variant="solo-filled"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select label="Стать" v-model="userFormData.sex" :items="['Чоловік', 'Жінка']"
                                    variant="solo-filled"></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select v-model="userFormData.city" label="Місто" :items="[
                                    'Київ',
                                    'Львів',
                                    'Одеса',
                                    'Дніпро',
                                    'Харків',
                                ]" variant="solo-filled">
                                </v-select>
                            </v-col>
                        </v-row>

                        <v-btn color="#2a2a2a" class="mt-5" type="submit" block> Зберегти </v-btn>
                    </v-container>
                </v-form>
            </v-sheet>
        </div>
    </div>

    <v-dialog v-model="dateDialog" width="auto">
        <v-date-picker :max="curDate" v-model="date"></v-date-picker>
    </v-dialog>

    <v-snackbar multi-line timeout="1500" class="user__snackbar" color="#424242" v-model="snackbar">
        <p class="user__snackbar-text">Інформацію було оновлено і збережено</p>
    </v-snackbar>

    <v-bottom-sheet v-model="bottomSheet">
        <v-card title="Інформацію не змінено"
            text="Щоб зберегти зміни, спочатку внесіть будь-які зміни в інформацію. Переконайтеся, що ви заповнили необхідні поля або змінили існуючі дані, щоб їх можна було зберегти. Наразі жодних змін не було внесено, тому зберегти нічого не можна."></v-card>
    </v-bottom-sheet>
</template>

<style lang="scss" scoped>
@import './OneUserPage.scss';
</style>