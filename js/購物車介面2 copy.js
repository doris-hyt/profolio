let order01 = document.querySelector('.order-info01')
let array_product01 = [];
let method1=[];
let method2=[]
let sum_quantity = 0
let sum_price = 0
let total = 0;
let options=document.querySelectorAll('.option01')
let option2s = document.querySelectorAll('.option02');
let payment='';
let deliver='';
let deliver_fee=0;
if (JSON.parse(localStorage.getItem('key'))) {
  array_product01 = JSON.parse(localStorage.getItem('key'))
}
if (JSON.parse(localStorage.getItem('key02'))) {
  method1 = JSON.parse(localStorage.getItem('key02'))
  method2 = JSON.parse(localStorage.getItem('key03'))
  deliver_fee = parseInt(method2[1])
  method1 = [];
  method2 = []
}

options.forEach((item01)=>{
  item01.addEventListener(('click'),function(){
    payment = item01.lastElementChild.innerText;
    method1 = []
    method1.push(payment);
    localStorage.setItem('key02', JSON.stringify(method1));
    
  })
})
option2s.forEach((item02) => {
  item02.addEventListener(('click'), function () {
    deliver = item02.lastElementChild.innerText;
    deliver_fee = parseInt(item02.lastElementChild.dataset.price)
    method2 = []
    method2.push(deliver, deliver_fee)
    localStorage.setItem('key03', JSON.stringify(method2));
  })
})

displayorder()

function displayorder() {
  array_product01.forEach((item) => {
    sum_quantity += parseInt(item.quantity)
    sum_price += parseFloat(item.total)
    total = sum_price + deliver_fee
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
              <div class="col col-sm-8 col-lg-6 d-flex justify-content-end align-items-center px-0 "><span>${deliver_fee}</span>
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
    </div>
    <hr>`
  })
}







