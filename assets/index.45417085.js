var le=Object.defineProperty,ie=Object.defineProperties;var ce=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var A=(e,t,n)=>t in e?le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,f=(e,t)=>{for(var n in t||(t={}))P.call(t,n)&&A(e,n,t[n]);if(N)for(var n of N(t))z.call(t,n)&&A(e,n,t[n]);return e},b=(e,t)=>ie(e,ce(t));var E=(e,t)=>{var n={};for(var s in e)P.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&N)for(var s of N(e))t.indexOf(s)<0&&z.call(e,s)&&(n[s]=e[s]);return n};import{r as u,c as ue,R as o,G as j,u as de,a as me,b as S,d as I,s as pe,e as fe,P as ge,S as be,A as he,f as Ee,g as c,I as ye,h as H,i as xe,M as Se,j as ve,k as U,l as we,m as ke,n as Ce,o as y,p as G,q as W,t as B,v as Me,w as v,T as Ne,x as Te,y as Fe,z as Ie,B as Be,C as Oe,D as Re,E as Le,F as $e,H as Pe,J as ze,K as _,L as Ae,N as je,O as He}from"./vendor.fa408fe4.js";const Ue=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}};Ue();const Ge="https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/1.16.4/blocks/dirt.png",We=(e,t)=>{for(const n of t)delete e[n]},_e=()=>{const e=de();return u.exports.useMemo(()=>{const t=ue(e);return We(t["input, textarea, select"],["&:hover, &:focus"]),t["html, body"].fontSize="unset",t["html, body"].userSelect="none",t},[e])},De=()=>{const e=_e();return o.createElement(j,{styles:e})},Ke={"html, body":{fontFamily:'"Titillium Web", sans-serif'},"pre, code":{fontFamily:'"Source Code Pro", monospace'},"body button":{cursor:"default"}},qe=()=>o.createElement(o.Fragment,null,o.createElement(j,{styles:Ke}),o.createElement(De,null)),D=navigator.userAgent.includes("Mac OS X"),Ve=(e,t,n)=>{const s=a=>n==="prev"?a.previousElementSibling:a.nextElementSibling;let r=s(e);for(;r;){if(r.matches(t))return r;r=s(r)}return null},Je=(e,t,n,s=!1)=>{const r=i=>n==="prev"?i.previousElementSibling:i.nextElementSibling;let a=r(e);for(;a;){const i=r(a);if(i===null||!i.matches(t))return a;a=i}return null},K=({focusableElemSelector:e,containerRef:t})=>{u.exports.useEffect(()=>{const n=({code:s,metaKey:r})=>{var m;let a=document.activeElement;if(a===document.body&&(a=null),!a||!t.current.contains(a))return;const i=(m=/Arrow(Up|Down)/.exec(s))==null?void 0:m[1],l=(d,g)=>{const h=(g?Je:Ve)(a,e,d);!h||h.focus()};i&&l(i==="Down"?"next":"prev",D&&r),(s==="Home"||s==="End")&&l(s==="End"?"next":"prev",!0)};return window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n)}},[e])},Ye=()=>{const e=me(),t=S.useToggleState(),n=u.exports.useRef(!0);return u.exports.useEffect(()=>{if(n.current){n.current=!1;return}window.innerWidth<500&&window.innerHeight>window.innerWidth?t.on():t.off()},[e]),t.state},Xe={canvas:5,hud:10,modal:1250},w=String.raw,Qe=w`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`,q=w`
    ${Qe}
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${Xe.modal};
`,V=w`
    padding: 0;
    background: transparent;
    font-family: inherit;
    letter-spacing: 0.5px;
    border: none;
    color: white;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,J=w`
    image-rendering: crisp-edges;
    image-rendering: pixelated;
`,Y=w`
    outline: 2px solid dodgerblue;
