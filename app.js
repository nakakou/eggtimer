const verySoftSelect = document.getElementById('verySoft');
const softSelect = document.getElementById("soft");
const moistSelect = document.getElementById("moist");
const hardSelect = document.getElementById("hard");
const multipleSelect = document.getElementsByClassName("archive-inner");
const infoMessage = document.getElementById("info-message");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const verySoftTime = 360;
const softTime = 480;
const moistTime = 600;
const hardTime = 720;
const initialMessage = '仕上がり具合を一覧から選択してください。';
const verySoftMessage = '半熟（とろとろ）を選択しています。';
const softMessage = '半熟(固まりかけ)を選択しています。';
const moistMessage = 'しっとりを選択しています。';
const hardMessage = '固茹でを選択しています。';
const cookingMessage = 'タイマーが鳴ったら出来上がりです。';
const startTime = document.getElementById("start-btn");
const stopTime = document.getElementById("stop-btn");
const resetTime = document.getElementById("reset-btn");
const selectBorderStyle = '3px dashed #FCD07E';
let id_value;
let counter;
let setTime; //時間の情報を保持しておく　主にリセット機能に使うため
let countTime; //時間を計算するための変数
//htmlファイル中のid,"soft"を指定しています。softをクリックすると実行するという意味
verySoftSelect.onclick = function(){
  iniBorder(this);
  this.style.border = selectBorderStyle;
  clearInterval(counter);
  getId(this);
  setInfoTime();
}
softSelect.onclick = function() {
  iniBorder(this);
  this.style.border = selectBorderStyle;
  clearInterval(counter);
  getId(this);
  setInfoTime();
};
moistSelect.onclick = function() {
  iniBorder(this);
  this.style.border = selectBorderStyle;
  clearInterval(counter);
  getId(this);
  setInfoTime();
};
hardSelect.onclick = function() {
  iniBorder(this);
  this.style.border = selectBorderStyle;
  clearInterval(counter);
  getId(this);
  setInfoTime();
};
//クリックしたIDを取得
function getId(ele){
  id_value = ele.id;
}
function setInfoTime(){
  //eval()はセキュリティ、速度に問題があるので下記コードで代用
  infoMessage.textContent = Function('"use strict";return (' + id_value + 'Message' + ')')();
    setTime = Function('"use strict";return (' + id_value + 'Time' + ')')();
    countTime = setTime;
    min.innerHTML = Math.floor( countTime / 60)
    sec.innerHTML = countTime % 60;
    //注意のスタイルの解除
    infoMessage.style.color = "initial";
    infoMessage.style.fontWeight = "initial"
}
//スタートを押したとき
startTime.onclick = function() {
  console.log(countTime);
  //countTimeが残っている時
  if(countTime >= 1){
    infoMessage.textContent = cookingMessage;
    counter = setInterval(count, 1000);
  }else{
    //countTimeの中身が設定されていない時
    infoMessage.style.color = "red"
    infoMessage.style.fontWeight = "bold"
  }
  
};
//選択ボーダーの初期化
function iniBorder(ele){
  for(i=0;i<multipleSelect.length;i++){
    multipleSelect[i].style.border = "none";
  }
    ele.style.border = selectBorderStyle;
}
function count() {
  if( setTime === 0){
    clearInterval(counter);
    sec.innerHTML = 0;
    min.innerHTML = 0;
    play();//タイマーを再生
  }
  if( setTime >= 1){
  setTime -= 1;
  min.innerHTML = Math.floor( setTime / 60)
  sec.innerHTML = setTime % 60;
  }
  
}
stopTime.onclick = function(){
  stop();//タイマーの音を止める
  clearInterval(counter);
}
resetTime.onclick = function(){
  if(confirm("リセットしますか？")){
    clearInterval(counter);
    stop();
    setInfoTime();
  };
  
}
//モーダル
function popupModal() {
  var popup = document.getElementById('js-popup');
  if(!popup) return;

  var blackBg = document.getElementById('js-black-bg');

  var blackBg = document.getElementById('js-black-bg');
  var closeBtn = document.getElementById('js-close-btn');
  var showBtn = document.getElementById('js-show-popup');

  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
  function closePopUp(elem) {
    if(!elem) return;
    elem.addEventListener('click', function() {
      popup.classList.toggle('is-show');
    });
  }
}
popupModal();

//タイマーのアラーム音
let music = new Audio();
  function init() {
    music.preload = "auto";
    music.src = "./sound/kitchen_timer1.mp3";
    music.load();

    music.addEventListener("ended", function () {
      music.currentTime = 0;
      music.play();
    }, false);
  }
  function play() {
    music.loop = true;
    music.play();
  }

  function stop() {
    music.pause();
    music.currentTime = 0;
  }

  init();