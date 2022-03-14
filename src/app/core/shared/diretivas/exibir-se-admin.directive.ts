import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { UsuarioService } from '../../auth/usuario.service';

@Directive({ selector: '[isAccessAdmin]' })
export class IsAccessAdminDirective {

    constructor(
        private usuarioService: UsuarioService,
        private element: ElementRef<any>,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {

        if(!this.usuarioService.isAdmin())
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        
    }
}