`,Ze=()=>({uiCustomization:{forceTouchControls:!1,touchButtonSize:50,touchButtonsGap:0,hotbarSlotsGap:0,maxHotbarSlotSize:45},movement:{x:0,y:0,z:0},hotbar:{selectedSlot:0,slots:[]},isFlying:{current:!1,updatable:!0,enabled:!0},openedUI:null,usingRawInput:null}),p=I(pe(()=>Ze())),et=()=>({hotbar:{replaceSlots(t){p.setState(n=>({hotbar:b(f({},n.hotbar),{slots:t})}))}},registerCameraMoveHandler(t){p.setState({cameraMoveHandler:t})},setIsFlying(t){p.setState(n=>({isFlying:f(f({},n.isFlying),t)}))}}),X=()=>{const{forceTouchControls:e}=p(n=>n.uiCustomization),t=fe("(pointer: coarse)");return u.exports.useMemo(()=>e||t||navigator.userAgent.includes("Mobile"),[e,t])},tt=e=>o.createElement(Ee,b(f({},e),{direction:"down"})),nt=t=>{var e=E(t,[]);var s;const n=((s=p(r=>r.openedUI))==null?void 0:s.type)==="pause";return u.exports.useEffect(()=>{n||e.onClose()},[n]),o.createElement(ge,{container:document.body},o.createElement(be,f({anchorOrigin:{vertical:"top",horizontal:"center"},TransitionComponent:tt,autoHideDuration:3e3},e),o.createElement(he,{severity:"warning"},"Don't use ESC Key here. It doesn't work properly due to browser bugs.")))},ot=({min:e=Z.min,max:t=Z.max,value:n,onChange:s})=>{const r=u.exports.useCallback(a=>{s(a<e?e:a>t?t:a)},[s,e,t]);return o.createElement("div",{className:c`
                display: flex;
                justify-content: center;
                align-items: center;
            `},o.createElement(ye,{disableUnderline:!0,type:"number",inputProps:{inputMode:"numeric",min:e,max:t,tabIndex:-1},className:c`
                    font-size: 0.8em !important;
                    & input {
                        width: 28px;
                        text-align: center;
                    }
                    & input:focus {
                        background: rgba(128, 128, 128, 0.5);
                    }
                    /* Chrome, Safari, Edge, Opera */
                    & input::-webkit-outer-spin-button,
                    & input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    /* Firefox */
                    & input[type='number'] {
                        -moz-appearance: textfield;
                    }
                `,value:n,onFocus:a=>a.target.select(),onChange:a=>r(+a.target.value)}),o.createElement(at,{value:n,onChange:(a,i)=>r(i)}))},O=e=>{e.closest('div[tabindex="0"]').focus()},st=({values:e,value:t,onChange:n,getMenuItemLabel:s})=>{const r=u.exports.useRef(null);u.exports.useLayoutEffect(()=>{const i=r.current.querySelector("div.MuiSelect-root");i.tabIndex=-1},[]);const a=u.exports.useMemo(()=>Object.entries(e).map(([i,l])=>{const m=s?s(i):l===!0?H(i):typeof l=="function"?l():l;return{id:i,label:m}}),[e,s]);return o.createElement(xe,{ref:r,MenuProps:{tabIndex:-1},variant:"outlined",className:c`
                padding-top: 7px !important;
                padding-bottom: 6px !important;
            `,value:t,onChange:i=>{n(i.target.value)},onClose:async()=>{await new Promise(i=>setTimeout(i,0)),O(r.current)}},a.map(({label:i,id:l})=>o.createElement(Se,{key:l,value:l},i)))},rt=({value:e,onChange:t})=>o.createElement(ve,{inputProps:{tabIndex:-1,onFocus:({currentTarget:n})=>O(n)},color:"primary",checked:e,onChange:(n,s)=>t(s)}),Q=4,Z={min:0,max:100,step:1},at=t=>{var e=E(t,[]);const n=u.exports.useRef(null);return u.exports.useEffect(()=>{for(const s of U.all('[tabindex="0"]',n.current))s.tabIndex=-1,s.addEventListener("focus",()=>{O(s)})},[]),o.createElement(we,f({ref:n,classes:{root:c`
                    width: 200px !important;
                    color: deepskyblue !important;
                `,track:c`
                    height: ${Q}px !important;
                `,rail:c`
                    height: ${Q}px !important;
                `,thumb:c`
                    color: white;
                `}},e))},lt=()=>o.createElement("div",{className:c`
            ${q}
            pointer-events: none;
        `},o.createElement(ke,{color:"action",style:{width:"50%",height:"50%"}})),it=({children:e})=>o.createElement(Ce.ArwesThemeProvider,null,e);function ct(e){return u.exports.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 200 200"},e),u.exports.createElement("circle",{cx:100,cy:100,r:80,stroke:"#fff",fill:"none",strokeWidth:10}))}function ut(e){return u.exports.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 960 960"},e),u.exports.createElement("path",{d:"M480 151.8L104 803.1h752z",strokeWidth:10,stroke:"#fff",fill:"rgba(0, 0, 0, 0.5)"}))}const dt=e=>{e.preventDefault();const t=e.target;!t.releasePointerCapture||t.releasePointerCapture(e.pointerId)},mt=e=>{const[t,n]=u.exports.useState(!1),s=u.exports.useCallback((r,a)=>{var g;if(t===r)return;const i=a==null?void 0:a.relatedTarget;if(a&&a.type==="pointerout"&&(i==null?void 0:i.parentElement)===a.currentTarget)return;const{updateTouching:l,startTouching:m,stopTouching:d}=e;n(r),l==null||l(r),(g=r?m:d)==null||g(a)},[t,e]);return u.exports.useEffect(()=>{if(!t)return;const r=()=>document.visibilityState==="hidden"&&s(!1),a=i=>i.touches.length===0&&s(!1);return document.addEventListener("visibilitychange",r),document.documentElement.addEventListener("touchend",a),()=>{document.removeEventListener("visibilitychange",r),document.documentElement.removeEventListener("touchend",a)}},[t,s]),[{onPointerDown:dt,onPointerOver:r=>s(!0,r),onPointerOut:r=>s(!1,r),onPointerCancel:r=>s(!1,r),onContextMenu:r=>r.preventDefault()},t]},pt=c`
    background-color: rgba(255, 255, 255, 0.1);
