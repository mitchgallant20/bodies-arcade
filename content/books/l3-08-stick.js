/* Level 3: The Broken Stick. Thunder snaps in warm up, and Bodie finds out who was scoring all along. */
(function(){
var flame=function(x,y,o){return person(x,y,mix(RED,mix({num:'7'},o||{})))};
var bod=function(x,y,o){return B(x,y,mix(RED,o||{}))};
var wolf=L3.wolf;
var board=function(h,a){return A.board2(200,56,'FLAMES','WOLVES',h,a,'#ff6a52','#c9d3dc')};
var rinkNet=function(){return A.rink()+A.net(290,238,1.1)};
var old=function(x,y,ang,len){return A.stick(x,y,ang,len||52)};
var dressing=function(){return '<rect width="400" height="260" fill="#243454"/><rect y="200" width="400" height="60" fill="#8a97a6"/>'+A.bench(120,240,180)+A.bench(300,240,160)+A.helmetBench(60,210)+A.helmetBench(340,210)};

LEVEL3.push({id:'stick',title:'The Broken Stick',level:3,color:'#d19a52',
 words:['almost','different','sure','hold','better','finally','important','thought','whole','own','answer','spare'],
 cover:function(){return A.svg(SKY,'Bodie holds two halves of his broken red stick on the ice',A.rink()+bod(200,240,{pose:'out',face:'wow',s:1.15})+L3.brokenThunder(150,150)+A.puck(300,238))},
 pages:[
  {t:"My stick was the best stick in the world. It was red and black with white tape. I had scored every goal this year with it. I named it Thunder.",
   alt:"Bodie in the garage holding his red stick, Thunder, with a lightning bolt sign",
   art:function(){return A.svg('#b9c3cc',this.alt,A.garage()+bod(170,240,{pose:'hold',face:'grin',skates:0})+L3.thunder(176,196,-30,56)+A.sign(320,170,'THUNDER','#c8102e')+L3.lightning(300,60,.6))}},
  {t:"The big game was against the Wolves. They were in first place. We were in second. In warm up, I took a slap shot, and Thunder snapped in half.",
   alt:"Thunder snaps in half in the middle of Bodie's slap shot",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+wolf(330,240,{pose:'hold',legs:'skate'})+bod(150,240,{pose:'hold',legs:'skate',rot:-12,face:'wow'})+L3.brokenThunder(205,205)+A.puck(212,238)+A.motion(80,200,2))}},
  {t:"I stood there holding two pieces of stick. I could not believe it. My sister saw my face from the stands and put her hands over her mouth.",
   alt:"Bodie holds the two pieces of his stick while his sister watches from the stands with her hands over her mouth",
   art:function(){return A.svg(SKY,this.alt,A.rink()+sis(90,100,{legs:'none',s:.72,pose:'ears',face:'wow'})+bod(220,240,{pose:'out',face:'wow'})+L3.brokenThunder(150,185))}},
  {t:"Coach came over. \"Grab the spare,\" he said. The spare was an old wooden stick from the back of the bench. It was heavy, and the blade was flat as a board.",
   alt:"Coach hands Bodie an old wooden stick from the bench",
   art:function(){return A.svg(SKY,this.alt,A.rink()+A.bench(330,240,120)+L3.coach(110,240,{pose:'out'})+old(150,150,-80,70)+bod(240,240,{pose:'hold',face:'wow'}))}},
  {t:"The first period was bad. The puck kept bouncing off my blade. I missed a pass. I missed an open net. The Wolves scored twice. I was sure it was the stick.",
   alt:"The scoreboard shows Flames 0, Wolves 2, and the puck bounces away from Bodie's stick",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+board(0,2)+bod(150,240,{pose:'hold',legs:'skate',face:'sad'})+old(150,198,-35)+A.puck(230,222)+A.motion(190,236,2)+wolf(320,240,{pose:'up',face:'grin'}))}},
  {t:"On the bench, I told Coach the stick was no good. Coach looked at me for a long time. \"Bodie,\" he said, \"who scored all those goals this year? You, or Thunder?\"",
   alt:"Coach crouches by the bench and talks to Bodie, who is holding the old stick",
   art:function(){return A.svg(SKY,this.alt,A.rink()+'<rect y="150" width="400" height="110" fill="#dfeaf2"/>'+A.bench(200,240,320)+flame(90,230,{legs:'none',face:'sad'})+bod(200,230,{legs:'none',face:'sad'})+old(230,200,-10,50)+flame(310,230,{legs:'none',num:'11'})+L3.coach(360,240,{pose:'hold',s:1.15}))}},
  {t:"I thought about it. The answer was me. Thunder never skated. Thunder never passed. Thunder never saw the open man. That was all me.",
   alt:"Bodie thinks, with a thought bubble showing himself skating with the puck",
   art:function(){return A.svg(SKY,this.alt,A.rink()+bod(140,240,{pose:'stand',face:'stand'})+'<ellipse cx="270" cy="110" rx="90" ry="60" fill="#fff" stroke="#aab7c4" stroke-width="3"/><circle cx="200" cy="170" r="9" fill="#fff" stroke="#aab7c4" stroke-width="3"/><circle cx="180" cy="190" r="5" fill="#fff" stroke="#aab7c4" stroke-width="2"/>'+bod(265,150,{s:.6,pose:'hold',legs:'skate',rot:-8,face:'grin'})+old(272,122,-35,34)+A.puck(296,150))}},
  {t:"In the second period, I stopped thinking about the stick. I just played. I stole the puck. I passed to my friend, and he scored. 2 to 1.",
   alt:"Bodie's friend scores as the scoreboard shows Flames 1, Wolves 2",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+board(1,2)+A.light(327,150)+A.puck(338,232)+flame(230,240,{pose:'up',face:'grin'})+bod(110,240,{pose:'hold',legs:'skate'})+old(110,198,-35))}},
  {t:"Then I got the puck in the corner. I cut to the net. I faked the goalie and slid it under his pad with the old wooden stick. 2 to 2!",
   alt:"Bodie slides the puck under the Wolves goalie's pad",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+board(2,2)+wolf(305,240,{pads:1,pose:'out',rot:14})+A.light(327,150)+A.puck(318,236)+bod(190,240,{pose:'hold',legs:'skate',rot:-14,face:'grin'})+old(202,194,-40,60)+A.motion(120,210,2))}},
  {t:"With a minute left, the puck came to me at the blue line. I did not take a slap shot. I took a wrist shot, low and hard. It went in. 3 to 2!",
   alt:"Bodie's wrist shot goes in as the scoreboard shows Flames 3, Wolves 2",
   art:function(){return A.svg(SKY,this.alt,rinkNet()+board(3,2)+L3.clockText(350,106,'1:00')+A.light(327,150)+A.puck(338,232)+wolf(305,240,{pads:1,pose:'out'})+bod(140,240,{pose:'up',face:'grin'})+old(80,160,-20,70)+A.star(100,110,9)+A.star(200,90,10))}},
  {t:"We beat the Wolves. In the dressing room, Coach handed me the old wooden stick. \"Keep it,\" he said. \"It seems to work for you.\" Everybody laughed.",
   alt:"Coach hands Bodie the old stick in the dressing room while the team laughs",
   art:function(){return A.svg('#243454',this.alt,dressing()+L3.coach(300,240,{pose:'out',s:1.15})+old(260,160,-60,70)+bod(180,240,{pose:'out',face:'grin',skates:0})+flame(90,240,{pose:'ears',face:'grin',skates:0})+flame(360,236,{legs:'none',num:'11',face:'grin'}))}},
  {t:"Thunder is in the garage now, in two pieces. The old wooden stick is in my room. I still think it is heavy. But it is mine, and that is the important part.",
   alt:"Bodie in his room holding the old wooden stick, with a hockey poster on the wall",
   art:function(){return A.svg('#f3e9d8',this.alt,A.room()+'<rect x="60" y="50" width="110" height="80" rx="4" fill="#dfeaf2" stroke="#8a97a6" stroke-width="3"/>'+A.net(100,122,.6)+A.puck(130,118)+bod(230,240,{pose:'hold',face:'grin',skates:0})+old(236,196,-30,56)+L3.brokenThunder(320,210))}}
 ]});
})();
