/* Level 3: The Fishing Derby. Bodie wants the trophy, and ends up helping a smaller kid land the big one. */
(function(){
var shore=function(){return A.sun(60,46)+A.cloud(300,44,.8)+A.tree(30,134,.55)+A.tree(372,134,.6)+A.water(150)};
var dock=function(){return A.dock(110,166,280)};
var scene=function(inner){return shore()+dock()+inner};
var kid=function(x,y,o){return L3.kid(x,y,mix({jersey:'#f6b73c'},o||{}))};
var stage=function(){return A.sun(60,46)+A.cloud(340,40,.6)+A.grass(190)+'<rect x="60" y="150" width="280" height="50" rx="4" fill="#a0744a"/><rect x="60" y="146" width="280" height="8" fill="#7a4f27"/>'+A.bannerTxt(200,46,'FISHING DERBY','#2e9c4f')};

LEVEL3.push({id:'derby',title:'The Fishing Derby',level:3,color:'#2e9c4f',
 words:['early','small','carry','full','kind','together','special','question','piece','half','patient','tackle'],
 cover:function(){return A.svg(SKY,'Bodie and a small boy hold one bent fishing rod together on the dock as a huge fish jumps',scene(B(200,166,{pose:'hold',face:'wow'})+kid(260,166,{pose:'hold',face:'wow'})+A.rod(214,120,-50,70,1)+A.fish(330,140,1.2,{jump:1})+A.splash(330,160,1)))},
 pages:[
  {t:"The fishing derby started at eight. Dad and I got to the dock early to pick the best spot. We picked the end of the dock, where the water is deep and dark.",
   alt:"Bodie and Dad walk out to the end of the dock with their rods in the early sun",
   art:function(){return A.svg(SKY,this.alt,scene(A.sign(340,120,'DERBY','#2e9c4f')+B(240,166,{pose:'hold',face:'grin'})+A.rod(240,124,-35,60,0)+D(150,166,{pose:'hold'})+A.rod(156,116,-35,70,0)+A.pail(90,166,0)))}},
  {t:"The rules were simple. Whoever caught the biggest fish won the trophy. I really wanted that trophy. It was gold and almost as tall as my sister.",
   alt:"A tall gold trophy on a table, with Bodie's sister standing beside it for size",
   art:function(){return A.svg(SKY,this.alt,A.sun(60,46)+A.cloud(300,44,.7)+A.grass(190)+A.table(200,200,120)+A.trophy(200,194,1.5)+sis(300,240,{pose:'wave',face:'grin'})+B(100,240,{face:'wow',pose:'hold'}))}},
  {t:"I cast my line and waited. And waited. Everybody around me was catching fish. All I caught was a piece of weed. Dad said, \"Be patient. Your fish is coming.\"",
   alt:"Bodie's line pulls up a clump of weed while a fisher beside him lifts a fish",
   art:function(){return A.svg(SKY,this.alt,scene(B(170,166,{pose:'hold',face:'sad'})+A.rod(176,120,-40,66,1)+'<path d="M232,150 q-8,20 4,30 q-14,6 -6,20" stroke="#2f8f57" stroke-width="5" fill="none" stroke-linecap="round"/>'+friend(330,166,{pose:'up',face:'grin'})+A.fish(330,110,.6)+D(70,166,{pose:'wave'})))}},
  {t:"Next to me was a small boy with a brand new rod. He did not know how to cast. His line kept getting tangled. His face got redder and redder.",
   alt:"A small boy on the dock with a tangled fishing line and a frustrated face",
   art:function(){return A.svg(SKY,this.alt,scene(kid(290,166,{pose:'hold',face:'sad'})+A.rod(296,128,-20,56,0)+'<path d="M300,120 q20,10 0,20 q-20,10 10,20 q20,8 -4,16" stroke="#d9c58a" stroke-width="2" fill="none"/>'+B(160,166,{pose:'hold'})+A.rod(166,120,-35,66,0)))}},
  {t:"I thought about my trophy. Then I put my own rod down. \"Want some help?\" I asked. The boy nodded. His name was Theo, and it was his first time fishing.",
   alt:"Bodie puts his rod down on the dock and waves to the small boy",
   art:function(){return A.svg(SKY,this.alt,scene(A.rod(150,166,-85,70,0)+B(200,166,{pose:'wave',face:'grin'})+kid(290,166,{pose:'wave'})+D(70,166,{pose:'hold'})))}},
  {t:"I showed Theo how to hold the rod and flip the bail. I showed him how to cast without hooking anybody. Dad watched us and smiled, but he did not say anything.",
   alt:"Bodie helps Theo hold the rod the right way while Dad watches and smiles",
   art:function(){return A.svg(SKY,this.alt,scene(B(230,166,{pose:'out',face:'grin'})+kid(290,166,{pose:'hold'})+A.rod(296,128,-35,56,0)+D(90,166,{pose:'hold',face:'grin'})))}},
  {t:"Theo's third cast was perfect. The bobber landed far out. One minute later, it went under. \"Pull up!\" I yelled. Theo pulled up, and the rod bent in half.",
   alt:"Theo's rod bends in half as the bobber disappears under the water",
   art:function(){return A.svg(SKY,this.alt,scene(kid(290,166,{pose:'hold',face:'wow',rot:-10})+A.rod(296,128,-60,60,2)+A.splash(360,200,.8)+B(210,166,{pose:'up',face:'wow'})))}},
  {t:"The fish was huge. Theo could not hold the rod by himself, so we held it together. We reeled and reeled. Dad scooped it with the net. A giant pickerel!",
   alt:"Bodie and Theo hold the rod together while Dad scoops a giant pickerel with the net",
   art:function(){return A.svg(SKY,this.alt,scene(B(220,166,{pose:'hold',face:'wow'})+kid(270,166,{pose:'hold',face:'wow'})+A.rod(232,120,-55,70,2)+D(120,166,{pose:'hold'})+A.fnet(132,120,-40)+A.fish(345,195,1.3,{jump:1})+A.splash(345,215,1)))}},
  {t:"Theo's pickerel was the biggest fish of the whole derby. He got to carry the trophy up on the stage. He was so happy he forgot to say anything.",
   alt:"Theo holds the big gold trophy on the stage while the crowd claps",
   art:function(){return A.svg(SKY,this.alt,stage()+kid(190,172,{pose:'out',face:'grin'})+A.trophy(250,172,.85)+B(90,240,{pose:'up',face:'grin'})+D(310,240,{pose:'up',face:'grin'})+A.star(40,100,8)+A.star(360,90,8))}},
  {t:"I caught one small perch that day. It was not even close to the biggest. But the man with the microphone called my name anyway.",
   alt:"Bodie holds up a very small perch while a man with a microphone calls his name",
   art:function(){return A.svg(SKY,this.alt,stage()+B(130,240,{pose:'up',face:'wow'})+A.fish(120,130,.45)+person(270,172,{jersey:'#333',sleeve:'#333',num:'',hair:'#888',pose:'wave'})+L3.mic(240,122))}},
  {t:"\"This year we have a special prize,\" he said. \"For the best helper on the dock.\" It was a new tackle box, full of lures. Theo clapped the loudest.",
   alt:"Bodie on the stage holding a green tackle box while Theo claps",
   art:function(){return A.svg(SKY,this.alt,stage()+B(200,172,{pose:'hold',face:'grin'})+L3.box(200,150)+kid(90,240,{pose:'up',face:'grin'})+D(310,240,{pose:'up',face:'grin'})+A.star(60,100,8)+A.star(340,90,8)+A.star(200,40,10))}},
  {t:"On the way home I asked Dad a question. \"Would you rather win the trophy or the tackle box?\" Dad thought about it. \"The tackle box,\" he said. \"Every time.\"",
   alt:"Dad's car drives home past the lake with the tackle box in the back window",
   art:function(){return A.svg(SKY,this.alt,A.prairie()+A.water(150,'#2f9fd1')+A.road(200)+A.car(200,228,'#2e9c4f')+L3.box(236,212))}}
 ]});
})();
