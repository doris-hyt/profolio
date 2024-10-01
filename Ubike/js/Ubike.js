axios.get('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-C3D59766-0A70-40CE-887A-E925E560E456', {
  params: {
    "locationName": "宜蘭縣"
  }
})
  .then(res => {
    console.log(res)
  })
// API 網址
const apiUrl = 'https://datacenter.taichung.gov.tw/swagger/OpenData/86dfad5c-540c-4479-bb7d-d7439d34eeb1';
let iBikeStation = [];
window.onload = function () {
  console.log("家仔中")
  //顯示讀取彈窗
  Swal.fire({
    title: '💪努力加載中...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    }
  });
  axios.get(`${apiUrl}`)
    .then(res => {
      console.log(res)
      console.log(res.data);
      iBikeStation = res.data.retVal;
      console.log(iBikeStation);
      console.log(typeof (iBikeStation))
      // 整理畫面
      formatScreenHandler();
      filterAreaStation()
      // navigator.geolocation.getCurrentPosition(showNearbyHotels, error);
      // 關閉彈窗
      Swal.close();
    })
    .catch(err => {
      if (err.response) {
        console.error(err.response.data); // 打印響應數據
      }
      Swal.fire({
        title: '發生錯誤[Error: Api Fail]',
        text: '請重試一次',
        icon: 'error'
      });
      return;
    })
};

// 車站資料總數替換DOM
let js_iBike_station_total = document.querySelector('#js_iBike_station_total');
// 所有車站停靠點替換DOM
let js_iBike_station_arr = document.querySelector('#js_iBike_station_arr');
// 新的車站停靠點陣列
let new_iBike_station_arr = [];
let new_iBike_station_arr01 = [];

// 所有公園相關停靠點替換DOM
let js_iBike_location_arr = document.querySelector('#js_iBike_location_arr');
// 新的公園相關車站停靠點陣列
let new_iBike_park_arr = [];
// 關鍵字過濾的車站替換DOM
let js_iBike_keyword_arr = document.querySelector('#js_iBike_keyword_arr');
//
let btn01 = document.querySelector('.btn01')

// 整理畫面
//過濾點擊區域車站
function filterAreaStation() {
  console.log('yes')
  let new_iBike_area_arr = [];
  let btnGroups = document.querySelectorAll('.btn02')
  console.log(btnGroups);
  btnGroups.forEach((item) => { new_iBike_area_arr.push(item.innerText) })
  console.log(new_iBike_area_arr);
  btnGroups.forEach((item, index) => {
    item.addEventListener('click', function () {
      console.log(new_iBike_area_arr[index]);
      js_iBike_station_arr.innerHTML = '';
      let new_iBike_area_arr01 = iBikeStation.filter((item) => item.sarea == new_iBike_area_arr[index]);
      let new_iBike_area_arr02 = [];
      console.log(new_iBike_area_arr01);
      new_iBike_area_arr01.forEach((item) => new_iBike_area_arr02.push(item.sna));
      console.log(new_iBike_area_arr02);
      let html = '';
      new_iBike_area_arr02.forEach((item) => {
        html += `<li>${item}</li>`
      })
      js_iBike_station_arr.innerHTML = html;
    })
  })
}

function formatScreenHandler() {
  console.log('yes')

  // 1. 替換車站總數文字
  js_iBike_station_total.innerHTML = iBikeStation.length;

  // 2. 過濾陣列把所有車站名稱放進新陣列
  iBikeStation.forEach(function (i, k) {
    new_iBike_station_arr.push(i.sna);
  })
  // console.log(new_iBike_station_arr)
  // 2. 替換所有車站停靠點文字
  let content='';
  new_iBike_station_arr.forEach((item)=>{
    content+=`<li>${item}</li>`
  })
  js_iBike_station_arr.innerHTML = content;
}


// 輸入關鍵字過濾車站
function filterStationHandler(that) {
  // 關鍵字過濾後的車站陣列
  let new_filter_station_arr = [];
  // 清除內容
  js_iBike_keyword_arr.innerHTML = "";
  // 關鍵字
  let keyword = that.value;
  console.log(keyword)
  if (keyword === null || keyword === '') return;
  console.log(iBikeStation)

  iBikeStation.forEach(function (i, k) {
    if (i.sna.includes(keyword) || i.ar.includes(keyword)) {
      new_filter_station_arr.push(i);
    }
  })
  console.log(new_filter_station_arr); 
  //DisplayStation(new_filter_station_arr);
  console.log(DisplayStation(new_filter_station_arr))
  js_iBike_keyword_arr.insertAdjacentHTML('beforeend', DisplayStation(new_filter_station_arr));
}

