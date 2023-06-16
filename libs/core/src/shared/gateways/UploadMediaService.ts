export interface UploadMediaService {
  uploadMedia(file: File): Promise<string>;
  uploadMediaFromUrl(url: string): Promise<string>;
}
