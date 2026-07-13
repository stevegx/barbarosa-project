import React, { useState, useEffect, useRef } from "react";

const CSS = `/* ============ TOKENS ============ */
:root{
  --navy:#071C2C;
  --ocean:#0C2A3E;
  --ocean-2:#103A54;
  --parchment:#F4E8D2;
  --parchment-2:#EEDFC1;
  --gold:#D2A45A;
  --gold-soft:#E4C68C;
  --burgundy:#8A2B2B;
  --burgundy-2:#A83636;
  --brown:#5A4632;
  --ink:#152530;
  --ink-soft:#3d5361;
  --white:#ffffff;

  --font-display:'Cinzel', serif;
  --font-editorial:'Cormorant Garamond', serif;
  --font-body:'Manrope', -apple-system, system-ui, sans-serif;

  --maxw:1280px;
  --pad:clamp(20px,5vw,80px);
  --r:18px;
  --ease:cubic-bezier(.22,.61,.36,1);
}

*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  font-family:var(--font-body);
  background:var(--navy);
  color:var(--parchment);
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
section{scroll-margin-top:88px;position:relative}
::selection{background:var(--gold);color:var(--navy)}

/* ============ SHARED ============ */
.wrap{max-width:var(--maxw);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
.eyebrow{
  font-family:var(--font-body);
  font-size:.72rem;font-weight:600;letter-spacing:.34em;text-transform:uppercase;
  color:var(--gold);display:inline-flex;align-items:center;gap:12px;
}
.eyebrow::before{content:"";width:34px;height:1px;background:var(--gold);opacity:.7}
.eyebrow--center::after{content:"";width:34px;height:1px;background:var(--gold);opacity:.7}

.h-display{font-family:var(--font-display);font-weight:700;line-height:1.04;letter-spacing:.01em}
.h-editorial{font-family:var(--font-editorial);font-weight:500;line-height:1.08}

.btn{
  display:inline-flex;align-items:center;gap:12px;font-family:var(--font-body);
  font-weight:600;font-size:.82rem;letter-spacing:.12em;text-transform:uppercase;
  padding:16px 30px;border-radius:100px;cursor:pointer;border:1px solid transparent;
  transition:transform .4s var(--ease),background .4s var(--ease),color .4s var(--ease),box-shadow .4s var(--ease);
  white-space:nowrap;
}
.btn svg{width:16px;height:16px;transition:transform .4s var(--ease)}
.btn:hover svg{transform:translateX(4px)}
.btn--gold{background:var(--gold);color:var(--navy);box-shadow:0 12px 40px -12px rgba(210,164,90,.6)}
.btn--gold:hover{transform:translateY(-3px);box-shadow:0 20px 50px -12px rgba(210,164,90,.75)}
.btn--ghost{background:transparent;color:var(--parchment);border-color:rgba(244,232,210,.35)}
.btn--ghost:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-3px)}
.btn--navy{background:var(--navy);color:var(--parchment)}
.btn--navy:hover{background:var(--ocean-2);transform:translateY(-3px)}
.btn--red{background:var(--burgundy);color:#fff;padding:12px 22px;font-size:.72rem;letter-spacing:.14em}
.btn--red:hover{background:var(--burgundy-2);transform:translateY(-2px);box-shadow:0 14px 34px -14px rgba(138,43,43,.8)}

/* reveal */
.reveal{opacity:0;transform:translateY(34px);transition:opacity 1s var(--ease),transform 1s var(--ease)}
.reveal.in{opacity:1;transform:none}
.reveal.d1{transition-delay:.09s}.reveal.d2{transition-delay:.18s}
.reveal.d3{transition-delay:.27s}.reveal.d4{transition-delay:.36s}

/* course-line divider (signature) */
.course{display:flex;align-items:center;justify-content:center;gap:18px;padding:6px 0}
.course .line{height:1px;flex:1;max-width:220px;background:
  repeating-linear-gradient(90deg,var(--gold) 0 7px,transparent 7px 15px);opacity:.55}
.course .rose{width:26px;height:26px;color:var(--gold);opacity:.85}

/* ============ NAV ============ */
.nav{position:fixed;top:0;left:0;right:0;z-index:60;transition:background .5s var(--ease),box-shadow .5s var(--ease),padding .5s var(--ease);padding:22px 0}
.nav__inner{max-width:var(--maxw);margin:0 auto;padding:0 var(--pad);display:flex;align-items:center;justify-content:space-between;gap:24px}
.nav.solid{background:rgba(7,28,44,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 1px 0 rgba(210,164,90,.16);padding:14px 0}
.brand{display:flex;align-items:center;gap:12px}
.brand svg{width:30px;height:30px;color:var(--gold)}
.brand b{font-family:var(--font-display);font-weight:700;font-size:1.02rem;letter-spacing:.16em;color:var(--parchment)}
.brand small{display:block;font-family:var(--font-body);font-size:.56rem;letter-spacing:.32em;color:var(--gold);text-transform:uppercase;margin-top:2px}
.nav__links{display:flex;align-items:center;gap:30px;list-style:none}
.nav__links a{font-size:.82rem;font-weight:500;letter-spacing:.04em;color:rgba(244,232,210,.82);position:relative;padding:4px 0;transition:color .3s}
.nav__links a::after{content:"";position:absolute;left:0;bottom:-2px;width:0;height:1px;background:var(--gold);transition:width .35s var(--ease)}
.nav__links a:hover{color:var(--gold)}
.nav__links a:hover::after{width:100%}
.nav__right{display:flex;align-items:center;gap:18px}
.burger{display:none;background:none;border:0;color:var(--parchment);cursor:pointer;width:32px;height:32px}

/* ============ HERO ============ */
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:120px 0 200px}
.hero__scene{position:absolute;inset:0;z-index:0}
.hero__scene svg{width:100%;height:100%;object-fit:cover}
.hero__overlay{position:absolute;inset:0;z-index:1;background:
  radial-gradient(120% 90% at 50% 8%,transparent 30%,rgba(7,28,44,.55) 78%,rgba(7,28,44,.92) 100%),
  linear-gradient(180deg,rgba(7,28,44,.5) 0%,transparent 30%,transparent 55%,rgba(7,28,44,.82) 100%)}
.hero .wrap{position:relative;z-index:2;width:100%;text-align:center}
.hero__eyebrow{justify-content:center;margin-bottom:30px}
.hero__title{font-family:var(--font-display);font-weight:800;color:var(--parchment);
  font-size:clamp(2.6rem,8.2vw,7.2rem);line-height:.98;letter-spacing:.02em;
  text-shadow:0 4px 60px rgba(0,0,0,.5)}
.hero__title span{display:block}
.hero__title .accent{color:var(--gold);position:relative}
.hero__sub{font-family:var(--font-editorial);font-style:italic;font-weight:500;
  font-size:clamp(1.3rem,2.6vw,2.1rem);color:var(--gold-soft);margin-top:20px}
.hero__meta{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 26px;margin-top:22px;
  font-size:.92rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,232,210,.9);font-weight:500}
.hero__meta .dot{width:5px;height:5px;border-radius:50%;background:var(--gold)}
.hero__cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:44px}
.scroll-cue{position:absolute;bottom:150px;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:10px;color:rgba(244,232,210,.6);font-size:.6rem;letter-spacing:.3em;text-transform:uppercase}
.scroll-cue .m{width:1px;height:44px;background:linear-gradient(var(--gold),transparent);position:relative;overflow:hidden}
.scroll-cue .m::after{content:"";position:absolute;top:-100%;left:0;width:100%;height:60%;background:var(--gold);animation:drop 2.4s var(--ease) infinite}
@keyframes drop{0%{top:-60%}60%,100%{top:120%}}

/* floating info cards */
.infocards{position:relative;z-index:5;margin-top:-96px}
.infocards__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.icard{background:rgba(12,42,62,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(210,164,90,.25);border-radius:var(--r);padding:30px 32px;
  display:flex;align-items:center;gap:20px;transition:transform .5s var(--ease),border-color .5s var(--ease),background .5s var(--ease)}
.icard:hover{transform:translateY(-6px);border-color:rgba(210,164,90,.6);background:rgba(12,42,62,.72)}
.icard__ic{width:52px;height:52px;flex-shrink:0;border-radius:12px;display:grid;place-items:center;
  background:rgba(210,164,90,.12);color:var(--gold)}
.icard__ic svg{width:26px;height:26px}
.icard b{display:block;font-family:var(--font-body);font-weight:700;font-size:1.02rem;color:var(--parchment);letter-spacing:.02em}
.icard span{font-size:.82rem;color:rgba(244,232,210,.6);letter-spacing:.06em;text-transform:uppercase}

/* ============ ABOUT ============ */
.about{background:var(--parchment);color:var(--ink);padding:170px 0 120px;position:relative}
.about::before{content:"";position:absolute;inset:0;opacity:.5;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E")}
.about .wrap{position:relative}
.about__top{display:grid;grid-template-columns:1.05fr 1fr;gap:70px;align-items:end}
.about__head{font-family:var(--font-editorial);font-weight:500;color:var(--navy);
  font-size:clamp(2.1rem,4.4vw,3.6rem);line-height:1.06;margin-top:26px}
.about__head em{font-style:italic;color:var(--burgundy)}
.about__desc p{color:var(--ink-soft);font-size:1.06rem;margin-bottom:18px}
.about__desc p:first-child{font-family:var(--font-editorial);font-size:1.5rem;line-height:1.5;color:var(--brown);font-weight:500}
.about__cards{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:80px}
.fcard{background:#fff;border:1px solid rgba(90,70,50,.14);border-radius:var(--r);padding:34px 30px 32px;
  box-shadow:0 24px 50px -34px rgba(21,37,48,.35);transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
.fcard:hover{transform:translateY(-8px);box-shadow:0 34px 60px -30px rgba(21,37,48,.42)}
.fcard__ic{width:58px;height:58px;border-radius:14px;border:1px solid var(--gold);color:var(--burgundy);
  display:grid;place-items:center;margin-bottom:24px}
.fcard__ic svg{width:30px;height:30px}
.fcard h3{font-family:var(--font-display);font-weight:600;font-size:1.16rem;color:var(--navy);letter-spacing:.02em;margin-bottom:10px}
.fcard p{font-size:.92rem;color:var(--ink-soft)}
.fcard .num{font-family:var(--font-editorial);font-style:italic;font-size:.9rem;color:var(--gold);display:block;margin-bottom:14px}

/* ============ HISTORY ============ */
.history{background:var(--navy);padding:130px 0;position:relative;overflow:hidden}
.history__chart{position:absolute;inset:0;opacity:.5;z-index:0}
.history .wrap{position:relative;z-index:2}
.history__grid{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.history__story h2{font-family:var(--font-display);font-weight:700;font-size:clamp(2.2rem,4vw,3.4rem);
  color:var(--parchment);margin:22px 0 28px;line-height:1.06}
.history__story p{color:rgba(244,232,210,.72);font-size:1.05rem;margin-bottom:20px}
.history__story .drop::first-letter{font-family:var(--font-display);font-size:3.6rem;float:left;line-height:.8;
  color:var(--gold);margin:6px 14px 0 0;font-weight:700}
.history__quote{border-left:2px solid var(--gold);padding:6px 0 6px 24px;margin-top:34px;
  font-family:var(--font-editorial);font-style:italic;font-size:1.5rem;color:var(--gold-soft);line-height:1.4}
.tl{position:relative;padding-left:8px}
.tl__item{position:relative;padding:0 0 54px 56px}
.tl__item:last-child{padding-bottom:0}
.tl__item::before{content:"";position:absolute;left:19px;top:34px;bottom:-6px;width:1px;
  background:linear-gradient(var(--gold),rgba(210,164,90,.15))}
.tl__item:last-child::before{display:none}
.tl__dot{position:absolute;left:0;top:0;width:40px;height:40px;border-radius:50%;
  border:1px solid var(--gold);color:var(--gold);display:grid;place-items:center;background:var(--navy);z-index:2}
.tl__dot svg{width:20px;height:20px}
.tl__era{font-family:var(--font-body);font-size:.72rem;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.tl__item h4{font-family:var(--font-display);font-weight:600;font-size:1.3rem;color:var(--parchment);margin:8px 0 8px}
.tl__item p{color:rgba(244,232,210,.62);font-size:.98rem}

/* ============ PIRATE SHOW ============ */
.show{background:var(--ocean);position:relative;overflow:hidden}
.show__grid{display:grid;grid-template-columns:1fr 1.15fr;align-items:stretch;min-height:640px}
.show__text{padding:120px var(--pad) 120px;max-width:640px;margin-left:auto;width:100%;position:relative;z-index:3}
.show__text .inner{max-width:480px;margin-left:auto}
.show__text h2{font-family:var(--font-editorial);font-weight:500;font-size:clamp(2.2rem,4.4vw,3.8rem);
  color:var(--parchment);line-height:1.08;margin:24px 0 26px}
.show__text h2 em{font-style:italic;color:var(--gold)}
.show__text p{color:rgba(244,232,210,.72);font-size:1.06rem;margin-bottom:20px}
.show__tags{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 40px}
.show__tags span{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-soft);
  border:1px solid rgba(210,164,90,.3);border-radius:100px;padding:8px 16px}
.show__scene{position:relative;overflow:hidden;min-height:420px}
.show__scene svg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.show__scene::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--ocean) 0%,transparent 22%,transparent 100%)}

/* ============ SCHEDULE ============ */
.sched{background:var(--white);color:var(--ink);padding:120px 0}
.sched__head{text-align:center;max-width:640px;margin:0 auto 80px}
.sched__head h2{font-family:var(--font-display);font-weight:700;font-size:clamp(2rem,4vw,3.2rem);color:var(--navy);margin-top:20px}
.sched__head .eyebrow{margin-bottom:8px}
.sched__rail{position:relative}
.sched__track{display:grid;grid-template-columns:repeat(6,1fr);gap:0;position:relative}
.sched__track::before{content:"";position:absolute;top:27px;left:8%;right:8%;height:1px;
  background:repeating-linear-gradient(90deg,var(--gold) 0 8px,transparent 8px 16px);opacity:.7}
.stop{text-align:center;padding:0 10px;position:relative}
.stop__node{width:56px;height:56px;border-radius:50%;background:#fff;border:1px solid var(--gold);
  color:var(--burgundy);display:grid;place-items:center;margin:0 auto 22px;position:relative;z-index:2;
  box-shadow:0 10px 26px -14px rgba(210,164,90,.7);transition:transform .4s var(--ease),background .4s var(--ease),color .4s var(--ease)}
.stop__node svg{width:26px;height:26px}
.stop:hover .stop__node{transform:translateY(-5px);background:var(--gold);color:#fff}
.stop__time{font-family:var(--font-display);font-weight:700;font-size:1.35rem;color:var(--navy)}
.stop__label{font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;margin:6px 0 6px}
.stop__desc{font-size:.86rem;color:var(--ink-soft)}

/* ============ CELEBRATION ============ */
.celebrate{background:var(--navy);padding:130px 0}
.celebrate__head{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;margin-bottom:60px;flex-wrap:wrap}
.celebrate__head h2{font-family:var(--font-editorial);font-weight:500;font-size:clamp(2.2rem,4.4vw,3.6rem);color:var(--parchment);margin-top:20px;line-height:1.08}
.celebrate__head h2 em{font-style:italic;color:var(--gold)}
.celebrate__head p{max-width:340px;color:rgba(244,232,210,.6);font-size:1rem}
.celebrate__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.ccard{position:relative;border-radius:var(--r);overflow:hidden;min-height:440px;display:flex;align-items:flex-end;
  border:1px solid rgba(210,164,90,.16);transition:transform .6s var(--ease)}
.ccard:hover{transform:translateY(-8px)}
.ccard__scene{position:absolute;inset:0;z-index:0}
.ccard__scene svg{width:100%;height:100%;object-fit:cover}
.ccard__grad{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(7,28,44,.05) 0%,rgba(7,28,44,.35) 45%,rgba(7,28,44,.94) 100%)}
.ccard__body{position:relative;z-index:2;padding:38px 34px 40px;width:100%}
.ccard__ic{width:44px;height:44px;border-radius:12px;background:rgba(210,164,90,.16);color:var(--gold);
  display:grid;place-items:center;margin-bottom:18px;border:1px solid rgba(210,164,90,.3)}
.ccard__ic svg{width:24px;height:24px}
.ccard h3{font-family:var(--font-display);font-weight:600;font-size:1.4rem;color:var(--parchment);margin-bottom:10px;letter-spacing:.02em}
.ccard p{font-size:.94rem;color:rgba(244,232,210,.72);max-height:0;opacity:0;overflow:hidden;
  transition:max-height .6s var(--ease),opacity .5s var(--ease),margin .5s var(--ease)}
.ccard:hover p{max-height:120px;opacity:1;margin-top:4px}

/* ============ LOCATION ============ */
.location{background:var(--parchment);color:var(--ink);padding:120px 0;position:relative}
.location::before{content:"";position:absolute;inset:0;opacity:.5;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='.06'/%3E%3C/svg%3E")}
.location .wrap{position:relative}
.location__grid{display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:center}
.map{position:relative;border-radius:var(--r);overflow:hidden;border:1px solid rgba(90,70,50,.2);
  box-shadow:0 30px 60px -34px rgba(21,37,48,.4);aspect-ratio:16/12}
.map svg{width:100%;height:100%}
.map__pin{position:absolute;top:44%;left:52%;transform:translate(-50%,-100%);z-index:3;color:var(--burgundy);
  filter:drop-shadow(0 6px 8px rgba(0,0,0,.3));animation:bob 3s var(--ease) infinite}
.map__pin svg{width:44px;height:44px}
@keyframes bob{0%,100%{transform:translate(-50%,-100%)}50%{transform:translate(-50%,-114%)}}
.map__badge{position:absolute;left:18px;bottom:18px;z-index:3;background:rgba(255,255,255,.92);
  border-radius:12px;padding:12px 18px;font-size:.8rem;font-weight:600;color:var(--navy);
  box-shadow:0 10px 30px -12px rgba(0,0,0,.3);display:flex;align-items:center;gap:8px}
.map__badge svg{width:16px;height:16px;color:var(--burgundy)}
.location__info h2{font-family:var(--font-display);font-weight:700;font-size:clamp(2rem,3.6vw,3rem);color:var(--navy);margin:20px 0 24px}
.location__info .rows{margin:0 0 34px}
.lrow{display:flex;gap:18px;padding:20px 0;border-bottom:1px solid rgba(90,70,50,.16)}
.lrow:first-child{border-top:1px solid rgba(90,70,50,.16)}
.lrow__ic{width:42px;height:42px;flex-shrink:0;border-radius:10px;background:rgba(210,164,90,.16);
  color:var(--burgundy);display:grid;place-items:center}
.lrow__ic svg{width:22px;height:22px}
.lrow b{display:block;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:3px}
.lrow span{color:var(--ink);font-size:1.05rem;font-weight:500}

/* ============ ORGANIZERS ============ */
.org{background:var(--white);padding:100px 0;text-align:center}
.org h2{font-family:var(--font-display);font-weight:600;font-size:1.5rem;color:var(--navy);margin:14px 0 50px}
.org__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:24px}
.olog{border:1px solid rgba(90,70,50,.14);border-radius:14px;padding:30px 18px;min-height:110px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
  filter:grayscale(1);opacity:.55;transition:filter .5s var(--ease),opacity .5s var(--ease),transform .5s var(--ease),border-color .5s var(--ease)}
.olog:hover{filter:grayscale(0);opacity:1;transform:translateY(-4px);border-color:var(--gold)}
.olog svg{width:34px;height:34px;color:var(--burgundy)}
.olog span{font-family:var(--font-display);font-weight:600;font-size:.78rem;color:var(--navy);letter-spacing:.04em}

/* ============ FOOTER ============ */
.footer{background:var(--navy);padding:80px 0 34px;border-top:1px solid rgba(210,164,90,.18);position:relative;overflow:hidden}
.footer__wave{position:absolute;top:0;left:0;right:0;height:40px;opacity:.5}
.footer__top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;padding-bottom:50px;border-bottom:1px solid rgba(210,164,90,.12)}
.footer__brand svg{width:40px;height:40px;color:var(--gold);margin-bottom:18px}
.footer__brand b{font-family:var(--font-display);font-weight:700;font-size:1.3rem;letter-spacing:.1em;color:var(--parchment);display:block}
.footer__brand p{color:rgba(244,232,210,.55);font-size:.94rem;margin-top:14px;max-width:280px}
.fcol h5{font-family:var(--font-body);font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:20px;font-weight:600}
.fcol a,.fcol p{display:block;color:rgba(244,232,210,.66);font-size:.94rem;margin-bottom:12px;transition:color .3s}
.fcol a:hover{color:var(--gold)}
.socials{display:flex;gap:12px;margin-top:4px}
.socials a{width:40px;height:40px;border-radius:50%;border:1px solid rgba(210,164,90,.3);
  display:grid;place-items:center;color:var(--gold-soft);transition:background .4s,color .4s,transform .4s}
.socials a:hover{background:var(--gold);color:var(--navy);transform:translateY(-3px)}
.socials svg{width:18px;height:18px}
.footer__bottom{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:26px;flex-wrap:wrap}
.footer__bottom p{color:rgba(244,232,210,.45);font-size:.82rem;letter-spacing:.04em}

/* ============ RESPONSIVE ============ */
@media(max-width:1024px){
  .about__cards{grid-template-columns:repeat(2,1fr)}
  .org__grid{grid-template-columns:repeat(3,1fr)}
  .footer__top{grid-template-columns:1fr 1fr}
  .footer__brand{grid-column:1/-1}
}
@media(max-width:860px){
  .nav__links{position:fixed;inset:0 0 auto 0;top:0;flex-direction:column;background:rgba(7,28,44,.98);
    backdrop-filter:blur(18px);padding:100px 40px 40px;gap:8px;transform:translateY(-100%);
    transition:transform .5s var(--ease);height:100vh;justify-content:flex-start;z-index:55}
  .nav__links.open{transform:none}
  .nav__links a{font-size:1.3rem;font-family:var(--font-display);padding:16px 0;width:100%;border-bottom:1px solid rgba(210,164,90,.12)}
  .burger{display:grid;place-items:center;z-index:60}
  .infocards__grid{grid-template-columns:1fr}
  .infocards{margin-top:-70px}
  .about__top{grid-template-columns:1fr;gap:30px}
  .history__grid,.show__grid,.location__grid,.celebrate__grid{grid-template-columns:1fr}
  .show__text{max-width:100%;padding:80px var(--pad)}
  .show__text .inner{margin:0}
  .show__scene{min-height:340px;order:-1}
  .show__scene::after{background:linear-gradient(0deg,var(--ocean) 0%,transparent 30%)}
  .sched__track{grid-template-columns:1fr;gap:14px;max-width:400px;margin:0 auto}
  .sched__track::before{top:0;bottom:0;left:27px;right:auto;width:1px;height:auto;
    background:repeating-linear-gradient(180deg,var(--gold) 0 8px,transparent 8px 16px)}
  .stop{display:flex;align-items:center;text-align:left;gap:20px;padding:6px 0}
  .stop__node{margin:0;flex-shrink:0}
  .celebrate__grid{max-width:440px;margin:0 auto}
  .ccard p{max-height:120px;opacity:1;margin-top:4px}
}
@media(max-width:560px){
  .about__cards{grid-template-columns:1fr}
  .org__grid{grid-template-columns:repeat(2,1fr)}
  .footer__top{grid-template-columns:1fr}
  .hero__cta{flex-direction:column}
  .hero__cta .btn{width:100%;justify-content:center}
  .scroll-cue{display:none}
}
@media(prefers-reduced-motion:reduce){
  *{animation:none!important}
  .reveal{opacity:1;transform:none;transition:none}
  html{scroll-behavior:auto}
}`;

