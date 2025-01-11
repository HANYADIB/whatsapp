import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { UploadFormComponent } from './app/components/upload-form/upload-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UploadFormComponent],
  template: `
    <div class="container">
      <h1>Upload Pdf for Client</h1>
      <app-upload-form></app-upload-form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
  `]
})
export class App {
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});