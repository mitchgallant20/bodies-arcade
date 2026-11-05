/* The Big Comeback. Winnipeg Jets 5, Montreal Canadiens 4 (OT), Bell Centre, November 3, 2026.
   A Level 2 book for Bodie's Books. scripts/adapt-legacy.mjs inlines every file in content/books/
   into public/play/bodies-books.html, right before ALL is built, so the page's art kit
   (A.*, B, D, person, mix, tvRoom, jB, jD, FONT) is in scope exactly as it is for the legacy books.
   Page text: '|' is a line break. Reading level: grade 2 to 3. No em dashes. */
(function(){
var JET={jersey:'#041e42',stripe:'#fff',helmet:'#041e42',skates:1,numFill:'#fff'};
var MTL={jersey:'#af1e2d',stripe:'#192168',helmet:'#af1e2d',skates:1,num:'',hair:'#222'};
var jet=function(x,y,o){return person(x,y,mix(JET,o||{}))};
var mtl=function(x,y,o){return person(x,y,mix(MTL,o||{}))};
var ROOM='#f3e9d8',NAVY='#0d1a33';
var board=function(j,m){return A.board2(200,56,'JETS','MTL',j,m,'#6fa8ff','#ff6a52')};
var gloves=function(x,y){return '<rect x="'+(x-34)+'" y="'+(y-12)+'" width="24" height="15" rx="6" fill="#041e42" stroke="#fff" stroke-width="1.5"/><rect x="'+(x+10)+'" y="'+(y-9)+'" width="24" height="15" rx="6" fill="#af1e2d" stroke="#fff" stroke-width="1.5"/>'};
var clock=function(t,x){x=x||200;return '<rect x="'+(x-42)+'" y="22" width="84" height="44" rx="8" fill="#1b1b1b" stroke="#444" stroke-width="3"/><text x="'+x+'" y="54" text-anchor="middle" font-size="26" font-weight="700" fill="#ffd34d" font-family="'+FONT+'">'+t+'</text>'};
var inNet=function(){return A.net(300,238,1.1)+A.light(327,150)+A.puck(338,232)};
var mtlGoalie=function(){return mtl(315,240,{pads:1,pose:'out',rot:12})};
var tvPage=function(alt,inner,b,d){return A.svg(ROOM,alt,tvRoom(inner)+jB(58,b.y||240,b)+jD(348,d.y||240,d))};
var stars=function(){return A.star(60,40,10)+A.star(340,36,12)+A.star(110,80,7)+A.star(300,84,8)};

LEVEL2.push({id:'comeback',title:'The Big Comeback',level:2,color:'#041e42',
 words:['Montreal','rookie','gloves','minutes','circle','seconds','already','overtime','streak','assist','never','forget'],
 cover:function(){return A.svg(ROOM,'Bodie and Dad in Jets jerseys cheering at the TV as the goal light comes on',stars()+tvRoom(A.rink()+inNet()+jet(150,240,{num:'77',pose:'up',face:'grin'}))+jB(58,222,{pose:'up',face:'grin'})+jD(348,226,{pose:'up',face:'grin'}))},
 pages:[
  {t:"The Jets were in Montreal.|They had not won in nine games.|Dad said, \"Tonight is the night.\"",
   alt:"Bodie and Dad on the couch watching the Jets and Montreal line up on TV",
   art:function(){return tvPage(this.alt,A.rink()+jet(130,240,{num:'81',pose:'hold',legs:'skate'})+A.stick(130,198,-35,52)+mtl(270,240,{pose:'hold',legs:'skate'})+A.stick(270,198,35,52,-1)+A.puck(200,238),{pose:'wave',face:'grin'},{pose:'hold'})}},
  {t:"Montreal scored first.|Then they scored again, and again, and again.|It was 4 to 0.",
   alt:"The scoreboard on TV shows Jets 0, Montreal 4, and Bodie looks sad",
   art:function(){return tvPage(this.alt,A.rink()+board(0,4)+mtl(280,240,{pose:'up',face:'grin'}),{face:'sad'},{face:'sad'})}},
  {t:"I put my hands on my head.|\"It's over,\" I said.|Dad said, \"It's not over until it's over.\"",
   alt:"Bodie with his hands on his head while Dad points at the TV",
   art:function(){return tvPage(this.alt,A.rink()+board(0,4)+mtl(140,240,{pose:'hold',legs:'skate'})+A.stick(140,198,-35,52)+A.puck(190,238),{pose:'ears',face:'sad'},{pose:'wave'})}},
  {t:"A big Montreal player started pushing Bauer.|Bauer is a rookie, but he did not back down.|They dropped the gloves!",
   alt:"Bauer and a Montreal player face each other with their gloves on the ice",
   art:function(){return tvPage(this.alt,A.rink()+jet(155,240,{num:'77',pose:'out',rot:6})+mtl(245,240,{pose:'out',rot:-6})+gloves(200,250)+A.motion(70,180,2),{face:'wow'},{pose:'hold',face:'wow'})}},
  {t:"Bauer sat in the box for five minutes.|When he came out, the Jets woke up.|There were three minutes left.",
   alt:"Bauer skating fast as the clock on TV shows three minutes left",
   art:function(){return tvPage(this.alt,A.rink()+clock('3:00')+A.motion(60,180,3)+A.motion(70,220,2)+jet(200,240,{num:'77',pose:'hold',legs:'skate',rot:-10})+A.stick(212,194,-35,58)+A.puck(256,238),{pose:'hold',face:'wow'},{pose:'hold'})}},
  {t:"Bauer got the puck by the circle.|He let it fly. GOAL!|It was his first NHL goal ever!",
   alt:"The goal light is on and Bauer has his arms up",
   art:function(){return tvPage(this.alt,A.rink()+inNet()+mtlGoalie()+A.star(100,110,10)+A.star(190,90,12)+jet(140,240,{num:'77',pose:'up',face:'grin'}),{pose:'up',face:'grin'},{pose:'up',face:'grin'})}},
  {t:"Forty seconds later, Bauer passed the puck to Barron.|Barron shot it in. GOAL!|Now it was 4 to 2.",
   alt:"The scoreboard shows Jets 2, Montreal 4, and Barron and Bauer celebrate",
   art:function(){return tvPage(this.alt,A.rink()+board(2,4)+jet(130,240,{num:'36',pose:'up',face:'grin'})+jet(270,240,{num:'77',pose:'wave',face:'grin'}),{pose:'up',face:'grin'},{pose:'hold',face:'grin'})}},
  {t:"I jumped off the couch.|\"Dad! Dad! They can do this!\"|Dad was already standing up.",
   alt:"Bodie jumping off the couch while Dad stands with his arms up",
   art:function(){return A.svg(ROOM,this.alt,tvRoom(A.rink()+board(2,4))+A.star(40,100,9)+A.star(370,90,9)+jB(58,214,{pose:'up',face:'grin'})+jD(348,240,{pose:'up',face:'grin'}))}},
  {t:"Scheifele passed to Connor.|Connor let it rip. GOAL!|It was 4 to 3 with one minute left.",
   alt:"Connor shoots and the puck goes in as the goal light comes on",
   art:function(){return tvPage(this.alt,A.rink()+inNet()+mtlGoalie()+jet(90,240,{num:'55',pose:'out',legs:'skate'})+A.jersey81(170,240,{pose:'hold',legs:'skate'})+A.stick(170,198,-35,52)+A.motion(235,232,2),{pose:'up',face:'grin'},{pose:'up',face:'grin'})}},
  {t:"Then he did it again!|Scheifele to Connor. One-timer. GOAL!|It was 4 to 4 with 33 seconds left.",
   alt:"The scoreboard shows Jets 4, Montreal 4, and Connor and Scheifele have their arms up",
   art:function(){return tvPage(this.alt,A.rink()+board(4,4)+A.star(60,130,9)+A.star(340,130,9)+A.jersey81(140,240,{pose:'up',face:'grin'})+jet(260,240,{num:'55',pose:'up',face:'grin'}),{pose:'up',face:'grin'},{pose:'up',face:'grin'})}},
  {t:"Four goals in two minutes!|No Jets team had ever done that before.|Dad and I were yelling and hugging and jumping.",
   alt:"Bodie and Dad hugging and jumping in the living room with stars all around",
   art:function(){return A.svg(ROOM,this.alt,A.room()+A.star(50,60,14)+A.star(120,30,9)+A.star(290,36,11)+A.star(350,90,15)+A.star(200,24,8)+A.star(70,140,8)+A.star(330,150,9)+jD(236,232,{pose:'out',face:'grin'})+jB(162,222,{pose:'out',face:'grin'}))}},
  {t:"The game went to overtime.|I could not sit still.|\"Come on, Jets,\" I said. \"Come on!\"",
   alt:"The scoreboard on TV says overtime while Bodie holds his head",
   art:function(){return tvPage(this.alt,A.rink()+board(4,4)+clock('OT',44)+jet(120,240,{num:'54',pose:'hold',legs:'skate'})+A.stick(120,198,-35,52)+mtl(290,240,{pose:'hold',legs:'skate'})+A.stick(290,198,35,52,-1),{pose:'ears',face:'wow'},{pose:'hold',face:'wow'})}},
  {t:"Samberg skated into the zone.|He shot it hard. It went in by the far post.|JETS WIN! 5 to 4!",
   alt:"Samberg has his arms up, the goal light is on and the horn sounds",
   art:function(){return tvPage(this.alt,A.rink()+inNet()+mtlGoalie()+A.horn(80,60)+A.star(200,80,12)+jet(150,240,{num:'54',pose:'up',face:'grin'}),{pose:'up',face:'grin',y:218},{pose:'up',face:'grin',y:222})}},
  {t:"The losing streak was over.|Bauer had a goal, an assist, and a fight.|That is called a Gordie Howe hat trick!",
   alt:"Bauer in the arena with his arms up, a puck, his stick and his gloves on the ice, and three stars above him",
   art:function(){return A.svg(NAVY,this.alt,A.bigArena()+A.star(110,60,14)+A.star(200,40,16)+A.star(290,60,14)+jet(200,240,{num:'77',pose:'up',face:'grin',s:1.2})+A.puck(100,238)+A.stick(300,170,20,70)+gloves(140,250))}},
  {t:"After the game, the clip went to Bauer and Samberg.|They both had big smiles.|What a wild way to end a losing streak!",
   alt:"Bauer and Samberg in the dressing room with big smiles under a Jets banner",
   art:function(){return A.svg(NAVY,this.alt,'<rect width="400" height="200" fill="#152238"/><rect y="200" width="400" height="60" fill="#2a3d5e"/><rect x="60" y="30" width="280" height="50" rx="8" fill="#041e42" stroke="#6fa8ff" stroke-width="3"/>'+A.jet(200,55,.5)+A.star(40,130,10)+A.star(360,130,10)+A.star(200,120,8)+jet(150,240,{num:'77',pose:'up',face:'grin',helmet:null,hair:'#5a3a1e'})+jet(250,240,{num:'54',pose:'up',face:'grin',helmet:null,hair:'#222'}))}},
  {t:"I will never forget that game.|Never give up, even when it is 4 to 0.|Go Jets go!",
   alt:"Bodie in his Jets jersey with his arms up, surrounded by stars",
   art:function(){return A.svg(SKY,this.alt,A.sun(60,46)+A.grass()+A.star(50,120,14)+A.star(110,70,10)+A.star(300,60,12)+A.star(350,130,16)+A.star(250,36,8)+jB(200,240,{pose:'up',s:1.2,face:'grin'})+A.puck(90,238)+A.stick(310,160,15,70))}}
 ]});
})();
