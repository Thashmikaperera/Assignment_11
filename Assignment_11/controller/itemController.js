import {item_db} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";
import {setItemIds} from "./orderController.js";

const item_save = $('#item_saveBtn');
const item_update = $('#item_UpdateBtn');
const item_delete = $('#item_deleteBtn');
const item_reset = $('#item_resetBtn');

const item_code = $('#itS1');
const item_description = $('#itS2');
const item_price = $('#itS3');
const item_qty = $('#itS4');

//save item
item_save.on('click', () => {
    let itemCode = item_code.val().trim();
    let desc = item_description.val().trim();
    let price = parseFloat(item_price.val().trim());
    let qty_val = parseInt(item_qty.val());

    if (validate(itemCode, 'item code') && validate(desc, 'description') &&
        validate(price, 'unit price') && validate(qty_val, 'qty on hand')) {

        let item = new ItemModel(itemCode, desc, price, qty_val);

        if (getItemIndex(itemCode) < 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    item_db.push(item);
                    loadItemTable();
                    setItemIds();
                    item_reset.click();

                    Swal.fire('Item Saved!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Item is already exists 😔',
            });
        }
    }
});

//update item
item_update.on('click', () => {
    let itemCode = item_code.val().trim();
    let desc = item_description.val().trim();
    let price = parseFloat(item_price.val().trim());
    let qty_val = parseInt(item_qty.val());

    if (validate(itemCode, 'item code') && validate(desc, 'description') &&
        validate(price, 'unit price') && validate(qty_val, 'qty on hand')) {

        let item = new ItemModel(itemCode, desc, price, qty_val);
        let index = getItemIndex(itemCode);

        if (index >= 0) {
            Swal.fire({
                title: 'Do you want to update the item?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    item_db[index] = item;
                    loadItemTable();
                    item_reset.click();

                    Swal.fire('Item Updated!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not updated!', '', 'info')
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Item did not exists 😓',
            });
        }
    }
});

//delete item
item_delete.on('click', () => {
    let itemCode = item_code.val().trim();

    if (validate(itemCode, 'item code')) {

        let index = getItemIndex(itemCode);
        if (index >= 0) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    item_db.splice(index, 1);
                    loadItemTable();
                    setItemIds();
                    item_reset.click();

                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Customer did not exists 😓',
            });
        }
    }
});

item_reset.on('click', () => {
    item_code.val('');
    item_description.val('');
    item_price.val('');
    item_qty.val('');
});

$('tbody').eq(1).on('click', 'tr', function() {
    let itemCode = $(this).find('td').eq(0).text();
    let index = getItemIndex(itemCode);

    item_code.val(item_db[index].item_code);
    item_description.val(item_db[index].description);
    item_price.val(item_db[index].unit_price);
    item_qty.val(item_db[index].qty);
});

export const loadItemTable = function () {
    $('tbody').eq(1).empty();
    item_db.map((value, index) => {
        $('tbody').eq(1).append(
            `<tr>
            <th scope="row">${index+1}</th>
            <td>${value.item_code}</td>
            <td>${value.description}</td>
            <td>${value.unit_price}</td>
            <td>${value.qty}</td>
         </tr>`
        );
    });
}

const getItemIndex = function (itemCode){
    return item_db.findIndex(item => item.item_code === itemCode);
}

function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}