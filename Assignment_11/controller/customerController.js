import {customer_db} from "../db/db.js";
import {CustomerModel} from "../model/customerModel.js";
import {setCustomerIds} from "./orderController.js";

const btns = $('#customer_btn button');

const customerId = $('#customer_id');
const customerName = $('#customer_name');
const customerContact = $('#contact');
const customerAddress = $('#address');

//delete customer
btns.eq(0).on('click', () => {
    let customer_id = customerId.val().trim();

    if (validate(customer_id, 'customer Id')) {
        let index = getCustomerIndex(customer_id);

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
                    customer_db.splice(index, 1);
                    loadCustomerTable();
                    setCustomerIds();
                    btns.eq(3).click();

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

//update customer
btns.eq(1).on('click', () => {
    let customer_id = customerId.val().trim();
    let customer_name = customerName.val().trim();
    let contact = customerContact.val().trim();
    let address = customerAddress.val().trim();

    if (validate(customer_id,'customer Id') && validate(customer_name,'name') &&
        validate(address,'address') && validate(contact,'contact')) {

        let customer = new CustomerModel(customer_id, customer_name, address, contact);
        let index = getCustomerIndex(customer_id);

        if (index >= 0) {
            Swal.fire({
                title: 'Do you want to update the customer?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    customer_db[index] = customer;
                    loadCustomerTable();
                    btns.eq(3).click();

                    Swal.fire('Customer Updated!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not updated!', '', 'info')
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

//save customer
btns.eq(2).on('click', () => {
    let customer_id = customerId.val().trim();
    let customer_name = customerName.val().trim();
    let contact = customerContact.val().trim();
    let address = customerAddress.val().trim();

    if (validate(customer_id,'customer Id') && validate(customer_name,'name') &&
        validate(address,'address') && validate(contact,'contact')) {

        let customer = new CustomerModel(customer_id, customer_name, address, contact);

        if (getCustomerIndex(customer_id) < 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    customer_db.push(customer);
                    loadCustomerTable();
                    setCustomerIds();
                    btns.eq(3).click();
                    console.log(customer_db)

                    Swal.fire('Customer Saved!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Customer is already exists 😔',
            });
        }
    }

});

//load customer
$('tbody').eq(0).on('click', 'tr', function() {
    let customer_id = $(this).find('td').eq(0).text();
    let index = getCustomerIndex(customer_id);

    customerId.val(customer_db[index].customer_id);
    customerName.val(customer_db[index].name);
    customerAddress.val(customer_db[index].address);
    customerContact.val(customer_db[index].contact);
});

btns.eq(3).on('click', () => {
    customerId.val('');
    customerName.val('');
    customerContact.val('');
    customerAddress.val('');
});

//load the customer table
const loadCustomerTable = function () {

    $('tbody').eq(0).empty();
    customer_db.map((value, index) => {
        $('tbody').eq(0).append(
            `<tr>
            <th scope="row">${index+1}</th>
            <td>${value.customer_id}</td>
            <td>${value.name}</td>
            <td>${value.address}</td>
            <td>${value.contact}</td>
         </tr>`
        );
    });

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

const getCustomerIndex = function (customerId) {
    return customer_db.findIndex(customer => customer.customer_id === customerId);
}