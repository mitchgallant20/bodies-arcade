/* Level 3: The Free Kick. A week of practice in the yard, one kick over the net, and one that bends in. */
(function(){
var greenB=function(x,y,o){return B(x,y,mix(GRN,o||{}))};
var goal=function(){return A.goal(250,240,1)};
var wall=function(x){return L3.wallOf(4,x||140,240)};
var keeper=function(o){return orange(330,240,mix({pose:'out',num:''},o||{}))};
var ball=function(x,y){return A.ball(x,y,13)};
var field=function(){return pitch()};
var home=function(){return yard()+'<rect x="300" y="110" width="100" height="90" fill="#e6ebef" stroke="#8a97a6" stroke-width="3"/><path d="M300,140 H400 M300,170 H400" stroke="#8a97a6" stroke-width="3"/>'};

LEVEL3.push({id:'freekick',title:'The Free Kick',level:3,color:'#4fae4f',
 words:['practice','above','over','almost','different','keep','learn','second','sure','today','finally','own'],
 cover:function(){return A.svg(SKY,'Bodie bends a free kick over a wall of orange players and into the net',field()+goal()+wall(140)+keeper()+greenB(70,240,{legs:'kick',pose:'out',face:'grin'})+A.arc(100,230,200,90,322,180)+ball(318,184))},
 pages:[
  {t:"Messi can bend a free kick over the wall and into the corner. I watched him do it on TV ten times. \"I am going to learn that,\" I told Dad.",
   alt:"Bodie and Dad watch a soccer free kick on TV",
   art:function(){return A.svg('#f3e9d8',this.alt,tvRoom(field()+goal()+L3.wallOf(3,150,240)+A.arc(80,230,200,80,322,180)+ball(318,184))+greenB(58,240,{pose:'wave',face:'wow'})+D(348,240,{pose:'hold'}))}},
  {t:"Every day after school, I practiced in the yard. Dad stood in front of me with his arms up, like a wall. I kicked the ball over him again and again.",
   alt:"Dad stands in the yard with his arms up as Bodie kicks the ball over his head",
   art:function(){return A.svg(SKY,this.alt,home()+A.goal(290,240,.8)+D(220,240,{pose:'up'})+greenB(90,240,{legs:'kick',pose:'out'})+A.arc(110,230,210,70,330,200)+ball(150,236))}},
  {t:"At first, the ball went over the fence. Then it went into the garden. Then it hit the garage door. Dad said, \"Different is good. Keep going.\"",
   alt:"The ball flies over the fence while flowers lie squashed in the garden",
   art:function(){return A.svg(SKY,this.alt,home()+L3.flower(40,236)+L3.flower(60,240,'#ffd34d')+L3.flower(80,236,'#c9a0dc')+ball(50,228)+A.arc(120,230,200,60,330,120)+ball(340,120)+greenB(130,240,{pose:'ears',face:'wow'})+D(250,240,{pose:'wave',face:'grin'}))}},
  {t:"By Thursday, I could bend it a little. By Friday, I could bend it a lot. The ball went up, over Dad's head, and curled down into the corner of the net.",
   alt:"The ball curls over Dad and into the corner of the yard net",
   art:function(){return A.svg(SKY,this.alt,home()+A.goal(290,240,.8)+D(210,240,{pose:'up',face:'wow'})+greenB(90,240,{pose:'up',face:'grin'})+A.arc(110,230,220,60,352,190)+ball(350,192)+A.star(120,100,8))}},
  {t:"Saturday was game day. Our team was green. The other team was orange. In the first half, nobody scored. Then an orange player tripped me right outside the box.",
   alt:"Bodie is tripped by an orange player outside the box",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+greenB(100,246,{pose:'out',face:'wow',rot:70})+orange(250,240,{legs:'kick',pose:'out',face:'grin'})+ball(60,236)+L3.ref(60,240,{pose:'wave',skates:0}))}},
  {t:"Free kick! Coach pointed at me. \"This is your kick, Bodie.\" Four orange players made a wall. The goalie bounced up and down. My heart bounced too.",
   alt:"Four orange players stand in a wall in front of the net as Bodie lines up his kick",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+wall(140)+keeper({face:'grin'})+greenB(80,240,{pose:'hold',face:'wow'})+ball(110,236)+L3.coach(30,240,{pose:'wave',s:1.1,skates:0}))}},
  {t:"I took three steps back. I ran up and kicked it just like I practiced. The ball went over the wall, over the goalie, and over the net. Way over.",
   alt:"The ball sails high over the wall, the goalie and the net",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+wall(140)+keeper({pose:'up',face:'grin'})+greenB(80,240,{legs:'kick',pose:'out'})+A.arc(100,230,230,10,380,60)+ball(372,66)+A.motion(330,40,2))}},
  {t:"The orange team laughed. I felt my face get hot. Coach clapped his hands. \"Good try,\" he said. \"You will get another one.\" I was not so sure.",
   alt:"Orange players laugh while Coach claps for Bodie, who looks sad",
   art:function(){return A.svg(SKY,this.alt,field()+orange(260,240,{pose:'ears',face:'grin',num:''})+orange(320,240,{pose:'ears',face:'grin',num:''})+greenB(140,240,{face:'sad'})+L3.coach(50,240,{pose:'up',s:1.1,skates:0,face:'grin'}))}},
  {t:"In the second half, I got the ball and took it toward the net. The same orange player tripped me again. The ref blew the whistle. Free kick, same spot.",
   alt:"The ref blows the whistle as Bodie is tripped again in the same spot",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+greenB(100,246,{pose:'out',face:'wow',rot:70})+orange(250,240,{legs:'kick',pose:'out',num:''})+ball(60,236)+L3.ref(60,240,{pose:'up',skates:0})+L3.whistle(50,150)+A.sound(70,140))}},
  {t:"This time I did not look at the goalie. I did not look at the wall. I only looked at the corner of the net, and I kicked.",
   alt:"Bodie stares at the top corner of the net, marked with a glowing target",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+wall(140)+keeper()+greenB(80,240,{pose:'hold'})+ball(110,236)+L3.targetStar(330,182))}},
  {t:"The ball went up, bent around the wall, and dropped under the bar. The goalie did not even move. GOAL! My whole team ran at me.",
   alt:"The ball bends around the wall and into the top corner as Bodie celebrates",
   art:function(){return A.svg(SKY,this.alt,field()+goal()+wall(140)+keeper({face:'wow'})+greenB(80,240,{pose:'up',face:'grin'})+A.arc(100,230,200,90,322,180)+ball(318,184)+A.star(60,100,9)+A.star(140,70,10)+A.star(200,110,7))}},
  {t:"We won 1 to 0. After the game, Dad said, \"That was a Messi kick.\" \"No,\" I said. \"That was a Bodie kick. I learned it in my own yard.\"",
   alt:"The scoreboard shows Green 1, Orange 0, and Bodie and Dad celebrate",
   art:function(){return A.svg(SKY,this.alt,A.cloud(340,44,.7)+A.grass(150,'#4fae4f')+'<path d="M0,190 H400 M0,235 H400" stroke="#fff" stroke-width="3" opacity=".6"/>'+A.board2(200,56,'GREEN','ORANGE',1,0,'#7ee27e','#ff9e4a')+greenB(150,240,{pose:'up',face:'grin'})+D(260,240,{pose:'up',face:'grin'})+ball(330,236))}}
 ]});
})();
