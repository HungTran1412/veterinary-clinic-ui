// import { Layout, MenuInner } from '@delon/theme'; // Bỏ vì không dùng NG-ALAIN

export type ProLayoutTheme = 'light' | 'dark';
export type ProLayoutMenu = 'side' | 'top';
export type ProLayoutContentWidth = 'fluid' | 'fixed';

export interface ProLayout {
  collapsed: boolean; // Thêm thuộc tính này
  lang: string; // Thêm thuộc tính này nếu cần (cho i18n)

  theme: ProLayoutTheme;
  /**
   * menu position
   */
  menu: ProLayoutMenu;
  /**
   * layout of content, only works when menu is top
   */
  contentWidth: ProLayoutContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  /**
   * Only icon of menu
   * Limited to a temporary solution [#2183](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2183)
   */
  onlyIcon: boolean;
  /**
   * Color weak
   */
  colorWeak: boolean;
}

// Bỏ ProMenu vì chưa cần thiết hoặc định nghĩa lại nếu cần
/*
export interface ProMenu extends MenuInner {
  id: number;
  parent_id: number;
  _parent?: ProMenu | null;
  children?: ProMenu[];
}
*/
