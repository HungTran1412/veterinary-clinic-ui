export interface MenuItem {
  text: string;
  i18n: string;
  icon?: string;
  link?: string;
  group?: boolean;
  hideInBreadcrumb?: boolean;
  acl?: string[];
  children?: MenuItem[];
}

export const SETTING_KEY_BUILD = `build`;

export const MENU_ITEMS: MenuItem[] = [
  {
    text: 'Trang chủ',
    i18n: 'menu.main',
    group: true,
    hideInBreadcrumb: true,
    children: [
      {
        text: 'Trang chủ',
        i18n: 'menu.dashboard',
        icon: 'anticon anticon-dashboard',
        link: '/dashboard'
      },
      {
        text: 'Nhật ký',
        i18n: 'menu.log',
        icon: 'anticon anticon-history',
        link: '/log/system',
        // acl: ['NHAT_KY_HE_THONG_VIEW', 'FORGOT_PASSWORD_LOG_VIEW', 'SEND_MAIL_LOG_VIEW'],
        children: [
          {
            text: 'Nhật ký hệ thống',
            i18n: 'menu.system-log',
            link: '/log/system',
            // acl: ['NHAT_KY_HE_THONG_VIEW']
          },
          {
            text: 'Nhật ký quên mật khẩu',
            i18n: 'menu.forgot-password-log',
            link: '/log/forgot-password',
            // acl: ['FORGOT_PASSWORD_LOG_VIEW']
          },
          {
            text: 'Nhật ký gửi mail',
            i18n: 'menu.email-log',
            link: '/log/email',
            // acl: ['SEND_MAIL_LOG_VIEW']
          }
        ]
      }
    ]
  }
];
