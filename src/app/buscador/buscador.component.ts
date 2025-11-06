import { Component, OnInit, OnChanges, Input, Output, EventEmitter, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, takeUntil } from 'rxjs/operators';

export interface AutocompleteItem {
  Id: string | number;
  Name: string;
}

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataSource: AutocompleteItem[] | ((query: string) => Observable<AutocompleteItem[]>) = [];
  @Input() placeholder: string = '';
  @Input() minChars: number = 2;
  @Input() cacheResults: boolean = false;

  @Output() onSelect = new EventEmitter<string | number>();
  @Output() onSearch = new EventEmitter<string>();

  query: string = '';
  sugerencias: AutocompleteItem[] = [];
  sugerenciasIniciales: AutocompleteItem[] = []; // Sugerencias cuando el campo está vacío
  buscando: boolean = false;
  mostrarDropdown: boolean = false;
  sinResultados: boolean = false;

  private querySubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Cargar sugerencias iniciales del dataSource
    this.cargarSugerenciasIniciales();

    // Configurar observable con debouncing
    this.querySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query || query.trim().length < this.minChars) {
            this.sugerencias = [];
            this.sinResultados = false;
            this.buscando = false;
            return of([]);
          }

          this.buscando = true;
          this.sinResultados = false;
          this.onSearch.emit(query);

          return this.obtenerSugerencias(query).pipe(
            catchError(error => {
              console.error('Error al obtener sugerencias:', error);
              return of([]);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(sugerencias => {
        this.sugerencias = sugerencias;
        this.buscando = false;
        this.sinResultados = sugerencias.length === 0 && this.query.trim().length >= this.minChars;
        this.mostrarDropdown = sugerencias.length > 0 || this.sinResultados || 
                                (this.sugerenciasIniciales.length > 0 && this.query.trim().length === 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(): void {
    const trimmedQuery = this.query.trim();
    
    // Si no hay texto, mostrar sugerencias iniciales
    if (trimmedQuery.length === 0) {
      this.mostrarDropdown = this.sugerenciasIniciales.length > 0;
      this.sugerencias = [];
      this.sinResultados = false;
      return;
    }

    this.querySubject.next(trimmedQuery);
  }

  onInputFocus(): void {
    if (this.sugerencias.length > 0 || this.sinResultados || 
        (this.sugerenciasIniciales.length > 0 && this.query.trim().length === 0)) {
      this.mostrarDropdown = true;
    }
  }

  onInputBlur(): void {
    // Delay para permitir clicks en las sugerencias
    setTimeout(() => {
      this.mostrarDropdown = false;
    }, 200);
  }

  seleccionarSugerencia(item: AutocompleteItem): void {
    this.query = item.Name;
    this.mostrarDropdown = false;
    this.onSelect.emit(item.Id);
  }

  limpiarBusqueda(): void {
    this.query = '';
    this.sugerencias = [];
    this.sinResultados = false;
    this.mostrarDropdown = false;
  }

  private obtenerSugerencias(query: string): Observable<AutocompleteItem[]> {
    if (Array.isArray(this.dataSource)) {
      // Fuente local: filtrar el array por el campo Name
      const resultados = this.dataSource.filter(item =>
        item.Name.toLowerCase().includes(query.toLowerCase())
      );
      return of(resultados);
    } else if (typeof this.dataSource === 'function') {
      // Fuente externa: llamar a la función que retorna Observable
      return this.dataSource(query);
    }
    
    return of([]);
  }

  private cargarSugerenciasIniciales(): void {
    if (Array.isArray(this.dataSource)) {
      // Mostrar las primeras 5 sugerencias del dataSource
      this.sugerenciasIniciales = this.dataSource.slice(0, 5);
    }
  }

  // Recargar sugerencias iniciales cuando cambia el dataSource
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].firstChange) {
      this.cargarSugerenciasIniciales();
    }
  }
}
