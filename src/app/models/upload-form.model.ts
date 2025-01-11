export interface UploadFormData {
  chatId: string;
  caption: string;
  fileName: string;
  Name: string;
  NameLab: string;
  Cost: number | null;

  file: File | null;
}