import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { CategoryService } from '../../../core/sevices/category.service';
import { NotificationService } from '../../../core/sevices/notification.service';
import { StatsContainerComponent } from '../../../shared/components';
import { CategoryFormComponent, CategoryTableComponent } from '../components';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryTableComponent, CategoryFormComponent, StatsContainerComponent],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  private categService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | null>(null);
  isFormOpen = signal(false);
  isEditing = signal(false);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isSubmitting = signal(false);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.error.set(null);

    this.categService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar las categorías');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  openCreateForm() {
    this.selectedCategory.set(null);
    this.isEditing.set(false);
    this.isFormOpen.set(true);
  }

  onEdit(category: Category) {
    this.selectedCategory.set(category);
    this.isEditing.set(true);
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
    this.selectedCategory.set(null);
    this.isEditing.set(false);
    this.isSubmitting.set(false);
  }

  onFormSubmit(formData: Omit<Category, 'id'>) {
    // Validación adicional en la página
    if (!formData.code?.trim() || !formData.name?.trim() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    if (this.isEditing()) {
      const categoryToUpdate: Category = {
        id: this.selectedCategory()!.id,
        ...formData,
      };

      this.categService.updateCategory(categoryToUpdate).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Categoría actualizada correctamente'
          );
          this.loadCategories();
          this.closeForm();
          this.isSubmitting.set(false);
        },
        error: () => {
          this.notificationService.showError(
            'Error al actualizar la categoría'
          );
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.categService.createCategory(formData).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Categoría creada correctamente'
          );
          this.loadCategories();
          this.closeForm();
          this.isSubmitting.set(false);
        },
        error: (err: any) => {
          const errorMsg = err?.message || 'Error al crear la categoría';
          this.notificationService.showError(errorMsg);
          this.isSubmitting.set(false);
        },
      });
    }
  }

  onToggleStatus(categoryId: string) {
    this.categService.toggleStatus(categoryId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Estado actualizado');
        this.loadCategories();
      },
      error: () => {
        this.notificationService.showError('Error al cambiar el estado');
      },
    });
  }

  onDelete(categoryId: string) {
    this.categService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Categoría eliminada');
        this.loadCategories();
      },
      error: (err: any) => {
        const errorMsg = err?.message || 'Error al eliminar la categoría';
        this.notificationService.showError(errorMsg);
      },
    });
  }

  onSearch(term: string) {
    if (term.trim()) {
      this.categService.searchCategories(term).subscribe({
        next: (data) => {
          this.categories.set(data);
        },
      });
    } else {
      this.loadCategories();
    }
  }
}
