import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  standalone: true,
  template: `
    <div style="padding: 24px; font-family: sans-serif;">
      <h1 style="margin-bottom: 16px;">Hello from Veterinary Clinic UI</h1>
      <p>If you see this, the Angular app is running and rendering correctly.</p>
    </div>
  `
})
export class SimpleComponent {}
