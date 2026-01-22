import { Component, OnInit, ViewChild } from '@angular/core';
import { PetApiService } from '@/app/services/pet-api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PetItemComponent } from '../pet-test-item/pet-test-item.component';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-pet-test',
  templateUrl: './pet-test.component.html',
  styleUrls: ['./pet-test.component.less']
})
export class PetTestComponent implements OnInit {
  @ViewChild('itemModal') itemModal!: PetItemComponent;

  loading = false;
  listOfData: any[] = [];

  // Cấu hình cột cho AG Grid
  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 100 },
    { field: 'code', headerName: 'Mã thú cưng', sortable: true, filter: true },
    { field: 'name', headerName: 'Tên thú cưng', sortable: true, filter: true },
    {
      headerName: 'Thao tác',
      cellRenderer: (params: any) => {
        return `<button class="ant-btn ant-btn-link" onclick="window.editPet('${params.data.id}')">Sửa</button>`;
      }
    }
  ];

  constructor(
    private petApiService: PetApiService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log('PetTestComponent initialized');
    this.loadData();

    (window as any).editPet = (id: string) => this.openEdit(id);
  }

  loadData(): void {
    this.loading = true;
    console.log('PetTestComponent.loadData() called');

    this.petApiService.getAll().subscribe({
      next: (res: any) => {
        console.log('PetTestComponent received data:', res);
        this.loading = false;
        if (res && res.code === 200 && Array.isArray(res.data)) {
          this.listOfData = res.data;
        } else {
          this.listOfData = [];
          if (res && res.message) {
             this.msg.warning(res.message);
          }
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('PetTestComponent received error:', err);

        let msg = 'Có lỗi xảy ra khi gọi API';
        if (err.status === 0) {
            msg = 'Lỗi kết nối (Status 0). Vui lòng kiểm tra: Server đã bật chưa? CORS? SSL?';
        } else if (err.status === 404) {
            msg = `Không tìm thấy API (404): ${err.url}`;
        } else {
            msg = `Lỗi ${err.status}: ${err.statusText || err.message}`;
        }
        this.msg.error(msg);
      }
    });
  }

  openCreate(): void {
    this.itemModal.show();
  }

  openEdit(id: string): void {
    this.msg.info('Chức năng sửa đang phát triển: ' + id);
  }

  handleReload(): void {
    this.loadData();
  }
}
