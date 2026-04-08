import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    const panelClass = `notification-${type}`;
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  showSuccess(message: string) {
    this.showNotification(message, 'success');
  }

  showError(message: string) {
    this.showNotification(message, 'error');
  }

  showWarning(message: string) {
    this.showNotification(message, 'warning');
  }

  showInfo(message: string) {
    this.showNotification(message, 'info');
  }
}
