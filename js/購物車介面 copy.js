let order = document.querySelector('.order-info');
let order01 = document.querySelector('.order-info01')
let array_product02 = [];
let element = document.querySelector('.plus');
let sum_quantity = 0
let sum_price = 0
let total = 0



// console.log(localStorage.getItem('key'))
if (JSON.parse(localStorage.getItem('key'))) {
  array_product02 = JSON.parse(localStorage.getItem('key'))
  console.log(array_product02)
}

displayorder()
//先渲染介面

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
//先取得數量欄位的input值
let btn = document.querySelector('.btn')
//綁定下一步按鈕
order.addEventListener('click', function (event) {
  element = event.target;//先辨別點擊元素;
  console.log(element.parentElement.dataset.id);
  console.log(element);
  console.log(event.target.dataset);
  let ID = element.dataset.id;//抓取點擊元素的data-id
  console.log(ID);
  //找有對應點擊元素ID的物件(ID屬性的值)在購買清單的索引值
  let index = array_product02.findIndex((item) => item.ID === ID);
  console.log(index);
  //先取得陣列中指定物件商品總額的值
  let cost = array_product02[index].total;
  // numbers = document.querySelectorAll('.quantity')
  adjustquantity();
  //當點擊到加減按鈕時，要先把有重新輸入數量的商品(因只有輸入還未觸發改成正確的數量)數量調整跟抓到的資料一致，再去做加減的動作
  let number = numbers[index].value;
  //先取得陣列中指定物件商品數量的值
  let per_price = array_product02[index].price;
  //先取得陣列中指定物件商品價格的值
  sum_quantity = 0;
  sum_price = 0;
  total = 0;
  //每次點擊按鈕要總和重置，才不會一直累加
  //判斷點擊按鈕為增加數量還是減少數量
  if (element.classList.contains('plus')) {
    console.log('有點到');
    console.log(element);
    //改變數量及金額   
    number++;
    cost = per_price * number
    //重新賦值重複元素數量屬性的值
    array_product02[index].quantity = number;
    array_product02[index].total = cost
    console.log(array_product02[index].quantity);
    console.log(array_product02[index].price);
    order.innerHTML = ''
    console.log(number)

  } else if (element.classList.contains('delete')) {
    console.log('有點到')
    number--;
    if (number == 0) {
      array_product02.splice(index, 1)
      console.log(array_product02)
      order.innerHTML = '';
      //如果購物車中只剩下一項產品，要連同金額合計欄清空，不然需要重新整理才會清空
      order01.innerHTML = '';
      alert('數量為零,已刪除產品，如有需要，請重新添加到購物車中')
    } else {
      cost = per_price * number
      //重新賦值重複元素數量屬性的值
      array_product02[index].quantity = number;
      array_product02[index].total = cost
      console.log(array_product02[index].quantity);
      console.log(array_product02[index].price);
      order.innerHTML = ''
      console.log(element)
    }
  }
  displayorder()
  console.log(array_product02)
  //不先存進去一次，重新整理會回復到原本的陣列
  localStorage.setItem('key', JSON.stringify(array_product02))
  // localStorage.setItem('price', JSON.stringify(array_product02))
})

btn.addEventListener('click', function () {
  // numbers = document.querySelectorAll('.quantity')
  //將存進暫存空間的陣列值再重新轉化成陣列
  // array_product02 = JSON.parse(localStorage.getItem('key'))
  console.log('有點到');
  adjustquantity();
  // array_product02.map((item, index) => item.quantity = numbers[index].value)
  // array_product02.map((item, index) => item.total = numbers[index].value * item.price)
  console.log(array_product02);
  localStorage.setItem('key', JSON.stringify(array_product02));
})
function adjustquantity(){
  //每次點擊按鈕重新讀取數量欄位的input值
  numbers = document.querySelectorAll('.quantity');
  //將購買清單裡面數量屬性的值調整到跟數量欄位裡面的input.value一致
  array_product02.map((item, index) => item.quantity = numbers[index].value);
  array_product02.map((item, index) => item.total = numbers[index].value * item.price);
}

