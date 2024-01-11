import { Component, OnInit } from '@angular/core';
import { GitService } from '../services/git.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GitUser } from '../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  integrated = false;
  user: GitUser;

  constructor(
    private git: GitService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    try {
      this.user = (await this.git.getUserInfo().catch((_) => {})) as GitUser;
      this.integrated = !!this.user?.id;
      if (!this.git.oAuthUrl) {
        await this.git.getOauthUrl();
      }
    } catch (error) {
      this.snackbar.open((error as { message: string })?.message, '', {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
      });
    }
    this.loading = false;
  }

  async connect() {
    await this.router.navigate(['/loader']);
  }

  async remove() {
    this.loading = true;
    await this.git.removeIntegration();
    this.user = null;
    this.integrated = false;
    this.loading = false;
  }
}
