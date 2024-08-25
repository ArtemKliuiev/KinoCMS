import { i18n } from "./main.js"

export const Tr = {
    get currentLocale() {
        return i18n.global.locale.value
    },

    i18nRoute(to) {
        return {
            ...to,
            params: {
                locale: Tr.currentLocale,
                ...to.params
            }
        }
    },

    async routeMiddleware(to, _from, next) {
        const paramLocale = to.params.locale

        if(!Tr.isLocaleSupported(paramLocale)) {
            return next(Tr.guessDefaultLocale())
        }
        await Tr.switchLanguage(paramLocale)

        return next()
    },

    get defaultLocale() {
        return import.meta.env.VITE_DEFAULT_LOCALE
    },

    guessDefaultLocale() {
        const userPersistedLocale = Tr.getPersistedLocale()
        if(userPersistedLocale) {
            return userPersistedLocale
        }
        const userPreferredLocale = Tr.getUserLocale()
        if (Tr.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (Tr.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return Tr.defaultLocale
    },

    isLocaleSupported(locale) { // <--- 1
        return Tr.supportedLocales.includes(locale)
    },
    getUserLocale() { // <--- 2
        const locale = window.navigator.language ||
            window.navigator.userLanguage ||
            Tr.defaultLocale
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() { // <--- 3
        const persistedLocale = localStorage.getItem("locale")
        if(Tr.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },

    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
    },

    set currentLocale(newLocale) { // <--- 2
        i18n.global.locale.value = newLocale
    },
    async switchLanguage(newLocale) { // <--- 3
        Tr.currentLocale = newLocale
        document.querySelector("html").setAttribute("lang", newLocale)
        localStorage.setItem("locale", newLocale)
    },
}