
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiService } from './services/ai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host { display: block; }
  `],
  template: `
<div class="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-pink-200">
  
  <!-- Background Decorations -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
    <div class="absolute top-10 left-10 text-4xl animate-bounce">💖</div>
    <div class="absolute bottom-20 right-20 text-5xl animate-pulse">💝</div>
    <div class="absolute top-1/3 right-10 text-3xl animate-bounce" style="animation-delay: 1s;">💘</div>
    <div class="absolute bottom-1/3 left-20 text-4xl animate-pulse" style="animation-delay: 2s;">💕</div>
  </div>

  <div class="z-10 max-w-lg w-full text-center">
    
    @if (step() === 'ask') {
      <div class="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500">
        <!-- Cute Image Placeholder -->
        <div class="relative group">
          <img 
            src="https://picsum.photos/seed/love/300/300" 
            alt="Cute Valentine Bear" 
            class="rounded-xl shadow-xl border-4 border-white transform transition-transform group-hover:scale-105 duration-300 object-cover w-64 h-64"
          />
          <div class="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg text-2xl animate-bounce">
            🧸
          </div>
        </div>

        <h1 class="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-sm font-serif">
          Esha, will you be Uvaan's Valentine?
        </h1>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-8 w-full min-h-[100px]">
          <!-- Yes Button -->
          <button 
            (click)="handleYes()"
            [style.fontSize.px]="yesButtonSize()"
            class="bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg px-6 py-3"
          >
            Yes 💖
          </button>

          <!-- No Button -->
          <button 
            (click)="handleNo()"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
          >
            {{ noButtonText() }}
          </button>
        </div>
      </div>
    }

    @if (step() === 'success') {
      <div class="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div class="text-8xl animate-bounce mb-4">
          😻
        </div>
        
        <h1 class="text-4xl md:text-5xl font-extrabold text-pink-600">
          Yay! Uvaan ❤️ Esha!
        </h1>
        
        <p class="text-xl text-pink-800 font-medium">
          Official Valentine's Date Confirmed!
        </p>

        <!-- AI Love Note Section -->
        <div class="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-pink-200 mt-8">
          <h2 class="text-xl font-bold text-pink-500 mb-4">✨ A Note for Esha ✨</h2>
          
          <div class="flex flex-col gap-3">
            <input 
              type="text" 
              [(ngModel)]="partnerName" 
              readonly
              class="w-full px-4 py-2 rounded-lg border border-pink-200 bg-pink-50 text-pink-900 font-bold text-center cursor-default focus:outline-none"
            />
            
            <button 
              (click)="generateNote()" 
              [disabled]="isLoading()"
              class="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-3 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            >
              @if (isLoading()) {
                <span class="animate-spin text-xl">✨</span> Asking Cupid...
              } @else {
                <span>💌 Get poem from Uvaan</span>
              }
            </button>
          </div>

          @if (loveNote()) {
            <div class="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200 text-pink-800 font-serif italic text-lg leading-relaxed shadow-inner">
              "{{ loveNote() }}"
            </div>
          }
        </div>

        <button 
          (click)="reset()" 
          class="text-pink-400 underline hover:text-pink-600 text-sm mt-8"
        >
          Start over
        </button>
      </div>
    }

  </div>

  <div class="fixed bottom-2 text-pink-300 text-xs text-center w-full">
    For Esha & Uvaan Covenden
  </div>

</div>
  `
})
export class AppComponent {
  private aiService = inject(AiService);

  // State signals
  step = signal<'ask' | 'success'>('ask');
  noCount = signal<number>(0);
  isLoading = signal<boolean>(false);
  loveNote = signal<string | null>(null);
  partnerName = signal<string>('Esha');

  // Derived state for the "Yes" button size interaction
  yesButtonSize = computed(() => {
    return this.noCount() * 20 + 16; // Base 16px, grows by 20px each rejection
  });

  // Rejection texts
  phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again Esha!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give Uvaan a chance!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking Uvaan's heart ;(",
    "I'm gonna cry...",
    "Plsss Esha? 🥺"
  ];

  // Derived state for current "No" button text
  noButtonText = computed(() => {
    const idx = Math.min(this.noCount(), this.phrases.length - 1);
    return this.phrases[idx];
  });

  handleNo() {
    this.noCount.update(val => val + 1);
  }

  handleYes() {
    this.step.set('success');
  }

  async generateNote() {
    this.isLoading.set(true);
    const note = await this.aiService.generateLoveNote(this.partnerName());
    this.loveNote.set(note);
    this.isLoading.set(false);
  }

  reset() {
    this.step.set('ask');
    this.noCount.set(0);
    this.loveNote.set(null);
    this.partnerName.set('Esha');
  }
}
