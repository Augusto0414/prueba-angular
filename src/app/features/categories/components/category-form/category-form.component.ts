import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent {
  category = input<Category | null>(null);
  isEditing = input(false);
  isSubmitting = input(false);
  submit = output<Omit<Category, 'id'>>();
  cancel = output<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();

    effect(() => {
      const cat = this.category();
      if (cat) {
        this.form.patchValue({
          code: cat.code,
          name: cat.name,
          description: cat.description,
          isActive: cat.isActive,
        });
      } else {
        this.form.reset({ isActive: true });
        this.form.markAsUntouched();
        this.form.markAsPristine();
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      isActive: [true],
    });
  }

  getError(fieldName: string, errorType: string): boolean {
    const field = this.form.get(fieldName);
    return !!(
      field &&
      field.hasError(errorType) &&
      (field.dirty || field.touched)
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const code = this.form.get('code')?.value?.toString().trim() || '';
    const name = this.form.get('name')?.value?.toString().trim() || '';

    if (!code || !name) {
      return;
    }

    this.submit.emit({
      code,
      name,
      description: this.form.get('description')?.value || '',
      isActive: this.form.get('isActive')?.value ?? true
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
