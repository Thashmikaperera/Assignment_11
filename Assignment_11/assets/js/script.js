window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('homePage');
    loadingScreen.style.display = 'none';
    const loadingScreen1 = document.querySelector('#header');
    loadingScreen1.style.display = 'none';

});

const myfunction = () => {
    const loadingScreen = document.getElementById('loading_page');
    loadingScreen.style.display = 'none';
    const loadingScreen1 = document.getElementById('header');
    loadingScreen1.style.display = 'block';
}

$('#btn').on('click', () =>{
    const loadingScreen = document.getElementById('homePage');
    loadingScreen.style.display = 'block';
    const loadingScreen1 = document.getElementById('customer');
    loadingScreen1.style.display = 'none';
    const loadingScreen2 = document.getElementById('item');
    loadingScreen2.style.display = 'none';
    const loadingScreen3 = document.getElementById('order');
    loadingScreen3.style.display = 'none';
    const loadingScreen4 = document.getElementById('order_details');
    loadingScreen4.style.display = 'none';
    myfunction();
});


$('#customer').css('display','none');
$('#item').css('display','none');
$('#order').css('display','none');
$('#order_details').css('display','none');

$('#home_nav').on('click', () => {
    $('#homePage').css('display','block');
    $('#customer').css('display','none');
    $('#item').css('display','none');
    $('#order').css('display','none');
    $('#order_details').css('display','none');
});

$('#customer_nav').on('click', () => {
    $('#homePage').css('display','none');
    $('#customer').css('display','block');
    $('#item').css('display','none');
    $('#order').css('display','none');
    $('#order_details').css('display','none');
});

$('#item_nav').on('click', () => {
    $('#homePage').css('display','none');
    $('#customer').css('display','none');
    $('#item').css('display','block');
    $('#order').css('display','none');
    $('#order_details').css('display','none');
});

$('#order_nav').on('click', () => {
    $('#homePage').css('display','none');
    $('#customer').css('display','none');
    $('#item').css('display','none');
    $('#order').css('display','block');
    $('#order_details').css('display','none');
});

$('#order_details_nav').on('click', () => {
    $('#homePage').css('display','none');
    $('#customer').css('display','none');
    $('#item').css('display','none');
    $('#order').css('display','none');
    $('#order_details').css('display','block');
});