`,R=({action:e,children:t,DivProps:n,Image:s=null})=>{const[r,a]=mt({updateTouching:typeof e=="function"?e:l=>{const m=typeof e[0]=="string"?[e]:e,d=Object.fromEntries(m.map(([g,h])=>[g,l?h:-h]));p.setState({movement:d})}}),i=s?y(c`
                  opacity: 0.9;
              `,s.className):void 0;return o.createElement("div",f(b(f({"data-name":"MovementButton"},n),{className:y(c`
                    width: 100%;
                    height: 100%;
                    & > * {
                        pointer-events: none;
                        width: 100%;
                        height: 100%;
                    }
                `,{[pt]:a},n==null?void 0:n.className)}),r),s&&s.type==="bundled"?s.src==="arrow"?o.createElement(ut,{className:y(c`
                                background: rgba(128, 128, 128, 0.8);
                            `,i)}):o.createElement(ct,{className:i}):o.createElement("img",b(f({},s),{className:i})),t)},ft=[["wa",-45,[["x",-1],["z",-1]]],["w",0,["z",-1]],["wd",45,[["x",1],["z",-1]]],["d",90,["x",1]],["s",180,["z",1]],["a",270,["x",-1]]],ee=({templateAreas:e,children:t})=>{const n=p(a=>a.uiCustomization.touchButtonSize),s=p(a=>a.uiCustomization.touchButtonsGap),r=u.exports.useMemo(()=>e.map(a=>`"${a}"`).join(""),[e]);return o.createElement("div",{"data-name":"TouchMovementArea",className:c`
                display: grid;
                grid-template-areas: ${r};
                gap: ${s}px;
                grid-auto-columns: ${n}px;
                grid-auto-rows: ${n}px;
            `},t)},gt=()=>{const[e,t]=u.exports.useState(!1);return o.createElement(ee,{templateAreas:["wa w wd","a . d",". s ."]},ft.map(([n,s,r])=>(Math.abs(s)!==45||e)&&o.createElement(R,{key:n,action:r,DivProps:{className:c`
                                    /* border: ${Math.abs(s)!==45?"1px solid rgba(255, 255, 255, 0.2)":""}; */
                                    grid-area: ${n};
                                `},Image:{type:"bundled",src:"arrow",className:c`
                                    transform: rotate(${s}deg);
                                `}})))},bt=[["u",0,["y",1]],["d",180,["y",-1]]],ht=()=>{const e=p(t=>t.isFlying);return o.createElement(ee,{templateAreas:["u .","c .","d ."]},e?bt.map(([t,n,s])=>o.createElement(R,{key:t,action:s,DivProps:{className:c`
                                grid-area: ${t};
                            `},Image:{type:"bundled",src:"arrow",className:c`
                                transform: rotate(${n}deg);
                            `}})):o.createElement(R,{action:["y",1],DivProps:{className:c`
                            grid-area: c;
                            height: 100%;
                        `},Image:{type:"bundled",src:"circle"}}))},te=["front","left","top"],Et={front:"",left:"rotateY(-90deg)",top:"rotateX(90deg)"},yt={front:.5,left:.7,top:1},xt=e=>te.map(t=>[t,e]),St=({sideTextures:e,RootDivProps:t={},RotatbleDivProps:n={},rotateX:s=327,rotateY:r=405})=>{const[a,{width:i}]=G({polyfill:W}),l=u.exports.useRef(null);u.exports.useEffect(()=>{const d=l.current;if(B.set(d,{rotateX:s}),r!=="animate"){B.set(d,{rotateY:r});return}B({targets:d,rotateY:"360deg",duration:6e3,easing:"linear",loop:!0})},[]);const m=u.exports.useMemo(()=>typeof e=="string"?xt(e):Object.entries(e),[e]);return o.createElement("div",b(f({},t),{ref:a,className:y("BlockModel",c`
                    width: 100%;
                    height: 100%;
                    box-sizing: content-box;
                    position: relative;
                `)}),o.createElement("div",b(f({},n),{ref:l,className:c`
                    transform-style: preserve-3d;
                    width: 100%;
                    height: 100%;
                `}),m.map(([d,g])=>d!=="top"&&d!=="front"&&d!=="left"?null:o.createElement("div",{key:d,style:{transform:`${Et[d]} translateZ(${i/2}px)`},className:c`
                                filter: brightness(${yt[d]});
                                position: absolute;
                                width: 100%;
                                height: 100%;
                            `},o.createElement("img",{src:g,alt:"",draggable:"false",className:c`
                                    width: 100%;
                                    height: 100%;
                                    ${J}
                                `})))))},vt=({blocksPadding:e,data:t})=>{const n=u.exports.useMemo(()=>e<=6?10:15,[e]),s=u.exports.useMemo(()=>t?t.type==="item"?t:b(f({},t),{sideTextures:Object.fromEntries(te.map(r=>[r,t.getTexture(r)]))}):null,[t]);return s&&o.createElement("div",{style:{padding:s.type==="block"?e:""},className:c`
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    height: 100%;
                `},s.type==="item"?o.createElement("img",{alt:"Item",src:s.texture,className:c`
                            ${J}
                            width: 100%;
                            height: 100%;
                        `}):o.createElement(St,{sideTextures:s.sideTextures}),o.createElement("span",{className:c`
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: ${n}px;
                        color: white;
                    `},s.count!==1&&s.count.toString()))},wt=c`
    border: 4px solid white !important;
