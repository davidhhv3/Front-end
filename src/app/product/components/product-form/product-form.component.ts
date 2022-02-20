import { Component, OnInit } from '@angular/core';
import { ProductService} from "../../services/product.service";
import {Products} from "../../models/Products";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { Status} from "../../models/Status";
import {DialogComponent} from "../../../utils/dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/utils/services/loading-service.service';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product:Products={
    idProduct : 0,
    product :  "",
    status_idStatus:0
  }
  status:Status[]=[];
  FormGroup: FormGroup;    
  edit:boolean=false;
  TextButton:string="";

  constructor(private productService:ProductService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private statusService:StatusService,
              private router:Router,
              private dialog: MatDialog,
              private toastr:ToastrService,
              private loadingService:LoadingService) {

    this.FormGroup = this.formBuilder.group({
      id: [''],   
      product: ['', [Validators.maxLength(50),Validators.required]],
      status_idStatus: ['', [Validators.required]]  
    });

   }

  ngOnInit(): void {    
    this.getStatus();
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.edit=true;
      this.TextButton="Modificar";
      this.getProduct(params.id);              
    }
    else{
      this.TextButton="Guardar";      
    }   
  }


  getProduct(id:number){
    this.loadingService.setLoading(true); 
    this.productService.getProduct(id)
    .subscribe(
      res=>{
        this.product=res;               
        this.FormGroup.get('id')?.setValue(this.product.idProduct);
        this.FormGroup.get('product')?.setValue(this.product.product);
        this.FormGroup.get('status_idStatus')?.setValue(this.product.status_idStatus);  
        this.loadingService.setLoading(false);       
      },
      err=>{
        console.log(err);
      }
    )
  }
  getStatus(){
    this.loadingService.setLoading(true); 
    this.statusService.getStatus()
    .subscribe(
      res=>{
        this.status=res;     
        this.loadingService.setLoading(false);          
      },
      err=>{
        console.log(err);
        this.loadingService.setLoading(false); 
      }
    )
  }
  validateForm(form:FormGroup){    
    const idField = this.FormGroup.get('id');
    const productField = this.FormGroup.get('product');
    const statusIdStatusField = this.FormGroup.get('status_idStatus');

    if (this.FormGroup.valid) {       
      this.product.idProduct=idField?.value;
      this.product.product=productField?.value;
      this.product.status_idStatus=statusIdStatusField?.value;
      console.log(this.product);  
      if(this.edit==true){
        this.update();
      }else{
        this.save();
      }     
    }else if (productField?.invalid && statusIdStatusField?.invalid ){
      this.FormGroup.markAllAsTouched();
      this.toastr.warning('Ingrese todos los Campos Requeridos');       
    }else if (productField?.invalid) {
      this.toastr.warning('Ingresa el nombre del producto');         
    }else if (statusIdStatusField?.invalid) {   
      this.toastr.warning('Ingresa el estado');              
    }
  } 
  save(){    
    this.loadingService.setLoading(true); 
    this.product.idProduct=0;     
    this.productService.saveProduct(this.product)
    .subscribe(
      res=>{
        this.toastr.success('Producto guardado');
        this.router.navigate(['/home']); 
        this.loadingService.setLoading(false);              
      },err=>{
        console.log(err);
        this.toastr.error('Ha ocurrido un error'); 
        this.loadingService.setLoading(false); 
      }
    )

  }
  update(){    
    let dialogRef = this.dialog.open(DialogComponent, { 
      data: { text: '¿Está seguro de modificar el producto?' },  
     });    
    dialogRef.afterClosed().subscribe(result => {
        if(result === "yes"){
          this.loadingService.setLoading(true); 
          this.productService.updateProduct(this.product.idProduct,this.product)
          .subscribe(
            res=>{
              this.toastr.success('Producto modificado');
              this.router.navigate(['/home']); 
              this.loadingService.setLoading(false); 
            },err=>{
              console.log(err);
              this.toastr.error('Ha ocurrido un error'); 
              this.loadingService.setLoading(false); 
            }
          )       
        }
    });  

  }
  invalidFields(field: string) {  
    const fieldName = this.FormGroup.get(field);     
    return fieldName?.touched && fieldName?.invalid;  
  }
  delete(id:number){    
    let dialogRef = this.dialog.open(DialogComponent, { 
      data: { text: '¿Está seguro de eliminar el producto?' },  
     });    
    dialogRef.afterClosed().subscribe(result => {
        if(result === "yes"){
          this.loadingService.setLoading(true); 
          this.productService.deleteProduct(id)
          .subscribe(
            res=>{
              this.toastr.success('Producto Eliminado');
              this.router.navigate(['/home']);  
              this.loadingService.setLoading(false); 
            },err=>{
              this.toastr.error('Ha ocurrido un error'); 
              this.loadingService.setLoading(false); 
            }
          )          
        }
    });  
  }

}
