/* Level 3: Pond Hockey. Shovels, boots for goals, a game until dark, and hot chocolate after. */
(function(){
var day=function(){return A.winter()+L3.bank(170)+L3.ice(176)};
var cabin=function(x){return '<rect x="'+(x-60)+'" y="90" width="120" height="70" fill="#7a4f27"/><polygon points="'+(x-70)+',90 '+(x+70)+',90 '+x+',50" fill="#5a3a22"/><rect x="'+(x-16)+'" y="120" width="32" height="40" fill="#3a2210"/><rect x="'+(x+22)+'" y="104" width="22" height="20" fill="#ffd34d"/><rect x="'+(x+30)+'" y="50" width="12" height="22" fill="#5c6670"/><ellipse cx="'+(x+36)+'" cy="44" rx="8" ry="5" fill="#fff" opacity=".8"/>'};
var goal=function(x){return L3.boot(x-22,240)+L3.boot(x+28,240)};
var sb=function(x,y,o){return snowB(x,y,mix({skates:1},o||{}))};
var sd=function(x,y,o){return snowD(x,y,mix({skates:1},o||{}))};
var kid1=function(x,y,o){return person(x,y,mix({jersey:'#2e9c4f',pants:'#243454',cap:'#2e9c4f',pom:1,num:'',skates:1,hair:'#222'},o||{}))};
var kid2=function(x,y,o){return person(x,y,mix({jersey:'#6a3fb5',pants:'#243454',cap:'#6a3fb5',pom:1,num:'',skates:1,hair:'#d9a441'},o||{}))};
var dad2=function(x,y,o){return person(x,y,mix({s:1.25,jersey:'#8a5a2a',pants:'#243454',cap:'#8a5a2a',pom:1,num:'',skates:1},o||{}))};
var duskSky=function(){return '<rect width="400" height="260" fill="#ff9e6a"/><rect width="400" height="60" fill="#c9a0dc"/>'+A.sun(200,150,20)+L3.bank(170)+L3.ice(176,'#d8c6ee')};
var nightIce=function(){return A.night()+L3.bank(170)+L3.ice(176,'#2a3d5e')};

LEVEL3.push({id:'pond',title:'Pond Hockey',level:3,color:'#6fb7e8',
 words:['clean','warm','long','hot','drink','light','until','early','whole','together','enough','carry'],
 cover:function(){return A.svg('#dfeaf2','Bodie skating across the frozen lake with a stick and puck as the sun sets',duskSky()+goal(330)+A.motion(60,190,3)+sb(190,240,{pose:'hold',rot:-10,face:'grin'})+A.stick(202,194,-35,58)+A.puck(246,238))},
 pages:[
  {t:"It was so cold that my breath made clouds. The lake had been frozen for two weeks. Dad said the ice was finally thick enough. \"Grab your skates,\" he said. \"Pond hockey day.\"",
   alt:"Bodie and Dad outside the cabin in the cold, Dad holding a pair of skates",
   art:function(){return A.svg('#dfeaf2',this.alt,A.winter()+cabin(110)+A.tree(330,160,.9)+A.tree(370,160,.7)+sb(220,240,{pose:'up',face:'grin'})+L3.breath(228,160)+sd(320,240,{pose:'hold'})+A.skates(300,176))}},
  {t:"We carried shovels, sticks and a bag of pucks down to the lake. The snow on the ice was deep. Dad and I shovelled a big rink. It took a long time.",
   alt:"Bodie and Dad shovel a rink out of the deep snow on the frozen lake",
   art:function(){return A.svg('#dfeaf2',this.alt,A.winter()+L3.bank(170)+'<rect y="176" width="400" height="84" fill="#f4f8fb"/>'+L3.ice(200)+L3.snowpile(60,236,90)+L3.snowpile(340,236,90)+sb(150,240,{pose:'hold',skates:0})+L3.shovel(166,230,25)+sd(280,240,{pose:'hold',skates:0})+L3.shovel(298,232,20)+A.bag(215,236))}},
  {t:"When we were done, the ice was clean and shiny. Dad put two boots down for one goal. I put two boots down for the other. No nets, no lines, no refs.",
   alt:"A clean rink on the lake with two pairs of boots as goals",
   art:function(){return A.svg('#dfeaf2',this.alt,day()+goal(60)+goal(340)+sb(200,240,{pose:'wave',face:'grin'})+A.stick(130,176,-10,64)+A.puck(260,238))}},
  {t:"My sister came down with her skates. Then two kids from the cabin next door came. Then their dad came. Now we had enough people for a real game.",
   alt:"Bodie's sister, two neighbour kids and their dad arrive at the rink",
   art:function(){return A.svg('#dfeaf2',this.alt,day()+goal(40)+sb(90,240,{pose:'wave',face:'grin'})+L3.winSis(160,240,{skates:1,pose:'wave',face:'grin'})+kid1(230,240,{pose:'hold'})+kid2(290,240,{pose:'wave'})+dad2(355,240,{pose:'hold'}))}},
  {t:"Pond hockey has different rules. No lifting the puck, because the snow bank eats it. No slap shots. And if you score, you have to go get the puck yourself.",
   alt:"A puck disappears into the snow bank while Bodie digs for it",
   art:function(){return A.svg('#dfeaf2',this.alt,day()+L3.snowpile(330,180,120)+A.puck(326,172)+sb(250,240,{pose:'out',face:'wow',rot:-20})+A.stick(100,176,-10,64)+kid1(60,240,{pose:'ears',face:'grin'}))}},
  {t:"The ice was bumpy in some spots. I hit a bump and fell flat on my belly. I slid all the way into the snow bank. Everybody laughed, and so did I.",
   alt:"Bodie slides on his belly into the snow bank while the others laugh",
   art:function(){return A.svg('#dfeaf2',this.alt,day()+L3.snowpile(330,236,110)+A.motion(150,220,3)+sb(230,236,{pose:'up',face:'grin',rot:85})+L3.winSis(100,240,{skates:1,pose:'ears',face:'grin'})+kid2(170,240,{pose:'ears',face:'grin'}))}},
  {t:"We played and played. I scored three goals. My sister scored two. The dads played goalie and kept letting pucks in. I think they did it on purpose.",
   alt:"Dad plays goalie between the boots and the puck slides right past him",
   art:function(){return A.svg('#dfeaf2',this.alt,day()+goal(330)+sd(330,240,{pose:'out',face:'grin'})+A.puck(352,238)+A.motion(280,232,2)+sb(150,240,{pose:'up',face:'grin'})+A.stick(120,176,-10,64)+L3.winSis(230,240,{skates:1,pose:'up',face:'grin'})+A.star(200,90,9))}},
  {t:"The sun went down early, the way it does in winter. The sky turned pink, then purple. The ice turned purple too. We kept playing in the light that was left.",
   alt:"The sky and the ice turn purple as the sun sets and the game goes on",
   art:function(){return A.svg('#ff9e6a',this.alt,duskSky()+goal(340)+sb(120,240,{pose:'hold',rot:-8})+A.stick(132,194,-35,58)+A.puck(176,238)+kid1(230,240,{pose:'hold'})+A.stick(230,198,-35,52)+dad2(340,240,{pose:'out'}))}},
  {t:"Finally it got too dark to see the puck. Dad turned on the truck lights and pointed them at the ice. We played one more game in the headlights.",
   alt:"The truck headlights light up the rink at night",
   art:function(){return A.svg('#0f1f3d',this.alt,nightIce()+A.van(70,236,'#243454')+L3.headlights(150,206)+sb(250,240,{pose:'hold',rot:-8})+A.stick(262,194,-35,58)+A.puck(306,238)+kid2(340,240,{pose:'hold'}))}},
  {t:"My toes were frozen. My cheeks were red. I did not want to stop. But Dad said, \"Last goal wins,\" and my sister scored it. Game over.",
   alt:"Bodie's sister cheers after scoring the last goal in the dark",
   art:function(){return A.svg('#0f1f3d',this.alt,nightIce()+L3.headlights(0,206)+goal(330)+A.puck(352,238)+L3.winSis(230,240,{skates:1,pose:'up',face:'grin'})+sb(120,240,{face:'sad',pose:'hold'})+A.moon(340,40,14))}},
  {t:"Inside the cabin, Dad made hot chocolate with the little marshmallows. I held the warm mug with both hands. My toes started to tingle as they warmed up.",
   alt:"Bodie holds a mug of hot chocolate by the fire inside the cabin",
   art:function(){return A.svg('#5a3a22',this.alt,L3.cabin()+L3.hearth(300,200)+B(130,240,{pose:'hold',face:'grin',jersey:'#2f6fb5'})+A.mug(130,150)+D(220,240,{pose:'hold',face:'grin'})+A.mug(232,120)+L3.glow(300,170,70,'#ff9e2a'))}},
  {t:"I fell asleep in front of the fire with my skates still beside me. The whole next day, all I wanted was to go back out on the ice.",
   alt:"Bodie asleep under a blanket by the fire with his skates beside him",
   art:function(){return A.svg('#5a3a22',this.alt,L3.cabin()+L3.hearth(300,200)+B(130,236,{legs:'none',jersey:'#2f6fb5'})+L3.blanket(130,216,150,40,'#e2422b')+A.skates(40,236)+L3.glow(300,170,70,'#ff9e2a'))}}
 ]});
})();
