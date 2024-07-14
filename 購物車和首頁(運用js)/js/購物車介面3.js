let order01 = document.querySelector('.order-info01');
let order03 = document.querySelector('.order-info03')
let array_product01 = [];
let object = {};
let sum_quantity = 0;
let sum_price = 0;
let total = 0;

let btn = document.querySelector('.btn01');
let address_form = [];


console.log(btn)

// console.log(address)


// console.log(localStorage.getItem('key'))

if (JSON.parse(localStorage.getItem('key'))) {
  array_product01 = JSON.parse(localStorage.getItem('key'))
  console.log(array_product01)
}
if (JSON.parse(localStorage.getItem('key01'))) {
  object = JSON.parse(localStorage.getItem('key01'))
  console.log(object)
  address_form = object.address
  order03.innerHTML = ''
  order03.innerHTML = `<div class="mb-3">
          <label for="name" class="form-label ">姓名</label>
          <input type="name" class="form-control" id="name" placeholder="請輸入...." value = "${object.name}">
        </div>
        <div class="mb-3">
          <label for="name" class="form-label ">電話</label>
          <input type="name" class="form-control" id="phone" placeholder="請輸入...." value = "${object.phone}">
        </div>
        <div class="mb-3">
          <label for="emial" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="請輸入...." value = "${object.email}">
        </div>
        <!-- 地址 -->
        <div class="row m-0 address-form">
          <div class="mb-1 col-6 pe-1 ps-0">
            <!-- <label for="name" class="form-label ">姓名</label> -->
            <input type="name" class="form-control" id="address" placeholder="請輸入...."value = "${object.address[0]}" >
          </div>
          <div class="mb-1 col-6 ps-1 pe-0">
            <input type="email" class="form-control" id="address" placeholder="請輸入...."value = "${object.address[1]}">
          </div>
          <div class="mb-3 col-12 p-0">
            <input type="name" class="form-control" id="address" placeholder="請輸入...." value = "${object.address[2]}">
          </div>
          <hr class="mt-4">
        </div>`
}



displayorder()

function displayorder() {
  array_product01.forEach((item, index) => {
    sum_quantity += parseInt(item.quantity)
    sum_price += parseFloat(item.price)
    total = sum_price + 45;
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
btn.addEventListener(('click'), function () {
  console.log('有點到')
  let Name = document.querySelector('#name');
  let Phone = document.querySelector('#phone');
  let Email = document.querySelector('#email');
  let address = document.querySelectorAll('#address');
  address_form = []
  console.log(address)
  object.name = `${Name.value}`;
  object.phone = `${Phone.value}`;
  object.email = `${Email.value}`;
  address.forEach((item) => {
    console.log(item.value)
    address_form.push(item.value)
    console.log(address_form)
  })
  object.address = address_form
  console.log(object)
  localStorage.setItem('key01', JSON.stringify(object));
  window.location.href = './購物車結帳畫面.html'
})

// value = "${object.address[2]}"


