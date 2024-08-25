import { createI18n } from "vue-i18n";
import uk from './uk.json'
import ru from './ru.json'

export const i18n = createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages:{ uk,ru }
})