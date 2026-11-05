/* Level 3: The Night the Lights Went Out. A storm, a flashlight, candles, cards and a new family night. */
(function(){
var ROOM='#f3e9d8';
var win=function(x,y,bolt){return L3.window(x,y,90,70,bolt?L3.lightning(45,8,.6):'')};
var tv=function(){return A.tv(200,140,'<rect width="400" height="260" fill="#111"/>')};
var kitchen=function(){return A.room()+L3.fridge(60,200)};
var tableSet=function(){return A.table(200,196,240)+L3.candle(120,188)+L3.candle(160,188,20)+L3.candle(200,188,30)+L3.candle(240,188,22)+L3.candle(280,188)};
var three=function(bo,so,doo){return B(120,230,mix({legs:'none'},bo||{}))+sis(200,230,mix({legs:'none'},so||{}))+D(290,236,mix({legs:'none'},doo||{}))};

LEVEL3.push({id:'lights',title:'The Night the Lights Went Out',level:3,color:'#3b2b86',
 words:['during','light','whole','warm','only','people','minute','laugh','different','enough','flashlight','thunder'],
 cover:function(){return A.svg('#2a2250','Bodie, his sister and Dad around a table of candles in the dark',A.room()+L3.dark(.55)+three({face:'grin'},{face:'grin'},{face:'grin'})+tableSet()+L3.glow(200,150,90))},
 pages:[
  {t:"It was raining so hard that the windows shook. Thunder boomed over the house. Then, in the middle of my show, the TV went black. Every light in the house went out.",
   alt:"Lightning flashes in the window as the TV goes black and Bodie jumps",
   art:function(){return A.svg(ROOM,this.alt,A.room()+win(70,90,true)+tv()+A.lamp(340,200)+B(300,240,{pose:'up',face:'wow'})+L3.dark(.35))}},
  {t:"\"Power's out,\" Dad called from the kitchen. My sister screamed, and then she laughed. It was so dark I could not see my own hands.",
   alt:"The room is almost black; Bodie and his sister are just shapes in the dark",
   art:function(){return A.svg(ROOM,this.alt,A.room()+B(140,240,{pose:'out',face:'wow'})+sis(260,240,{pose:'ears',face:'grin'})+L3.dark(.78))}},
  {t:"Dad found the flashlight in the drawer. He clicked it on and made a big circle of light on the ceiling. \"Okay,\" he said. \"Who wants to have a different kind of night?\"",
   alt:"Dad shines a flashlight up at the ceiling while Bodie and his sister watch",
   art:function(){return A.svg(ROOM,this.alt,A.room()+L3.dark(.6)+L3.beam(292,150,0,150,80)+'<ellipse cx="292" cy="6" rx="90" ry="12" fill="#fff4c2" opacity=".5"/>'+D(290,240,{pose:'up',face:'grin'})+L3.flashlight(260,160,-15)+B(110,240,{face:'wow'})+sis(190,240,{face:'wow'}))}},
  {t:"We put every candle in the house on the kitchen table. Dad made hot chocolate on the camp stove. The whole kitchen smelled like chocolate and smoke.",
   alt:"Candles cover the kitchen table and Dad stirs hot chocolate on a camp stove",
   art:function(){return A.svg(ROOM,this.alt,kitchen()+L3.dark(.5)+D(330,240,{pose:'hold'})+L3.stove(330,190)+B(120,240,{face:'grin'})+sis(205,240,{face:'grin'})+tableSet()+A.mug(300,166)+L3.glow(200,150,90))}},
  {t:"We played cards by candlelight. My sister won the first game. I won the second game. Dad said he let us win, but I do not think that is true.",
   alt:"Cards are spread on the table between the candles, and Bodie's sister has her arms up",
   art:function(){return A.svg(ROOM,this.alt,A.room()+L3.dark(.5)+three({face:'grin'},{pose:'up',face:'grin'},{face:'sad'})+tableSet()+L3.cards(200,170)+L3.glow(200,150,90))}},
  {t:"Then Dad said, \"Story time.\" He held the flashlight under his chin and made a spooky face. The story was about a moose who wanted to play hockey. It was not spooky at all.",
   alt:"Dad holds a flashlight under his chin while Bodie and his sister laugh",
   art:function(){return A.svg(ROOM,this.alt,A.room()+L3.dark(.65)+D(270,240,{pose:'hold',face:'wow'})+L3.flashlight(270,150,180)+L3.glow(270,120,40,'#ffd34d')+'<circle cx="270" cy="120" r="24" fill="#ffd34d" opacity=".25"/>'+B(100,240,{pose:'ears',face:'grin'})+sis(170,240,{pose:'ears',face:'grin'}))}},
  {t:"I got to read a whole chapter of my book out loud by flashlight. I only got stuck on two words. Dad helped me with those, and then I kept going.",
   alt:"Bodie reads a book by flashlight while Dad sits beside him",
   art:function(){return A.svg(ROOM,this.alt,A.room()+A.couch(200,240,260)+L3.dark(.6)+L3.beam(290,112,248,150,46)+D(280,236,{legs:'none',pose:'hold',face:'grin'})+L3.flashlight(292,112,248)+B(140,230,{legs:'none',pose:'hold',face:'grin'})+A.book(140,170,.7)+L3.glow(140,180,60))}},
  {t:"We looked out the window. The whole street was dark. Every house was dark. The only light was the lightning, way off over the fields.",
   alt:"Dark houses on a dark street, with lightning far away on the horizon",
   art:function(){return A.svg('#0f1f3d',this.alt,A.night()+'<rect x="20" y="120" width="90" height="80" fill="#152238"/><polygon points="12,120 118,120 65,88" fill="#1b2a44"/><rect x="150" y="110" width="100" height="90" fill="#152238"/><polygon points="142,110 258,110 200,74" fill="#1b2a44"/><rect x="290" y="125" width="90" height="75" fill="#152238"/><polygon points="282,125 388,125 335,92" fill="#1b2a44"/><rect y="200" width="400" height="60" fill="#1b2a44"/>'+L3.lightning(360,30,.7)+L3.lightning(40,44,.5))}},
  {t:"We made a big bed of blankets on the living room floor. All three of us slept there, warm and close. The rain tapped on the roof until I fell asleep.",
   alt:"Bodie, his sister and Dad tucked under a big blanket on the floor",
   art:function(){return A.svg(ROOM,this.alt,A.room()+L3.dark(.55)+B(110,236,{legs:'none',face:'grin'})+sis(200,236,{legs:'none',face:'grin'})+D(300,242,{legs:'none',face:'grin'})+L3.blanket(200,216,340,44,'#c9a0dc')+L3.candle(40,200,18)+L3.glow(40,170,36))}},
  {t:"In the morning, the fridge hummed. The clock on the stove blinked. The lights were back. My sister cheered. I was a little bit sad.",
   alt:"The kitchen is bright again; the stove clock blinks and Bodie's sister cheers",
   art:function(){return A.svg(ROOM,this.alt,kitchen()+A.lamp(340,200)+L3.clockText(200,60,'12:00','#58e070')+sis(230,240,{pose:'up',face:'grin'})+B(130,240,{face:'sad'}))}},
  {t:"\"Dad,\" I said, \"can we have a dark night again? Even when the power is on?\" Dad thought about it for a minute. \"Deal,\" he said. \"Saturday.\"",
   alt:"Bodie asks Dad a question and Dad holds out his hand for a deal",
   art:function(){return A.svg(ROOM,this.alt,A.room()+A.couch(200,240,260)+B(150,240,{pose:'wave',face:'grin'})+D(270,240,{pose:'out',face:'grin'})+A.sign(340,120,'SAT','#3b2b86'))}},
  {t:"Now we do a dark night once a month. No TV, no phones, only candles and cards and stories. It is my favourite night of the whole month.",
   alt:"The family around the candle-lit table again, playing cards and laughing",
   art:function(){return A.svg(ROOM,this.alt,A.room()+L3.dark(.55)+three({face:'grin',pose:'hold'},{face:'grin',pose:'hold'},{face:'grin',pose:'hold'})+tableSet()+L3.cards(200,170)+A.book(70,120,.5)+L3.glow(200,150,90))}}
 ]});
})();
