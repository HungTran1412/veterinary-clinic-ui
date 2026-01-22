/**
 * Interface cho cấu hình column definition
 */
export interface IColumnDefConfig {
  /** Tên hiển thị của cột */
  headerName: string;

  /** Tên trường dữ liệu */
  field: string;

  /** Hàm tổng hợp (aggregation function) */
  aggFunc?: string;

  /** ID của cột */
  colId?: string;

  /** Độ co giãn của cột */
  flex?: number;

  /** Ẩn/hiện cột */
  hide?: boolean;

  /** Ghim cột (left/right) */
  pinned?: string;

  /** Bật chế độ pivot */
  pivot?: boolean;

  /** Thứ tự pivot */
  pivotIndex?: number;

  /** Bật chế độ nhóm hàng */
  rowGroup?: boolean;

  /** Thứ tự nhóm hàng */
  rowGroupIndex?: number;

  /** Kiểu sắp xếp (asc/desc) */
  sort?: string;

  /** Thứ tự sắp xếp */
  sortIndex?: number;

  /** Độ rộng cố định của cột */
  width?: number;

  /** Độ rộng tối thiểu của cột */
  minWidth?: number;

  /** Độ rộng tối đa của cột */
  maxWidth?: number;
}

/**
 * Interface cho cấu hình bảng
 */
export interface ITableConfig {
  /** ID phân hệ */
  phanHeId: number;

  /** Tên module */
  module: string;

  /** Tên component */
  component: string;

  /** Tên bảng */
  tableName: string;

  /** Danh sách cấu hình các cột */
  columnDefsConfig: IColumnDefConfig[];
}
