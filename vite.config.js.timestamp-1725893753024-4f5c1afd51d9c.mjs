// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/mrklu/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/KinoCMS/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/mrklu/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/KinoCMS/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve, dirname } from "node:path";
import VueI18nPlugin from "file:///C:/Users/mrklu/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/KinoCMS/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/mrklu/OneDrive/%D0%A0%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%B9%20%D1%81%D1%82%D1%96%D0%BB/KinoCMS/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./src/i18n/locales/**")
      // provide a path to the folder where you'll store translation data (see below)
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtcmtsdVxcXFxPbmVEcml2ZVxcXFxcdTA0MjBcdTA0M0VcdTA0MzFcdTA0M0VcdTA0NDdcdTA0MzhcdTA0MzkgXHUwNDQxXHUwNDQyXHUwNDU2XHUwNDNCXFxcXEtpbm9DTVNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1ya2x1XFxcXE9uZURyaXZlXFxcXFx1MDQyMFx1MDQzRVx1MDQzMVx1MDQzRVx1MDQ0N1x1MDQzOFx1MDQzOSBcdTA0NDFcdTA0NDJcdTA0NTZcdTA0M0JcXFxcS2lub0NNU1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbXJrbHUvT25lRHJpdmUvJUQwJUEwJUQwJUJFJUQwJUIxJUQwJUJFJUQxJTg3JUQwJUI4JUQwJUI5JTIwJUQxJTgxJUQxJTgyJUQxJTk2JUQwJUJCL0tpbm9DTVMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUsIGRpcm5hbWUgfSBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCBWdWVJMThuUGx1Z2luIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgVnVlSTE4blBsdWdpbih7XHJcbiAgICAgIGluY2x1ZGU6IHJlc29sdmUoZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpLCAnLi9zcmMvaTE4bi9sb2NhbGVzLyoqJyksIC8vIHByb3ZpZGUgYSBwYXRoIHRvIHRoZSBmb2xkZXIgd2hlcmUgeW91J2xsIHN0b3JlIHRyYW5zbGF0aW9uIGRhdGEgKHNlZSBiZWxvdylcclxuICAgIH0pXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFNBQVMsZUFBZSxXQUFXO0FBQzlaLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLFNBQVMsZUFBZTtBQUNqQyxPQUFPLG1CQUFtQjtBQUppTCxJQUFNLDJDQUEyQztBQU01UCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixjQUFjO0FBQUEsTUFDWixTQUFTLFFBQVEsUUFBUSxjQUFjLHdDQUFlLENBQUMsR0FBRyx1QkFBdUI7QUFBQTtBQUFBLElBQ25GLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
