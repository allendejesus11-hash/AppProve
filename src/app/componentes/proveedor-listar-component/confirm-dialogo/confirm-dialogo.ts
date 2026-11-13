import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  selector: 'app-confirm-dialogo',
  styleUrl: './confirm-dialogo.css',
  templateUrl: './confirm-dialogo.html',
})
export class ConfirmDialogo {}
