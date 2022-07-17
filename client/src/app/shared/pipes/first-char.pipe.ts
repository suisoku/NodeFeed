import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform the given argment and return the first char of the value or 'P' char if null
 */
@Pipe({
  name: 'firstChar'
})
export class FirstCharPipe implements PipeTransform {
  transform(value: string): string {
    console.log('object :>> hhhhhahahah');
    return value ? value.charAt(0).toUpperCase() : 'P';
  }
}
