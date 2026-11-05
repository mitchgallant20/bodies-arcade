/* Level 3: Goalie for a Day. Bodie fills in for the sick goalie. */
(function(){
var ROOM='#f3e9d8';
var flame=function(x,y,o){return person(x,y,mix(RED,mix({num:'7'},o||{})))};
var blue=function(x,y,o){return person(x,y,mix(BLUE,mix({num:'9'},o||{})))};
var G=L3.goalieB;
var rinkNet=function(){return A.rink()+A.net(290,238,1.1)};
var scoreboard=function(h,a){return A.board(200,56,h,a)};

LEVEL3.push({id:'goalie',title:'Goalie for a Day',level:3,color:'#c8102e',
 words:['goalie','hurt','sure','finally','almost','better','special','myself','keep','hold','together','period'],
 cover:function(){return A.svg(SKY,'Bodie in big goalie pads standing in front of the net',rinkNet()+A.star(90,100,10)+A.star(200,70,12)+A.star(330,100,9)+G(255,240,{pose:'out',face:'grin',s:1.2})+L3.gloveBig(214,150))},
 pages:[
  {t:"On Saturday morning, Dad got a text from Coach. Our goalie was sick. \"Somebody has to play in net today,\" Dad said. I looked at my cereal. Then I looked at Dad.",
   alt:"Bodie at the kitchen table with a bowl of cereal while Dad reads a text on his phone",
   art:function(){return A.svg(ROOM,this.alt,A.room()+B(130,228,{legs:'none',face:'wow'})+A.table(170,200,220)+L3.bowl(130,194)+D(320,240,{pose:'hold'})+L3.phone(300,176,-20))}},
  {t:"\"I'll do it,\" I said. I had never been a goalie before. But somebody had to, and I was not scared. Well, maybe I was a little scared.",
   alt:"Bodie with his hand up, volunteering, while Dad looks surprised",
   art:function(){return A.svg(ROOM,this.alt,A.room()+A.lamp(60,200)+B(160,240,{pose:'wave',face:'wow'})+D(290,240,{pose:'hold',face:'wow'}))}},
  {t:"At the rink, Coach gave me the goalie pads. They were huge! The pads went all the way up to my chest. The glove was so big that my hand got lost inside it.",
   alt:"Coach hands Bodie giant goalie pads and a glove at the rink",
   art:function(){return A.svg(SKY,this.alt,A.rink()+A.helmetBench(330,236)+L3.coach(100,240,{pose:'out'})+G(230,240,{pose:'out',face:'wow',s:1.1})+L3.gloveBig(300,170))}},
  {t:"I tried to skate to the net. The pads made my legs feel heavy and slow. I fell down twice. My sister laughed, but then she helped me up.",
   alt:"Bodie in goalie pads fallen on the ice while his sister reaches down to help",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+G(110,236,{pose:'out',face:'sad',rot:78})+sis(260,240,{pose:'out',face:'grin',skates:1})+A.motion(60,170,2))}},
  {t:"The game started. The first shot came fast and low. I did not move in time. The puck slid right between my pads and into the net. 1 to 0 for the blue team.",
   alt:"The scoreboard shows Flames 0, Blue 1, and the puck is in the net behind Bodie",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+scoreboard(0,1)+A.puck(330,232)+G(255,240,{pose:'out',face:'sad'})+blue(110,240,{pose:'up',face:'grin'}))}},
  {t:"I wanted to hide inside my big helmet. Then Coach tapped the glass. \"Shake it off, Bodie. Goalies have to keep going. The next one is yours.\"",
   alt:"Coach taps the glass and talks to Bodie, who looks sad in his goalie gear",
   art:function(){return A.svg(SKY,this.alt,A.rink()+'<rect x="20" y="40" width="130" height="200" fill="#dfeaf2" opacity=".5" stroke="#aab7c4" stroke-width="3"/>'+L3.coach(85,240,{pose:'wave'})+G(240,240,{pose:'out',face:'sad'}))}},
  {t:"The next shot was high. I reached up with the giant glove and the puck stuck in it. A save! My team banged their sticks on the boards.",
   alt:"Bodie catches the puck in his big glove and his teammates cheer",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+A.star(120,90,10)+A.star(200,60,12)+G(255,240,{pose:'up',face:'grin'})+L3.gloveBig(214,110)+A.puck(226,118)+flame(90,240,{pose:'up',face:'grin'})+A.stick(60,150,-20,70))}},
  {t:"After that, I stopped being scared. I watched the puck like a hawk. I made a pad save. I made a stick save. One shot even bounced off my helmet. Still no goal.",
   alt:"Pucks fly at Bodie from every direction and he stops them all",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+G(255,240,{pose:'out',face:'grin'})+A.puck(200,150)+A.puck(170,210)+A.puck(215,236)+A.motion(120,140,3)+A.motion(110,200,2)+blue(70,240,{pose:'hold',legs:'skate'})+A.stick(70,198,-35,52))}},
  {t:"In the second period, our team scored. Then we scored again. Now it was 2 to 1. The blue team got mad. They kept shooting, and I kept stopping it.",
   alt:"The scoreboard shows Flames 2, Blue 1, and two Flames players celebrate",
   art:function(){return A.svg(SKY,this.alt,A.rink()+scoreboard(2,1)+flame(120,240,{pose:'up',face:'grin'})+flame(230,240,{num:'11',pose:'up',face:'grin'})+G(340,240,{pose:'up',face:'grin',s:.95}))}},
  {t:"With one minute left, a blue player broke in all alone. He faked left. I did not go for it. He shot right, and I slid across and stopped it with my pad.",
   alt:"Bodie slides across the crease and stops a shot with his pad",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+L3.clockText(200,50,'1:00')+blue(120,240,{pose:'hold',legs:'skate'})+A.stick(120,198,-35,52)+A.motion(170,232,2)+A.puck(228,238)+G(258,246,{pose:'out',rot:24}))}},
  {t:"The buzzer went. We won 2 to 1! My whole team piled on top of me. I could not see anything, but I could hear everybody yelling my name.",
   alt:"The whole team piles on top of Bodie in front of the net",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+scoreboard(2,1)+A.star(60,120,10)+A.star(340,110,10)+flame(130,240,{pose:'up',face:'grin',s:.95})+flame(300,240,{num:'11',pose:'up',face:'grin',s:.95})+flame(180,230,{num:'3',pose:'out',face:'grin',rot:-30})+G(225,240,{pose:'ears',face:'grin'})+flame(265,232,{num:'8',pose:'out',face:'grin',rot:28}))}},
  {t:"In the car, Dad said, \"You were a real goalie today.\" I smiled. \"Being a goalie was fun,\" I said. \"But I still like scoring goals better.\"",
   alt:"Dad's car drives home down the road with the sun out",
   art:function(){return A.svg(SKY,this.alt,A.prairie()+A.road(200)+A.car(200,228,'#c8102e')+A.sign(60,160,'HOME','#c8102e'))}}
 ]});
})();
