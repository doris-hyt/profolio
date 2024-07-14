let scissor = document.querySelector('.scissor')
let stone = document.querySelector('.stone')
let paper = document.querySelector('.paper')
let scissor01 = document.querySelector('.scissor01')
let stone01 = document.querySelector('.stone01')
let paper01 = document.querySelector('.paper01')
let switch01 = document.querySelector('.switch')
let part01 = document.querySelector('.part-1')
let part02 = document.querySelector('.part-2')
let part03 = document.querySelector('.part-3')
let userwin = document.querySelector('.user-win')
let comwin = document.querySelector('.com-win')
let tie = document.querySelector('.tie')
console.log(paper01)
console.log(switch01)
console.log(part01)
let previousElementSibling = scissor.previousElementSibling
let games = []
let labels= document.querySelectorAll('.label-style')
let random=Math.floor(Math.random()*3)
console.log(random)
console.log(typeof(random))
console.log(labels)
console.log(labels[0].classList[1])
for(let i=0;i<labels.length;i++){
  let game = labels[i].classList[1]
  console.log(typeof(game))
  games.push(game)
}
function play(key) {
  if (key === (random + 1) % 3) {
    console.log('玩家贏')
    userwin.classList.add('glow')
  } else if ((key + 1) % 3 == random) {
    console.log('電腦贏')
    comwin.classList.add('glow')
  } else {
    console.log('兩人平手')
    tie.classList.add('glow')
  }
}
function transform(number) {
  random = Math.floor(Math.random() * 3)
  if (number == 0) {
    console.log('電腦出的是剪刀')
    paper01.src ='/img/stone01.jpg'
    scissor01.src = '/img/paper01.jpg'
    stone01.src = '/img/scissor01.jpg'
    paper01.src = './img/stone01.jpg'
    scissor01.src = './img/paper01.jpg'
    stone01.src = './img/scissor01.jpg'
    part02.classList.remove('pos-2')
    part02.classList.add('pos-3')
    part01.classList.remove('pos-1')
    part01.classList.add('pos-2')
    part03.classList.remove('pos-3')
    part03.classList.add('pos-1')
    
  } else if (number == 1) {
    console.log('電腦出的是石頭')
  } else if (number == 2) {
    console.log('電腦出的是布')
    paper01.src = '/img/scissor01.jpg'
    scissor01.src = '/img/stone01.jpg'
    stone01.src = '/img/paper01.jpg'
    paper01.src = './img/scissor01.jpg'
    scissor01.src = './img/stone01.jpg'
    stone01.src = './img/paper01.jpg'
    part02.classList.remove('pos-2')
    part02.classList.add('pos-1')
    part01.classList.remove('pos-1')
    part01.classList.add('pos-3')
    part03.classList.remove('pos-3')
    part03.classList.add('pos-2')
  }


}

function clearclass(){
  part02.classList.remove('pos-1')
  part02.classList.remove('pos-3')
  part02.classList.add('pos-2')
  part01.classList.remove('pos-2')
  part01.classList.remove('pos-3')
  part01.classList.add('pos-1')
  part03.classList.remove('pos-1')
  part03.classList.remove('pos-2')
  part03.classList.add('pos-3')
  paper01.src = '/img/paper01.jpg'
  scissor01.src = '/img/scissor01.jpg'
  stone01.src = '/img/stone01.jpg'
  paper01.src = './img/paper01.jpg'
  scissor01.src = './img/scissor01.jpg'
  stone01.src = './img/stone01.jpg'
  userwin.classList.remove('glow')
  comwin.classList.remove('glow')
  tie.classList.remove('glow')

  
  
}
// clearclass()
console.log(switch01)
console.log(games)
scissor.addEventListener('click',function(event){
  // console.log(event)
  previousElementSibling = scissor.previousElementSibling
  let value01 = String(previousElementSibling.value)
  console.log(typeof(value01))
  let key01 = games.indexOf(value01)
  console.log(key01)
  clearclass()
  play(key01)
  transform(random)  
})
stone.addEventListener('click', function (event) {
  // console.log(event)
  previousElementSibling = stone.previousElementSibling
  let value02 = String(previousElementSibling.value)
  console.log(typeof (value02))
  let key02 = games.indexOf(value02)
  console.log(key02)
  clearclass()
  play(key02)
  transform(random)
})
paper.addEventListener('click', function (event) {
  // console.log(event)
  previousElementSibling = paper.previousElementSibling
  let value03 = String(previousElementSibling.value)
  console.log(typeof (value03))
  let key03 = games.indexOf(value03)
  console.log(key03)
  clearclass()
  play(key03)
  transform(random)
})





// buttons.addEventListener('click', function () {
//   let guess = Math.floor(Math.random() * 3) + 1
//   let result=''
//   console.log(guess)
//   if(guess===1){
//     result = '剪刀'
//     console.log(guess)
//     console.log(result)
    
//   } else if (guess === 2){
//     result = '石頭'
//     console.log(guess)
//     console.log(result)
//   }else{
//     result = '布'
//     console.log(guess)
//     console.log(result)
//   }
// })