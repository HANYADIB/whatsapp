export interface FormData {
  chatId: string;
  caption: string;
  fileName: string;
  file: File | null;
  Name: string;
  NameLab: string;
  Cost: number | null;
}
export interface statuss {
  Result: boolean;
  Errors: string;
  
}