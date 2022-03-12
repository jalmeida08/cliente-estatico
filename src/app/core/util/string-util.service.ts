import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StringUtilService {

    cepMask = '00.000-000';
    cpfMask = '000.000.000-00'
    telefone = '0000-0000 || 0 0000-0000'

    constructor() { }
    
}