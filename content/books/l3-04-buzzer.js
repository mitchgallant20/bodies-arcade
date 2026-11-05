/* Level 3: Buzzer Beater. A Sea Bears game, a halftime free throw, and a shot at the buzzer. */
(function(){
var NAVY='#0b2545';
var court=function(){return A.court()};
var board=function(h,a){return A.board2(200,56,'SEA BEARS','VISITOR',h,a,'#8fd3f4','#c9a0dc')};
var hoop=function(){return A.hoop(310,150,250)};
var fans=function(bo,doo){return B(150,108,mix({legs:'none',s:.78,jersey:NAVY,stripe:'#8fd3f4'},bo||{}))+D(230,112,mix({legs:'none',s:.95,jersey:NAVY},doo||{}))};
var seaB=function(x,y,o){return B(x,y,mix({jersey:NAVY,stripe:'#8fd3f4',num:'5'},o||{}))};
var seaD=function(x,y,o){return D(x,y,mix({jersey:NAVY},o||{}))};
var micMan=function(x,y,o){return person(x,y,mix({jersey:'#333',sleeve:'#333',num:'',hair:'#888',pose:'wave'},o||{}))+L3.mic(x-30,y-50)};

LEVEL3.push({id:'buzzer',title:'Buzzer Beater',level:3,color:NAVY,
 words:['second','half','between','almost','people','important','really','finally','group','show','start','ten'],
 cover:function(){return A.svg(NAVY,'A Sea Bears player jumps and shoots as the ball flies toward the hoop',court()+hoop()+L3.clockText(70,60,'0:01')+L3.sea(170,224,{pose:'up',legs:'none'})+A.arc(190,120,250,60,310,140)+A.basketball(300,112,13)+A.star(120,90,9))},
 pages:[
  {t:"The Sea Bears were playing at home. Dad got us seats right behind the basket. The people in front of us had drums. Every time the Sea Bears scored, they banged them.",
   alt:"Bodie and Dad in their seats behind the basket, next to fans with drums",
   art:function(){return A.svg(NAVY,this.alt,court()+fans({face:'grin'},{})+A.drums(330,112,.55)+hoop()+L3.sea(120,240,{pose:'hold'})+A.basketball(150,232,14))}},
  {t:"Basketball is fast. The ball went up the court, down the court, up the court. I tried to keep my eyes on it. By halftime my neck was tired.",
   alt:"Players race up the court with the ball while Bodie watches from the stands",
   art:function(){return A.svg(NAVY,this.alt,court()+fans({face:'wow'},{})+A.motion(40,180,3)+L3.sea(140,240,{pose:'hold',legs:'kick',rot:-8})+A.basketball(180,236,14)+L3.vis(260,240,{pose:'out',legs:'kick',rot:6})+A.motion(300,180,2))}},
  {t:"At halftime, a man with a microphone picked kids to shoot free throws. He pointed right at me! I ran down the steps as fast as I could.",
   alt:"A man with a microphone points at Bodie, who is running down to the court",
   art:function(){return A.svg(NAVY,this.alt,court()+seaD(90,112,{legs:'none',s:.95,pose:'up',face:'grin'})+micMan(300,240,{pose:'wave'})+seaB(160,240,{legs:'kick',rot:-10,pose:'out',face:'grin'})+A.motion(80,200,3))}},
  {t:"The basket looked so high from the free throw line. I bounced the ball twice, like the players do. Then I shot it. It bounced on the rim, rolled around, and dropped in!",
   alt:"Bodie shoots a free throw and the ball drops through the hoop",
   art:function(){return A.svg(NAVY,this.alt,court()+hoop()+seaB(130,240,{pose:'up',face:'wow'})+A.arc(150,130,230,70,310,142)+A.basketball(310,162,13)+A.star(250,100,8))}},
  {t:"The whole arena cheered for me. The man gave me a Sea Bears towel. I waved it over my head all the way back to my seat.",
   alt:"Bodie waves a Sea Bears towel over his head while the crowd cheers",
   art:function(){return A.svg(NAVY,this.alt,court()+A.star(60,130,10)+A.star(340,120,10)+A.star(200,100,8)+seaB(200,240,{pose:'up',face:'grin',s:1.1})+L3.towel(236,118,-30)+micMan(320,240,{pose:'up',face:'grin'}))}},
  {t:"The second half was close. The other team went up by two. Then the Sea Bears went up by one. The crowd got louder and louder.",
   alt:"The scoreboard shows Sea Bears 61, Visitor 60, as the players battle",
   art:function(){return A.svg(NAVY,this.alt,court()+board(61,60)+L3.sea(140,240,{pose:'hold',legs:'kick'})+A.basketball(176,236,14)+L3.vis(250,240,{pose:'out'})+A.star(60,130,8)+A.star(340,130,8))}},
  {t:"With ten seconds left, the other team scored. Now the Sea Bears were down by two. Dad grabbed my arm. \"Watch this,\" he said. \"This is the important part.\"",
   alt:"The clock shows ten seconds and the scoreboard shows the Sea Bears down by two",
   art:function(){return A.svg(NAVY,this.alt,court()+board(70,72)+L3.clockText(340,56,'0:10')+seaB(140,240,{face:'wow'})+seaD(250,240,{pose:'out',face:'wow'}))}},
  {t:"The Sea Bears got the ball. Five seconds. Four. The point guard dribbled between two players. Three. Two. He jumped and let it fly from way outside.",
   alt:"The point guard jumps and shoots over two defenders with two seconds left",
   art:function(){return A.svg(NAVY,this.alt,court()+L3.clockText(70,60,'0:02')+L3.vis(100,240,{pose:'up'})+L3.vis(260,240,{pose:'up',hair:'#222'})+L3.sea(180,206,{pose:'up',legs:'none'})+A.basketball(222,96,13)+A.motion(250,110,2)+A.motion(150,222,2))}},
  {t:"The ball was in the air when the buzzer went. It seemed to hang there forever. Then it dropped through the net without touching the rim. Swish.",
   alt:"The ball drops through the hoop as the clock shows zero",
   art:function(){return A.svg(NAVY,this.alt,court()+hoop()+L3.clockText(70,60,'0:00','#ff6b6b')+A.arc(180,120,250,50,310,140)+A.basketball(310,166,13)+A.star(280,90,9)+A.star(340,100,7)+L3.sea(170,240,{pose:'up',face:'wow'}))}},
  {t:"The Sea Bears won by one! Everybody jumped up at the same time. The drums banged. I waved my towel so hard it flew out of my hand.",
   alt:"The scoreboard shows Sea Bears 73, Visitor 72, and Bodie's towel flies through the air",
   art:function(){return A.svg(NAVY,this.alt,court()+board(73,72)+A.star(40,120,9)+A.star(360,120,9)+seaB(150,240,{pose:'up',face:'grin'})+L3.towel(90,110,40)+seaD(260,240,{pose:'up',face:'grin'})+A.drums(360,236,.5))}},
  {t:"On the way out, the point guard was signing things by the door. I showed him my towel. He signed it and said, \"Nice free throw, kid.\" He saw me!",
   alt:"The point guard signs Bodie's towel by the arena door",
   art:function(){return A.svg('#1b2a44',this.alt,'<rect y="200" width="400" height="60" fill="#2a3d5e"/><rect x="300" y="60" width="80" height="140" fill="#152238" stroke="#8a97a6" stroke-width="3"/>'+L3.sea(230,240,{pose:'hold',face:'grin',s:1.15})+seaB(120,240,{pose:'out',face:'grin'})+L3.towel(170,180,0)+seaD(40,240,{pose:'hold',face:'grin',s:1.1}))}},
  {t:"The towel is on my wall now. Every time I see it, I think about the ball hanging in the air. Dad was right. That was the important part.",
   alt:"The signed Sea Bears towel pinned on Bodie's bedroom wall",
   art:function(){return A.svg('#f3e9d8',this.alt,A.room()+'<rect x="120" y="60" width="160" height="60" rx="4" fill="#8fd3f4" stroke="#0b2545" stroke-width="3"/><path d="M135,80 H265 M135,100 H265" stroke="#0b2545" stroke-width="3"/><path d="M230,74 q10,8 20,0 q6,-4 12,6" stroke="#152338" stroke-width="2" fill="none"/>'+A.basketball(330,236,16)+seaB(200,240,{pose:'up',face:'grin'}))}}
 ]});
})();
