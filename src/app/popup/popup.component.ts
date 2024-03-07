import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
    <h2>{{ data.name }}</h2>
    <p>Score: {{ data.score }}</p>
    <p>Event Participated: {{ data.event }}</p>
    <p>Ranking: {{ data.ranking }}</p>
  `,
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}