export default function App() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  // Frost the nav after scrolling
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const root = rootRef.current || document;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div ref={rootRef} className="barbarossa-root">
        <nav className={"nav" + (solid ? " solid" : "")} id="nav">
          <div className="nav__inner">
            <a
              href="#top"
              className="brand"
              aria-label="Στα Ίχνη του Μπαρμπαρόσα"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v13M12 20a7 7 0 0 0 7-7M12 20a7 7 0 0 1-7-7M5 13H3l1.5-2M19 13h2l-1.5-2M8 10H4M16 10h4" />
              </svg>
              <span>
                <b>ΜΠΑΡΜΠΑΡΟΣΑ</b>
                <small>Πειρατική Ρεγκάτα Γέρας</small>
              </span>
            </a>
            <ul
              className={"nav__links" + (menuOpen ? " open" : "")}
              id="menu"
              onClick={() => setMenuOpen(false)}
            >
              <li>
                <a href="#about">Εκδήλωση</a>
              </li>
              <li>
                <a href="#history">Ιστορία</a>
              </li>
              <li>
                <a href="#schedule">Πρόγραμμα</a>
              </li>
              <li>
                <a href="#show">Πειρατικό Θέαμα</a>
              </li>
              <li>
                <a href="#location">Τοποθεσία</a>
              </li>
              <li>
                <a href="#contact">Επικοινωνία</a>
              </li>
            </ul>
            <div className="nav__right">
              <a href="#top" className="btn btn--red">
                19 Ιουλίου 2026
              </a>
              <button
                className="burger"
                id="burger"
                aria-label="Μενού"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <header className="hero" id="top">
          <div className="hero__scene">
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#071C2C" />
                  <stop offset="0.42" stopColor="#123247" />
                  <stop offset="0.62" stopColor="#5A3A3E" />
                  <stop offset="0.76" stopColor="#B8703F" />
                  <stop offset="0.86" stopColor="#D2A45A" />
                  <stop offset="1" stopColor="#E4C68C" />
                </linearGradient>
                <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#FBE9C4" />
                  <stop offset="0.45" stopColor="#F0C97E" />
                  <stop offset="1" stopColor="#D2A45A" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#C98F52" />
                  <stop offset="0.18" stopColor="#7A5A48" />
                  <stop offset="0.55" stopColor="#0E2C40" />
                  <stop offset="1" stopColor="#071C2C" />
                </linearGradient>
                <linearGradient id="sunpath" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F3D497" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#F3D497" stopOpacity="0" />
                </linearGradient>
              </defs>

              <rect width="1440" height="620" fill="url(#sky)" />

              <g stroke="#E4C68C" strokeWidth="0.6" opacity="0.10">
                <line x1="0" y1="120" x2="1440" y2="120" />
                <line x1="0" y1="240" x2="1440" y2="240" />
                <line x1="0" y1="360" x2="1440" y2="360" />
                <line x1="0" y1="480" x2="1440" y2="480" />
                <line x1="180" y1="0" x2="180" y2="620" />
                <line x1="480" y1="0" x2="480" y2="620" />
                <line x1="780" y1="0" x2="780" y2="620" />
                <line x1="1080" y1="0" x2="1080" y2="620" />
                <line x1="1320" y1="0" x2="1320" y2="620" />
              </g>

              <g stroke="#E4C68C" strokeWidth="0.5" opacity="0.09">
                <line x1="1180" y1="300" x2="200" y2="80" />
                <line x1="1180" y1="300" x2="200" y2="520" />
                <line x1="1180" y1="300" x2="1440" y2="60" />
                <line x1="1180" y1="300" x2="1440" y2="560" />
                <line x1="1180" y1="300" x2="400" y2="620" />
              </g>

              <circle cx="720" cy="560" r="300" fill="url(#sun)" />
              <circle cx="720" cy="558" r="70" fill="#FCEFD2" opacity="0.9" />

              <g fill="#F4E8D2">
                <rect x="0" y="470" width="1440" height="26" opacity="0.10" />
                <rect x="0" y="510" width="1440" height="40" opacity="0.14" />
                <rect x="0" y="560" width="1440" height="60" opacity="0.10" />
              </g>

              <g fill="#0A2233" opacity="0.9">
                <path d="M0 560 Q120 520 260 545 T520 555 L520 620 L0 620 Z" />
              </g>
              <g fill="#081E2E">
                <path d="M150 560 L142 470 L162 470 L154 560 Z" />
                <rect x="140" y="452" width="24" height="20" rx="3" />
                <path d="M138 452 L166 452 L152 436 Z" />
              </g>
              <path
                d="M158 460 L360 430 L360 452 L158 468 Z"
                fill="#F3D497"
                opacity="0.28"
              />

              <g
                stroke="#0A2233"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                opacity="0.75"
              >
                <path d="M420 150 q12 -12 24 0 q12 -12 24 0" />
                <path d="M520 120 q9 -9 18 0 q9 -9 18 0" />
                <path d="M980 180 q11 -11 22 0 q11 -11 22 0" />
                <path d="M1080 140 q8 -8 16 0 q8 -8 16 0" />
                <path d="M330 230 q7 -7 14 0 q7 -7 14 0" />
              </g>

              <rect y="620" width="1440" height="280" fill="url(#sea)" />

              <path
                d="M660 620 L780 620 L840 900 L600 900 Z"
                fill="url(#sunpath)"
              />

              <g
                stroke="#E4C68C"
                opacity="0.16"
                strokeWidth="1.4"
                strokeLinecap="round"
              >
                <line x1="640" y1="660" x2="800" y2="660" />
                <line x1="600" y1="700" x2="840" y2="700" />
                <line x1="560" y1="750" x2="880" y2="750" />
                <line x1="520" y1="810" x2="920" y2="810" />
              </g>
              <g stroke="#0A2233" opacity="0.4" strokeWidth="1.2">
                <line x1="0" y1="690" x2="520" y2="690" />
                <line x1="900" y1="690" x2="1440" y2="690" />
                <line x1="0" y1="760" x2="480" y2="760" />
                <line x1="960" y1="760" x2="1440" y2="760" />
              </g>

              <g fill="#061826" transform="translate(700 360) scale(1.15)">
                <path d="M-150 250 C-140 300 -90 320 0 320 C90 320 150 300 168 250 L150 250 C150 250 120 240 90 244 L-120 244 C-140 244 -150 250 -150 250 Z" />
                <path d="M-120 244 L-130 216 L150 216 L140 244 Z" />

                <path d="M120 216 L120 176 L172 186 L162 244 L140 244 Z" />

                <path d="M-130 224 L-210 196 L-206 204 L-128 232 Z" />

                <rect x="-66" y="30" width="7" height="192" />
                <rect x="-4" y="4" width="8" height="248" />
                <rect x="70" y="46" width="7" height="176" />

                <path
                  d="M-118 70 C-96 58 -30 58 -6 70 C-30 92 -96 92 -118 70 Z"
                  opacity="0.96"
                />
                <path
                  d="M-110 120 C-90 110 -34 110 -14 120 C-34 140 -90 140 -110 120 Z"
                  opacity="0.96"
                />

                <path d="M-62 44 C-34 30 44 30 70 44 C44 70 -34 70 -62 44 Z" />
                <path d="M-56 104 C-30 92 42 92 66 104 C42 128 -30 128 -56 104 Z" />
                <path d="M-48 160 C-26 150 36 150 58 160 C36 180 -26 180 -48 160 Z" />

                <path
                  d="M52 88 C68 78 118 78 134 88 C118 108 68 108 52 88 Z"
                  opacity="0.95"
                />

                <path d="M0 4 L0 -26 L44 -18 L0 -12 Z" />
                <rect x="-2" y="-30" width="4" height="34" />
                <path d="M-62 30 L-62 8 L-30 16 L-62 22 Z" opacity="0.9" />
              </g>

              <g
                fill="#0A2233"
                opacity="0.7"
                transform="translate(1080 640) scale(0.5)"
              >
                <path d="M-60 40 C-50 60 50 60 60 40 L-60 40 Z" />
                <rect x="-2" y="-70" width="5" height="110" />
                <path d="M2 -60 L46 -20 L2 -20 Z" />
              </g>
            </svg>
          </div>
          <div className="hero__overlay"></div>

          <div className="wrap">
            <span className="eyebrow hero__eyebrow reveal">
              Πολιτιστική Ναυτική Εκδήλωση · Λέσβος
            </span>
            <h1 className="hero__title reveal d1">
              <span>Στα Ίχνη του</span>
              <span className="accent">Μπαρμπαρόσα</span>
            </h1>
            <p className="hero__sub reveal d2">Πειρατική Ρεγκάτα Γέρας</p>
            <div className="hero__meta reveal d2">
              <span>Κυριακή 19 Ιουλίου 2026</span>
              <span className="dot"></span>
              <span>Ευρειακή — Κόλπος Γέρας</span>
            </div>
            <div className="hero__cta reveal d3">
              <a href="#about" className="btn btn--gold">
                Ανακαλύψτε την Εκδήλωση
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#location" className="btn btn--ghost">
                Δείτε την Τοποθεσία
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
              </a>
            </div>
          </div>

          <div className="scroll-cue">
            <span>Πλεύση</span>
            <span className="m"></span>
          </div>
        </header>

        <div className="infocards">
          <div className="wrap">
            <div className="infocards__grid">
              <div className="icard reveal">
                <div className="icard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <div>
                  <b>Ελεύθερη Είσοδος</b>
                  <span>Χωρίς εισιτήριο</span>
                </div>
              </div>
              <div className="icard reveal d1">
                <div className="icard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div>
                  <b>Ώρα Έναρξης 20:00</b>
                  <span>Προσέλευση κοινού</span>
                </div>
              </div>
              <div className="icard reveal d2">
                <div className="icard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </div>
                <div>
                  <b>Ευρειακή, Γέρα</b>
                  <span>Λέσβος, Β. Αιγαίο</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="about" id="about">
          <div className="wrap">
            <div className="about__top">
              <div>
                <span className="eyebrow reveal">Η Εκδήλωση</span>
                <h2 className="about__head reveal d1">
                  Ένα ταξίδι στα ίχνη <em>ενός θρύλου</em> της Μεσογείου.
                </h2>
              </div>
              <div className="about__desc reveal d2">
                <p>
                  Για μια νύχτα, ο Κόλπος της Γέρας ξαναγίνεται σκηνικό ναυτικής
                  μνήμης.
                </p>
                <p>
                  Μια ζωντανή αναπαράσταση τιμά τον Χαϊρεντίν Μπαρμπαρόσα — τον
                  ναυμάχο που γεννήθηκε στη Λέσβο και έγραψε ιστορία στη
                  Μεσόγειο. Ρεγκάτα ιστιοφόρων, θαλάσσια δρώμενα, παραδοσιακή
                  μουσική και γεύσεις της Γέρας συνθέτουν μια βραδιά αφιερωμένη
                  στη θάλασσα και τους ανθρώπους της.
                </p>
              </div>
            </div>

            <div className="about__cards">
              <div className="fcard reveal">
                <div className="fcard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 3v18M12 21a8 8 0 0 0 8-8M12 21a8 8 0 0 1-8-8M4 13H2M22 13h-2M8 8H5M16 8h3" />
                    <circle cx="12" cy="4" r="1.6" />
                  </svg>
                </div>
                <span className="num">Νο. 01</span>
                <h3>Ναυτικά Δρώμενα</h3>
                <p>Αναπαράσταση και ρεγκάτα ιστιοφόρων στα νερά του κόλπου.</p>
              </div>
              <div className="fcard reveal d1">
                <div className="fcard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
                    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
                  </svg>
                </div>
                <span className="num">Νο. 02</span>
                <h3>Ιστορία</h3>
                <p>
                  Αφήγηση της ναυτικής κληρονομιάς της Λέσβου και του Αιγαίου.
                </p>
              </div>
              <div className="fcard reveal d2">
                <div className="fcard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 18V5l10-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="16" cy="16" r="3" />
                  </svg>
                </div>
                <span className="num">Νο. 03</span>
                <h3>Μουσική</h3>
                <p>Παραδοσιακοί ήχοι του Αιγαίου κάτω από το φως των πυρσών.</p>
              </div>
              <div className="fcard reveal d3">
                <div className="fcard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18M18 3c-1.5 1-2 3-2 5s.5 3 2 4v9" />
                  </svg>
                </div>
                <span className="num">Νο. 04</span>
                <h3>Γαστρονομία</h3>
                <p>Γεύσεις της Γέρας από τοπικούς παραγωγούς και ψαράδες.</p>
              </div>
            </div>

            <div className="course reveal" style={{ marginTop: "80px" }}>
              <span className="line"></span>
              <svg
                className="rose"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"
                  fill="currentColor"
                  opacity=".5"
                />
              </svg>
              <span className="line"></span>
            </div>
          </div>
        </section>

        <section className="history" id="history">
          <div className="history__chart">
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g stroke="#D2A45A" strokeWidth="0.6" opacity="0.12">
                <circle cx="1140" cy="230" r="120" fill="none" />
                <circle cx="1140" cy="230" r="180" fill="none" />
                <circle cx="1140" cy="230" r="60" fill="none" />
                <path d="M1140 30 L1140 430M940 230 L1340 230M1000 90 L1280 370M1280 90 L1000 370" />
                <path
                  d="M1140 60 L1156 214 L1140 200 L1124 214 Z"
                  fill="#D2A45A"
                />
              </g>
              <g stroke="#D2A45A" strokeWidth="0.5" opacity="0.08">
                <line x1="0" y1="150" x2="1440" y2="150" />
                <line x1="0" y1="360" x2="1440" y2="360" />
                <line x1="0" y1="560" x2="1440" y2="560" />
                <line x1="0" y1="740" x2="1440" y2="740" />
                <line x1="240" y1="0" x2="240" y2="900" />
                <line x1="560" y1="0" x2="560" y2="900" />
                <line x1="880" y1="0" x2="880" y2="900" />
              </g>

              <g
                fill="#0E2C40"
                opacity="0.55"
                transform="translate(300 640) scale(0.9)"
              >
                <path d="M-120 40 C-110 66 110 66 120 40 L100 40 L-100 40 Z" />
                <rect x="-2" y="-120" width="5" height="160" />
                <path d="M2 -110 C40 -96 40 -60 2 -46 Z" />
                <path d="M-2 -80 C-40 -66 -40 -30 -2 -16 Z" />
              </g>

              <path
                d="M120 780 Q500 660 780 720 T1320 560"
                fill="none"
                stroke="#D2A45A"
                strokeWidth="1.4"
                strokeDasharray="2 10"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </div>
          <div className="wrap">
            <div className="history__grid">
              <div className="history__story reveal">
                <span className="eyebrow">Η Ιστορία</span>
                <h2>Ο Κόλπος της Γέρας</h2>
                <p className="drop">
                  Σχεδόν κλειστός από τη στεριά, ο Κόλπος της Γέρας υπήρξε επί
                  χιλιετίες φυσικό λιμάνι και ασφαλές καταφύγιο για τα πλοία του
                  Αιγαίου. Τα ήρεμα νερά του κράτησαν ζωντανή μια σπάνια ναυτική
                  παράδοση.
                </p>
                <p>
                  Στα τέλη του 15ου αιώνα, στη Λέσβο γεννήθηκε ο Χαϊρεντίν
                  Μπαρμπαρόσα — ο άνθρωπος που θα γινόταν ο πιο φημισμένος
                  ναύαρχος της Μεσογείου. Η εκδήλωση ακολουθεί τα ίχνη του, από
                  τον μύθο στην ιστορία.
                </p>
                <blockquote className="history__quote">
                  «Η θάλασσα θυμάται όσους την τόλμησαν.»
                </blockquote>
              </div>

              <div className="tl">
                <div className="tl__item reveal d1">
                  <div className="tl__dot">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 21h16M6 21V9l6-4 6 4v12M9 21v-6h6v6" />
                    </svg>
                  </div>
                  <span className="tl__era">Αρχαιότητα</span>
                  <h4>Φυσικό Λιμάνι</h4>
                  <p>Ασφαλές καταφύγιο και σταυροδρόμι πλοίων στο Αιγαίο.</p>
                </div>
                <div className="tl__item reveal d2">
                  <div className="tl__dot">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 3v18M4 12h16M6 8l12 8M18 8L6 16" />
                    </svg>
                  </div>
                  <span className="tl__era">16ος Αιώνας</span>
                  <h4>Η Εποχή του Μπαρμπαρόσα</h4>
                  <p>
                    Ο Χαϊρεντίν, γεννημένος στη Λέσβο, κυριαρχεί στη Μεσόγειο.
                  </p>
                </div>
                <div className="tl__item reveal d3">
                  <div className="tl__dot">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <span className="tl__era">Σήμερα</span>
                  <h4>Μια Ζωντανή Γιορτή</h4>
                  <p>
                    Η σύγχρονη ρεγκάτα αναβιώνει τη ναυτική μνήμη της Γέρας.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="show" id="show">
          <div className="show__grid">
            <div className="show__text">
              <div className="inner">
                <span className="eyebrow reveal">Το Θέαμα</span>
                <h2 className="reveal d1">
                  Όταν πέφτει η <em>νύχτα</em> στον κόλπο
                </h2>
                <p className="reveal d2">
                  Καθώς σκοτεινιάζει, ο κόλπος φλέγεται. Πυρσοί καθρεφτίζονται
                  στα νερά, μαύρα πανιά υψώνονται στον ορίζοντα και μια
                  κινηματογραφική ναυτική αναπαράσταση ξετυλίγεται μπροστά στα
                  μάτια σας.
                </p>
                <div className="show__tags reveal d2">
                  <span>Μαύρα Πανιά</span>
                  <span>Πυρσοί</span>
                  <span>Αναπαράσταση</span>
                  <span>Πυροτεχνήματα</span>
                </div>
                <a href="#schedule" className="btn btn--gold reveal d3">
                  Δείτε τι θα συμβεί
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="show__scene">
              <svg
                viewBox="0 0 900 800"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#04121E" />
                    <stop offset="0.5" stopColor="#0A2436" />
                    <stop offset="1" stopColor="#0C2A3E" />
                  </linearGradient>
                  <radialGradient id="moon" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#E4C68C" />
                    <stop offset="0.4" stopColor="#B89055" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#0A2436" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="nsea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0A2436" />
                    <stop offset="1" stopColor="#05121D" />
                  </linearGradient>
                  <radialGradient id="torch" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#FFD27A" />
                    <stop offset="0.5" stopColor="#E88A3C" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#E88A3C" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="900" height="800" fill="url(#night)" />

                <circle cx="640" cy="180" r="220" fill="url(#moon)" />
                <circle
                  cx="640"
                  cy="180"
                  r="60"
                  fill="#EBD4A0"
                  opacity="0.85"
                />

                <g strokeLinecap="round" opacity="0.9">
                  <g stroke="#D2A45A" strokeWidth="1.4">
                    <g transform="translate(250 160)">
                      <line x1="0" y1="0" x2="0" y2="-46" />
                      <line x1="0" y1="0" x2="32" y2="-32" />
                      <line x1="0" y1="0" x2="46" y2="0" />
                      <line x1="0" y1="0" x2="32" y2="32" />
                      <line x1="0" y1="0" x2="0" y2="46" />
                      <line x1="0" y1="0" x2="-32" y2="32" />
                      <line x1="0" y1="0" x2="-46" y2="0" />
                      <line x1="0" y1="0" x2="-32" y2="-32" />
                    </g>
                  </g>
                  <g stroke="#E4C68C" strokeWidth="1">
                    <g transform="translate(760 120) scale(0.7)">
                      <line x1="0" y1="0" x2="0" y2="-46" />
                      <line x1="0" y1="0" x2="32" y2="-32" />
                      <line x1="0" y1="0" x2="46" y2="0" />
                      <line x1="0" y1="0" x2="32" y2="32" />
                      <line x1="0" y1="0" x2="0" y2="46" />
                      <line x1="0" y1="0" x2="-32" y2="32" />
                      <line x1="0" y1="0" x2="-46" y2="0" />
                      <line x1="0" y1="0" x2="-32" y2="-32" />
                    </g>
                  </g>
                  <g stroke="#C98F52" strokeWidth="0.9">
                    <g transform="translate(430 90) scale(0.55)">
                      <line x1="0" y1="0" x2="0" y2="-46" />
                      <line x1="0" y1="0" x2="32" y2="-32" />
                      <line x1="0" y1="0" x2="46" y2="0" />
                      <line x1="0" y1="0" x2="32" y2="32" />
                      <line x1="0" y1="0" x2="0" y2="46" />
                      <line x1="0" y1="0" x2="-32" y2="32" />
                      <line x1="0" y1="0" x2="-46" y2="0" />
                      <line x1="0" y1="0" x2="-32" y2="-32" />
                    </g>
                  </g>
                </g>
                <g fill="#E4C68C" opacity="0.8">
                  <circle cx="250" cy="112" r="1.6" />
                  <circle cx="288" cy="150" r="1.4" />
                  <circle cx="212" cy="188" r="1.4" />
                  <circle cx="770" cy="150" r="1.2" />
                </g>

                <rect y="520" width="900" height="280" fill="url(#nsea)" />
                <path
                  d="M400 520 L520 520 L580 800 L340 800 Z"
                  fill="#E4C68C"
                  opacity="0.10"
                />

                <g fill="#020C15" transform="translate(460 430) scale(1.05)">
                  <path d="M-150 130 C-140 176 -80 194 0 194 C80 194 140 176 152 130 L130 130 L-130 130 Z" />
                  <path d="M-130 130 L-138 104 L138 104 L128 130 Z" />
                  <path d="M108 104 L108 70 L156 80 L146 130 L128 130 Z" />
                  <path d="M-138 112 L-206 88 L-202 96 L-136 118 Z" />
                  <rect x="-62" y="-70" width="6" height="180" />
                  <rect x="-2" y="-96" width="7" height="206" />
                  <rect x="64" y="-54" width="6" height="164" />
                  <path d="M-58 -60 C-32 -74 40 -74 66 -60 C40 -36 -32 -36 -58 -60 Z" />
                  <path d="M-54 0 C-30 -12 38 -12 62 0 C38 22 -30 22 -54 0 Z" />
                  <path d="M-46 56 C-24 46 34 46 56 56 C34 76 -24 76 -46 56 Z" />
                  <path d="M-112 -34 C-92 -46 -34 -46 -14 -34 C-34 -14 -92 -14 -112 -34 Z" />
                  <path d="M-104 24 C-86 14 -32 14 -14 24 C-32 42 -86 42 -104 24 Z" />
                  <path d="M50 -20 C66 -30 114 -30 130 -20 C114 -2 66 -2 50 -20 Z" />

                  <rect x="-4" y="-100" width="4" height="30" />
                  <path d="M-2 -96 L38 -88 L-2 -80 Z" />
                </g>

                <g>
                  <circle cx="180" cy="560" r="40" fill="url(#torch)" />
                  <circle cx="180" cy="556" r="4" fill="#FFE1A0" />
                  <circle cx="720" cy="600" r="46" fill="url(#torch)" />
                  <circle cx="720" cy="596" r="4" fill="#FFE1A0" />
                  <circle cx="320" cy="640" r="34" fill="url(#torch)" />
                  <circle cx="320" cy="636" r="3" fill="#FFE1A0" />
                  <circle cx="600" cy="680" r="38" fill="url(#torch)" />
                  <circle cx="600" cy="676" r="3.5" fill="#FFE1A0" />
                </g>

                <g opacity="0.4">
                  <rect
                    x="176"
                    y="560"
                    width="8"
                    height="120"
                    fill="url(#torch)"
                  />
                  <rect
                    x="716"
                    y="600"
                    width="8"
                    height="120"
                    fill="url(#torch)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </section>

        <section className="sched" id="schedule">
          <div className="wrap">
            <div className="sched__head reveal">
              <span className="eyebrow eyebrow--center">Το Πρόγραμμα</span>
              <h2>Η βραδιά, ώρα με την ώρα</h2>
            </div>
            <div className="sched__rail">
              <div className="sched__track">
                <div className="stop reveal">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" />
                    </svg>
                  </div>
                  <div className="stop__time">20:00</div>
                  <div className="stop__label">Προσέλευση</div>
                  <p className="stop__desc">Άνοιγμα του χώρου στην Ευρειακή</p>
                </div>
                <div className="stop reveal d1">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 3v16M12 5c5 1 8 4 8 4M12 5c-5 1-8 4-8 4M4 19h16" />
                    </svg>
                  </div>
                  <div className="stop__time">20:30</div>
                  <div className="stop__label">Απόπλους</div>
                  <p className="stop__desc">Εκκίνηση της πειρατικής ρεγκάτας</p>
                </div>
                <div className="stop reveal d2">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M5 14V6l7 3 7-3v8" />
                    </svg>
                  </div>
                  <div className="stop__time">21:00</div>
                  <div className="stop__label">Δρώμενα</div>
                  <p className="stop__desc">
                    Ναυτικές αναπαραστάσεις στον κόλπο
                  </p>
                </div>
                <div className="stop reveal d3">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 18V5l10-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="16" cy="16" r="3" />
                    </svg>
                  </div>
                  <div className="stop__time">21:30</div>
                  <div className="stop__label">Μουσική</div>
                  <p className="stop__desc">Παραδοσιακό γλέντι στην ακτή</p>
                </div>
                <div className="stop reveal d4">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M4 20l6-16 4 9 3-5 3 12z" />
                    </svg>
                  </div>
                  <div className="stop__time">22:15</div>
                  <div className="stop__label">Θέαμα</div>
                  <p className="stop__desc">Το μεγάλο πειρατικό θέαμα</p>
                </div>
                <div className="stop reveal d4">
                  <div className="stop__node">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 3v6M12 3l3 3M12 3L9 6M5 12l4 2M19 12l-4 2M12 21v-4M7 19l2-3M17 19l-2-3" />
                    </svg>
                  </div>
                  <div className="stop__time">22:30</div>
                  <div className="stop__label">Φινάλε</div>
                  <p className="stop__desc">Πυροτεχνήματα πάνω από τη Γέρα</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="celebrate">
          <div className="wrap">
            <div className="celebrate__head">
              <div className="reveal">
                <span className="eyebrow">Η Γιορτή</span>
                <h2>
                  Μετά το θέαμα, <em>το γλέντι</em>
                </h2>
              </div>
              <p className="reveal d1">
                Η βραδιά συνεχίζεται στην ακτή, με τη φιλοξενία και τους ρυθμούς
                της λεσβιακής γης.
              </p>
            </div>
            <div className="celebrate__grid">
              <article className="ccard reveal">
                <div className="ccard__scene">
                  <svg
                    viewBox="0 0 400 440"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="c1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#153347" />
                        <stop offset="1" stopColor="#0A2233" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="440" fill="url(#c1)" />
                    <g
                      stroke="#D2A45A"
                      opacity="0.5"
                      fill="none"
                      strokeWidth="2"
                    >
                      <path d="M120 300V150l150-30v150" />
                      <circle cx="105" cy="300" r="26" />
                      <circle cx="255" cy="270" r="26" />
                    </g>
                    <g stroke="#D2A45A" opacity="0.14" strokeWidth="1">
                      <path d="M0 120h400M0 220h400M0 320h400" />
                    </g>
                    <g fill="#D2A45A" opacity="0.3">
                      <circle cx="60" cy="80" r="3" />
                      <circle cx="330" cy="140" r="2.5" />
                      <circle cx="300" cy="60" r="2" />
                    </g>
                  </svg>
                </div>
                <div className="ccard__grad"></div>
                <div className="ccard__body">
                  <div className="ccard__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M9 18V5l10-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="16" cy="16" r="3" />
                    </svg>
                  </div>
                  <h3>Μουσική</h3>
                  <p>Λαϊκοί και παραδοσιακοί ήχοι που κρατούν ως το πρωί.</p>
                </div>
              </article>

              <article className="ccard reveal d1">
                <div className="ccard__scene">
                  <svg
                    viewBox="0 0 400 440"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="c2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#5A3230" />
                        <stop offset="1" stopColor="#0A2233" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="440" fill="url(#c2)" />
                    <g
                      stroke="#E4C68C"
                      opacity="0.5"
                      fill="none"
                      strokeWidth="2"
                    >
                      <circle cx="200" cy="210" r="70" />
                      <path d="M200 140v-30M170 150l-14-26M230 150l14-26" />
                      <path d="M150 250c30 26 70 26 100 0" />
                    </g>
                    <g stroke="#D2A45A" opacity="0.14" strokeWidth="1">
                      <path d="M0 120h400M0 320h400" />
                    </g>
                  </svg>
                </div>
                <div className="ccard__grad"></div>
                <div className="ccard__body">
                  <div className="ccard__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18M18 3c-1.5 1-2 3-2 5s.5 3 2 4v9" />
                    </svg>
                  </div>
                  <h3>Τοπική Κουζίνα</h3>
                  <p>Ούζο, φρέσκα θαλασσινά και μεζέδες της Γέρας.</p>
                </div>
              </article>

              <article className="ccard reveal d2">
                <div className="ccard__scene">
                  <svg
                    viewBox="0 0 400 440"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="c3" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#13403F" />
                        <stop offset="1" stopColor="#0A2233" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="440" fill="url(#c3)" />
                    <g
                      stroke="#D2A45A"
                      opacity="0.5"
                      fill="none"
                      strokeWidth="2"
                    >
                      <circle cx="200" cy="200" r="80" />
                      <path d="M200 120v160M120 200h160M143 143l114 114M257 143L143 257" />
                      <circle
                        cx="200"
                        cy="200"
                        r="10"
                        fill="#D2A45A"
                        opacity="0.6"
                      />
                    </g>
                    <g stroke="#D2A45A" opacity="0.14" strokeWidth="1">
                      <path d="M0 120h400M0 320h400" />
                    </g>
                  </svg>
                </div>
                <div className="ccard__grad"></div>
                <div className="ccard__body">
                  <div className="ccard__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 3l2.5 5 5.5.8-4 4 1 5.5L12 21l-5-2.7 1-5.5-4-4 5.5-.8z" />
                    </svg>
                  </div>
                  <h3>Παραδόσεις</h3>
                  <p>Χοροί και έθιμα της λεσβιακής γης, από γενιά σε γενιά.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="location" id="location">
          <div className="wrap">
            <div className="location__grid">
              <div className="map reveal">
                <svg
                  viewBox="0 0 640 480"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="mapg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#EFE3CA" />
                      <stop offset="1" stopColor="#E4D3B0" />
                    </linearGradient>
                  </defs>
                  <rect width="640" height="480" fill="url(#mapg)" />

                  <path
                    d="M240 180 C300 150 380 160 420 210 C460 260 440 340 380 370 C320 400 250 380 230 320 C210 260 200 210 240 180 Z"
                    fill="#B8D0D4"
                    opacity="0.85"
                  />
                  <path
                    d="M420 210 C470 200 540 220 620 200 L640 240 C560 260 480 250 430 250 Z"
                    fill="#B8D0D4"
                    opacity="0.85"
                  />

                  <g stroke="#C9A96B" fill="none" strokeWidth="1" opacity="0.4">
                    <path d="M60 120 C160 80 260 100 300 160" />
                    <path d="M40 200 C140 170 220 190 250 250" />
                    <path d="M480 340 C520 300 580 320 620 300" />
                  </g>

                  <g
                    stroke="#D2A45A"
                    strokeWidth="2.4"
                    opacity="0.55"
                    fill="none"
                    strokeLinecap="round"
                  >
                    <path d="M100 420 C200 380 260 330 330 300" />
                    <path d="M330 300 C420 280 500 300 600 260" />
                    <path d="M330 300 L360 140" />
                  </g>
                  <g
                    stroke="#C9A96B"
                    strokeWidth="1"
                    opacity="0.35"
                    fill="none"
                  >
                    <path d="M180 440 L230 320" />
                    <path d="M420 440 L400 360" />
                  </g>

                  <g
                    stroke="#5A4632"
                    strokeWidth="0.5"
                    opacity="0.15"
                    strokeDasharray="3 5"
                  >
                    <line x1="0" y1="160" x2="640" y2="160" />
                    <line x1="0" y1="320" x2="640" y2="320" />
                    <line x1="213" y1="0" x2="213" y2="480" />
                    <line x1="426" y1="0" x2="426" y2="480" />
                  </g>

                  <text
                    x="310"
                    y="290"
                    fontFamily="Cormorant Garamond, serif"
                    fontStyle="italic"
                    fontSize="22"
                    fill="#3d5361"
                    opacity="0.7"
                    textAnchor="middle"
                  >
                    Κόλπος Γέρας
                  </text>

                  <g
                    transform="translate(575 420)"
                    stroke="#8A2B2B"
                    fill="none"
                    strokeWidth="1.4"
                    opacity="0.7"
                  >
                    <circle cx="0" cy="0" r="20" />
                    <path d="M0 -26 L4 0 L0 26 L-4 0 Z" fill="#8A2B2B" />
                    <path
                      d="M-26 0 L0 -4 L26 0 L0 4 Z"
                      fill="#8A2B2B"
                      opacity="0.5"
                    />
                  </g>
                </svg>
                <div className="map__pin">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Z" />
                    <circle cx="12" cy="9" r="2.6" fill="#F4E8D2" />
                  </svg>
                </div>
                <div className="map__badge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>{" "}
                  Ευρειακή, Κόλπος Γέρας
                </div>
              </div>

              <div className="location__info reveal d1">
                <span className="eyebrow">Η Τοποθεσία</span>
                <h2>Ευρειακή, Κόλπος Γέρας</h2>
                <div className="rows">
                  <div className="lrow">
                    <div className="lrow__ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </div>
                    <div>
                      <b>Ημερομηνία</b>
                      <span>Κυριακή, 19 Ιουλίου 2026</span>
                    </div>
                  </div>
                  <div className="lrow">
                    <div className="lrow__ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </div>
                    <div>
                      <b>Ώρα</b>
                      <span>Έναρξη 20:00 · Φινάλε 22:30</span>
                    </div>
                  </div>
                  <div className="lrow">
                    <div className="lrow__ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" />
                        <circle cx="12" cy="10" r="2.4" />
                      </svg>
                    </div>
                    <div>
                      <b>Σημείο</b>
                      <span>Παραλία Ευρειακής, Γέρα · Λέσβος</span>
                    </div>
                  </div>
                </div>
                <a href="#top" className="btn btn--navy">
                  Άνοιγμα στο Google Maps
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="org">
          <div className="wrap">
            <span className="eyebrow eyebrow--center reveal">Διοργάνωση</span>
            <h2 className="reveal d1">Με την υποστήριξη</h2>
            <div className="org__grid">
              <div className="olog reveal">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                </svg>
                <span>Δήμος Μυτιλήνης</span>
              </div>
              <div className="olog reveal d1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
                </svg>
                <span>Περιφέρεια Β. Αιγαίου</span>
              </div>
              <div className="olog reveal d2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M12 3v18M12 21a7 7 0 0 0 7-7M12 21a7 7 0 0 1-7-7" />
                  <circle cx="12" cy="4" r="1.6" />
                </svg>
                <span>Ναυτικός Όμιλος Γέρας</span>
              </div>
              <div className="olog reveal d3">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M4 20l6-16 4 9 3-5 3 12z" />
                </svg>
                <span>Σύλλογος Ευρειακής</span>
              </div>
              <div className="olog reveal d4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M12 2l2.5 5 5.5.8-4 4 1 5.5L12 21l-5-2.7 1-5.5-4-4 5.5-.8z" />
                </svg>
                <span>Ε.Ο.Τ.</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer" id="contact">
          <div className="footer__wave">
            <svg
              viewBox="0 0 1440 40"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 20 Q60 4 120 20 T240 20 T360 20 T480 20 T600 20 T720 20 T840 20 T960 20 T1080 20 T1200 20 T1320 20 T1440 20"
                fill="none"
                stroke="#D2A45A"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="wrap">
            <div className="footer__top">
              <div className="footer__brand">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v13M12 20a7 7 0 0 0 7-7M12 20a7 7 0 0 1-7-7M5 13H3l1.5-2M19 13h2l-1.5-2" />
                </svg>
                <b>Στα Ίχνη του Μπαρμπαρόσα</b>
                <p>
                  Πειρατική Ρεγκάτα Γέρας — μια πολιτιστική βραδιά αφιερωμένη
                  στη ναυτική κληρονομιά του Αιγαίου.
                </p>
              </div>
              <div className="fcol">
                <h5>Πλοήγηση</h5>
                <a href="#about">Εκδήλωση</a>
                <a href="#history">Ιστορία</a>
                <a href="#schedule">Πρόγραμμα</a>
                <a href="#show">Πειρατικό Θέαμα</a>
              </div>
              <div className="fcol">
                <h5>Επικοινωνία</h5>
                <p>Ευρειακή, Κόλπος Γέρας</p>
                <p>Λέσβος 81106</p>
                <a href="mailto:info@regatagera.gr">info@regatagera.gr</a>
                <a href="tel:+302251000000">+30 22510 00000</a>
              </div>
            </div>
            <div className="footer__bottom">
              <p>© Created by Stavros Vetsikas</p>
              <p>Ευρειακή · Κόλπος Γέρας · Λέσβος</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
