import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconsModule],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTableComponent {
  featherEdit = 'featherEdit';
  featherCheck = 'featherCheck';
  featherX = 'featherX';
  categories = input<Category[]>([]);
  edit = output<Category>();
  toggleStatus = output<string>();
  delete = output<string>();
  search = output<string>();

  searchTerm = signal('');

  filteredCategories = computed(() => {
    if (!this.searchTerm().trim()) {
      return this.categories();
    }
    const term = this.searchTerm().toLowerCase();
    return this.categories().filter(
      cat =>
        cat.name.toLowerCase().includes(term) ||
        cat.code.toLowerCase().includes(term)
    );
  });

  onSearch() {
    this.search.emit(this.searchTerm());
  }

  onEdit(category: Category) {
    this.edit.emit(category);
  }

  onToggleStatus(categoryId: string) {
    this.toggleStatus.emit(categoryId);
  }

  onDelete(categoryId: string) {
    if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      this.delete.emit(categoryId);
    }
  }
}
