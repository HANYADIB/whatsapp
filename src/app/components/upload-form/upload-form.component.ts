import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { UploadFormData } from '../../models/upload-form.model';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="form-container">
      <h2>Upload Form</h2>
      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <div class="form-group">
          <label for="Name">Name:</label>
          <input 
            type="text" 
            id="Name" 
            name="Name" 
            [(ngModel)]="formData.Name" 
            required>
        </div>
        <div class="form-group">
          <label for="chatId">Number:</label>
          <input 
            type="text" 
            id="chatId" 
            name="chatId" 
            [(ngModel)]="formData.chatId" 
            required>
        </div>
        <div class="form-group">
          <label for="caption">Content:</label>
          <input 
            type="text" 
            id="caption" 
            name="caption" 
            [(ngModel)]="formData.caption" 
            required>
        </div>

        <div class="form-group">
          <label for="fileName">File Name:</label>
          <input 
            type="text" 
            id="fileName" 
            name="fileName" 
            [(ngModel)]="formData.fileName" 
            >
        </div>

        <div class="form-group">
          <label for="NameLab">NameLab:</label>
          <input 
            type="text" 
            id="NameLab" 
            name="NameLab" 
            [(ngModel)]="formData.NameLab" 
            >
        </div>

        <div class="form-group">
          <label for="Cost">Cost:</label>
          <input 
            type = "number"
            id="Cost" 
            name="Cost" 
            [(ngModel)]="formData.Cost" 
            >
        </div>

        <div class="form-group">
          <label for="file">File Update:</label>
          <input 
            type="file" 
            id="file" 
            name="file" 
            [(ngModel)]="formData.file" 
            required
            (change)="onFileSelected($event)"
           >
        </div>

        <button type="submit" [disabled]="!form.valid || isLoading">Submit</button>
         <!-- Show loading indicator -->
    <div *ngIf="isLoading" class="loading-spinner">
      <span>Sending...</span> <!-- You can replace this with a spinner -->
    </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .loading-spinner {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color:rgb(103, 194, 106);
}
  `]
})
export class UploadFormComponent {
    // New variable to track loading state
  isLoading: boolean = false;
  formData: UploadFormData = {
    chatId: '',
    caption: '',
    fileName: '',
    file: null,
    Name: '',
    NameLab: '' ,
    Cost: null

  };
  constructor(private apiService: ApiService) {
    
    // Load data from localStorage if it exists
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      this.formData = { ...parsed, file: null };    // File can't be stored in localStorage
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.formData.file = file;
  }

  onSubmit() {
    this.isLoading = true;
    // Save string parameters to localStorage
    const dataToStore = {
      chatId: this.formData.chatId,
      caption: this.formData.caption,
      fileName: this.formData.fileName,
      Name: this.formData.Name,
      NameLab: this.formData.NameLab,
      Cost: this.formData.Cost

    };
    localStorage.setItem('formData', JSON.stringify(dataToStore));

    // Submit to API
    this.apiService.submitForm(this.formData).subscribe({
      next: (response) => {
        if (response.result == true ) {
          alert('Message sent successfully!');
          this.isLoading = false;
        }
        else
        {
          alert('Message no sent successfully!');

        }
      },
      error: (error) => {
        console.error('Error submitting form', error);
        alert('Error Message . Please try again.');
        this.isLoading = false;
      }
    });
  }
}