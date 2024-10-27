import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  createPagination(): number[] {
    const pages = [];
    const beforePage = this.currentPage - 1;
    const afterPage = this.currentPage + 1;

    // Basic pagination logic with previous, current, and next pages
    for (let i = beforePage; i <= afterPage; i++) {
      if (i > 0 && i <= this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
