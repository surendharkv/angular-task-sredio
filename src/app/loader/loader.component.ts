import { Component, OnInit } from '@angular/core';
import { GitService } from '../services/git.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(private git: GitService) {}

  ngOnInit(): void {
    window.location.href = this.git.oAuthUrl;
  }
}
