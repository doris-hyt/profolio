let order = document.querySelector('.order-info');
let order01 = document.querySelector('.order-info01')
let order02 = document.querySelector('.order-info02')
let array_product01 = [];
let object = {};
let sum_quantity = 0
let sum_price = 0
let total = 0
let address_form='';


// console.log(localStorage.getItem('key'))
if (JSON.parse(localStorage.getItem('key'))) {
  array_product01 = JSON.parse(localStorage.getItem('key'))
  console.log(array_product01)
}
if (JSON.parse(localStorage.getItem('key01'))) {
  object = JSON.parse(localStorage.getItem('key01'))
  console.log(object)
}
object.address.forEach((item)=>{
  address_form += item;
  console.log(address_form)
})


displayorder()

function displayorder() {
  array_product01.forEach((item) => {
    order.innerHTML += `<div class="row m-0 p-4 px-0">
            <div class="col-5 col-sm-3 d-flex justify-content-start px-0  ">
              <!--圖片-->
              <div class="d-flex align-items-center me-2">
                <img src="${item.img}" width="60" height="60" class="rounded-circle menu-item-img" alt="">
              </div>
              <div class="text d-flex flex-column justify-content-center align-items-start px-0">
                <p class="text-start menu-item-text">${item.name}</p>
                <p class="menu-item-text text-start">藍寶石😍</p>
              </div> 
            </div>
            <div class="col-2 col-sm-6 ">
            </div>
            <div class="col-5 col-sm-3 d-flex align-items-center justify-content-start menu-item-price  px-0 ">
              <div class="row w-100 align-items-center justify-content-between">
                <div class="col col-sm-8 d-flex align-items-center justify-content-center px-0 ">
                  <span class="menu-item-text">x${item.quantity}</span>
                </div>
                <div class="col col-sm-4 text-center menu-item-text p-0 ">$${item.price}</div>
              </div>
            </div>
          </div>
          <hr class="m-0">`
    order02.innerHTML =`<div class="row m-0" >
          <div class="col-12 mb-3 px-0" style="font-size:24px">寄送資料</div>
          <div class="col-12 mb-3 px-0" style="font-size:15px"><span class="me-2">姓名</span>${object.name}</div>
          <div class="col-12 mb-3 px-0" style="font-size:15px"><span class="me-2">電話</span>${object.phone}</div>
          <div class="col-12 mb-3 px-0" style="font-size:15px"><span class="me-2">Email</span>${object.email}</div>
          <div class="col-12 mb-3 px-0" style="font-size:15px"><span class="me-2">地址</span>${address_form}</div>
          <hr class="mt-2">
        </div> `
    sum_quantity += parseInt(item.quantity)
    sum_price += parseFloat(item.price)
    total = sum_price + 45
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
              <div class="col col-sm-8 col-lg-6 d-flex justify-content-end align-items-center px-0 "><span>$45</span>
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



