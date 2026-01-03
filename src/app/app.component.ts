import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <header class="app-header">
      <div class="header-left">
        <div class="user-profile">
          <div class="avatar">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2S4Pd9frhGQ-dbuc99t82f3MuXWF4sdAUdA&s" alt="Spider-Man (Tobey Maguire)">
          </div>
          <div class="user-info">
            <span class="user-name">Peter Parker</span>
            <span class="user-role">SUPER ADMIN</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <div class="app-title">Studentski sistem</div>
      </div>
    </header>

    <main class="app-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-header {
      background-color: #6b5b6d;
      color: white;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }

    .user-name {
      font-weight: 600;
      font-size: 13px;
    }

    .user-role {
      width: fit-content;
      margin-top: 2px;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      letter-spacing: 0.06em;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.16);
      text-transform: uppercase;
    }

    .app-title {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .app-content {
      padding: 12px;
      background-color: #f1f3f6;
      min-height: calc(100vh - 48px);
    }
  `]
})
export class AppComponent {
}

