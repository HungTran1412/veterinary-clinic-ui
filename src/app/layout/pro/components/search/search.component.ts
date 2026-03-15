import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'layout-pro-search',
  templateUrl: 'search.component.html',
  host: {
    '[class.alain-pro__header-item]': 'true',
    '[class.alain-pro__header-search]': 'true',
    '[class.alain-pro__header-search-show]': 'show'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetSearchComponent implements OnDestroy {
  @ViewChild('ipt', { static: true }) private ipt!: ElementRef<HTMLInputElement>;
  show = false;
  q = '';
  search$ = new Subject<string>();
  list: any[] = [];

  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((q: string) => this.http.get('/user', { no: q, pi: 1, ps: 5 }))
      )
      .subscribe((res: any) => {
        this.list = res.list || [];
        this.cdr.detectChanges();
      });
  }

  onSearch(event: Event): void {
    const el = event.target as HTMLInputElement;
    this.search$.next(el.value);
  }

  @HostListener('click')
  _click(): void {
    if (this.ipt && this.ipt.nativeElement) {
      this.ipt.nativeElement.focus();
    }
    this.show = true;
  }

  ngOnDestroy(): void {
    this.search$.unsubscribe();
  }
}
