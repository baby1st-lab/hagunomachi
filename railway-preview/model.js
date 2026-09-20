(function(root){
'use strict';
const tasks={
pajamas:{name:'ぱじゃま',action:'パジャマを もってくる',icon:'👕'},brush:{name:'はみがき',action:'はぶらしを もってくる',icon:'🪥'},bag:{name:'あしたのじゅんび',action:'かばんの なかを いっしょに みる',icon:'🎒'},bed:{name:'おふとん',action:'おふとんに はいる',icon:'🛏️'},water:{name:'みずとう',action:'みずとうと コップを シンクへ',icon:'🥤'},hands:{name:'てあらい',action:'せっけんで てを あらう',icon:'🫧'},tidy:{name:'おかたづけ',action:'おもちゃを ひとつ はこへ',icon:'🧸'},dinner:{name:'ごはん',action:'テーブルに すわる',icon:'🍚'},bath:{name:'おふろ',action:'タオルを もってくる',icon:'🛁'},book:{name:'えほん',action:'よむ えほんを えらぶ',icon:'📖'}};
const courses={express:{name:'早寝の日',service:'特急',ids:['pajamas','brush','bag','bed'],offsets:[-40,-30,-20,0]},usual:{name:'いつもの日',service:'各駅',ids:['water','hands','tidy','dinner','bath','pajamas','brush','bag','book','bed'],offsets:[-160,-155,-145,-120,-75,-55,-40,-30,-15,0]},lesson:{name:'習い事の日',service:'各駅',ids:['water','hands','dinner','bath','pajamas','brush','bag','bed'],offsets:[-120,-115,-100,-65,-45,-30,-20,0]},dining:{name:'外食の日',service:'各駅',ids:['hands','bath','pajamas','brush','bag','bed'],offsets:[-80,-65,-45,-30,-20,0]}};
function day(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function mins(t){if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))throw Error('時刻を入力してください。');return Number(t.slice(0,2))*60+Number(t.slice(3));}
function time(n){n=((n%1440)+1440)%1440;return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function make(course,bed){return courses[course].ids.map((id,i)=>({id,time:time(mins(bed)+courses[course].offsets[i])}));}
function validate(schedule,course,bed){const ids=courses[course]?.ids;if(!ids||!Array.isArray(schedule)||schedule.length!==ids.length||new Set(schedule.map(s=>s.id)).size!==ids.length||schedule.some(s=>!ids.includes(s.id))||schedule.at(-1).id!=='bed')throw Error('駅の設定を確認してください。');const times=schedule.map(s=>mins(s.time));if(times.some((t,i)=>i&&t<times[i-1])||times.at(-1)!==mins(bed))throw Error('目標時刻は駅の順番に沿って設定してください。日付をまたぐコースには未対応です。');return true;}
function initial(){return {version:1,date:day(),course:'express',bed:'20:30',schedule:make('express','20:30'),done:0};}
function normalize(raw){try{if(!raw||raw.version!==1) return initial();validate(raw.schedule,raw.course,raw.bed);return {version:1,date:day(),course:raw.course,bed:raw.bed,schedule:raw.schedule.map(s=>({id:s.id,time:s.time})),done:raw.date===day()?Math.max(0,Math.min(raw.schedule.length,Number.isInteger(raw.done)?raw.done:0)):0};}catch{return initial();}}
function point(index,count){const a=-Math.PI/2+2*Math.PI*index/count;return {x:50+38*Math.cos(a),y:45.5+23.5*Math.sin(a),rotation:Math.atan2(23.5*Math.cos(a),-38*Math.sin(a))*180/Math.PI};}
const api={tasks,courses,day,mins,time,make,validate,initial,normalize,point};root.HaguModel=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
