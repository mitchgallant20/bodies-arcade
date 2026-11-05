/* Level 3: Under the Stars. A dirt road, a tent, the Milky Way, and the night the sky turned green. */
(function(){
var NIGHT='#0f1f3d';
var sky=function(seed){return A.night()+L3.stars(seed||11,90)};
var ground=function(){return L3.treeline(200)+'<rect y="200" width="400" height="60" fill="#14301f"/>'};
var camp=function(){return A.tent(300,236,.9)+A.fire(120,236,.8)};
var dockNight=function(){return L3.treeline(170)+L3.waterNight(170)+A.dock(120,196,200)};
var sit=function(bo,doo){return B(170,226,mix({legs:'none',jersey:'#2f6fb5'},bo||{}))+D(250,232,mix({legs:'none'},doo||{}))};
var lookUp=function(x,y,o){return B(x,y,mix({jersey:'#2f6fb5',pose:'up',face:'wow'},o||{}))};

LEVEL3.push({id:'stars',title:'Under the Stars',level:3,color:'#1b2a44',
 words:['above','light','world','whole','special','heard','early','people','long','never','thought','really'],
 cover:function(){return A.svg(NIGHT,'Bodie and Dad sit by a tent and fire under a sky full of stars and green northern lights',sky(5)+L3.aurora(true)+ground()+camp()+sit({face:'wow'},{face:'grin'}))},
 pages:[
  {t:"We drove so far that the road turned to gravel. Then the gravel turned to dirt. Then the dirt stopped at a lake. \"No phones out here,\" Dad said. \"No signal at all.\"",
   alt:"Dad's car on a dirt road that ends at a lake surrounded by trees",
   art:function(){return A.svg(SKY,this.alt,A.sun(330,50)+A.cloud(80,50,.9)+A.tree(30,150,.8)+A.tree(370,150,.9)+A.water(130)+L3.dirtRoad()+A.car(200,232,'#243454')+A.sign(70,120,'NO SIGNAL','#243454'))}},
  {t:"We set up the tent before dark. I hammered in the pegs. Dad made the fire. We cooked hot dogs on sticks and burned the first two.",
   alt:"Bodie hammers tent pegs while Dad cooks hot dogs over the fire at sunset",
   art:function(){return A.svg('#ff9e6a',this.alt,'<rect width="400" height="70" fill="#ffb27a"/>'+A.sun(330,96,22)+ground()+A.tent(300,236,.9)+L3.peg(226,240)+L3.peg(374,240)+B(190,240,{jersey:'#2f6fb5',pose:'hold',face:'grin'})+L3.mallet(176,210,-30)+A.fire(90,236,.8)+D(40,240,{pose:'hold'})+A.stick(50,186,-50,60)+A.hotdog(100,180,-20))}},
  {t:"When the sun went down, the sky did something I had never seen. It filled up with stars. Not ten stars. Not a hundred. Thousands and thousands of stars.",
   alt:"A sky completely full of stars above the campsite",
   art:function(){return A.svg(NIGHT,this.alt,sky(21)+L3.stars(33,120)+ground()+camp()+lookUp(200,240))}},
  {t:"At home, you can see a few stars. Out here, the whole sky was white with them. There was a cloudy stripe across the middle. Dad said it was the Milky Way.",
   alt:"The Milky Way stretches across the sky above Bodie and Dad",
   art:function(){return A.svg(NIGHT,this.alt,sky(44)+L3.milky()+L3.stars(55,100)+ground()+camp()+lookUp(180,240)+D(260,240,{pose:'wave',face:'grin'}))}},
  {t:"We lay on our backs on the dock. Dad showed me the Big Dipper. It really did look like a pot with a long handle. I found it by myself after that.",
   alt:"The Big Dipper above the dock where Bodie and Dad sit looking up",
   art:function(){return A.svg(NIGHT,this.alt,sky(8)+L3.dipper(230,50,1.1)+dockNight()+sit({pose:'up',face:'wow',y:0},{pose:'wave'}))}},
  {t:"\"Follow the two stars at the front of the pot,\" Dad said. \"They point to the North Star. Sailors used it to find their way home.\" I found that one too.",
   alt:"A line from the front of the Big Dipper points to the bright North Star",
   art:function(){return A.svg(NIGHT,this.alt,sky(8)+L3.dipper(230,80,1.1)+'<line x1="371" y1="95" x2="358" y2="30" stroke="#ffd34d" stroke-width="1.5" stroke-dasharray="4 4"/>'+L3.northStar(356,24)+dockNight()+sit({pose:'wave',face:'grin'},{pose:'wave'}))}},
  {t:"I saw a star move. Then another. \"Shooting stars,\" Dad said. \"Make a wish.\" I did, but I am not telling what it was. That is the rule.",
   alt:"Two shooting stars streak across the sky over the dock",
   art:function(){return A.svg(NIGHT,this.alt,sky(13)+L3.shooting(330,40,70)+L3.shooting(140,70,50)+dockNight()+sit({pose:'up',face:'grin'},{face:'grin'}))}},
  {t:"Then something strange happened. A green glow came up over the trees. It got bigger. It moved like a curtain in the wind. I grabbed Dad's arm.",
   alt:"A green glow rises over the trees as Bodie grabs Dad's arm",
   art:function(){return A.svg(NIGHT,this.alt,sky(17)+L3.aurora(false)+ground()+A.tent(330,236,.8)+B(150,240,{jersey:'#2f6fb5',pose:'out',face:'wow'})+D(240,240,{pose:'hold',face:'wow'}))}},
  {t:"\"The northern lights,\" Dad whispered. \"I have only seen them a few times in my whole life.\" The green turned to purple at the edges. We did not say anything for a long time.",
   alt:"Green and purple northern lights fill the sky above the lake",
   art:function(){return A.svg(NIGHT,this.alt,sky(23)+L3.aurora(true)+dockNight()+'<path d="M0,190 Q200,170 400,190 V230 Q200,210 0,230Z" fill="#58e070" opacity=".12"/>'+sit({face:'wow'},{face:'wow'}))}},
  {t:"I thought about all the people in the world who were asleep right now. They were missing this. I was not. I was right here, under the whole sky.",
   alt:"Bodie stands alone and small under a huge sky of stars and northern lights",
   art:function(){return A.svg(NIGHT,this.alt,sky(29)+L3.stars(61,120)+L3.aurora(true)+L3.treeline(230)+'<rect y="230" width="400" height="30" fill="#14301f"/>'+B(200,254,{jersey:'#2f6fb5',pose:'up',face:'grin',s:.7}))}},
  {t:"The lights faded just before I fell asleep. Dad carried me to the tent. I woke up once and heard a loon, and then I was gone again.",
   alt:"Dad carries a sleepy Bodie toward the tent under the moon while a loon floats on the lake",
   art:function(){return A.svg(NIGHT,this.alt,sky(31)+A.moon(60,50,16)+L3.treeline(180)+L3.waterNight(180)+A.loon(80,205,.5)+'<rect y="215" width="400" height="45" fill="#14301f"/>'+A.tent(310,254,.8)+D(170,254,{pose:'up'})+B(150,184,{jersey:'#2f6fb5',legs:'none',s:.8,rot:-80}))}},
  {t:"When people ask me about my favourite trip, I do not say the hotel with the pool. I say the dirt road, the dock, and the night the sky turned green.",
   alt:"Bodie standing on the dock in the morning with his arms up",
   art:function(){return A.svg(SKY,this.alt,A.sun(340,46)+A.cloud(100,50,.8)+A.tree(30,134,.55)+A.tree(372,134,.6)+A.water(150)+A.dock(120,170,200)+B(220,170,{jersey:'#2f6fb5',pose:'up',face:'grin',s:1.05})+D(140,170,{pose:'wave',face:'grin',s:1.15})+A.car(60,232,'#243454'))}}
 ]});
})();
