import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetApiService } from '@/app/services/pet-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-test-item.component.html',
  styleUrls: ['./pet-test-item.component.less']
})
export class PetItemComponent implements OnInit {
  @Output() onReload = new EventEmitter<void>();

  isVisible = false;
  isConfirmLoading = false;
  form!: FormGroup;
  title = 'Thêm mới thú cưng';

  constructor(
    private fb: FormBuilder,
    private petApiService: PetApiService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  show(id?: string): void {
    this.isVisible = true;
    this.form.reset();
    this.form.patchValue({ id: 0 });

    if (id) {
      this.title = 'Cập nhật thú cưng';
    } else {
      this.title = 'Thêm mới thú cưng';
    }
  }

  handleOk(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isConfirmLoading = true;
    const data = this.form.value;

    const payload = {
      id: data.id || 0,
      code: data.code,
      name: data.name
    };

    this.petApiService.create(payload).subscribe({
      next: (res) => {
        this.isConfirmLoading = false;
        if (res && res.code === 200) {
          this.isVisible = false;
          this.msg.success('Thêm mới thành công');
          this.onReload.emit();
        } else {
          this.msg.error(res?.message || 'Có lỗi xảy ra từ server');
        }
      },
      error: (err) => {
        this.isConfirmLoading = false;
        this.msg.error('Có lỗi xảy ra khi gọi API');
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
