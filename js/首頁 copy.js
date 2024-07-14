let cardcontent = document.querySelector('.card-content');
let cardcontent_img = document.querySelectorAll('.card-content-img');
let cardcontent_name = document.querySelectorAll('.card-content-name');
let cardcontent_price = document.querySelectorAll('.card-content-price');
let page = "./購物車訂購畫面 copy.html";
let array_product = [];//商品陣列
let array_product01 = [];//加入購物車
let number = 1;

console.log(localStorage.getItem('key'))
if (JSON.parse(localStorage.getItem('key'))) {
  array_product01 = JSON.parse(localStorage.getItem('key'))
}
console.log(array_product01)
// console.log(array_product01)
// console.log(array_product01[0].img)
// console.log(array_product01[0].name)
// console.log(array_product01[0].price)
// console.log(typeof (parseInt(array_product01[0].price)))
// console.log(array_product01[1].img)
// console.log(array_product01[1].name)
// console.log(array_product01[1].price)

//製作
console.log(cardcontent_img);
cardcontent_img.forEach((item, index) => {
  //先宣告一個新的物件
  let object_product = {}
  let a = item.src;
  let b = cardcontent_name[index].textContent;
  let c = parseInt(cardcontent_price[index].textContent);
  //將img,name,price的陣列資料逐筆加入到宣告的空物件裡面
  object_product.img = `${a}`;
  object_product.name = `${b}`;
  object_product.price = `${c}`;
  object_product.quantity = `${number}`;
  object_product.total = `${number* c }`;
  //再把製作好的每一筆物件放進商品陣列中
  array_product.push(object_product);
})
console.log(array_product)

console.log(cardcontent_name);
console.log(cardcontent_price);


cardcontent.addEventListener('click', function (event) {
  event.stopPropagation()
  if (event.target.classList.contains('btn-primary')) {
    console.log('有點到按鈕');
    let id = 0;
    let cost = 0;
    let per_price = 0;
    id = event.target.dataset.id//抓抓取按鈕上data-id屬性的值;
    console.log(id);
    console.log(array_product[id]);
    //將id與相對應商品陣列的索引值的物件資料新增新的key-value值r
    array_product[id].ID = id;//
    //找出已加入購物車的商品陣列中與id相對應屬性值的商品物件在陣列中的索引值
    let index = array_product01.findIndex((item) => item.ID === id)
    console.log(index)
    //加入一個判斷式，判斷是否清單中已有相同的商品。
    if (array_product01.some((item) => item.ID == id)) {
      console.log('有重複')
      //先抓取重複元素數量屬性的值
      number = array_product01[index].quantity;
      cost = array_product01[index].price;
      per_price = cost / number;
      console.log(cost);
      console.log(per_price);
      console.log(number)
      //增加數量
      number++;
      cost = per_price * number
      //重新賦值重複元素數量屬性的值
      array_product01[index].quantity = number;
      array_product01[index].price = cost
      console.log(array_product01[index].quantity);
      console.log(array_product01[index].price);
      //存入暫存空間
      // localStorage.setItem('key', JSON.stringify(array_product01))
      //從暫存空間中取值重新賦值加入購物車陣列
      // array_product01 = JSON.parse(localStorage.getItem('key'))
      alert('此商品已在購物車中，已增加數量！');
    } else {
      array_product01.push(array_product[id]);

    }
    console.log(array_product01);

    window.location.href = page
  }
  localStorage.setItem('key', JSON.stringify(array_product01));
})

