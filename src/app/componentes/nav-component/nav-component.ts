import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  imports: [
    RouterLink,
    MatButton,
    MatToolbar
  ],
  selector: 'app-nav-component',
  styleUrl: './nav-component.css',
  templateUrl: './nav-component.html',
})
export class NavComponent {}