//顯示車站資料
function DisplayStation(arr){
  // 要替換的內容
  let html01="";
  if (arr.length > 0) {
    js_iBike_keyword_arr.innerHTML = '';
    arr.forEach(function (i, k) {     
      // 最後一個 css 不同
      if (k == arr.length - 1) {
        html01 += `<div class="d-flex align-items-center justify-content-between"><span>${i.sna}</span><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Ubike-modal" data-ID="${i.sno}" onclick="showDetailHandelr(this)">詳細</button></div>`;
      } else {
        html01 += `<div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2"><span>${i.sna}</span><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Ubike-modal" data-ID="${i.sno}" onclick="showDetailHandelr(this)">詳細</button></div>`;
      }
      // 插入內容
      //js_iBike_keyword_arr.insertAdjacentHTML('beforeend', html);
    })
  } else {
    //js_iBike_keyword_arr.innerHTML = `<code>-</code>`;
    html01 = `<div>查無結果</div>`
  }
  return html01
}

// 顯示詳細車站資料
function showDetailHandelr(that) {
  document.querySelector('#js_station_detail').innerHTML = '...';
  // 目標 ID
  let target_id = that.dataset.id;
  console.log(target_id);
  // document.getElementById('showModalBtn').click();
  iBikeStation.forEach(function (i, k) {
    if (i.sno === target_id) {
      let Ubikemodaltitle = document.querySelector('#Ubike-modal-title');
      Ubikemodaltitle.innerHTML = `${i.sna} &nbsp;<small class="text-muted">(${i.snaen})</small>`;
      let html = `<ul class="js_ul_style"><li>區域：${i.sarea}<small class="text-muted">(${i.sareaen})</small></li><li>地址：<a href="https://www.google.com/maps/search/?api=1&query=${i.lat}%2C${i.lng}" target="_blank">${i.ar}</a><small class="text-muted">(${i.aren})</small><li>場站目前車輛數量：${i.sbi}</li><li>可還車位數：${i.bemp}</li></li><li>最後更新時間：${i.mday}</li></ul>`;

      // 替換內容
      document.querySelector('#js_station_detail').innerHTML = html;
    }
  })
}




//   })
if ("geolocation" in navigator) {
  console.log("true")
} else {
  console.log('false')
}
// navigator.geolocation.getCurrentPosition(showNearbyHotels, error);

function error(err) {
  console.log("失敗")
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//計算兩點距離
function getDistance(lat1, lon1, lat2 = 24.132760
, lon2 = 120.69227
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

//找出鄰近定位點的車站
function showNearbyHotels(position) {
  console.log(iBikeStation)
  let nearby_station_arr = [];
  const userLatitude = position.coords.latitude;
  const userLongitude = position.coords.longitude;
  console.log(userLatitude, userLongitude);
  const nearby_station_arr01 = iBikeStation
    .map((station) => {
      let distance=getDistance(
        userLatitude,
        userLongitude,
        parseFloat(station.lat),
        parseFloat(station.lng)
      );
      return { ...station, distance };
    })
    .sort((a, b) => a.distance - b.distance);
  // console.log(nearby_station_arr01)
  nearby_station_arr = nearby_station_arr01.slice(0, 8)
  console.log(nearby_station_arr);
  console.log(iBikeStation);
  console.log(js_iBike_station_arr)
  js_iBike_location_arr.innerHTML=DisplayStation(nearby_station_arr)
}

//計算角度
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function findNearbyHotels() {
  if (navigator.geolocation) {
    return new Promise(() => {
      let option = {
        enableAcuracy: false, // 提高精確度
        maximumAge: 0, // 設定上一次位置資訊的有效期限(毫秒)
        timeout: 10000 // 逾時計時器(毫秒)
      };
      navigator.geolocation.getCurrentPosition(showNearbyHotels, error, option);
    })
  }
  // } else {
  //   this.deny
  // }

}
btn01.addEventListener('click', findNearbyHotels)
