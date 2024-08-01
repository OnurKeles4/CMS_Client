import { MatDialog, MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {

    constructor(public dialogRef: MatDialogRef<DialogComponent>) {

    }

    close() {
        this.dialogRef.close();
        //var a: number = 5;
        // console.log("🚀 ~ BaseDialog<DialogComponent> ~ close ~ a:", a)
    }
}
