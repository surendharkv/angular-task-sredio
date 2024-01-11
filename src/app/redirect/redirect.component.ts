import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GitService } from '../services/git.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private git: GitService
  ) {}

  ngOnInit(): void {
    this.ar.queryParamMap
      .pipe(concatMap((v) => this.git.getAccessToken(v.get('code') ?? '')))
      .subscribe((_) => this.router.navigate(['/home']));
  }
}
