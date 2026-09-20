const a=require('node:assert/strict'),m=require('./model.js');
for(const c of Object.keys(m.courses)){const s=m.make(c,'20:30');a.equal(m.validate(s,c,'20:30'),true);a.equal(s.at(-1).time,'20:30');for(let i=0;i<s.length;i++){const p=m.point(i,s.length);a.ok(p.x>=12&&p.x<=88&&p.y>=22&&p.y<=69);}}
a.equal(m.normalize({...m.initial(),done:100}).done,4);
a.equal(m.normalize({...m.initial(),date:'2000-01-01',done:3}).done,0);
a.equal(m.normalize({version:1,schedule:[]}).done,0);
a.throws(()=>m.validate([{id:'bed',time:'20:30'}],'express','20:30'));
const s=m.make('express','20:30');s[0].time='21:00';a.throws(()=>m.validate(s,'express','20:30'));
a.equal(m.mins('20:30'),1230);a.throws(()=>m.mins('25:00'));
console.log('PASS: courses, time/order validation, saved state recovery, daily reset, position bounds');
