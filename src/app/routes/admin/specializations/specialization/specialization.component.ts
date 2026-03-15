import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { I18NService } from '@/app/shared-ui/core/i18n/i18n.service';
import { ButtonModel, GridModel, QueryFilterModel } from '@/app/models';
import {
  EVENT_TYPE,
  FORM_TYPE,
  OVERLAY_LOADING_TEMPLATE,
  OVERLAY_NOROW_TEMPLATE,
  PAGE_SIZE_OPTION_DEFAULT,
  QUERY_FILTER_DEFAULT,
} from '@/app/utils';
import { ColDef } from 'ag-grid-community';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';

import { SpecializationApiService } from '@/app/services/specialization-api.service';
import { SpecializationItemComponent } from '../specialization-item/specialization-item.component';
import { BtnCellRenderComponent } from '@/app/shared/ag-grid/cell-render/btn-cell-render/btn-cell-render.component';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.less']
})
export class SpecializationComponent implements OnInit {
  @ViewChild(SpecializationItemComponent, { static: false })
  itemModal!: SpecializationItemComponent;

  form: FormGroup;
  filter: QueryFilterModel = { ...QUERY_FILTER_DEFAULT };
  pageSizeOptions: any[] = [];

  columnDefs: ColDef[];
  grid: GridModel = { dataCount: 0, rowData: [], totalData: 0 };
  private gridApi: any;
  private gridColumnApi: any;
  defaultColDef: any;
  rowSelection = 'multiple';
  overlayLoadingTemplate = OVERLAY_LOADING_TEMPLATE;
  overlayNoRowsTemplate = OVERLAY_NOROW_TEMPLATE;

  frameworkComponents: any;

  btnAdd: ButtonModel;
  btnDelete: ButtonModel;
  btnResetSearch: ButtonModel;
  btnSearch: ButtonModel;
  btnReload: ButtonModel;

  isLoading = false;
  title = 'Quản lý chuyên ngành';

  modal: any = { type: '', item: {}, isShow: false, option: {} };

  constructor(
    private specializationApiService: SpecializationApiService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18NService,
    private fb: FormBuilder,
  ) {
    this.columnDefs = [
      { field: 'index', headerName: 'STT', width: 80, pinned: 'left' },
      { field: 'code', headerName: 'Mã', minWidth: 120, flex: 1 },
      { field: 'name', headerName: 'Tên', minWidth: 150, flex: 1 },
      { field: 'description', headerName: 'Mô tả', minWidth: 200, flex: 1 },
      {
        headerName: 'Thao tác',
        minWidth: 120,
        cellRenderer: 'btnCellRender',
        cellRendererParams: {
          infoClicked: (item: any) => this.onViewItem(item),
          editClicked: (item: any) => this.onEditItem(item),
          deleteClicked: (item: any) => this.onDeleteItem(item),
        },
      },
    ];

    this.defaultColDef = { minWidth: 100, resizable: true, sortable: true };
    this.frameworkComponents = { btnCellRender: BtnCellRenderComponent };

    this.form = this.fb.group({ textSearch: [null] });

    this.btnAdd = {
      title: 'Thêm mới',
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.onAddItem(),
    };
    this.btnDelete = {
      title: 'Xóa',
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.onDeleteItem(),
    };
    this.btnSearch = {
      title: 'Tìm kiếm',
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.initGridData(),
    };
    this.btnResetSearch = {
      title: 'Làm mới',
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.onResetSearch(false),
    };
    this.btnReload = {
      title: 'Tải lại',
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.onResetSearch(true),
    };
  }

  ngOnInit(): void {
    this.initRightOfUser();
  }

  initRightOfUser(): void {
    this.btnAdd.grandAccess = true;
    this.btnDelete.grandAccess = true;
  }

  onModalEventEmmit(event: any): void {
    this.modal.isShow = false;
    if (event.type === EVENT_TYPE.SUCCESS) {
      this.initGridData();
    }
  }

  goBack(): void {
    window.history.back();
  }

  onAddItem() {
    this.itemModal.isVisible = true;
    this.itemModal.initData({}, FORM_TYPE.ADD);
  }

  onEditItem(item: any) {
    this.itemModal.isVisible = true;
    this.itemModal.initData(item, FORM_TYPE.EDIT);
  }

  onViewItem(item: any) {
    this.itemModal.isVisible = true;
    this.itemModal.initData(item, FORM_TYPE.INFO);
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.initGridData();
  }

  onPageSizeChange(): void {
    this.initGridData();
  }
  onPageNumberChange(): void {
    this.initGridData();
  }
  onCellDoubleClicked($event: any): void {
    this.onViewItem($event.data);
  }
  onSelectionChanged($event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.btnDelete.visible = selectedRows.length > 0;
  }

  onResetSearch(reloadData: boolean): void {
    this.filter.pageNumber = 1;
    this.form.get('textSearch')?.setValue('');
    if (reloadData) {
      this.initGridData();
    }
  }

  initGridData(): void {
    this.isLoading = true;
    this.gridApi?.showLoadingOverlay();

    this.filter.textSearch = this.form.get('textSearch')?.value ?? '';

    this.specializationApiService.getFilter(this.filter).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.data) {
          const dataResult = res.data;
          let i = (this.filter.pageSize ?? 0) * ((this.filter.pageNumber ?? 0) - 1);

          for (const item of dataResult.data) {
            item.index = ++i;
            item.infoGrantAccess = true;
            item.editGrantAccess = true;
            item.deleteGrantAccess = true;
          }

          this.grid.totalData = dataResult.totalCount;
          this.grid.dataCount = dataResult.dataCount;
          this.grid.rowData = dataResult.data;
        }
        this.changeDetectorRef.detectChanges();
      },
      error: (err: any) => {
        this.gridApi?.hideOverlay();
        this.notification.error('Lỗi', err.error?.message || 'Lỗi tải dữ liệu');
        this.isLoading = false;
      },
      complete: () => {
        this.gridApi?.hideOverlay();
        this.isLoading = false;
      },
    });
  }

  onDeleteItem(item: any = null): void {
    const selectedIds = item ? [item.id] : this.gridApi.getSelectedRows().map((r: any) => r.id);
    if (selectedIds.length === 0) {
      this.notification.warning('Thông báo', 'Vui lòng chọn ít nhất một dòng để xóa.');
      return;
    }

    this.modalService.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa ${selectedIds.length} mục đã chọn?`,
      nzOnOk: () => this.deleteItems(selectedIds),
    });
  }

  deleteItems(ids: any[]): void {
    this.isLoading = true;
    const deletePromises = ids.map((id) => this.specializationApiService.delete(id).toPromise());
    Promise.all(deletePromises)
      .then(() => {
        this.notification.success('Thành công', 'Xóa thành công');
        this.initGridData();
      })
      .catch((err) => {
        this.isLoading = false;
        this.notification.error('Lỗi', err.error?.message || 'Có lỗi khi xóa');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
