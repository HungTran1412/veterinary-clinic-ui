import { ColDef } from 'ag-grid-community';

import { IColumnDefConfig, ITableConfig } from '../interfaces';

/**
 * Helper utilities để làm việc với Grid Configuration
 */
export class GridConfigHelper {
  /**
   * Chuyển đổi IColumnDefConfig thành AG Grid ColDef
   *
   * @param columnConfig - Cấu hình cột từ API
   * @returns AG Grid column definition
   */
  static toAgGridColDef(columnConfig: IColumnDefConfig): ColDef {
    const colDef: ColDef = {
      headerName: columnConfig.headerName,
      field: columnConfig.field
    };

    // Chỉ thêm các thuộc tính nếu chúng được định nghĩa
    if (columnConfig.colId !== undefined) {
      colDef.colId = columnConfig.colId;
    }

    if (columnConfig.width !== undefined) {
      colDef.width = columnConfig.width;
    }

    if (columnConfig.flex !== undefined) {
      colDef.flex = columnConfig.flex;
    }

    if (columnConfig.hide !== undefined) {
      colDef.hide = columnConfig.hide;
    }

    if (columnConfig.pinned !== undefined) {
      colDef.pinned = columnConfig.pinned as 'left' | 'right' | null;
    }

    if (columnConfig.sort !== undefined) {
      colDef.sort = columnConfig.sort as 'asc' | 'desc' | null;
    }

    if (columnConfig.sortIndex !== undefined) {
      colDef.sortIndex = columnConfig.sortIndex;
    }

    if (columnConfig.aggFunc !== undefined) {
      colDef.aggFunc = columnConfig.aggFunc;
    }

    if (columnConfig.pivot !== undefined) {
      colDef.pivot = columnConfig.pivot;
    }

    if (columnConfig.pivotIndex !== undefined) {
      colDef.pivotIndex = columnConfig.pivotIndex;
    }

    if (columnConfig.rowGroup !== undefined) {
      colDef.rowGroup = columnConfig.rowGroup;
    }

    if (columnConfig.rowGroupIndex !== undefined) {
      colDef.rowGroupIndex = columnConfig.rowGroupIndex;
    }

    return colDef;
  }

  /**
   * Chuyển đổi mảng IColumnDefConfig thành mảng AG Grid ColDef
   *
   * @param columnConfigs - Mảng cấu hình cột từ API
   * @returns Mảng AG Grid column definitions
   */
  static toAgGridColDefs(columnConfigs: IColumnDefConfig[]): ColDef[] {
    return columnConfigs.map(config => GridConfigHelper.toAgGridColDef(config));
  }

  /**
   * Chuyển đổi ITableConfig thành AG Grid ColDef array
   *
   * @param tableConfig - Cấu hình bảng từ API
   * @returns Mảng AG Grid column definitions
   */
  static tableConfigToColDefs(tableConfig: ITableConfig): ColDef[] {
    return GridConfigHelper.toAgGridColDefs(tableConfig.columnDefsConfig);
  }

  /**
   * Merge cấu hình từ API với cấu hình mặc định
   * Cấu hình từ API sẽ override cấu hình mặc định
   *
   * @param defaultColDefs - Cấu hình mặc định
   * @param apiColumnConfigs - Cấu hình từ API
   * @returns Mảng column definitions đã được merge
   */
  static mergeWithDefaultConfig(defaultColDefs: ColDef[], apiColumnConfigs: IColumnDefConfig[]): ColDef[] {
    const apiColDefs = GridConfigHelper.toAgGridColDefs(apiColumnConfigs);
    const apiFieldMap = new Map(apiColDefs.map(col => [col.field, col]));

    return defaultColDefs.map(defaultCol => {
      const apiCol = apiFieldMap.get(defaultCol.field || '');
      if (apiCol) {
        // Merge: API config override default config
        return { ...defaultCol, ...apiCol };
      }
      return defaultCol;
    });
  }

