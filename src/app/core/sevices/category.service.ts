import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Category } from '../../features/categories/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([
    {
      id: '1',
      code: 'CAT-001',
      name: 'Tecnología',
      description: 'Productos tech',
      isActive: true
    }
  ]);
  
  private categories$ = this.categoriesSubject.asObservable();

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    const code = category.code?.toString().trim() || '';
    const name = category.name?.toString().trim() || '';

    if (!code || !name) {
      return throwError(() => new Error('El código y nombre son obligatorios'));
    }

    const newCategory: Category = {
      code,
      name,
      description: category.description || '',
      id: Date.now().toString(),
      isActive: category.isActive ?? true
    };

    const updated = [...this.categoriesSubject.value, newCategory];
    this.categoriesSubject.next(updated);
    return of(newCategory);
  }

  updateCategory(updatedCategory: Category): Observable<Category> {
    const updated = this.categoriesSubject.value.map(category =>
      category.id === updatedCategory.id ? updatedCategory : category
    );
    this.categoriesSubject.next(updated);
    return of(updatedCategory);
  }

  toggleStatus(categoryId: string): Observable<void> {
    const updated = this.categoriesSubject.value.map(category =>
      category.id === categoryId ? { ...category, isActive: !category.isActive } : category
    );
    this.categoriesSubject.next(updated);
    return of();
  }

  deleteCategory(categoryId: string): Observable<void> {
    const updated = this.categoriesSubject.value.filter(cat => cat.id !== categoryId);
    
    if (updated.length === this.categoriesSubject.value.length) {
      return throwError(() => new Error('Categoría no encontrada'));
    }
    
    this.categoriesSubject.next(updated);
    return of();
  }

  searchCategories(term: string): Observable<Category[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = this.categoriesSubject.value.filter(
      cat =>
        cat.name.toLowerCase().includes(lowerTerm) ||
        cat.code.toLowerCase().includes(lowerTerm)
    );
    return of(filtered);
  }
}


