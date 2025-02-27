import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() pageActual: number = 0;
  @Input() total_pages: number = 0;
  @Output() pageSelecion = new EventEmitter<string>();

  selecionPage(pageValue: number) {
    this.pageActual= pageValue;
    if (pageValue) {
      this.pageSelecion.emit(`${pageValue}`);
    }
  }
}
