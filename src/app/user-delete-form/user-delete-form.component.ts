import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html',
  styleUrls: ['./user-delete-form.component.scss'],
})
export class UserDeleteFormComponent implements OnInit {
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  deleteUser(): void {
    const userName = localStorage.getItem('user');

    this.fetchApiData.deleteUser(userName).subscribe((res) => {
      this.snackbar.open('Your account has been removed', 'Bye', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
