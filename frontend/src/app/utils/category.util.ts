import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class CategoryUtil {
  get(score?: number) {
    if (typeof score !== 'number') return 'Nenhum';
    if (score >= 9) return 'Promotor';
    if (score >= 7) return 'Neutro';
    return 'Detrator';
  }
}
