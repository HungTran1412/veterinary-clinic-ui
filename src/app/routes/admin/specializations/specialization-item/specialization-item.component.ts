import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18NService } from '@/app/shared-ui/core/i18n/i18n.service';
import { ButtonModel } from '@/app/models/core/button.model';
import { SpecializationApiService } from '@/app/services/specialization-api.service';
import { EVENT_TYPE, FORM_TYPE } from '@/app/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-specialization-item',
  templateUrl: './specialization-item.component.html',
  styleUrls: ['./specialization-item.component.less']
})
export class SpecializationItemComponent implements OnInit {
  @Input() type = 'add';
  @Input() item: any;
  @Input() isVisible = false;
  @Input() option: any;
  @Output() readonly eventEmmit = new EventEmitter<any>();

  form: FormGroup;
  isInfo = false;
  isEdit = false;
  isAdd = false;
  title = '';
  isLoading = false;

  btnSave!: ButtonModel;
  btnCancel!: ButtonModel;
  btnEdit!: ButtonModel;

  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private specializationApiService: SpecializationApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private i18n: I18NService
  ) {
    this.form = this.fb.group({
      code: [null, [Validators.required, Validators.maxLength(50)]],
      name: [null, [Validators.required, Validators.maxLength(255)]],
      description: [null, [Validators.maxLength(1000)]],
      order: [1, [Validators.required]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.initButtons();
    this.initRightOfUser();
  }

  initButtons(): void {
    this.btnSave = {
      title: this.i18n.fanyi('app.common.button.save'),
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.save()
    };
    this.btnCancel = {
      title: this.i18n.fanyi('app.common.button.close'),
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.handleCancel()
    };
    this.btnEdit = {
      title: this.i18n.fanyi('app.common.button.edit'),
      visible: true,
      enable: true,
      grandAccess: true,
      click: () => this.updateFormToEdit()
    };
  }

  public initData(data: any, type: any = null, option: any = {}): void {
    this.resetForm();
    this.isLoading = false;
    this.item = data;
    this.type = type;
    this.option = option;

    if (this.item?.id) {
      this.getDataInfo(this.item.id);
    }

    switch (type) {
      case FORM_TYPE.ADD:
        this.updateFormToAdd();
        break;
      case FORM_TYPE.INFO:
        this.updateFormToInfo();
        break;
      case FORM_TYPE.EDIT:
        this.updateFormToEdit();
        break;
      default:
        this.updateFormToAdd();
        break;
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.eventEmmit.emit({ type: EVENT_TYPE.CLOSE });
  }

  initRightOfUser(): void {
    this.btnSave.grandAccess = true;
    this.btnEdit.grandAccess = true;
  }

  updateFormToAdd(): void {
    this.isInfo = false;
    this.isEdit = false;
    this.isAdd = true;
    this.title = this.i18n.fanyi('function.specialization.modal.title-add');
    this.item = {};
    this.btnEdit.visible = false;

    this.form.enable();
    this.form.get('isActive')?.setValue(true);
    this.form.get('order')?.setValue(1);
  }

  updateFormToEdit() {
    this.isInfo = false;
    this.isEdit = true;
    this.isAdd = false;
    this.title = this.i18n.fanyi('function.specialization.modal.title-edit');
    this.btnEdit.visible = false;
    this.form.get('code')?.disable();
    this.form.get('name')?.enable();
    this.form.get('description')?.enable();
  }

  updateFormToInfo(): void {
    this.isInfo = true;
    this.isEdit = false;
    this.isAdd = false;
    this.title = this.i18n.fanyi('function.specialization.modal.title-info');
    this.form.disable();
    this.btnEdit.visible = true;
  }

  resetForm(): void {
    this.form.reset();
    this.form.get('order')?.setValue(1);
    this.form.get('isActive')?.setValue(true);
  }

  updateDataToForm(data: any): void {
    this.form.patchValue(data);
  }

  closeModalReloadData(): void {
    this.isVisible = false;
    this.eventEmmit.emit({ type: EVENT_TYPE.SUCCESS });
  }

  getDataInfo(id: any): Subscription | undefined {
    this.isLoading = true;
    const rs = this.specializationApiService.getById(id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.item = res.data;
          this.updateDataToForm(res.data);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
    return rs;
  }

  save(): Subscription | undefined {
    this.isLoading = true;

    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (!this.form.valid) {
      this.isLoading = false;
      this.messageService.error(this.i18n.fanyi('app.common.form.dirty'));
      return;
    }

    const formValue = this.form.getRawValue();
    const data = { ...formValue };

    if (this.isAdd) {
      return this.specializationApiService.create(data).subscribe({
        next: (res: any) => {
          this.messageService.success(res.message);
          this.closeModalReloadData();
        },
        error: (err: any) => {
          this.isLoading = false;
          this.messageService.error(err.error?.message || 'Có lỗi xảy ra');
        },
        complete: () => (this.isLoading = false)
      });
    } else if (this.isEdit) {
      return this.specializationApiService.update(this.item.id, data).subscribe({
        next: (res: any) => {
          this.messageService.success(res.message);
          this.closeModalReloadData();
        },
        error: (err: any) => {
          this.isLoading = false;
          this.messageService.error(err.error?.message || 'Có lỗi xảy ra');
        },
        complete: () => (this.isLoading = false)
      });
    }
    return;
  }
}
