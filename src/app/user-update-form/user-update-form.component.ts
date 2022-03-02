import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  updateUser(): void {
    const user = localStorage.getItem('user')
    this.fetchApiData.updateUser(user, this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        console.log(result);
        this.snackBar.open('Your account data has been updated! Please re-login', 'OK', {
          duration: 4000,
        });
        this.router.navigate(['welcome'])
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 4000,
        });
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
