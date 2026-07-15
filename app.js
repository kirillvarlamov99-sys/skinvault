// =======================
// TELEGRAM
// =======================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


if(tg.initDataUnsafe.user){

document.getElementById("username").innerHTML =
tg.initDataUnsafe.user.first_name;

}



// =======================
// ДАННЫЕ ИГРОКА
// =======================


let player = {

level:1,

xp:0,

balance:1000

};



let inventory=[];



let save =
localStorage.getItem("cs2save");



if(save){

let data=JSON.parse(save);

player=data.player;

inventory=data.inventory;

}



function saveGame(){

localStorage.setItem(
"cs2save",
JSON.stringify({

player,
inventory

})
);


updateProfile();

}




function updateProfile(){

document.getElementById("balance").innerHTML =
player.balance;


document.getElementById("level").innerHTML =
player.level;


document.getElementById("xp").innerHTML =
player.xp;


}





// =======================
// СКИНЫ
// =======================


const skins=[


{
name:"AK-47 | Redline",
rarity:"Rare",
wear:"Field-Tested",
price:15,
type:"weapon"
},


{
name:"AWP | Asiimov",
rarity:"Epic",
wear:"Battle-Scarred",
price:80,
type:"weapon"
},


{
name:"AWP | Dragon Lore",
rarity:"Legendary",
wear:"Factory New",
price:5000,
type:"weapon"
},


{
name:"Karambit | Doppler",
rarity:"Legendary",
wear:"Factory New",
price:1200,
type:"knife"
},


{
name:"Butterfly Knife | Fade",
rarity:"Legendary",
wear:"Factory New",
price:2500,
type:"knife"
},


{
name:"Sport Gloves | Vice",
rarity:"Legendary",
wear:"Minimal Wear",
price:2000,
type:"gloves"
},


{
name:"M4A4 | Howl",
rarity:"Legendary",
wear:"Factory New",
price:3000,
type:"weapon"
},


{
name:"USP-S | Kill Confirmed",
rarity:"Epic",
wear:"Field-Tested",
price:100,
type:"weapon"
},


{
name:"Glock-18 | Water Elemental",
rarity:"Rare",
wear:"Minimal Wear",
price:20,
type:"weapon"
}


];





// =======================
// КЕЙСЫ
// =======================


function showCases(){


document.getElementById("content").innerHTML=`

<h2>📦 Кейсы</h2>

<div class="case">

<div class="case-icon">
📦
</div>


<h3>
CS2 Case
</h3>


<p>
Цена: 50 ⭐
</p>


<button onclick="openCase()">
Открыть
</button>


<div id="result"></div>


</div>

`;

}




function openCase(){


if(player.balance < 50){

alert("Недостаточно баланса");

return;

}


player.balance-=50;



let result=document.getElementById("result");


result.innerHTML=`

<h2>
🎰 Открытие...
</h2>

`;



setTimeout(()=>{


let drop =
skins[Math.floor(Math.random()*skins.length)];



inventory.push(drop);



addXP(10);



result.innerHTML=`

<div class="item">

<h3>
🎉 ${drop.name}
</h3>


<p>
${drop.rarity}
</p>


<p>
${drop.wear}
</p>


<p class="price">
${drop.price} ⭐
</p>


</div>

`;

saveGame();



},2000);


}





// =======================
// ИНВЕНТАРЬ
// =======================


function showInventory(){


let html="<h2>🎒 Инвентарь</h2>";



if(inventory.length==0){

html+="Пусто";

}


inventory.forEach((s,i)=>{


html+=`

<div class="item">


<h3>${s.name}</h3>


<p>
${s.rarity}
</p>


<p>
${s.wear}
</p>


<p>
${s.price} ⭐
</p>


<button onclick="upgrade(${i})">
⬆ Улучшить
</button>


</div>

`;

});


document.getElementById("content").innerHTML=html;


}





// =======================
// XP
// =======================


function addXP(x){


player.xp+=x;



if(player.xp>=100){

player.level++;

player.xp=0;

alert(
"Новый уровень!"
);

}


}




// =======================
// UPGRADER
// =======================


function showUpgrade(){

showInventory();

}





function upgrade(index){


let item=inventory[index];


let chance=50;


document.getElementById("content").innerHTML=

`

<h2>
⬆️ Upgrader
</h2>


<p>
${item.name}
</p>


<p>
Шанс: ${chance}%
</p>


`;



setTimeout(()=>{


if(Math.random()*100<=chance){


let newSkin =
skins[Math.floor(Math.random()*skins.length)];

inventory[index]=newSkin;


alert(
"🔥 Успех: "+
newSkin.name
);


}

else{


inventory.splice(index,1);


alert(
"❌ Неудача"
);


}



saveGame();

showInventory();



},2000);


}





// =======================
// КОНТРАКТ
// =======================


function showContract(){


document.getElementById("content").innerHTML=

`

<h2>
🔄 Контракт
</h2>


<p>
Обменять 3 предмета
</p>


<button onclick="contract()">

Создать контракт

</button>

`;

}





function contract(){


if(inventory.length<3){

alert(
"Нужно 3 предмета"
);

return;

}


inventory.splice(0,3);



let reward=
skins[Math.floor(Math.random()*skins.length)];


inventory.push(reward);


alert(
"Получен: "+
reward.name
);


saveGame();

showInventory();


}




// =======================
// МАГАЗИН
// =======================


function showShop(){


document.getElementById("content").innerHTML=

`

<h2>
🛒 Магазин
</h2>


<button onclick="buyCase()">

Купить кейс 50 ⭐

</button>

`;

}



function buyCase(){

if(player.balance>=50){

player.balance-=50;

openCase();

}

else{

alert(
"Недостаточно ⭐"
);

}

}





// =======================
// КОЛЛЕКЦИИ
// =======================


function showCollections(){


document.getElementById("content").innerHTML=

`

<h2>
🏆 Коллекции
</h2>


<p>
🔪 Ножи
</p>


<p>
🔫 Оружие
</p>


<p>
🧤 Перчатки
</p>


`;

}



updateProfile();