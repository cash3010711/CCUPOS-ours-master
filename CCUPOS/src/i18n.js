import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


i18n
  .use(XHR)
  //.use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
     fallbackLng: 'zh-TW', // 未偵測到時的後備語系
     ns: ['common'], // 語系的 loading namespace 如語系檔案名稱 common.js
     defaultNS: 'common', // 預設的 namespace name
     debug: true,
     interpolation: {
       escapeValue: false // not needed for react!!
     },
     backend: {
        // 設定語系檔案的 server 路徑, 會以GET的方式跟 server 要檔案
        // lng = 語系代碼 ns = namespace
        "loadPath": "/locales/{{lng}}/{{ns}}.json"
      },

    // react i18next special options (optional)
      react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });


export default i18n;
