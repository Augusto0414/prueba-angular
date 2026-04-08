import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../features/categories/models/category.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: '1',
      code: 'CAT-001',
      name: 'Tecnología',
      description: 'Productos tech',
      isActive: true
    }
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  createCategory(category: Category): Observable<Category> {
    const newCategory = { ...category, id: (this.categories.length + 1).toString() };
    this.categories = [...this.categories, newCategory];
    return of(newCategory);
    }

    updateCategory(updatedCategory: Category): Observable<Category> {  
    this.categories = this.categories.map(category =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    return of(updatedCategory);
  }
  toggleStatus(categoryId: string): Observable<Category> {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) category.isActive = !category.isActive;
    return of();
  }

  deleteCategory(categoryId: string): Observable<void> {
      this.categories = this.categories.filter(cat => cat.id !== categoryId);
      return of();
  }
}


