import { Component } from '@angular/core';
import { FileService } from './file.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoanManagementSystem';
}
