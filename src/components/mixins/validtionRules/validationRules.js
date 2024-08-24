export const validationRules = (t, password = '') => ({
    name: [
        value => value.length >= 3 || value.length === 0 || t('validationRules.name.one'),
        value => value.length <= 20 || t('validationRules.name.two'),
        value => /^[a-zа-яїєі]*$/i.test(value) || t('validationRules.name.three')
    ],
    phone: [
        value => {
            if (!value) return true;
            return /^(0\d{9}|380\d{9})$/.test(value) || t('validationRules.phone.one');
        }
    ],
    address: [
        value => value.length >= 3 || value.length === 0 || t('validationRules.address.one'),
        value => value.length <= 30 || t('validationRules.address.two'),
        value => /^[\s\wa-zа-яїєі.,/-]*$/i.test(value) || t('validationRules.address.three')
    ],
    email: [
        value => !!value || t('validationRules.email.one'),
        value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('validationRules.email.two')
    ],
    spareEmail: [
        value => {
            if (!value) return true;
            return /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('validationRules.email.two')
        }
    ],
    password: [
        value => {
            if (value.length === 0) return true;
            return (value.length >= 6 && value.length <= 20) || t('validationRules.password.one');
        },
        value => /^[\w.]*$/i.test(value) || t('validationRules.password.three')
    ],
    necessarilyPassword: [
        value => {
            return (value.length >= 6 && value.length <= 20) || t('validationRules.password.one');
        },
        value => /^[\w.]*$/i.test(value) || t('validationRules.password.three')
    ],
    nextPassword: [
        value => {
            if (!password) return true;
            return value.length > 0 || t('validationRules.nextPassword.one');
        },
        value => value === password || t('validationRules.nextPassword.two')
    ]
});
