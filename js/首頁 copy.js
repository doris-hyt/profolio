let cardcontent = document.querySelector('.card-content');
let cardcontent_img = document.querySelectorAll('.card-content-img');
let cardcontent_name = document.querySelectorAll('.card-content-name');
let cardcontent_price = document.querySelectorAll('.card-content-price');
let page = "./購物車訂購畫面.html";
let array_product = [];//商品陣列
let array_product01 = [];//加入購物車
let number = 1;
if (JSON.parse(localStorage.getItem('key'))) {
  array_product01 = JSON.parse(localStorage.getItem('key'))
}
cardcontent_img.forEach((item, index) => {
  let object_product = {}
  let a = item.src;
  let b = cardcontent_name[index].textContent;
  let c = parseInt(cardcontent_price[index].textContent);
  object_product.img = `${a}`;
  object_product.name = `${b}`;
  object_product.price = `${c}`;
  object_product.quantity = `${number}`;
  object_product.total = `${number* c }`;
  array_product.push(object_product);
})
cardcontent.addEventListener('click', function (event) {
  event.stopPropagation()
  if (event.target.classList.contains('btn-primary')) {
    let id = 0;
    let cost = 0;
    let per_price = 0;
    id = event.target.dataset.id
    array_product[id].ID = id;
    let index = array_product01.findIndex((item) => item.ID === id)
    if (array_product01.some((item) => item.ID == id)) {
      number = array_product01[index].quantity;
      cost = array_product01[index].price;
      per_price = cost / number;
      number++;
      cost = per_price * number
      array_product01[index].quantity = number;
      array_product01[index].price = cost
      alert('此商品已在購物車中，已增加數量！');
    } else {
      array_product01.push(array_product[id]);
    }
    window.location.href = page
  }
  localStorage.setItem('key', JSON.stringify(array_product01));
})

