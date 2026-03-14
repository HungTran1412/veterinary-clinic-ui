import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationError, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  protected readonly title = signal('veterinary-clinic-ui');
  public runtimeError: any = null;
  public navigationError: any = null;

  private readonly destroy$ = new Subject<void>();

  constructor(public router: Router) {
    console.log('App component constructor', router.url);

    router.events.pipe(
      takeUntil(this.destroy$),
      filter((e): e is NavigationError => e instanceof NavigationError)
    ).subscribe(e => {
      this.navigationError = e.error || e;
      console.error('NavigationError', e);
    });

    window.onerror = (message, source, lineno, colno, error) => {
      this.runtimeError = {
        message,
        source,
        line: lineno,
        column: colno,
        error: error?.toString?.() ?? null
      };
      // keep default behavior
      return false;
    };

    window.addEventListener('unhandledrejection', (event) => {
      this.runtimeError = {
        message: `Unhandled rejection: ${event.reason}`,
        source: 'unhandledrejection',
        line: 0,
        column: 0,
        error: event.reason?.toString?.() ?? event.reason
      };
      console.error('Unhandled rejection', event);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
