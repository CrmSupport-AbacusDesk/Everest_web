import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from '../_services/DatabaseService';
import { Params, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-mastet-date-filter-model',
    templateUrl: './mastet-date-filter-model.component.html',
    styleUrls: ['./mastet-date-filter-model.component.scss']
})
export class MastetDateFilterModelComponent implements OnInit {
    
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    myControl = new FormControl();
    options: any;
    
    data:any={};
    today:any = '';
    mode:any;
    karigar:any;
    modedisabled:any;
    karigarList = [];

    constructor(private router: Router,private snacker: MatSnackBar, public dialog:DialogComponent, private dialogRef: MatDialogRef<MastetDateFilterModelComponent>,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) public params: any) {
        console.log(this.params);
        this.mode = this.params.mode;
        if( this.mode == 'date'){
            this.data.from = this.params.from;
            this.data.to = this.params.to;
        }else{
             this.data = this.params.value;
        }

        this.getKariger('')
        setTimeout(() => {
            this.karigarList = this.karigar.map((k) => {
                return {
                    value: k.karigar_id,
                    display: k.full_name
                }
               // console.log(k.karigar_id, k.full_name);
            });
            console.log('All Karigar List', this.karigar);
        }, 1000);
    }
    
 
    ngOnInit() {
        this.today = new Date();
       
    }
    

    

    submit()
    {
        console.log(this.data);
        this.data.from = this.data.from  ? this.db.pickerFormat(this.data.from) : '';
        this.data.to = this.data.to  ? this.db.pickerFormat(this.data.to) : '';
        this.dialogRef.close(this.data);
    }

    getKariger(e) 
    {
        this.db.post_rqst(  {"filter":{"search":e}}, 'karigar/karigarListCoupon')
        .subscribe( d => {
            this.karigar = d['karigars']
            console.log("this.karigar",this.karigar);
            if(this.karigar == e ){
                this.modedisabled = false
            }
        });
    }
   

   
    
    assignCoupon(){
        this.db.post_rqst( {"qr_code": this.data.coupon_code,"karigar_id": this.data.karigar_id,'login_id':this.db.datauser.id,}, 'app_karigar/karigarCoupon')
        .subscribe( d => {

            if(d['status']== 'USED' ){
                console.log('log');
                this.dialog.warning("This coupon already used!");
                return
                
            }else if(d['status'] == 'INVALID'){
                console.log('log');
                this.dialog.warning("This coupon is Invalid!");
                return
            }
            else if(d['status'] == 'VALID'){
                this.dialog.success('Coupon Assigned successfully');
                this.router.navigateByUrl('/coupon-code-list');
                
            }
            
            console.log("kargir",d);
            this.karigar = d['karigars']
            this.dialogRef.close();
            console.log("this.karigar",this.karigar);
            
            
        });
    }
}
