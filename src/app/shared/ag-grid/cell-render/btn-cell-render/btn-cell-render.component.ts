import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

import { IButtonConfig } from '@/app/shared-ui/interfaces/button.interface';

@Component({
  selector: 'app-btn-cell-render',
  templateUrl: './btn-cell-render.component.html'
})
export class BtnCellRenderComponent implements ICellRendererAngularComp {
  constructor() {}

  params: any;
  visibleButtons: IButtonConfig[] = [];
  directButtons: IButtonConfig[] = [];
  dropdownButtons: IButtonConfig[] = [];
  visibleProcess: boolean = false;

  refresh(params: any): boolean {
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

  agInit(params: any): void {
    this.params = params;
    this.initializeButtons();
  }

  private initializeButtons(): void {
    const allButtons: IButtonConfig[] = [
      {
        condition: this.params.data.previewGrantAccess,
        icon: 'eye',
        title: 'Xem trước',
        handler: this.btnPreviewClickedHandler.bind(this),
        type: 'default',
        class: 'btn-info'
      },
      {
        condition: this.params.data.infoGrantAccess,
        icon: 'info-circle',
        title: 'Chi tiết',
        handler: this.btnInfoClickedHandler.bind(this),
        type: 'default',
        class: 'btn-info'
      },
      {
        condition: this.params.data.viewFieldGrantAccess,
        icon: 'unordered-list',
        title: 'Xem Field',
        handler: this.btnViewFieldClickedHandler.bind(this),
        type: 'default',
        class: 'btn-success'
      },
      {
        condition: this.params.data.editGrantAccess,
        icon: 'edit',
        title: 'Cập nhật',
        handler: this.btnEditClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.assignClassGrantAccess,
        icon: 'usergroup-add',
        title: 'Gán lớp quản lý',
        handler: this.btnAssignClassClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.deleteGrantAccess,
        icon: 'delete',
        title: 'Xóa',
        handler: this.btnDeleteClickedHandler.bind(this),
        type: 'danger'
      },
      {
        condition: this.params.data.sendMailForgotPasswordGrantAccess,
        icon: 'mail',
        title: 'Gửi mail cập nhật mật khẩu',
        handler: this.btnSendMailForgotPasswordClickedHandler.bind(this),
        type: 'danger'
      },
      {
        condition: this.params.data.addUserRoleGrantAccess,
        icon: 'idcard',
        title: 'Phân quyền nhóm người dùng',
        handler: this.btnAddUserRoleClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.userGroupAddGrantAccess,
        icon: 'usergroup-add',
        title: 'Phân quyền người dùng',
        handler: this.btnUpdateUserRole.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.addPermissionGrantAccess,
        icon: 'partition',
        title: 'Phân quyền chức năng',
        handler: this.btnAddPermissionClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.syncDataGrantAccess,
        icon: 'sync',
        title: 'Đồng bộ dữ liệu',
        handler: this.btnSyncDataClickedHandler.bind(this),
        type: 'primary'
      },
      {
        condition: this.params.data.viewHistoryWorkflowGrantAccess,
        icon: 'history',
        title: 'Xem lịch sử phê duyệt',
        handler: this.btnViewHistoryWorkflowClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-history'
      },
      {
        condition: this.params.data.exportGrantAccess,
        icon: 'download',
        title: 'In quyết định',
        handler: this.btnExportClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      },
      {
        condition: this.params.data.printGrantAccess,
        icon: 'printer',
        title: 'In PDF',
        handler: this.btnPrintClickedHandler.bind(this),
        type: 'primary',
        class: 'btn-secondary'
      }
    ];

    this.visibleButtons = allButtons.filter(btn => btn.condition);
    const hasProcessWorkflow = this.params.data.processWorkflowGrantAccess;
    const totalButtons = this.visibleButtons.length + (hasProcessWorkflow ? 1 : 0);

    if (totalButtons <= 3) {
      this.directButtons = this.visibleButtons;
      this.dropdownButtons = [];
    } else {
      const maxDirectButtons = hasProcessWorkflow ? 1 : 2;
      this.directButtons = this.visibleButtons.slice(0, maxDirectButtons);
      this.dropdownButtons = this.visibleButtons.slice(maxDirectButtons);
    }
  }

  onShowPopover(): void {
    this.visibleProcess = true;
  }

  btnProcessWorkflowClickedHandler(command: any): any {
    this.params.processWorkflowClicked(this.params.data, command);
  }

  btnViewHistoryWorkflowClickedHandler($event: any): any {
    this.params.viewHistoryWorkflowClicked(this.params.data);
  }

  btnPreviewClickedHandler($event: any): any {
    this.params.previewClicked(this.params.data);
  }

  btnInfoClickedHandler($event: any): any {
    this.params.infoClicked(this.params.data);
  }

  btnEditClickedHandler($event: any): any {
    this.params.editClicked(this.params.data);
  }

  btnAssignClassClickedHandler($event: any): any {
    this.params.assignClassClicked(this.params.data);
  }
  btnDeleteClickedHandler($event: any): any {
    this.params.deleteClicked(this.params.data);
  }

  btnSendMailForgotPasswordClickedHandler($event: any): any {
    this.params.sendMailForgotPasswordClicked(this.params.data);
  }

  btnRecordHistoryClickedHandler($event: any): any {
    this.params.historyRecordsClicked(this.params.data);
  }

  btnUpdateStatusReceiOrRejectRecordsClickedHandler($event: any): any {
    this.params.updateStatusReceiOrRejectRecordsClicked(this.params.data);
  }

  btnLockClickedHandler($event: any): any {
    this.params.lockClicked(this.params.data);
  }

  btnUnLockClickedHandler($event: any): any {
    this.params.unlockClicked(this.params.data);
  }

  btnUpdateRoleRecordClickedHandler($event: any): any {
    this.params.updateRecordAuthorizedClicked(this.params.data);
  }

  btnAddUserRoleClickedHandler($event: any): any {
    this.params.addUserRoleClicked(this.params.data);
  }

  btnAddRoleClickedHandler($event: any): any {
    this.params.addRoleClicked(this.params.data);
  }

  btnUpdateUserRole($event: any): any {
    this.params.btnUpdateUserRole(this.params.data);
  }

  btnAddPermissionClickedHandler($event: any): any {
    this.params.addPermissionClickedHandler(this.params.data);
  }

  btnAddRoleApiClickedHandler($event: any): any {
    this.params.addRoleApiClickedHandler(this.params.data);
  }

  btnAddMenuClickedHandler($event: any): any {
    this.params.addMenuClickedHandler(this.params.data);
  }

  btnPrintRecordsClickedHandler($event: any): any {
    this.params.printRecordsClicked(this.params.data);
  }

  btnMoveToEndClickedHandler($event: any): any {
    this.params.moveToEndClicked(this.params.data);
  }

  btnMoveToProcessedClickedHandler($event: any): any {
    this.params.moveToProcessedClicked(this.params.data);
  }

  btnMoveToProcessingClickedHandler($event: any): any {
    this.params.moveToProcessingClicked(this.params.data);
  }

  btnCheckMenuClickedHandler($event: any): any {
    this.params.addMenuClickedHandler(this.params.data);
  }

  btnSyncDataClickedHandler($event: any): any {
    this.params.syncDataClicked(this.params.data);
  }

  btnViewFieldClickedHandler($event: any): any {
    if (this.params.viewFieldClicked) {
      this.params.viewFieldClicked(this.params.data);
    }
  }

  btnExportClickedHandler($event: any): any {
    this.params.exportClicked(this.params.data);
  }

  btnPrintClickedHandler($event: any): any {
    this.params.printClicked(this.params.data);
  }
}
