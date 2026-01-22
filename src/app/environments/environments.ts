// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  serverUrl: `./`,
  build: '000001',
  version: 'dev-1.0.0',
  production: false,
  useHash: false,
  phanHe: 'VeterinaryClinic',
  authType: 'jwt', // Đã chuyển sang JWT
  api: {
    baseUrl: 'http://localhost:5278',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  // Đã xóa các cấu hình SSO, CAS, Keycloak không cần thiết
  pro: {
    theme: 'light',
    menu: 'side',
    contentWidth: 'fluid',
    fixedHeader: false,
    autoHideHeader: false,
    fixSiderbar: true,
    onlyIcon: false
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
