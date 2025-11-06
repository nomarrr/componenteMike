import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent, AutocompleteItem } from './buscador/buscador.component';
import { Observable, of, delay } from 'rxjs';

type TipoBusqueda = 'usuarios' | 'libros' | 'productos' | 'peliculas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, BuscadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'componenteMike';
  ultimoSeleccionado: string | number = '';
  tipoBusqueda: TipoBusqueda = 'usuarios';
  tiposDisponibles: TipoBusqueda[] = ['usuarios', 'libros', 'productos', 'peliculas'];

  // Fuentes de datos para cada tipo de búsqueda (objetos con Id y Name)
  datosUsuarios: AutocompleteItem[] = [
    { Id: 1, Name: 'María González' },
    { Id: 2, Name: 'Carlos Rodríguez' },
    { Id: 3, Name: 'Laura Martínez' },
    { Id: 4, Name: 'Juan Pérez' },
    { Id: 5, Name: 'Ana Fernández' },
    { Id: 6, Name: 'Pedro Sánchez' },
    { Id: 7, Name: 'Carmen López' },
    { Id: 8, Name: 'Miguel Torres' },
    { Id: 9, Name: 'Isabel García' },
    { Id: 10, Name: 'Francisco Díaz' },
    { Id: 11, Name: 'Lucía Moreno' },
    { Id: 12, Name: 'Roberto Silva' },
    { Id: 13, Name: 'Patricia Ruiz' },
    { Id: 14, Name: 'Fernando Morales' },
    { Id: 15, Name: 'Sofía Ramírez' },
    { Id: 16, Name: 'Diego Herrera' },
    { Id: 17, Name: 'Valentina Castro' },
    { Id: 18, Name: 'Andrés Mendoza' },
    { Id: 19, Name: 'Camila Vargas' },
    { Id: 20, Name: 'Sebastián Ríos' },
    { Id: 21, Name: 'Daniela Ochoa' },
    { Id: 22, Name: 'Nicolás Salazar' },
    { Id: 23, Name: 'Andrea Montoya' },
    { Id: 24, Name: 'Gabriel Cárdenas' },
    { Id: 25, Name: 'Paola Restrepo' },
    { Id: 26, Name: 'Felipe Giraldo' },
    { Id: 27, Name: 'Mariana Zapata' },
    { Id: 28, Name: 'David Muñoz' }
  ];

  datosLibros: AutocompleteItem[] = [
    { Id: 'libro-1', Name: 'Angular Framework: Guía Completa' },
    { Id: 'libro-2', Name: 'React: Desarrollo Moderno' },
    { Id: 'libro-3', Name: 'Vue.js Avanzado y Profesional' },
    { Id: 'libro-4', Name: 'JavaScript Profesional' },
    { Id: 'libro-5', Name: 'Node.js en Producción' },
    { Id: 'libro-6', Name: 'TypeScript Completo' },
    { Id: 'libro-7', Name: 'Python para Principiantes' },
    { Id: 'libro-8', Name: 'Java Avanzado y Patrones' },
    { Id: 'libro-9', Name: 'C# y .NET Core' },
    { Id: 'libro-10', Name: 'PHP Moderno' },
    { Id: 'libro-11', Name: 'Ruby on Rails' },
    { Id: 'libro-12', Name: 'Go Programming Language' },
    { Id: 'libro-13', Name: 'Swift Development' },
    { Id: 'libro-14', Name: 'Kotlin para Android' },
    { Id: 'libro-15', Name: 'Flutter y Dart' },
    { Id: 'libro-16', Name: 'El Quijote de la Mancha' },
    { Id: 'libro-17', Name: 'Cien Años de Soledad' },
    { Id: 'libro-18', Name: '1984 - George Orwell' },
    { Id: 'libro-19', Name: 'Clean Code: Manual para Desarrolladores' },
    { Id: 'libro-20', Name: 'El Principito' },
    { Id: 'libro-21', Name: 'Don Juan Tenorio' },
    { Id: 'libro-22', Name: 'La Odisea' },
    { Id: 'libro-23', Name: 'Design Patterns: Elementos Reutilizables' },
    { Id: 'libro-24', Name: 'MongoDB: La Guía Definitiva' },
    { Id: 'libro-25', Name: 'PostgreSQL Avanzado' },
    { Id: 'libro-26', Name: 'Docker y Kubernetes' },
    { Id: 'libro-27', Name: 'DevOps Handbook' },
    { Id: 'libro-28', Name: 'Microservicios con Spring Boot' },
    { Id: 'libro-29', Name: 'GraphQL en la Práctica' },
    { Id: 'libro-30', Name: 'RESTful API Design' }
  ];

  datosProductos: AutocompleteItem[] = [
    { Id: 'prod-1', Name: 'MacBook Pro M3 16GB RAM' },
    { Id: 'prod-2', Name: 'Monitor Dell UltraSharp 4K 27"' },
    { Id: 'prod-3', Name: 'Teclado Mecánico Logitech RGB' },
    { Id: 'prod-4', Name: 'Mouse Inalámbrico Razer DeathAdder' },
    { Id: 'prod-5', Name: 'Auriculares Sony WH-1000XM5' },
    { Id: 'prod-6', Name: 'Webcam Logitech C920 HD' },
    { Id: 'prod-7', Name: 'Micrófono Blue Yeti USB' },
    { Id: 'prod-8', Name: 'Tableta Gráfica Wacom Intuos' },
    { Id: 'prod-9', Name: 'Impresora HP LaserJet Pro' },
    { Id: 'prod-10', Name: 'Escáner Canon CanoScan' },
    { Id: 'prod-11', Name: 'Disco Duro Externo Seagate 2TB' },
    { Id: 'prod-12', Name: 'SSD Samsung 1TB NVMe' },
    { Id: 'prod-13', Name: 'Memoria RAM Corsair 32GB' },
    { Id: 'prod-14', Name: 'Placa Base ASUS ROG' },
    { Id: 'prod-15', Name: 'Tarjeta Gráfica NVIDIA RTX 4080' },
    { Id: 'prod-16', Name: 'iPhone 15 Pro Max 256GB' },
    { Id: 'prod-17', Name: 'iPad Air M2 11 pulgadas' },
    { Id: 'prod-18', Name: 'Apple Watch Series 9' },
    { Id: 'prod-19', Name: 'Router WiFi 6 ASUS AX6000' },
    { Id: 'prod-20', Name: 'Switch Gigabit TP-Link 24 puertos' },
    { Id: 'prod-21', Name: 'Nube NAS Synology DS220+' },
    { Id: 'prod-22', Name: 'UPS APC 1500VA' },
    { Id: 'prod-23', Name: 'Cámara Web Logitech Brio 4K' },
    { Id: 'prod-24', Name: 'Auriculares Gaming SteelSeries Arctis 7' },
    { Id: 'prod-25', Name: 'Mando Xbox Series X' },
    { Id: 'prod-26', Name: 'Teclado Gaming Razer Huntsman' },
    { Id: 'prod-27', Name: 'Alfombrilla Gaming RGB' },
    { Id: 'prod-28', Name: 'Proyector Epson Full HD' },
    { Id: 'prod-29', Name: 'Altavoces Logitech Z906 5.1' },
    { Id: 'prod-30', Name: 'Adaptador USB-C a HDMI' }
  ];

  datosPeliculas: AutocompleteItem[] = [
    { Id: 'pel-1', Name: 'El Padrino' },
    { Id: 'pel-2', Name: 'El Señor de los Anillos' },
    { Id: 'pel-3', Name: 'Matrix' },
    { Id: 'pel-4', Name: 'Inception' },
    { Id: 'pel-5', Name: 'Pulp Fiction' },
    { Id: 'pel-6', Name: 'Forrest Gump' },
    { Id: 'pel-7', Name: 'The Dark Knight' },
    { Id: 'pel-8', Name: 'Titanic' },
    { Id: 'pel-9', Name: 'Avatar' },
    { Id: 'pel-10', Name: 'Star Wars: Una Nueva Esperanza' },
    { Id: 'pel-11', Name: 'Interstellar' },
    { Id: 'pel-12', Name: 'The Shawshank Redemption' },
    { Id: 'pel-13', Name: 'Gladiator' },
    { Id: 'pel-14', Name: 'El Rey León' },
    { Id: 'pel-15', Name: 'Toy Story' },
    { Id: 'pel-16', Name: 'Jurassic Park' },
    { Id: 'pel-17', Name: 'Harry Potter y la Piedra Filosofal' },
    { Id: 'pel-18', Name: 'Los Vengadores' },
    { Id: 'pel-19', Name: 'Fight Club' },
    { Id: 'pel-20', Name: 'La Lista de Schindler' },
    { Id: 'pel-21', Name: 'El Gran Lebowski' },
    { Id: 'pel-22', Name: 'Blade Runner 2049' },
    { Id: 'pel-23', Name: 'Dune' },
    { Id: 'pel-24', Name: 'Parásitos' },
    { Id: 'pel-25', Name: 'Joker' },
    { Id: 'pel-26', Name: 'Spider-Man: No Way Home' },
    { Id: 'pel-27', Name: 'Top Gun: Maverick' },
    { Id: 'pel-28', Name: 'Everything Everywhere All at Once' },
    { Id: 'pel-29', Name: 'The Batman' },
    { Id: 'pel-30', Name: 'Black Panther: Wakanda Forever' },
    { Id: 'pel-31', Name: 'Doctor Strange en el Multiverso' },
    { Id: 'pel-32', Name: 'Guardianes de la Galaxia Vol. 3' }
  ];

  // Función para obtener la fuente de datos según el tipo seleccionado
  getDataSource(): AutocompleteItem[] | ((query: string) => Observable<AutocompleteItem[]>) {
    switch (this.tipoBusqueda) {
      case 'usuarios':
        return this.datosUsuarios;
      case 'libros':
        return this.datosLibros;
      case 'productos':
        return this.datosProductos;
      case 'peliculas':
        // Demostración: películas usan una fuente externa (API simulada)
        return this.buscarPeliculasAPI;
      default:
        return [];
    }
  }

  // Ejemplo de fuente externa (API simulada) para películas
  buscarPeliculasAPI = (query: string): Observable<AutocompleteItem[]> => {
    const queryLower = query.toLowerCase();
    const filtrados = this.datosPeliculas.filter(item =>
      item.Name.toLowerCase().includes(queryLower)
    );

    // Simular delay de red (200-500ms aleatorio)
    const delayTime = Math.random() * 300 + 200;
    
    return of(filtrados).pipe(delay(delayTime));
  };

  // Obtener placeholder según el tipo
  getPlaceholder(): string {
    switch (this.tipoBusqueda) {
      case 'usuarios':
        return 'Buscar usuarios...';
      case 'libros':
        return 'Buscar libros...';
      case 'productos':
        return 'Buscar productos...';
      case 'peliculas':
        return 'Buscar películas...';
      default:
        return 'Buscar...';
    }
  }

  // Obtener nombre en español del tipo
  getTipoNombre(): string {
    const nombres: Record<TipoBusqueda, string> = {
      'usuarios': 'Usuarios',
      'libros': 'Libros',
      'productos': 'Productos',
      'peliculas': 'Películas'
    };
    return nombres[this.tipoBusqueda];
  }

  // Obtener icono según el tipo
  getTipoIcono(): string {
    const iconos: Record<TipoBusqueda, string> = {
      'usuarios': '👤',
      'libros': '📚',
      'productos': '🛍️',
      'peliculas': '🎬'
    };
    return iconos[this.tipoBusqueda];
  }

  onTipoCambio(): void {
    // Limpiar selección al cambiar de tipo
    this.ultimoSeleccionado = '';
  }

  onItemSelected(id: string | number): void {
    console.log(`Item seleccionado (${this.tipoBusqueda}): ID =`, id);
    this.ultimoSeleccionado = id;
    
    // Opcional: encontrar el nombre completo del item seleccionado para mostrar
    const dataSource = this.getDataSource();
    if (Array.isArray(dataSource)) {
      const item = dataSource.find(i => i.Id === id);
      if (item) {
        console.log(`Nombre del item: ${item.Name}`);
      }
    }
  }

  onSearchPerformed(query: string): void {
    console.log(`Búsqueda realizada (${this.tipoBusqueda}):`, query);
  }
}
