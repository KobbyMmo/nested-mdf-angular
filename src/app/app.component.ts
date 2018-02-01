import { Component, Input } from '@angular/core';
import { Validators, FormGroup, FormArray, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ingredients: any[] = [{ name: 'rice', id: 1, quantities: [{ amount: 0, sku: 1 }] }, { name: 'bread', id: 50, quantities: [{ amount: 0, sku: 1 }] }];
  form: FormGroup;
  ingredientsFormArray: FormArray;
  quatitiesFormArray: FormArray;


  ngOnInit() {
    this.form = new FormGroup({});
    this.initializeForm();
  }

  initializeForm() {
    this.form.setControl('ingredients', new FormArray([]));
    this.ingredientsFormArray = <FormArray>this.form.controls['ingredients'];
    this.initializeIngredientsFormArray();
  }


  initializeIngredientsFormArray() {
    this.ingredients.forEach(ingredient => {
      this.ingredientsFormArray.push(new FormGroup({
        name: new FormControl(ingredient.name, [Validators.required]),
        quantities: new FormArray([]),
      }));
      console.log(this.ingredientsFormArray);
      
      const ingredientForm = <FormGroup>this.ingredientsFormArray.controls[this.ingredientsFormArray.length-1];
      const singleIngredientFormArray = <FormArray>ingredientForm.controls['quantities'];
      ingredient.quantities.forEach(element => {
        singleIngredientFormArray.push(this.initializeSingleQuantityForm(element));

      });
    });
  }

  initializeSingleQuantityForm(quantity: any): FormGroup {
    return new FormGroup({
      amount: new FormControl(quantity.amount, [Validators.required]),
      sku: new FormControl(quantity.sku, [Validators.required]),
    });
  }
  initializeSingleIngredientForm(ingredient: any): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient.name, [Validators.required]),
      quantities: new FormArray([])
    });
  }

//
addIngredient() {
  this.ingredientsFormArray.push(this.initializeSingleIngredientForm({ name: "" }));
}
addQuantity(ingredientIndex:string) {
  this.ingredientsFormArray.controls[ingredientIndex].controls['quantities'].push(this.initializeSingleQuantityForm({ amount: 0, sku: 1 }));
}

deleteIngredient(ingredientIndex: number) {
  this.ingredientsFormArray.removeAt(ingredientIndex);
}
deleteQuantity(ingredientIndex: string, quantityIndex: number) {
  this.ingredientsFormArray.controls[ingredientIndex].controls['quantities'].removeAt(quantityIndex);
}

resetIngredient(ingredientIndex: number) {
  this.ingredientsFormArray.at(ingredientIndex).reset();
}
resetQuantity(ingredientIndex: string, quantityIndex: number) {
  this.ingredientsFormArray.controls[ingredientIndex].controls['quantities'].at(quantityIndex).reset();
}

save(){
console.log(this.form.value);
}

}

