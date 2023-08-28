import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class CnpjUtil {
  format(value: string) {
    return `${value[0]}${value[1]}.${value[2]}${value[3]}${value[4]}.${value[5]}${value[6]}${value[7]}/${value[8]}${value[9]}${value[10]}${value[11]}-${value[12]}${value[13]}`;
  }
}