`,kt=({slotIndex:e,style:{blocksPadding:t}})=>{const n=p(a=>a.hotbar.slots),s=p(a=>a.hotbar.selectedSlot),r=u.exports.useMemo(()=>n[e],[n,e]);return o.createElement("div",{className:y("HotbarSlot",c`
                    background-color: rgba(0, 0, 0, 0.5);
                    border: 3px solid rgba(128, 128, 128, 0.8);
                    width: 100%;
                    display: inline-block;
                    position: relative;
                `,{[wt]:e===s})},o.createElement("div",{className:c`
                    margin-top: 100%;
                `}),r&&o.createElement("div",{className:c`
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    `},o.createElement(vt,{data:r,blocksPadding:t})))},Ct=()=>{const[e,{width:t}]=G({polyfill:W}),n=X(),{hotbarSlotsGap:s,maxHotbarSlotSize:r}=p(l=>l.uiCustomization),a=p(l=>l.hotbar.slots),{blocksPadding:i}=u.exports.useMemo(()=>({blocksPadding:t<200?0:t<350?5:8}),[t]);return o.createElement("div",{ref:e,className:c`
                width: 100%;
                max-width: ${r*a.length}px;
                display: grid;
                grid-auto-columns: 1fr;
                grid-auto-flow: column;
                gap: ${s}px;
                pointer-events: ${n?"initial":"none"};
            `},a.map((l,m)=>o.createElement(kt,{key:m,slotIndex:m,style:{blocksPadding:i}})),n&&o.createElement("div",{className:c`
                        background-color: rgba(0, 0, 0, 0.5);
                        border: 3px solid rgba(128, 128, 128, 0.8);
                        width: 100%;
                        display: inline-block;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    `,onTouchStart:()=>{p.setState({openedUI:{type:"inventory"}})}},o.createElement(Me,{color:"action"})))},Mt=()=>{const e=X(),t=p(n=>n.openedUI);return(t==null?void 0:t.type)==="mainMenu"?null:o.createElement("div",{className:c`
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            `},o.createElement("div",null),o.createElement("div",null),o.createElement("div",{className:c`
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-end;
                `},e?o.createElement(gt,null):o.createElement("div",null),o.createElement(Ct,null),e?o.createElement(ht,null):o.createElement("div",null)))},Nt=s=>{var r=s,{keyboardKey:e,label:t}=r,n=E(r,["keyboardKey","label"]);return o.createElement("button",b(f({className:y(c`
                ${V}
                letter-spacing: 1px;
                padding: 3px;
                display: flex;
                align-items: center;
                font-weight: 500;
                font-size: 1rem;
                outline: none;
                border-radius: 2px;
                border: 1px solid transparent;

                &:hover {
                    border: 1px solid rgba(255, 255, 255, 0.4);
                }
                &:active {
                    transform: scale(0.9);
                }
            `,n.className),tabIndex:-1},n),{type:"button"}),o.createElement("div",{className:c`
                text-overflow: clip;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
                font-size: 0.8em;
                text-transform: inherit;
            `},e),o.createElement("div",{className:c`
                padding: 0 10px;
                text-shadow: 0 0 5px black;
            `},t))},Tt=()=>o.createElement(Nt,{style:{position:"absolute",bottom:30,right:35},keyboardKey:"Esc",label:"BACK",onClick:()=>{window.dispatchEvent(new KeyboardEvent("keydown",{code:"Escape"}))}}),T=I(()=>({focusedElemsStack:[]})),Ft=e=>{const[...t]=T.getState().focusedElemsStack;t.push(e),T.setState({focusedElemsStack:t})},It=()=>{var t;const[...e]=T.getState().focusedElemsStack;(t=e.slice(-1)[0])==null||t.focus(),e.splice(-1,1),T.setState({focusedElemsStack:e})},Bt=({children:e,closable:t=!0})=>(v(window,"keydown",({code:n})=>{n!=="Escape"||!t||(p.setState({openedUI:{type:"pause",menu:"root"}}),It())}),o.createElement(o.Fragment,null,o.createElement("div",{className:c`
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                `},e),o.createElement(Tt,null))),Ot=({tabs:e,tabsLabel:t})=>{const n=u.exports.useRef(null),s=u.exports.useRef(null),[r,a]=u.exports.useState(0),i=(m,d)=>a(+d);v(window,"keydown",m=>{if(!m.code.startsWith("Bracket")||s.current.contains(document.activeElement))return;const d=n.current.querySelector(".Mui-selected");if(!d)return;const g=d[m.code.endsWith("Left")?"previousElementSibling":"nextElementSibling"];!g||g.click()});const l=u.exports.useRef(null);return u.exports.useEffect(()=>{l.current.focus()},[]),o.createElement("div",{ref:n,className:c`
                & .MuiTabs-indicator {
                    height: 4px;
                    background-color: aqua;
                }
            `},o.createElement(Ne,{value:r.toString()},o.createElement(Te,{position:"static",style:{backgroundColor:"rgb(35 30 30 / 70%)"}},o.createElement(Fe,{ref:s,selectionFollowsFocus:!0,"aria-label":`${t}panel`,variant:"scrollable",scrollButtons:"auto",onChange:i},e.map(({tabName:m,disabled:d=!1},g)=>o.createElement(Ie,{ref:g===0?l:void 0,key:m,disabled:d,label:m,value:g.toString()})))),e.map(({panelContent:m},d)=>o.createElement(Be,{key:d,value:d.toString(),classes:{root:c`
                                padding: 0 !important;
                            `}},m))))},Rt=({tabName:e,groupName:t,label:n,settingSchema:s})=>{const{controller:r}=useInterfaceContext(),a=r.settingsStore.useSettingsStore(l=>{var m,d;return(d=(m=l[e])==null?void 0:m[t])==null?void 0:d[n]}),i=u.exports.useCallback(l=>{r.settingsStore.useSettingsStore.setState({[e]:{[t]:{[n]:l}}})},[s]);return o.createElement(Lt,{label:n,settingSchema:s,value:a!=null?a:"defaultValue"in s?s.defaultValue:"",onChange:i})},Lt=({label:e,settingSchema:t,onChange:n,value:s})=>{const r=u.exports.useCallback(({currentTarget:i,target:l,type:m})=>{const d=m==="focus";i.classList.toggle("focused",d),t.type==="menu"&&i===l&&i.querySelector("div.MuiInputBase-root").classList.toggle("Mui-focused",d)},[t]),a=u.exports.useMemo(()=>{switch(t.type){case"menu":return o.createElement(st,b(f({},t),{onChange:n,value:s}));case"slider":return o.createElement(ot,b(f({},t),{onChange:n,value:s}));case"toggle":return o.createElement(rt,b(f({},t),{onChange:n,value:s}));case"text":return o.createElement("span",null,t.text);default:throw new Error("Invalid setting type")}},[t,s,n]);return o.createElement("div",{className:c`
                width: 100%;
                max-width: 800px;
                background-color: rgba(0 0 0 / 30%);
                display: flex;
                padding: 5px 15px;
                justify-content: space-between;
                align-items: center;
                border-left: 3px solid transparent;
                ${"defaultValue"in t&&t.defaultValue!==s?"border-left-color: rgb(0 255 255 / 80%);":""}
                &.focused {
                    ${Y}
                }
            `,tabIndex:0,onFocus:r,onBlur:r,onKeyDown:g=>{var h=g,{code:i,currentTarget:l,target:m}=h,d=E(h,["code","currentTarget","target"]);var x,k,C;if(m===l){switch(i){case"Space":case"Enter":switch(t.type){case"menu":l.querySelector("div.MuiSelect-root").dispatchEvent(new MouseEvent("mousedown",{bubbles:!0}));break;case"slider":U('input[type="number"]',l).focus();break;case"toggle":n(!s);break}}if(t.type==="slider"){const M=(x=/Arrow(Left|Right)/.exec(i))==null?void 0:x[1];if(!M)return;const F=D?d.altKey:d.ctrlKey;n(Oe(s+(F?10:1)*(M==="Right"?1:-1),(k=t.min)!=null?k:0,(C=t.max)!=null?C:100))}}}},o.createElement("span",{className:c`
                    font-size: 0.9rem;
                    /* font-weight: bold; */
                    text-transform: uppercase;
                    letter-spacing: 0.0285em;
                `},e),o.createElement("div",null,a))},$t=({children:e})=>{const t=u.exports.useRef(null);return K({focusableElemSelector:"div",containerRef:t}),o.createElement("div",{ref:t,className:c`
                display: flex;
                flex-direction: column;
                /* justify-content: ; */
                align-items: center;
                margin-top: 50px;
                width: 100%;

                & > div {
                    margin-bottom: 5px;
                }
            `},e)},Pt=({tabName:e,schema:t})=>o.createElement($t,null,Object.entries(t).map(([n,s])=>Object.entries(s).map(([r,a])=>o.createElement(Rt,{key:`${n}-${r}`,label:r,settingSchema:a,tabName:e,groupName:n})))),zt=()=>{const{controller:e}=p(),t=u.exports.useMemo(()=>Object.entries(e.settingsStore.schema).map(([n,s])=>({tabName:n,panelContent:o.createElement(Pt,{tabName:n,schema:s})})),[]);return o.createElement(Ot,{tabsLabel:"settings",tabs:t})},At=()=>{const e=p(n=>n.openedUI),t=u.exports.useMemo(()=>(e==null?void 0:e.type)!=="pause"||e.menu==="root"?null:e.menu.startsWith("settings")?o.createElement(zt,null):null,[e]);return t&&o.createElement(Bt,null,t)},jt=e=>{const t=u.exports.useCallback(n=>{switch(e.action){case"close-pause":L();break;case"open-menu":Ft(n.currentTarget),p.setState({openedUI:{type:"pause",menu:e.menu}});break;case"custom":e.onClick(n),e.closePause&&L();break}},[e.action]);return o.createElement("button",{className:c`
                ${V}
                width: 300px;
                padding: 8px;
                margin: 3px;
                font-size: 1.2rem;
                font-weight: 500;
                background: rgba(0, 0, 0, 0.6);
                cursor: ${e.action==="disabled"?"not-allowed":"default"};

                &:hover {
                    background: rgba(0, 0, 0, 0.7);
                }
                &:focus {
                    ${Y}
                }
            `,autoFocus:e.autoFocus,onClick:t,type:"button"},e.label)},ne=()=>{p.setState({openedUI:{type:"pause",menu:"root"}})},L=()=>{p.setState({openedUI:null})},Ht=()=>{const e=p(r=>r.uiConfig),t=p(r=>r.openedUI),n=u.exports.useRef(null),s=S.useToggleState();return v(window,"keydown",({code:r})=>{if(t){if(t.type!=="pause"||t.menu!=="root")return;switch(r){case"Backquote":L();break;case"Escape":s.on();break}}else r==="Escape"&&ne()}),(t==null?void 0:t.type)==="pause"&&t.menu,K({containerRef:n,focusableElemSelector:'button:not([tab-index="-1"])'}),o.createElement(o.Fragment,null,o.createElement(nt,{open:s.state,onClose:s.off}),(t==null?void 0:t.type)==="pause"&&o.createElement("div",{ref:n,className:c`
                        ${q}
                        background-color: rgba(0, 0, 0, 0.3);
                        @supports (
                            (-webkit-backdrop-filter: blur(2em)) or
                                (backdrop-filter: blur(2em))
                        ) {
                            backdrop-filter: blur(3px);
                            background-color: transparent;
                        }
                        flex-direction: column;
                    `},e.pauseSchema.buttons.map((r,a)=>o.createElement(jt,f({key:r.label,autoFocus:a===0},r))),o.createElement(At,null)))},Ut=()=>{const e=p(t=>t.openedUI);return v(window,"keydown",({code:t})=>{const n=(e==null?void 0:e.type)==="inventory";t==="KeyE"&&(e&&!n||(n?p.setState({openedUI:null}):p.setState({openedUI:{type:"inventory"}})))}),v(document,"pointerlockchange",()=>{document.pointerLockElement||ne()}),o.createElement(o.Fragment,null,o.createElement(Ht,null),o.createElement(Mt,null))},Gt=n=>{var s=n,{children:e}=s,t=E(s,["children"]);return o.createElement("div",b(f({},t),{className:y(c`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 100%;
            `,t.className)}),e)},Wt=()=>o.createElement(Gt,null,o.createElement("div",null),o.createElement(Re,null),o.createElement("div",null)),_t=Le({palette:{mode:"dark"}}),Dt=$e.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`,Kt=({canvasEl:e,rootClassName:t,controller:n})=>{const s=p(l=>l.uiConfig),r=p(l=>l.openedUI),a=S.useModalState(!0),i=Ye()&&s.hideHudIfDeviceNeedsRotation;return u.exports.useEffect(()=>{n.init=!0;for(const l of n._initSubscribers.app)l();n._onDidSettingsInit(()=>a.close())},[]),o.createElement(o.Fragment,null,o.createElement(Pe,null,o.createElement("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),o.createElement("link",{href:"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap",rel:"stylesheet"})),o.createElement(it,null,o.createElement(qe,null)),o.createElement(Dt,{className:t},o.createElement(ze,{theme:_t},a.isOpen?o.createElement(Wt,null):o.createElement(o.Fragment,null,i?o.createElement(lt,null):o.createElement(Ut,null),(r==null?void 0:r.type)!=="mainMenu"&&e))))},qt=(e,t)=>Object.fromEntries(Object.entries(e).filter(n=>t(...n))),Vt=n=>{var s=n,{settingsStore:e}=s,t=E(s,["settingsStore"]);const a={events:{movementStopped:[],movementUpdated:[],slotSelectChanged:[],slotUpdated:[],isFlyingChanged:[]},init:!1,_initSubscribers:{app:[],settings:[]},_onDidSettingsInit(l){a.settingsStore.resolvedConfig?l():a._initSubscribers.settings.push(l)},_settingsStoreProvider:e.provider,inventory:{hotbar:{slots:[],replaceSlots(l){a.inventory.hotbar.slots=l}}},settingsStore:f({resolvedConfig:void 0,useSettingsStore:I(()=>({}))},Object.fromEntries(Object.entries(e).filter(([l])=>l!=="provider")))};return a.settingsStore.useSettingsStore.subscribe(l=>{var g,h;const m=_(l,(x,k)=>_(x,(C,M)=>qt(C,(F,ae)=>{const $=a.settingsStore.schema[k][M][F];return"defaultValue"in $?$.defaultValue!==ae:!1}))),d=Ae(m,x=>Object.keys(x).length===0);(h=(g=a._settingsStoreProvider).saveConfig)==null||h.call(g,d)}),(async()=>{const l=await e.provider.load();a.settingsStore.resolvedConfig=l,a.settingsStore.useSettingsStore.setState(l);for(const m of a._initSubscribers.settings)m()})(),je(a,et())},oe=e=>e,Jt=(e,t,n={})=>f({type:"menu",values:e,defaultValue:t},n),Yt=Jt({reduced:!0,normal:!0,scaled:!0},"normal",{getMenuItemLabel(e){const t=e==="reduced"?.5:e==="normal"?1:window.devicePixelRatio,{availWidth:n,availHeight:s}=window.screen,r=a=>Math.floor(a*t);return`${H(e)} (${r(n)} X ${r(s)})`}}),Xt={video:oe({general:{resolution:Yt}}),sound:oe({general:{masterVolume:{type:"slider",defaultValue:50}}})},Qt={buttons:[{label:"CONTINUE PLAYING",action:"close-pause"},{label:"OPTIONS",action:"open-menu",menu:"settings-video"},{label:"LEAVE WORLD",action:"custom",closePause:!1,onClick(){p.setState({openedUI:{type:"mainMenu"}})}}]},se="game-local-settings",Zt={load(){var e,t;return(t=JSON.parse((e=localStorage.getItem(se))!=null?e:"{}"))==null?void 0:t.data},saveConfig(e){localStorage.setItem(se,JSON.stringify({data:e,version:"0.0.1"}))}},re=Vt({settingsStore:{schema:Xt,provider:Zt},uiConfig:{pauseSchema:Qt}}),en=He.times(9,()=>({type:"block",count:1,getTexture:()=>Ge}));re.hotbar.replaceSlots(en);const tn=()=>{const e=S.useModalState();return v(window,"keydown",({code:t})=>{t==="KeyE"&&e.toggle()}),o.createElement(S.ErrorBoundary,null,o.createElement(Kt,{controller:re,rootClassName:c`
                    background: url('src/background-testing.png') no-repeat 50% 50% / cover fixed black;
                `,canvasEl:o.createElement(o.Fragment,null)}))};S.renderToDom(o.createElement(tn,null));
