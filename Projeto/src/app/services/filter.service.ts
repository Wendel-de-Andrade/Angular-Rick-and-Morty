import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>('');
  public filter$ = this.filterSubject.asObservable();

  // Define as propriedades padrão internamente
  private filterProperties: string[] = ['name']; // Exemplo: filtrar por nome e ID

  // Método para atualizar o filtro de pesquisa
  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }

  // Método genérico para filtrar dados usando propriedades internas
  filterData<T>(data: T[], filter: string): T[] {
    if (!filter) return data;
    const lowercasedFilter = filter.toLowerCase();
    return data.filter(item =>
      this.filterProperties.some(property =>
        String(item[property as keyof T]).toLowerCase().includes(lowercasedFilter)
      )
    );
  }

  // Método para permitir a atualização das propriedades de filtro internamente se necessário
  updateFilterProperties(properties: string[]) {
    this.filterProperties = properties;
  }
}
