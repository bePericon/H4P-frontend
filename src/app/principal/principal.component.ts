import { Publication } from './../model/publication.model';
import { StorageService } from './../service/storage.service';
import { PublicationService } from '../service/publication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotasService } from '../service/mascotas.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  publications: Publication[] = [];

  constructor(
    private router: Router, 
    private publicationService: PublicationService,
    public storageService: StorageService,
    public masc: MascotasService) {
    this.getPublicaciones();
  }
    
  ngOnInit() {
  }

  getPublicaciones(){
    this.publicationService.getPublicaciones().subscribe(
      res => {
        this.publications = [];
        res.data.forEach(pub => {
          const publication = new Publication(pub);
          this.publications.push(publication)
        });
      }
    )
  }

  isOwnerOrPostulant(publication: Publication): Boolean{
    var currentUserName: String = this.storageService.getCurrentUser().username;
    return publication.isOwner(currentUserName) || publication.hasPostulant(currentUserName);
  }

  onNotifyActualizarPrincipal(notifyActualizarEstadoCuenta: boolean){
    if(notifyActualizarEstadoCuenta){ this.getPublicaciones(); }
  }
}
