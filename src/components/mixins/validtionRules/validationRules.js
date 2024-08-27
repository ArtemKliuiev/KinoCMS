export const validationRules = (t, password = '') => ({
    name: [
        value => /^.{3,}$/.test(value) || value === '' || t('validationRules.name.one'),
        value => /^.{0,20}$/.test(value) || t('validationRules.name.two'),
        value => /^[a-zа-яїєі]*$/i.test(value) || t('validationRules.name.three')
    ],
    nickname: [
        value => /^.{3,}$/.test(value) || value === '' || t('validationRules.name.one'),
        value => /^.{0,20}$/.test(value) || t('validationRules.name.two'),
        value => /^[\wа-яїєі.-]*$/i.test(value) || t('validationRules.name.three')
    ],
    phone: [
        value => !value || /^(0\d{9}|380\d{9})$/.test(value) || t('validationRules.phone.one')
    ],
    address: [
        value => /^.{3,}$/.test(value) || value === '' || t('validationRules.address.one'),
        value => /^.{0,30}$/.test(value) || t('validationRules.address.two'),
        value => /^[\s\wa-zа-яїєі.,/-]*$/i.test(value) || t('validationRules.address.three')
    ],
    email: [
        value => !!value || t('validationRules.email.one'),
        value => /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('validationRules.email.two')
    ],
    spareEmail: [
        value => !value || /^[\w.-]{3,20}@[\wа-яіїє.-]{3,20}\.[a-z]{2,10}$/i.test(value) || t('validationRules.email.two')
    ],
    password: [
        value => /^.{0}$/.test(value) || /^.{6,20}$/.test(value) || t('validationRules.password.one'),
        value => /^[\w.]*$/i.test(value) || t('validationRules.password.three')
    ],
    necessarilyPassword: [
        value => /^.{6,20}$/.test(value) || t('validationRules.password.one'),
        value => /^[\w.]*$/i.test(value) || t('validationRules.password.three')
    ],
    nextPassword: [
        value => !password || /^.{1,}$/.test(value) || t('validationRules.nextPassword.one'),
        value => value === password || t('validationRules.nextPassword.two')
    ]
});
