import {order_db} from "../db/db.js";

export function loadOrderTable(){
    $('tbody').eq(3).empty();
    order_db.map((order, index) => {
        $('tbody').eq(3).append(
            `<tr>
                <th scope="row">${index+1}</th>
                <td>${order.orderId}</td>
                <td>${order.date}</td>
                <td>${order.customerId}</td>
                <td>${order.discount}%</td>
                <td>Rs. ${order.subTotal}</td>
             </tr>`
        )
    })
}