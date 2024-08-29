export const adminValidationRules = ( password = '') => ({
    file: [
        (value) => {
            if (!value || !value[0]) return true;

            const file = value[0];

            if (file.type.startsWith('image/')) {
                if (file.type === 'image/gif') {
                    return 'GIF не підтримується. Можна завантажувати тільки зображення.';
                }
                return true;
            }

            return 'Можна завантажувати тільки зображення.';
        },
        (value) => {
            if (!value || !value[0]) return true;

            const file = value[0];
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (file.size > maxSize) {
                return 'Максимальний розмір файлу 5 МБ.';
            }
            return true;
        }
    ],
    necessarilyFile: [
        (value) => {
            if (!value || value.length === 0) {
                return 'Файл обов’язковий.';
            }

            const file = value[0];

            if (file.type.startsWith('image/')) {
                if (file.type === 'image/gif') {
                    return 'GIF не підтримується. Можна завантажувати тільки зображення.';
                }
                return true;
            }

            return 'Можна завантажувати тільки зображення.';
        },
        (value) => {
            if (!value || value.length === 0) return true;

            const file = value[0];
            const maxSize = 5 * 1024 * 1024; // 5 MB

            if (file.size > maxSize) {
                return 'Максимальний розмір файлу 5 МБ.';
            }
            return true;
        }
    ],
    url: [
        value => {
            console.log(value)
            return value || 'Додайте посилання'
        },
        value => {
        console.log(value)
            return value || 'Додайте посилання'
        }
    ],
    name: [
        value => /^.{3,}$/.test(value) || value === '' || "Ім'я має містити не менше 3 символів.",
        value => /^.{0,20}$/.test(value) || "Ім'я має містити не більше 20 символів.",
        value => /^[a-zа-яїєі]*$/i.test(value) || "Ім'я може містити тільки літери."
    ],
    nickname: [
        value => /^.{3,}$/.test(value) || value === '' || "Nickname має містити не менше 3 символів.",
        value => /^.{0,20}$/.test(value) || "Nickname має містити не більше 20 символів.",
        value => /^[\wа-яїєі.-]*$/i.test(value) || "Nickname може містити тільки літери та символи '.-'."
    ],
    phone: [
        value => !value || /^(0\d{9}|380\d{9})$/.test(value) || "Введіть дійсний номер телефону."
    ],
    address: [
        value => /^.{3,}$/.test(value) || value === '' || "Адреса має містити не менше 3 символів.",
        value => /^.{0,30}$/.test(value) || "Адреса має містити не більше 30 символів.",
        value => /^[\s\wa-zа-яїєі.,/-]*$/i.test(value) || "Адреса може містити тільки літери, цифри та (.,/-)."
    ],
    email: [
        value => !!value || "Електронна пошта не може бути порожньою.",
        value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || "Введіть дійсну електронну адресу."
    ],
    spareEmail: [
        value => !value || /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || "Введіть дійсну електронну адресу."
    ],
    password: [
        value => /^.{0}$/.test(value) || /^.{6,20}$/.test(value) || "Пароль має містити від 6 до 20 символів.",
        value => /^[\w.]*$/i.test(value) || "Пароль може містити тільки літери, цифри та крапки."
    ],
    necessarilyPassword: [
        value => /^.{6,20}$/.test(value) || "Пароль має містити від 6 до 20 символів.",
        value => /^[\w.]*$/i.test(value) || "Пароль може містити тільки літери, цифри та крапки."
    ],
    nextPassword: [
        value => !password || /^.{1,}$/.test(value) || "Введіть підтвердження пароля.",
        value => value === password || "Паролі не збігаються."
    ]
});
