/* Level 3: Fog on the Lake. An early paddle, a wall of fog, and the sound of the flag on the dock. */
(function(){
var lake=function(sunX){return (sunX?A.sun(sunX,46):'')+A.cloud(110,50,.8)+A.tree(30,134,.55)+A.tree(372,134,.6)+A.water(130)};
var paddlers=function(bo,doo){return B(160,240,mix(LJ,bo||{}))+D(250,247,mix(LD,doo||{}))+A.canoe(205,215,.9)};
var canoeIn=function(bo,doo,extra,fogOp){return lake()+(extra||'')+paddlers(bo,doo)+(fogOp?L3.fog(fogOp):'')};
var dockFar=function(){return A.dock(250,164,150)+L3.pennant(386,164,60)};

LEVEL3.push({id:'fog',title:'Fog on the Lake',level:3,color:'#2f6fb5',
 words:['early','quiet','through','toward','heard','between','until','careful','slowly','sure','together','world'],
 cover:function(){return A.svg('#dfe8ef','Bodie and Dad in a canoe in thick fog, with a flag on a dock just showing through',canoeIn({face:'wow'},{},dockFar(),.5))},
 pages:[
  {t:"Dad woke me up when it was still dark. \"The fish bite early,\" he whispered. We carried the canoe down to the water. The lake was flat and quiet, like glass.",
   alt:"Bodie and Dad carry the canoe to the lake in the dark before sunrise",
   art:function(){return A.svg('#2b3a5c',this.alt,A.moon(340,50,16)+L3.stars(3,30)+A.tree(30,134,.55)+A.tree(372,134,.6)+A.water(140,'#1f3a5f','#3b5f8a')+B(130,240,{pose:'up',jersey:'#ff7a1a',vest:1})+D(290,240,{pose:'up',jersey:'#ff7a1a',vest:1})+A.canoe(210,100,.9))}},
  {t:"We paddled out past the point. I caught a perch right away. Then Dad caught a pickerel. The sun came up orange behind the trees.",
   alt:"The sun rises orange as Bodie holds up a perch in the canoe",
   art:function(){return A.svg('#ffb27a',this.alt,'<rect width="400" height="70" fill="#ffc89a"/>'+A.sun(200,110,22)+A.tree(30,134,.55)+A.tree(372,134,.6)+A.water(130)+B(160,240,mix(LJ,{pose:'up',face:'grin'}))+A.fish(150,140,.5)+D(250,247,mix(LD,{rodHTML:''}))+A.rod(262,190,-30,70,1)+A.canoe(205,215,.9))}},
  {t:"Then the fog came. It rolled across the water like a big white blanket. First the trees went away. Then the dock went away. Then I could not see the shore at all.",
   alt:"Fog rolls over the lake and hides the trees and the dock",
   art:function(){return A.svg('#dfe8ef',this.alt,canoeIn({face:'wow'},{face:'wow'},dockFar(),.62))}},
  {t:"\"Dad,\" I said, \"which way is home?\" Dad looked around. \"I'm not sure,\" he said. \"But we will figure it out together.\" His voice was calm, so I felt calm too.",
   alt:"Bodie and Dad sit in the canoe surrounded by white fog",
   art:function(){return A.svg('#dfe8ef',this.alt,canoeIn({face:'wow'},{pose:'wave'},'',.7))}},
  {t:"Dad said the first rule of fog is to stop and listen. We sat still. Water dripped off the paddles. Far away, a loon called. Then I heard something else.",
   alt:"A loon calls somewhere in the fog while Bodie and Dad sit still",
   art:function(){return A.svg('#dfe8ef',this.alt,canoeIn({},{},A.loon(70,170,.6)+A.sound(100,160),.62)+A.sound(330,120,-1))}},
  {t:"It was a flag. Our flag at the end of the dock snaps in the wind. \"I hear it!\" I said. Dad grinned. \"Then that is the way home.\"",
   alt:"Bodie points into the fog toward the sound of the flag",
   art:function(){return A.svg('#dfe8ef',this.alt,canoeIn({pose:'wave',face:'grin'},{face:'grin'},L3.pennant(380,150,60)+A.sound(340,110,-1),.6))}},
  {t:"We paddled slowly toward the sound. I sat in the front and watched for rocks. The fog was so thick that drops of water stuck to my eyelashes.",
   alt:"Bodie leans forward watching for rocks as the canoe moves slowly through the fog",
   art:function(){return A.svg('#dfe8ef',this.alt,canoeIn({rot:-8,face:'wow'},{},L3.rock(70,215,22,9)+L3.rock(330,235,16,7)+A.ripple(120,232,.8),.62))}},
  {t:"A dark shape came out of the fog. I held my breath. It was only a big rock, with a gull standing on top. The gull looked at us and flew away.",
   alt:"A big rock with a gull on top appears out of the fog beside the canoe",
   art:function(){return A.svg('#dfe8ef',this.alt,lake()+L3.rock(95,205,42,22)+paddlers({face:'wow'},{})+L3.fog(.5)+L3.gull(95,180,1.1))}},
  {t:"Dad counted our paddle strokes out loud. Ten, twenty, thirty. The flag got louder. Then, through the fog, I saw a line of wood. The dock!",
   alt:"The dock and its flag come into view through thinning fog",
   art:function(){return A.svg('#e8eef3',this.alt,lake()+dockFar()+paddlers({pose:'wave',face:'grin'},{})+L3.fog(.35))}},
  {t:"I jumped out and tied the rope to the post. My hands were shaking a little. Dad put his hand on my head. \"Good eyes, Bodie. You got us home.\"",
   alt:"Bodie stands on the dock tying the canoe rope while Dad sits in the canoe",
   art:function(){return A.svg('#e8eef3',this.alt,lake()+A.dock(200,164,200)+L3.pennant(386,164,60)+B(300,164,{pose:'hold',jersey:'#ff7a1a',vest:1,face:'grin'})+L3.rope(296,190,220,214)+D(180,247,mix(LD,{pose:'wave',face:'grin'}))+A.canoe(140,215,.9)+L3.fog(.2))}},
  {t:"By the time we ate breakfast, the fog was gone. The lake was blue and the sun was warm. It was like the fog had never been there at all.",
   alt:"Bodie and Dad sit on the dock in the sun eating breakfast",
   art:function(){return A.svg(SKY,this.alt,lake(340)+A.dock(120,170,260)+B(190,200,{legs:'none',pose:'hold',face:'grin',jersey:'#ff7a1a'})+A.plate(190,166)+D(300,206,{legs:'none',pose:'hold',face:'grin'})+A.mug(312,140))}},
  {t:"Now I know the first rule of fog. Stop. Listen. Go slow. And I know that when you are with Dad, you are never really lost.",
   alt:"Bodie and Dad standing by the lake with the canoe, both smiling",
   art:function(){return A.svg(SKY,this.alt,lake(340)+A.grass(220,'#6cc04a')+A.canoe(90,236,.8)+B(220,240,{pose:'up',face:'grin',jersey:'#ff7a1a',vest:1,s:1.1})+D(320,240,{pose:'wave',face:'grin',jersey:'#ff7a1a',vest:1}))}}
 ]});
})();