  /**
   * Merge thông minh cấu hình từ server với cấu hình mặc định trong component
   *
   * Logic merge:
   * - Nếu columnSystem (từ server) có dữ liệu, sử dụng làm base
   * - Với mỗi cột trong columnSystem, tìm cột tương ứng trong defaultColDefs theo field
   * - Merge các thuộc tính:
   *   + Ưu tiên giá trị từ columnSystem cho các thuộc tính hiển thị (width, flex, hide, pinned, sort, headerName, v.v.)
   *   + Giữ nguyên các thuộc tính kỹ thuật từ defaultColDefs mà columnSystem không có
   *     (cellRenderer, headerCheckboxSelection, checkboxSelection, valueGetter, valueFormatter, v.v.)
   * - Nếu columnSystem là null/undefined, sử dụng hoàn toàn defaultColDefs
   *
   * @param defaultColDefs - Cấu hình mặc định từ component (chứa đầy đủ thuộc tính kỹ thuật)
   * @param columnSystem - Cấu hình động từ server (có thể null/undefined)
   * @returns Mảng column definitions đã được merge thông minh
   */
  static mergeServerWithDefault(defaultColDefs: ColDef[], columnSystem: IColumnDefConfig[] | null | undefined): ColDef[] {
    // Nếu không có cấu hình từ server, sử dụng hoàn toàn cấu hình mặc định
    if (!columnSystem || columnSystem.length === 0) {
      return defaultColDefs;
    }

    // Tạo Map từ defaultColDefs để tra cứu nhanh theo field
    const defaultFieldMap = new Map(defaultColDefs.map(col => [col.field, col]));

    // Danh sách các thuộc tính hiển thị từ server (sẽ override default)
    const displayProperties = [
      'headerName',
      'width',
      'minWidth',
      'maxWidth',
      'flex',
      'hide',
      'pinned',
      'sort',
      'sortIndex',
      'aggFunc',
      'pivot',
      'pivotIndex',
      'rowGroup',
      'rowGroupIndex',
      'colId'
    ];

    // Merge từng cột từ server với cột mặc định
    const mergedColumns = columnSystem.map(serverCol => {
      const defaultCol = defaultFieldMap.get(serverCol.field);

      if (!defaultCol) {
        // Nếu không tìm thấy cột mặc định, chỉ sử dụng cấu hình từ server
        return GridConfigHelper.toAgGridColDef(serverCol);
      }

      // Bắt đầu với cấu hình mặc định (giữ nguyên tất cả thuộc tính kỹ thuật)
      const mergedCol: ColDef = { ...defaultCol };

      // Override các thuộc tính hiển thị từ server (nếu có)
      displayProperties.forEach(prop => {
        if (serverCol[prop as keyof IColumnDefConfig] !== undefined) {
          (mergedCol as any)[prop] = serverCol[prop as keyof IColumnDefConfig];
        }
      });

      return mergedCol;
    });

    // Thêm các cột chỉ có trong defaultColDefs nhưng không có trong columnSystem
    const serverFieldSet = new Set(columnSystem.map(col => col.field));
    const onlyInDefault = defaultColDefs.filter(col => !serverFieldSet.has(col.field || ''));

    return [...mergedColumns, ...onlyInDefault];
  }

  /**
   * Lọc các cột theo điều kiện
   *
   * @param columnConfigs - Mảng cấu hình cột
   * @param predicate - Hàm điều kiện lọc
   * @returns Mảng cấu hình cột đã lọc
   */
  static filterColumns(columnConfigs: IColumnDefConfig[], predicate: (col: IColumnDefConfig) => boolean): IColumnDefConfig[] {
    return columnConfigs.filter(predicate);
  }

  /**
   * Lấy các cột hiển thị (không bị ẩn)
   *
   * @param columnConfigs - Mảng cấu hình cột
   * @returns Mảng cấu hình cột hiển thị
   */
  static getVisibleColumns(columnConfigs: IColumnDefConfig[]): IColumnDefConfig[] {
    return GridConfigHelper.filterColumns(columnConfigs, col => !col.hide);
  }

  /**
   * Sắp xếp các cột theo sortIndex
   *
   * @param columnConfigs - Mảng cấu hình cột
   * @returns Mảng cấu hình cột đã sắp xếp
   */
  static sortColumnsBySortIndex(columnConfigs: IColumnDefConfig[]): IColumnDefConfig[] {
    return [...columnConfigs].sort((a, b) => {
      const indexA = a.sortIndex ?? Number.MAX_SAFE_INTEGER;
      const indexB = b.sortIndex ?? Number.MAX_SAFE_INTEGER;
      return indexA - indexB;
    });
  }
}
