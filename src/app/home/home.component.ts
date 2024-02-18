import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
  }

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private fileservice: FileService) {}

  //define a function to upload files
  onUploadFiles(files: File[]): void {

    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name);}
    this.fileservice.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    ); 
  }

  //define a function to download files
  onDownloadFile(filename: string): void {
    this.fileservice.download(filename).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    ); 
  }

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type){
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Headers returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array){
          //upload file logic
          this.fileStatus.status = 'done'
          for(const filename of httpEvent.body){
            this.filenames.unshift(filename);
          }

        }else{
          //download logic
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //     {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //     httpEvent.headers.get('File-Name'));

        }
        this.fileStatus.status = 'done'
        break;
      default:
          console.log(httpEvent);
          break;
    }
  }
  
  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress',
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total)
    
  }


}
