let order = document.querySelector('.order-info');
let order01 = document.querySelector('.order-info01')
let array_product02 = [];
let element = document.querySelector('.plus');
let sum_quantity = 0
let sum_price = 0
let total = 0
if (JSON.parse(localStorage.getItem('key'))) {
  array_product02 = JSON.parse(localStorage.getItem('key'))
}

displayorder()

function displayorder() {
  array_product02.forEach((item) => {
    order.innerHTML += `<div class="row m-0 p-4 px-0">
            <div class="col-5 col-sm-3 d-flex justify-content-start px-0  ">
              <!--圖片-->
              <div class="d-flex align-items-center me-2">
                <img src="${item.img}" width="60" height="60" class="rounded-circle menu-item-img" alt="">
              </div>
              <div class="text d-flex flex-column justify-content-center align-items-start px-0">
                <p class="text-start menu-item-text">${item.name}</p>
              </div> 
            </div>
            <div class="col-2 col-sm-6 ">
            </div>
            <div class="col-5 col-sm-3 d-flex align-items-center justify-content-start menu-item-price  px-0 ">
              <div class="row w-100 align-items-center justify-content-between">
                <div class="col col-sm-8 d-flex align-items-center justify-content-center px-0 ">
                <span class="menu-item-text delete" data-id="${item.ID}" style="width:25px">-</span>
                  <div class="border border-2 py-0.5  mx-1 menu-item-text" style="--bs-border-color:#cdd0d2" data-id="${item.ID}"><input type='text' class="quantity" style="width:20px; border-width:0px;text-align:center" value='${item.quantity}'></div>
                  <span class="menu-item-text plus" data-id="${item.ID}" style="width:25px">+</span>                 
                </div>
                <div class="col col-sm-4 text-center menu-item-text p-0 ">$${item.total}</div>
              </div>
            </div>
          </div>
          <hr class="m-0">`
    sum_quantity += parseInt(item.quantity)
    sum_price += parseFloat(item.total)
    total = sum_price + 0
    order01.innerHTML = `      <div class="container text-center pt-4 px-4 pb-3 order-info01">
      <div class="row px-0 pb-3">
        <div class="row px-0 ">
          <div class="col-9 col-lg-8"></div>
          <div class="col-3 col-lg-4">
            <div class="row">
              <div class="col col-sm-6 text-start px-0">數量:</div>
              <div class="col col-sm-6 d-flex justify-content-end align-items-center px-0 "><span>$${sum_quantity}</span></div>
            </div>
          </div>
        </div>
        <div class="row px-0 ">
          <div class="col-9 col-lg-8"></div>
          <div class="col-3 col-lg-4">
            <div class="row">
              <div class="col col-sm-4 col-lg-6 text-start px-0">小計:</div>
              <div class="col col-sm-8 col-lg-6 d-flex justify-content-end align-items-center px-0 "><span>$${sum_price}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row px-0 ">
          <div class="col-9 col-lg-8"></div>
          <div class="col-3 col-lg-4">
            <div class="row">
              <div class="col col-sm-4 col-lg-6 text-start px-0">運費:</div>
              <div class="col col-sm-8 col-lg-6 d-flex justify-content-end align-items-center px-0 "><span>$0</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row px-0 ">
          <div class="col-9 col-lg-8"></div>
          <div class="col-3 col-lg-4">
            <div class="row">
              <div class="col col-sm-4 col-lg-6 text-start px-0">總計:</div>
              <div class="col col-sm-8 col-lg-6 d-flex justify-content-end align-items-center px-0 "><span>$${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>`

  })
}
let numbers = document.querySelectorAll('.quantity');
let btn = document.querySelector('.btn')
order.addEventListener('click', function (event) {
  element = event.target;
  let ID = element.dataset.id;
  let index = array_product02.findIndex((item) => item.ID === ID);
  let cost = array_product02[index].total;
  adjustquantity();
  let number = numbers[index].value;
  let per_price = array_product02[index].price;
  sum_quantity = 0;
  sum_price = 0;
  total = 0;
  if (element.classList.contains('plus')) {
    number++;
    cost = per_price * number
    array_product02[index].quantity = number;
    array_product02[index].total = cost;
    order.innerHTML = '';

  } else if (element.classList.contains('delete')) {
    number--;
    if (number == 0) {
      array_product02.splice(index, 1)
      order.innerHTML = '';
      order01.innerHTML = '';
      alert('數量為零,已刪除產品，如有需要，請重新添加到購物車中')
    } else {
      cost = per_price * number
      array_product02[index].quantity = number;
      array_product02[index].total = cost;
      order.innerHTML = '';
    }
  }
  displayorder()
  localStorage.setItem('key', JSON.stringify(array_product02))
})

btn.addEventListener('click', function () {
  adjustquantity();
  localStorage.setItem('key', JSON.stringify(array_product02));
})
function adjustquantity(){
  numbers = document.querySelectorAll('.quantity');
  array_product02.map((item, index) => item.quantity = numbers[index].value);
  array_product02.map((item, index) => item.total = numbers[index].value * item.price);
}

