import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private renderer: Renderer2) {}

  setTheme(theme: string): void {
    const body = document.body;

    // Remove existing theme classes
    this.renderer.removeClass(body, 'dark-theme');
    this.renderer.removeClass(body, 'light-theme');

    // Add the selected theme class
    if (theme === 'dark') {
      this.renderer.addClass(body, 'dark-theme');
    } else {
      this.renderer.addClass(body, 'light-theme');
    }

    // Optionally, save the theme preference in local storage
    localStorage.setItem('theme', theme);
  }

  ngOnInit(): void {
    // Check local storage for a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }
}