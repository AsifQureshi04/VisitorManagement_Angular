import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  convertKeyToLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')    
      .replace(/^./, str => str.toUpperCase());
  }

}
