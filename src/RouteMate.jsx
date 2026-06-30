import { useState, useMemo, useCallback } from "react";

const C = {
  bg:{d:"#0A0A0F",l:"#F5F5F7"}, surf:{d:"#111118",l:"#FFFFFF"},
  s2:{d:"#1C1C26",l:"#F0F0F5"}, bd:{d:"#2A2A3A",l:"#D1D1D6"},
  accent:"#4F6EF7", green:"#34C759", red:"#FF3B30", yellow:"#FF9500",
  purple:"#AF52DE", cyan:"#0EA5E9", text:{d:"#F5F5F7",l:"#1D1D1F"}, muted:{d:"#8E8E99",l:"#6E6E73"},
};

const JUNE_LOADS = [
  {id:"j1",dn:"Dan Garret",bb:"Ali Bhai",bk:"Freight Masters",rc:1000,inv:40,pd:"2026-06-03",pl:"ADDISON, IL",dd:"2026-06-03",dl:"ELKHART, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j2",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:850,inv:34,pd:"2026-06-04",pl:"Fort Wayne, IN",dd:"2026-06-05",dl:"Chicago, IL",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j3",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:1100,inv:44,pd:"2026-06-08",pl:"Chicago, IL",dd:"2026-06-09",dl:"Fort Wayne, IN",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j4",dn:"Dan Garret",bb:"Ali Bhai",bk:"FitzMark",rc:900,inv:36,pd:"2026-06-09",pl:"Fort Wayne, IN",dd:"2026-06-10",dl:"Dwight, IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j5",dn:"Dan Garret",bb:"Ali Bhai",bk:"ROAR LOGISTICS",rc:1100,inv:44,pd:"2026-06-10",pl:"Garry, IN",dd:"2026-06-10",dl:"Marion, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j6",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:1100,inv:44,pd:"2026-06-11",pl:"Fort Wayne, IN",dd:"2026-06-12",dl:"Decatur, IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j7",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:1800,inv:72,pd:"2026-06-16",pl:"Harvard, IL",dd:"2026-06-17",dl:"Greenwood, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j8",dn:"Dan Garret",bb:"Ali Bhai",bk:"Fitzmark",rc:1000,inv:40,pd:"2026-06-17",pl:"Plainfield, IN",dd:"2026-06-18",dl:"Mount Pleasant, WI",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j9",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:1150,inv:46,pd:"2026-06-23",pl:"Romeoville, IL",dd:"2026-06-24",dl:"Greenfield, IN",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j10",dn:"Dan Garret",bb:"Ali Bhai",bk:"RXO",rc:1000,inv:40,pd:"2026-06-24",pl:"Terre Haute, IN",dd:"2026-06-25",dl:"Romeoville, IL",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j11",dn:"Anderson",bb:"Younous",bk:"Landstar",rc:1900,inv:108.30,pd:"2026-06-22",pl:"BESSEMER AL",dd:"2026-06-23",dl:"HOWELL NJ",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j12",dn:"Anderson",bb:"Younous",bk:"Landstar",rc:2500,inv:150,pd:"2026-06-23",pl:"AMELIA CRT HSE VA",dd:"2026-06-25",dl:"S PORTLAND ME",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j13",dn:"Reefer",bb:"Hasnain",bk:"Moeller Logistics",rc:900,inv:45,pd:"2026-06-11",pl:"Decatur, IN",dd:"2026-06-12",dl:"Hanover Park, IL",st:"Delivered",pay:"Paid",cm:"*000177"},
  {id:"j14",dn:"Okwardi Opara",bb:"Awais",bk:"TQL",rc:2700,inv:189,pd:"2026-06-03",pl:"Tracy, CA",dd:"2026-06-05",dl:"Hereford, TX",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j15",dn:"Okwardi Opara",bb:"Awais",bk:"wwex",rc:2050,inv:143.50,pd:"2026-06-02",pl:"LUBBOCK TX",dd:"2026-06-05",dl:"WAKE FOREST NC",st:"Delivered",pay:"Paid",cm:""},
  {id:"j16",dn:"Okwardi Opara",bb:"Awais",bk:"wwex",rc:1100,inv:77,pd:"2026-06-04",pl:"ABILENE TX",dd:"2026-06-09",dl:"PHILADELPHIA, PA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j17",dn:"Okwardi Opara",bb:"Awais",bk:"CDS Transport",rc:1950,inv:136.50,pd:"2026-06-09",pl:"WARMINSTER, PA",dd:"2026-06-10",dl:"TULSA, OK",st:"Delivered",pay:"Paid",cm:""},
  {id:"j18",dn:"Okwardi Opara",bb:"Awais",bk:"S&S Brokerage",rc:1400,inv:98,pd:"2026-06-11",pl:"Cuba, MO",dd:"2026-06-12",dl:"Pulaski, VA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j19",dn:"Okwardi Opara",bb:"Awais",bk:"Freight Flex",rc:5000,inv:350,pd:"2026-06-14",pl:"N CHARLESTON, SC",dd:"2026-06-16",dl:"ASPEN, CO",st:"Delivered",pay:"Paid",cm:""},
  {id:"j20",dn:"Okwardi Opara",bb:"Awais",bk:"Baileys logistics",rc:4700,inv:329,pd:"2026-06-17",pl:"Lindon, UT",dd:"2026-06-19",dl:"Atlanta, GA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j21",dn:"Okwardi Opara",bb:"Awais",bk:"General Transportation",rc:3250,inv:227.50,pd:"2026-06-19",pl:"Perry, GA",dd:"2026-06-22",dl:"Aurora, CO",st:"Delivered",pay:"Paid",cm:""},
  {id:"j22",dn:"Okwardi Opara",bb:"Awais",bk:"Drove Logistics",rc:3500,inv:245,pd:"2026-06-19",pl:"KENNESAW, GA",dd:"2026-06-23",dl:"HIGHLANDS RANCH, CO",st:"Delivered",pay:"Paid",cm:"inv 000187"},
  {id:"j23",dn:"Okwardi Opara",bb:"Awais",bk:"integrated connection",rc:1800,inv:126,pd:"2026-06-23",pl:"LOVELAND, CO",dd:"2026-06-24",dl:"CLEBURNE, TX",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j24",dn:"Okwardi Opara",bb:"Awais",bk:"Bedrock logistics",rc:2500,inv:175,pd:"2026-06-24",pl:"LEWISVILLE, TX",dd:"2026-06-25",dl:"CLEVELAND, MS",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j25",dn:"Okwardi Opara",bb:"Awais",bk:"TQL",rc:2100,inv:147,pd:"2026-06-26",pl:"Olive Branch, MS",dd:"2026-06-29",dl:"Pequannock, NJ",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j26",dn:"Raymond",bb:"Sidra",bk:"Premier Global Transp",rc:2850,inv:171,pd:"2026-06-16",pl:"Lexington, KY",dd:"2026-06-17",dl:"Wellesley, MA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j27",dn:"Jay Miller",bb:"Sidra",bk:"Indelible Logistics",rc:900,inv:54,pd:"2026-06-12",pl:"STANLEY NC",dd:"2026-06-12",dl:"CHARLESTON SC",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j28",dn:"Jimmy",bb:"Ubair",bk:"legion logistics",rc:1500,inv:99.75,pd:"2026-06-05",pl:"RIVERSIDE CA",dd:"2026-06-07",dl:"SCOTTSBLUFF NE",st:"Delivered",pay:"Paid",cm:""},
  {id:"j29",dn:"Jimmy",bb:"Ubair",bk:"Blackbox logistics",rc:1475,inv:98.09,pd:"2026-06-09",pl:"Colton, CA",dd:"2026-06-10",dl:"Ely, NV",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j30",dn:"Brian",bb:"Ubair",bk:"GREEN FREIGHT LOGISTICS",rc:400,inv:32,pd:"2026-06-03",pl:"BALTIMORE MD",dd:"2026-06-04",dl:"STUARTS DRAFT VA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j31",dn:"Brian",bb:"Ubair",bk:"TQL",rc:1200,inv:96,pd:"2026-06-17",pl:"Cranbury, NJ",dd:"2026-06-18",dl:"Zeeland, MI",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j32",dn:"Harol",bb:"Ubair",bk:"Tailwind",rc:1400,inv:112,pd:"2026-06-03",pl:"ADAIRSVILLE, GA",dd:"2026-06-04",dl:"TERRELL, TX",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j33",dn:"Harol",bb:"Ubair",bk:"Nations Top Logistics",rc:2100,inv:168,pd:"2026-06-19",pl:"Columbus, GA",dd:"2026-06-22",dl:"Shreveport, LA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j34",dn:"Christon",bb:"Younous",bk:"C&W TRANSPORT",rc:900,inv:60,pd:"2026-06-17",pl:"MINNVILLE TN",dd:"2026-06-18",dl:"EUREKA IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j35",dn:"Christon",bb:"Younous",bk:"GlobalTraz",rc:1200,inv:80,pd:"2026-06-17",pl:"New Paris, IN",dd:"2026-06-18",dl:"Columbia, MD",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j36",dn:"Christon",bb:"Younous",bk:"steamboat Transp",rc:2500,inv:166,pd:"2026-06-19",pl:"Bensalem, PA",dd:"2026-06-22",dl:"Dallas, TX",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j37",dn:"Christon",bb:"Younous",bk:"Show me global",rc:1100,inv:77,pd:"2026-06-24",pl:"Forney, TX",dd:"2026-06-25",dl:"Kansas City, MO",st:"Picked Up",pay:"Unpaid",cm:""},
  {id:"j38",dn:"Christon",bb:"Younous",bk:"Central Freight Mgmt",rc:750,inv:53,pd:"2026-06-25",pl:"TOPEKA KS",dd:"2026-06-26",dl:"GARDEN CITY KS",st:"Booked",pay:"Unpaid",cm:"KTM"},
  {id:"j39",dn:"Cadet",bb:"Zain",bk:"BROKERMAN LOGISTICS",rc:1700,inv:136,pd:"2026-06-01",pl:"Noblesville, IN",dd:"2026-06-02",dl:"PENSACOLA, FL",st:"Delivered",pay:"Paid",cm:"KTM 154,155"},
  {id:"j40",dn:"Cadet",bb:"Zain",bk:"ATS Logistics",rc:4500,inv:360,pd:"2026-06-05",pl:"REDSTONE CENTRAL, AL",dd:"2026-06-08",dl:"PELHAM, NH",st:"Delivered",pay:"Paid",cm:"KTM 162,163"},
  {id:"j41",dn:"Cadet",bb:"Zain",bk:"Axle Logistics",rc:4100,inv:155.80,pd:"2026-06-10",pl:"Mountain Top, PA",dd:"2026-06-13",dl:"San Diego, CA",st:"Delivered",pay:"Paid",cm:"Dirmat 174"},
  {id:"j42",dn:"Cadet",bb:"Zain",bk:"Fitzharris",rc:5000,inv:350,pd:"2026-06-14",pl:"CHULA VISTA, CA",dd:"2026-06-16",dl:"INDIANAPOLIS, IN",st:"Delivered",pay:"Paid",cm:"KTM 175,176"},
  {id:"j43",dn:"Cadet",bb:"Zain",bk:"Armstrong Transport",rc:3300,inv:231,pd:"2026-06-18",pl:"Fithian, IL",dd:"2026-06-19",dl:"Lincoln, ME",st:"Delivered",pay:"Paid",cm:"KTM 183,184"},
  {id:"j44",dn:"Rodney",bb:"Yasir Arfat",bk:"",rc:300,inv:18,pd:"2026-06-05",pl:"Cincinnati, OH",dd:"2026-06-06",dl:"Piqua, OH",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j45",dn:"Rodney",bb:"Yasir Arfat",bk:"",rc:350,inv:21,pd:"2026-06-05",pl:"Springfield, OH",dd:"2026-06-06",dl:"St Marys, OH",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j46",dn:"Vernon",bb:"Yasir Arfat",bk:"TQL",rc:1000,inv:50,pd:"2026-06-16",pl:"Aurora, CO",dd:"2026-06-17",dl:"Casper, WY",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j47",dn:"Anthony",bb:"Yasir Arfat",bk:"TQL",rc:2500,inv:125,pd:"2026-06-17",pl:"San Diego, CA",dd:"2026-06-19",dl:"Idaho Falls, ID",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j48",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:530,inv:42.40,pd:"2026-06-02",pl:"Holiday, FL",dd:"2026-06-02",dl:"Coconut Creek, FL",st:"Delivered",pay:"Paid",cm:"156 5%"},
  {id:"j49",dn:"Desman Hearns",bb:"Tehseen",bk:"Archer Cargo",rc:175,inv:14,pd:"2026-06-09",pl:"Tampa, FL",dd:"2026-06-09",dl:"Tampa, FL",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j50",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:225,inv:18,pd:"2026-06-03",pl:"Plant City, FL",dd:"2026-06-03",dl:"Sarasota, FL",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j51",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:400,inv:32,pd:"2026-06-22",pl:"Mulberry, FL",dd:"2026-06-22",dl:"Coconut Creek, FL",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j52",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:1000,inv:80,pd:"2026-06-24",pl:"Charlotte, NC",dd:"2026-06-25",dl:"Ocala, FL",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j53",dn:"Desman Hearns",bb:"Tehseen",bk:"D&L TRANSPORT",rc:1100,inv:88,pd:"2026-06-25",pl:"GREENVILLE SC",dd:"2026-06-26",dl:"OCALA FL",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j54",dn:"David-Richard",bb:"Zaid",bk:"Brokerman",rc:1800,inv:126,pd:"2026-06-16",pl:"Libertyville, IL",dd:"2026-06-17",dl:"Reading, PA",st:"Delivered",pay:"Paid",cm:"KTM"},
  {id:"j55",dn:"David-Richard",bb:"Zaid",bk:"PRADEL LOGISTICS",rc:450,inv:31.50,det:450,pd:"2026-06-18",pl:"Philadelphia PA",dd:"2026-06-19",dl:"Aberdeen, MD",st:"Delivered",pay:"Paid",cm:"KTM #00178"},
  {id:"j56",dn:"Tyrone",bb:"Zain",bk:"HD Shipping",rc:250,inv:25,pd:"2026-06-17",pl:"Chantilly, VA",dd:"2026-06-17",dl:"Chantilly, VA",st:"Delivered",pay:"Unpaid",cm:"KTM"},
  {id:"j57",dn:"Tyrone",bb:"Zain",bk:"Global Tranz",rc:300,inv:30,pd:"2026-06-25",pl:"Washington, DC",dd:"2026-06-25",dl:"Springfield, VA",st:"Picked Up",pay:"Unpaid",cm:"KTM"},
  {id:"j58",dn:"Tod (lowboy)",bb:"Ali Bhai",bk:"Rapid Transport",rc:2500,inv:125,pd:"2026-06-17",pl:"Albany, NY",dd:"2026-06-17",dl:"Braintree, MA",st:"Delivered",pay:"Unpaid",cm:""},
];

const DEFAULT_DRIVERS = [
  {name:"Dan Garret",rate:4,note:"RC x 4%"},
  {name:"Anderson",rate:6,note:"RC x 6% x 95% Dirmat"},
  {name:"Reefer",rate:5,note:"Total x 5%"},
  {name:"Edwin",rate:8,note:"RC x 8%"},
  {name:"Okwardi Opara",rate:7,note:"Total x 7%"},
  {name:"Raymond",rate:6,note:"RC x 6% (+22% palmetto)"},
  {name:"Jay Miller",rate:6,note:"RC x 6%"},
  {name:"Jimmy",rate:7,note:"Total x 7% x 95%"},
  {name:"Brian",rate:8,note:"RC x 8%"},
  {name:"Harol",rate:8,note:"RC x 8%"},
  {name:"Christon",rate:7,note:"Total x 7% x 95% Dirmat"},
  {name:"Cadet",rate:8,note:"RC x 8% / 7% mixed"},
  {name:"Rodney",rate:6,note:"RC x 6%"},
  {name:"Vernon",rate:8,note:"RC x 8%"},
  {name:"Anthony",rate:8,note:"RC x 8%"},
  {name:"Desman Hearns",rate:8,note:"RC x 8%"},
  {name:"David-Richard",rate:7,note:"RC x 7%"},
  {name:"Tyrone",rate:10,note:"RC x 10%"},
  {name:"Tod (lowboy)",rate:5,note:"RC x 5%"},
  {name:"Leonard Roy",rate:9.5,note:"MC Lease 9.5%"},
  {name:"Albert Paul",rate:21,note:"21% or 11%"},
  {name:"Dashera",rate:7,note:"7% or 20% Dirmat"},
  {name:"Larron",rate:10,note:"10% or 9% lease"},
];

const DEFAULT_EMPLOYEES = [
  {id:"e1",name:"Ali Bhai",role:"Dispatcher",pct:40},
  {id:"e2",name:"Raza",role:"Dispatcher",pct:25},
  {id:"e3",name:"Awais",role:"Dispatcher",pct:35},
  {id:"e4",name:"Rafay",role:"Dispatcher",pct:20},
  {id:"e5",name:"Younous",role:"Dispatcher",pct:25},
  {id:"e6",name:"Ubair",role:"Dispatcher",pct:25},
  {id:"e7",name:"Huzaifa",role:"Dispatcher",pct:15},
  {id:"e8",name:"Zain",role:"Dispatcher",pct:35},
  {id:"e9",name:"Kashif",role:"Dispatcher",pct:5},
  {id:"e10",name:"Yasir Arfat",role:"Dispatcher",pct:40},
  {id:"e11",name:"Tehseen",role:"Dispatcher",pct:8},
  {id:"e12",name:"Sidra",role:"Dispatcher",pct:10},
  {id:"e13",name:"Zaid",role:"Dispatcher",pct:10},
  {id:"e14",name:"Hasnain",role:"Dispatcher",pct:10},
];

const STATUSES=["Pending","In Transit","Delivered","Invoiced","Booked","Picked Up","Cancelled"];
function gid(){return Math.random().toString(36).slice(2,9);}
function money(n){return"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
function fdate(d){if(!d)return"-";try{return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}catch{return d;}}
function useLS(key,init){
  const[v,sv]=useState(()=>{try{const s=localStorage.getItem(key);return s?JSON.parse(s):init;}catch{return init;}});
  const set=useCallback(x=>{sv(p=>{const n=typeof x==="function"?x(p):x;try{localStorage.setItem(key,JSON.stringify(n));}catch{}return n;});},[key]);
  return[v,set];
}

function Icon({name,size=20,color="currentColor"}){
  const p={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:color,strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};
  if(name==="home")return <svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  if(name==="truck")return <svg {...p}><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
  if(name==="box")return <svg {...p}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
  if(name==="users")return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if(name==="dollar")return <svg {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
  if(name==="chart")return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if(name==="gear")return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
  if(name==="plus")return <svg {...p} strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if(name==="search")return <svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
  if(name==="close")return <svg {...p} strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
  if(name==="edit")return <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
  if(name==="trash")return <svg {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
  if(name==="copy")return <svg {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
  if(name==="check")return <svg {...p} strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>;
  if(name==="menu")return <svg {...p} strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
  if(name==="sun")return <svg {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
  if(name==="moon")return <svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
  if(name==="arrow")return <svg {...p} strokeWidth={2}><polyline points="9 18 15 12 9 6"/></svg>;
  if(name==="logout")return <svg {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
  if(name==="pay")return <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>;
  if(name==="cal")return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  return null;
}

function Badge({color,children}){
  const m={green:["#1C3A28","#34C759"],red:["#3A1C1C","#FF3B30"],yellow:["#3A2E1C","#FF9500"],blue:["#1C2A3A","#4F6EF7"],purple:["#2A1C3A","#AF52DE"],cyan:["#0C2A3A","#0EA5E9"],gray:["#2A2A3A","#8E8E99"]};
  const [bg,t]=m[color]||m.gray;
  return <span style={{background:bg,color:t,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,display:"inline-block"}}>{children}</span>;
}
function statusColor(s){return {Paid:"green",Delivered:"purple","In Transit":"blue",Booked:"cyan","Picked Up":"blue",Unpaid:"yellow",Pending:"yellow",Cancelled:"red"}[s]||"gray";}

function Stat({label,value,sub,color,icon,th}){
  const col=color||C.accent;
  return (
    <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:"16px 18px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:11,color:th.muted,fontWeight:500}}>{label}</span>
        {icon&&<div style={{width:28,height:28,borderRadius:8,background:col+"22",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name={icon} size={13} color={col}/></div>}
      </div>
      <div style={{fontSize:20,fontWeight:700,color:col}}>{value}</div>
      {sub&&<div style={{fontSize:10,color:th.muted,marginTop:3}}>{sub}</div>}
    </div>
  );
}

function Login({th,onLogin}){
  const[em,setEm]=useState("owner@routemate.com");
  const[pw,setPw]=useState("password");
  const[err,setErr]=useState("");
  const go=()=>{
    const U=[["owner@routemate.com","Ali Bhai","Owner"],["dispatcher@routemate.com","Raza","Dispatcher"],["viewer@routemate.com","Viewer","Viewer"]];
    const f=U.find(u=>u[0]===em);
    if(f&&pw==="password"){onLogin({email:f[0],name:f[1],role:f[2]});setErr("");}
    else setErr("Invalid credentials");
  };
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:12,padding:"13px 15px",fontSize:15,width:"100%",marginBottom:10};
  return (
    <div style={{minHeight:"100vh",background:th.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380,background:th.surf,borderRadius:20,padding:36,border:"1px solid "+th.bd}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:14,background:"linear-gradient(135deg,#4F6EF7,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Icon name="truck" size={26} color="#fff"/></div>
          <div style={{fontSize:22,fontWeight:700}}>RouteMate</div>
          <div style={{fontSize:13,color:th.muted,marginTop:3}}>Dispatch Manager</div>
        </div>
        <input style={inp} type="email" placeholder="Email" value={em} onChange={e=>setEm(e.target.value)}/>
        <input style={inp} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
        {err&&<div style={{color:C.red,fontSize:12,marginBottom:8}}>{err}</div>}
        <button onClick={go} style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:12,padding:"13px",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:16}}>Sign In</button>
        <div style={{fontSize:11,color:th.muted,textAlign:"center"}}>owner@routemate.com / password</div>
      </div>
    </div>
  );
}

function Dashboard({th,loads,setPage}){
  const all=loads.concat(JUNE_LOADS);
  const paid=all.filter(l=>l.pay==="Paid");
  const unpaid=all.filter(l=>l.pay!=="Paid");
  const tRev=all.reduce((s,l)=>s+(l.inv||0),0);
  const pRev=paid.reduce((s,l)=>s+(l.inv||0),0);
  const uRev=unpaid.reduce((s,l)=>s+(l.inv||0),0);
  const jPaid=JUNE_LOADS.filter(l=>l.pay==="Paid").reduce((s,l)=>s+(l.inv||0),0);
  const jUnp=JUNE_LOADS.filter(l=>l.pay==="Unpaid").reduce((s,l)=>s+(l.inv||0),0);
  const recent=all.slice().sort((a,b)=>new Date(b.pd||0)-new Date(a.pd||0)).slice(0,6);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Total Revenue" value={money(tRev)} icon="dollar" color={C.accent}/>
        <Stat th={th} label="97% Revenue" value={money(tRev*0.97)} icon="chart" color={C.purple} sub="After 3% fee"/>
        <Stat th={th} label="Paid Revenue" value={money(pRev)} icon="check" color={C.green}/>
        <Stat th={th} label="Unpaid Revenue" value={money(uRev)} icon="dollar" color={C.yellow}/>
        <Stat th={th} label="June Paid Comm" value={money(jPaid)} icon="cal" color={C.cyan}/>
        <Stat th={th} label="June Pending" value={money(jUnp)} icon="cal" color={C.yellow}/>
        <Stat th={th} label="Paid Loads" value={paid.length} icon="check" color={C.green}/>
        <Stat th={th} label="Unpaid Loads" value={unpaid.length} icon="box" color={C.yellow}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14,marginBottom:18}}>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Quick Actions</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {[["June 2026","cal",C.cyan,"june"],["Add Load","plus",C.accent,"loads"],["Employees","users",C.purple,"employees"],["Payroll","pay",C.green,"payroll"]].map(a=>(
              <button key={a[0]} onClick={()=>setPage(a[3])} style={{background:a[2]+"18",border:"1px solid "+a[2]+"44",borderRadius:11,padding:"11px 8px",cursor:"pointer",color:a[2],fontWeight:600,fontSize:12,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <Icon name={a[1]} size={17} color={a[2]}/>{a[0]}
              </button>
            ))}
          </div>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>June 2026 Summary</div>
          {[["Total Loads",JUNE_LOADS.length,C.accent],["Paid",JUNE_LOADS.filter(l=>l.pay==="Paid").length,C.green],["Unpaid",JUNE_LOADS.filter(l=>l.pay==="Unpaid").length,C.yellow],["Paid Commission",money(jPaid),C.green],["Pending Commission",money(jUnp),C.yellow]].map(r=>(
            <div key={r[0]} style={{display:"flex",justifyContent:"space-between",fontSize:13,padding:"4px 0"}}>
              <span style={{color:th.muted}}>{r[0]}</span><span style={{fontWeight:700,color:r[2]}}>{r[1]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
        <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Recent Loads</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Driver","Broker","Commission","Status","Pay","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>{recent.map(l=>(
              <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                <td style={{padding:"8px 10px",fontWeight:600}}>{l.dn||"-"}</td>
                <td style={{padding:"8px 10px",color:th.muted}}>{l.bk||"-"}</td>
                <td style={{padding:"8px 10px",fontWeight:700,color:C.green}}>{money(l.inv)}</td>
                <td style={{padding:"8px 10px"}}><Badge color={statusColor(l.st)}>{l.st}</Badge></td>
                <td style={{padding:"8px 10px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay||"Unpaid"}</Badge></td>
                <td style={{padding:"8px 10px",color:th.muted}}>{fdate(l.pd)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function JunePage({th,drivers,setDrivers,employees,setEmployees}){
  const[view,setView]=useState("summary");
  const[selDrv,setSelDrv]=useState(null);
  const[search,setSearch]=useState("");
  const[payF,setPayF]=useState("All");
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"8px 12px",fontSize:13};

  const stats=useMemo(()=>drivers.map(d=>{
    const ld=JUNE_LOADS.filter(l=>l.dn===d.name);
    const pL=ld.filter(l=>l.pay==="Paid"),uL=ld.filter(l=>l.pay==="Unpaid");
    return {...d,ld,pL,uL,
      pRC:pL.reduce((s,l)=>s+(l.rc||0),0),uRC:uL.reduce((s,l)=>s+(l.rc||0),0),
      pC:pL.reduce((s,l)=>s+(l.inv||0),0),uC:uL.reduce((s,l)=>s+(l.inv||0),0)};
  }),[drivers]);

  const gPC=stats.reduce((s,d)=>s+d.pC,0),gUC=stats.reduce((s,d)=>s+d.uC,0);
  const gPRC=stats.reduce((s,d)=>s+d.pRC,0),gURC=stats.reduce((s,d)=>s+d.uRC,0);

  const fLoads=useMemo(()=>{
    let l=JUNE_LOADS.slice();
    if(search)l=l.filter(x=>[x.dn,x.bk,x.bb,x.pl,x.dl].some(f=>(f||"").toLowerCase().includes(search.toLowerCase())));
    if(payF!=="All")l=l.filter(x=>x.pay===payF);
    return l;
  },[search,payF]);

  if(view==="driver"&&selDrv){
    const sec=stats.find(d=>d.name===selDrv);
    if(!sec)return null;
    return (
      <div>
        <button onClick={()=>{setView("summary");setSelDrv(null);}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back to June 2026"}</button>
        <div style={{marginBottom:16}}>
          <h2 style={{margin:0,fontSize:19,fontWeight:700}}>{sec.name}</h2>
          <div style={{fontSize:12,color:th.muted,marginTop:3}}>{sec.note} - Rate: <span style={{color:C.yellow,fontWeight:700}}>{sec.rate}%</span></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div style={{background:"#1E6B2E22",border:"1px solid #1E6B2E55",borderRadius:13,padding:16}}>
            <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:8}}>PAID LOADS - {sec.pL.length}</div>
            <div style={{fontSize:13,marginBottom:4}}><span style={{color:th.muted}}>Total RC:</span> <b>{money(sec.pRC)}</b></div>
            <div style={{fontSize:15,fontWeight:700,color:C.green}}>Commission: {money(sec.pC)}</div>
          </div>
          <div style={{background:"#8B250022",border:"1px solid #8B250055",borderRadius:13,padding:16}}>
            <div style={{fontSize:11,color:C.yellow,fontWeight:700,marginBottom:8}}>UNPAID LOADS - {sec.uL.length}</div>
            <div style={{fontSize:13,marginBottom:4}}><span style={{color:th.muted}}>Total RC:</span> <b>{money(sec.uRC)}</b></div>
            <div style={{fontSize:15,fontWeight:700,color:C.yellow}}>Commission: {money(sec.uC)}</div>
          </div>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12}}>All Loads ({sec.ld.length})</div>
          {sec.ld.length===0?<div style={{color:th.muted,textAlign:"center",padding:24}}>No loads.</div>:(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>{["Date","Broker","RC","Invoice","Status","Pay","Route","Booked By"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
                <tbody>{sec.ld.map(l=>(
                  <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                    <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{fdate(l.pd)}</td>
                    <td style={{padding:"8px 10px"}}>{l.bk||"-"}</td>
                    <td style={{padding:"8px 10px",fontWeight:600}}>{money(l.rc)}</td>
                    <td style={{padding:"8px 10px",fontWeight:700,color:l.pay==="Paid"?C.green:C.yellow}}>{money(l.inv)}</td>
                    <td style={{padding:"8px 10px"}}><Badge color={statusColor(l.st)}>{l.st}</Badge></td>
                    <td style={{padding:"8px 10px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge></td>
                    <td style={{padding:"8px 10px",color:th.muted,fontSize:11}}>{l.pl}-{l.dl}</td>
                    <td style={{padding:"8px 10px",color:th.muted}}>{l.bb||"-"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  if(view==="rates"){
    return (
      <div>
        <button onClick={()=>setView("summary")} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back"}</button>
        <RateEditor th={th} drivers={drivers} setDrivers={setDrivers} employees={employees} setEmployees={setEmployees} inp={inp}/>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>June 2026 <span style={{fontSize:12,color:th.muted,fontWeight:400}}>({JUNE_LOADS.length} loads)</span></h2>
        <button onClick={()=>setView("rates")} style={{background:C.accent+"22",border:"1px solid "+C.accent+"44",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",color:C.accent,display:"flex",alignItems:"center",gap:6}}>
          <Icon name="gear" size={14} color={C.accent}/>Rate Editor
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
        <Stat th={th} label="Paid Loads" value={JUNE_LOADS.filter(l=>l.pay==="Paid").length} color={C.green} icon="check"/>
        <Stat th={th} label="Unpaid Loads" value={JUNE_LOADS.filter(l=>l.pay==="Unpaid").length} color={C.yellow} icon="box"/>
        <Stat th={th} label="RC (Paid)" value={money(gPRC)} color={C.green} icon="dollar"/>
        <Stat th={th} label="RC (Unpaid)" value={money(gURC)} color={C.yellow} icon="dollar"/>
        <Stat th={th} label="Comm (Paid)" value={money(gPC)} color={C.green} icon="pay"/>
        <Stat th={th} label="Comm (Unpaid)" value={money(gUC)} color={C.yellow} icon="pay"/>
      </div>
      <div style={{display:"flex",gap:9,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:170,position:"relative"}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={14} color={th.muted}/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search loads..." style={{...inp,paddingLeft:30,width:"100%"}}/>
        </div>
        <select value={payF} onChange={e=>setPayF(e.target.value)} style={{...inp,cursor:"pointer"}}><option>All</option><option>Paid</option><option>Unpaid</option></select>
      </div>
      {(search||payF!=="All")&&(
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:13,padding:16,marginBottom:14}}>
          <div style={{fontWeight:600,marginBottom:10,fontSize:13}}>Filtered ({fLoads.length})</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>{["Driver","Date","Broker","RC","Invoice","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 9px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{fLoads.map(l=>(
                <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                  <td style={{padding:"7px 9px",fontWeight:600}}>{l.dn}</td>
                  <td style={{padding:"7px 9px",color:th.muted}}>{fdate(l.pd)}</td>
                  <td style={{padding:"7px 9px"}}>{l.bk||"-"}</td>
                  <td style={{padding:"7px 9px"}}>{money(l.rc)}</td>
                  <td style={{padding:"7px 9px",fontWeight:700,color:l.pay==="Paid"?C.green:C.yellow}}>{money(l.inv)}</td>
                  <td style={{padding:"7px 9px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {stats.map(sec=>(
          <div key={sec.name} style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:13,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 16px",cursor:"pointer"}} onClick={()=>{setSelDrv(sec.name);setView("driver");}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:14}}>{sec.name}</span>
                  <span style={{background:C.accent+"22",color:C.accent,fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:20}}>{sec.rate}%</span>
                  {sec.pL.length>0&&<Badge color="green">{sec.pL.length} paid</Badge>}
                  {sec.uL.length>0&&<Badge color="yellow">{sec.uL.length} unpaid</Badge>}
                  {sec.ld.length===0&&<span style={{fontSize:11,color:th.muted}}>No loads</span>}
                </div>
                <div style={{fontSize:11,color:th.muted}}>{sec.note}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.green}}>{money(sec.pC)}</div>
                  {sec.uC>0&&<div style={{fontSize:10,color:C.yellow}}>{money(sec.uC)} pending</div>}
                </div>
                <Icon name="arrow" size={15} color={th.muted}/>
              </div>
            </div>
            {sec.ld.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderTop:"1px solid "+th.bd}}>
                <div style={{padding:"9px 16px",borderRight:"1px solid "+th.bd,background:"#1E6B2E11"}}>
                  <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:2}}>Paid RC</div>
                  <div style={{fontSize:13,fontWeight:700}}>{money(sec.pRC)}</div>
                  <div style={{fontSize:10,color:th.muted}}>Comm: {money(sec.pC)}</div>
                </div>
                <div style={{padding:"9px 16px",background:"#8B250011"}}>
                  <div style={{fontSize:10,color:C.yellow,fontWeight:700,marginBottom:2}}>Unpaid RC</div>
                  <div style={{fontSize:13,fontWeight:700}}>{money(sec.uRC)}</div>
                  <div style={{fontSize:10,color:th.muted}}>Comm: {money(sec.uC)}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RateEditor({th,drivers,setDrivers,employees,setEmployees,inp}){
  const[tab,setTab]=useState("drivers");
  const[nd,setNd]=useState({name:"",rate:"",note:""});
  const[showD,setShowD]=useState(false);
  const[ne,setNe]=useState({name:"",role:"Dispatcher",pct:""});
  const[showE,setShowE]=useState(false);
  const[editE,setEditE]=useState(null);
  const tb=(t,l)=><button onClick={()=>setTab(t)} style={{padding:"7px 16px",border:"none",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,background:tab===t?C.accent:th.s2,color:tab===t?"#fff":th.muted}}>{l}</button>;
  return (
    <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:16,padding:22}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>Rate & Employee Editor</div>
          <div style={{fontSize:11,color:th.muted,marginTop:2}}>Yellow = editable rate. Add new drivers or employees below.</div>
        </div>
        <div style={{display:"flex",gap:8}}>{tb("drivers","Driver Rates")}{tb("emp","Employees")}</div>
      </div>
      {tab==="drivers"&&(
        <div>
          <div style={{overflowX:"auto",marginBottom:16}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:th.s2}}>{["#","Driver","Rate %","Notes","Paid","RC Paid","Comm Paid",""].map(h=><th key={h} style={{textAlign:"left",padding:"9px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{drivers.map((d,i)=>{
                const ld=JUNE_LOADS.filter(l=>l.dn===d.name&&l.pay==="Paid");
                const rc=ld.reduce((s,l)=>s+(l.rc||0),0),cm=ld.reduce((s,l)=>s+(l.inv||0),0);
                return (
                  <tr key={i} style={{borderBottom:"1px solid "+th.bd,background:i%2===0?th.surf:th.s2}}>
                    <td style={{padding:"9px 11px",color:th.muted,fontSize:10}}>{i+1}</td>
                    <td style={{padding:"9px 11px",fontWeight:700}}>{d.name}</td>
                    <td style={{padding:"5px 11px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <input type="number" value={d.rate} onChange={e=>setDrivers(ds=>ds.map((x,j)=>j===i?{...x,rate:parseFloat(e.target.value)||0}:x))} style={{...inp,width:54,padding:"5px 7px",background:"#FFFF0022",border:"1px solid #FFFF0066",fontWeight:700,color:C.yellow,textAlign:"center"}}/>
                        <span style={{color:th.muted,fontSize:11}}>%</span>
                      </div>
                    </td>
                    <td style={{padding:"5px 11px"}}><input value={d.note} onChange={e=>setDrivers(ds=>ds.map((x,j)=>j===i?{...x,note:e.target.value}:x))} style={{...inp,width:"100%",minWidth:130,fontSize:11,padding:"5px 9px"}}/></td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green,textAlign:"center"}}>{ld.length}</td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(rc)}</td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(cm)}</td>
                    <td style={{padding:"5px 11px"}}><button onClick={()=>{if(confirm("Remove "+d.name+"?"))setDrivers(ds=>ds.filter((_,j)=>j!==i));}} style={{background:C.red+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="trash" size={12} color={C.red}/></button></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
          {showD?(
            <div style={{background:th.s2,border:"1px solid "+th.bd,borderRadius:12,padding:16,marginBottom:12}}>
              <div style={{fontWeight:600,marginBottom:10,fontSize:13}}>Add New Driver</div>
              <div style={{display:"flex",gap:9,flexWrap:"wrap",alignItems:"flex-end"}}>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Name *</div><input style={{...inp,minWidth:150}} placeholder="Driver name" value={nd.name} onChange={e=>setNd(s=>({...s,name:e.target.value}))}/></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Rate % *</div><input type="number" style={{...inp,width:70}} placeholder="8" value={nd.rate} onChange={e=>setNd(s=>({...s,rate:e.target.value}))}/></div>
                <div style={{flex:1,minWidth:130}}><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Notes</div><input style={{...inp,width:"100%"}} placeholder="RC x 8%" value={nd.note} onChange={e=>setNd(s=>({...s,note:e.target.value}))}/></div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>{if(!nd.name||!nd.rate){alert("Name & Rate required");return;}setDrivers(ds=>[...ds,{name:nd.name,rate:parseFloat(nd.rate)||0,note:nd.note||"RC x "+nd.rate+"%"}]);setNd({name:"",rate:"",note:""});setShowD(false);}} style={{background:C.green,color:"#fff",border:"none",borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Add</button>
                  <button onClick={()=>setShowD(false)} style={{background:th.surf,color:th.muted,border:"1px solid "+th.bd,borderRadius:9,padding:"8px 11px",fontSize:12,cursor:"pointer"}}>Cancel</button>
                </div>
              </div>
            </div>
          ):(
            <button onClick={()=>setShowD(true)} style={{background:C.green+"18",border:"1px dashed "+C.green+"55",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer",color:C.green,display:"flex",alignItems:"center",gap:7}}><Icon name="plus" size={15} color={C.green}/>Add New Driver</button>
          )}
        </div>
      )}
      {tab==="emp"&&(
        <div>
          <div style={{overflowX:"auto",marginBottom:16}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:th.s2}}>{["#","Name","Role","Rate %","Jun Loads","Jun Comm",""].map(h=><th key={h} style={{textAlign:"left",padding:"9px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{employees.map((d,i)=>{
                const ml=JUNE_LOADS.filter(l=>l.bb&&l.bb.toLowerCase().includes(d.name.toLowerCase()));
                const cm=ml.filter(l=>l.pay==="Paid").reduce((s,l)=>s+(l.inv||0),0);
                const ed=editE===d.id;
                return (
                  <tr key={d.id} style={{borderBottom:"1px solid "+th.bd,background:i%2===0?th.surf:th.s2}}>
                    <td style={{padding:"9px 11px",color:th.muted,fontSize:10}}>{i+1}</td>
                    {ed?(
                      <>
                        <td style={{padding:"5px 11px"}}><input value={d.name} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,name:e.target.value}:x))} style={{...inp,width:110}}/></td>
                        <td style={{padding:"5px 11px"}}><select value={d.role} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,role:e.target.value}:x))} style={{...inp,cursor:"pointer"}}><option>Dispatcher</option><option>Sales</option><option>Manager</option></select></td>
                        <td style={{padding:"5px 11px"}}><div style={{display:"flex",alignItems:"center",gap:5}}><input type="number" value={d.pct} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,pct:parseFloat(e.target.value)||0}:x))} style={{...inp,width:54,padding:"5px 7px",background:"#FFFF0022",border:"1px solid #FFFF0066",fontWeight:700,color:C.yellow,textAlign:"center"}}/><span style={{color:th.muted,fontSize:11}}>%</span></div></td>
                      </>
                    ):(
                      <>
                        <td style={{padding:"9px 11px",fontWeight:700}}>{d.name}</td>
                        <td style={{padding:"9px 11px",color:th.muted}}>{d.role}</td>
                        <td style={{padding:"9px 11px"}}><span style={{background:"#FFFF0022",color:C.yellow,fontWeight:700,padding:"2px 9px",borderRadius:20,fontSize:11}}>{d.pct}%</span></td>
                      </>
                    )}
                    <td style={{padding:"9px 11px",fontWeight:700,textAlign:"center"}}>{ml.length}</td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(cm)}</td>
                    <td style={{padding:"5px 11px"}}>
                      <div style={{display:"flex",gap:5}}>
                        {ed?<button onClick={()=>setEditE(null)} style={{background:C.green+"22",color:C.green,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:11,fontWeight:600}}>Done</button>:<button onClick={()=>setEditE(d.id)} style={{background:C.accent+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="edit" size={12} color={C.accent}/></button>}
                        <button onClick={()=>{if(confirm("Remove "+d.name+"?"))setEmployees(es=>es.filter(x=>x.id!==d.id));}} style={{background:C.red+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="trash" size={12} color={C.red}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
          {showE?(
            <div style={{background:th.s2,border:"1px solid "+th.bd,borderRadius:12,padding:16,marginBottom:12}}>
              <div style={{fontWeight:600,marginBottom:10,fontSize:13}}>Add New Employee</div>
              <div style={{display:"flex",gap:9,flexWrap:"wrap",alignItems:"flex-end"}}>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Name *</div><input style={{...inp,minWidth:140}} placeholder="Name" value={ne.name} onChange={e=>setNe(s=>({...s,name:e.target.value}))}/></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Role</div><select style={{...inp,cursor:"pointer"}} value={ne.role} onChange={e=>setNe(s=>({...s,role:e.target.value}))}><option>Dispatcher</option><option>Sales</option><option>Manager</option></select></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Rate %</div><input type="number" style={{...inp,width:70}} placeholder="10" value={ne.pct} onChange={e=>setNe(s=>({...s,pct:e.target.value}))}/></div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>{if(!ne.name){alert("Name required");return;}setEmployees(es=>[...es,{id:gid(),name:ne.name,role:ne.role,pct:parseFloat(ne.pct)||0}]);setNe({name:"",role:"Dispatcher",pct:""});setShowE(false);}} style={{background:C.green,color:"#fff",border:"none",borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Add</button>
                  <button onClick={()=>setShowE(false)} style={{background:th.surf,color:th.muted,border:"1px solid "+th.bd,borderRadius:9,padding:"8px 11px",fontSize:12,cursor:"pointer"}}>Cancel</button>
                </div>
              </div>
            </div>
          ):(
            <button onClick={()=>setShowE(true)} style={{background:C.green+"18",border:"1px dashed "+C.green+"55",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:600,cursor:"pointer",color:C.green,display:"flex",alignItems:"center",gap:7}}><Icon name="plus" size={15} color={C.green}/>Add New Employee</button>
          )}
        </div>
      )}
    </div>
  );
}

function LoadsPage({th,loads,setLoads,employees,drivers,setModal,toast}){
  const[search,setSearch]=useState("");
  const[sf,setSf]=useState("All");
  const[pf,setPf]=useState("All");
  const all=loads.concat(JUNE_LOADS);
  const filtered=useMemo(()=>{
    let l=all.slice();
    if(search)l=l.filter(x=>[x.dn,x.bk,x.bb,x.pl].some(f=>(f||"").toLowerCase().includes(search.toLowerCase())));
    if(sf!=="All")l=l.filter(x=>x.st===sf);
    if(pf!=="All")l=l.filter(x=>x.pay===pf);
    return l.sort((a,b)=>new Date(b.pd||0)-new Date(a.pd||0));
  },[loads,search,sf,pf]);
  const del=id=>{if(confirm("Delete?")){setLoads(l=>l.filter(x=>x.id!==id));toast("Deleted");}};
  const dup=ld=>{setLoads(l=>[{...ld,id:gid(),pd:new Date().toISOString().slice(0,10)},...l]);toast("Duplicated");};
  const tog=id=>setLoads(l=>l.map(x=>x.id===id?{...x,pay:x.pay==="Paid"?"Unpaid":"Paid"}:x));
  const sel={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"8px 11px",fontSize:12};
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:9}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>Loads <span style={{fontSize:12,color:th.muted,fontWeight:400}}>({filtered.length})</span></h2>
        <button onClick={()=>setModal({type:"load"})} style={{background:C.accent,color:"#fff",border:"none",borderRadius:11,padding:"9px 16px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:7}}><Icon name="plus" size={15} color="#fff"/>Add Load</button>
      </div>
      <div style={{display:"flex",gap:9,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:170,position:"relative"}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={14} color={th.muted}/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search loads..." style={{...sel,paddingLeft:30,width:"100%"}}/>
        </div>
        <select value={sf} onChange={e=>setSf(e.target.value)} style={sel}><option>All</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
        <select value={pf} onChange={e=>setPf(e.target.value)} style={sel}><option>All</option><option>Paid</option><option>Unpaid</option></select>
      </div>
      {filtered.length===0?<div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:"50px 20px",textAlign:"center",color:th.muted}}>No loads found.</div>:(
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {filtered.map(l=>{
            const isJ=l.id.charAt(0)==="j";
            return <LoadCard key={l.id} l={l} th={th} isJune={isJ} onEdit={()=>!isJ&&setModal({type:"load",data:l})} onDup={()=>dup(l)} onDel={()=>!isJ&&del(l.id)} onTog={()=>!isJ&&tog(l.id)}/>;
          })}
        </div>
      )}
    </div>
  );
}

function LoadCard({l,th,isJune,onEdit,onDup,onDel,onTog}){
  const[ex,setEx]=useState(false);
  return (
    <div style={{background:th.surf,border:"1px solid "+(isJune?"#0EA5E944":th.bd),borderRadius:13,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setEx(e=>!e)}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontWeight:700,fontSize:13}}>{l.dn||"?"}</span>
            {isJune&&<span style={{background:"#0EA5E922",color:"#0EA5E9",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20}}>JUN</span>}
            <Badge color={statusColor(l.st)}>{l.st}</Badge>
            <Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay||"Unpaid"}</Badge>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",fontSize:11,color:th.muted}}>
            <span>{l.bk||"-"}</span><span>{l.pl||"-"}</span><span>{fdate(l.pd)}</span>
          </div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:700,color:C.green}}>{money(l.inv)}</div>
          <div style={{fontSize:10,color:th.muted}}>RC: {money(l.rc)}</div>
        </div>
      </div>
      {ex&&(
        <div style={{borderTop:"1px solid "+th.bd,padding:"12px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:9,marginBottom:12,fontSize:11}}>
            {[["Booked By",l.bb],["Broker",l.bk],["RC",money(l.rc)],["Detention",money(l.det||0)],["Delivery",fdate(l.dd)],["Route",(l.pl||"")+" - "+(l.dl||"")]].map(r=>(
              <div key={r[0]}><div style={{color:th.muted,fontSize:9,marginBottom:1}}>{r[0]}</div><div style={{fontWeight:500}}>{r[1]||"-"}</div></div>
            ))}
          </div>
          {l.cm&&<div style={{background:th.s2,borderRadius:8,padding:"7px 11px",fontSize:11,marginBottom:10,color:th.muted}}>{l.cm}</div>}
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {!isJune&&<button onClick={onEdit} style={{background:C.accent+"22",color:C.accent,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={12} color={C.accent}/>Edit</button>}
            <button onClick={onDup} style={{background:th.s2,color:th.text,border:"1px solid "+th.bd,borderRadius:8,padding:"6px 11px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="copy" size={12} color={th.muted}/>Dup</button>
            {!isJune&&<button onClick={onTog} style={{background:(l.pay==="Paid"?C.yellow:C.green)+"22",color:l.pay==="Paid"?C.yellow:C.green,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l.pay==="Paid"?"Mark Unpaid":"Mark Paid"}</button>}
            {!isJune&&<button onClick={onDel} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="trash" size={12} color={C.red}/>Del</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function EmployeesPage({th,employees}){
  const[sel,setSel]=useState(null);
  if(sel){
    const d=employees.find(x=>x.id===sel);
    if(!d)return null;
    const ml=JUNE_LOADS.filter(l=>l.bb&&l.bb.toLowerCase().includes(d.name.toLowerCase()));
    const pl=ml.filter(l=>l.pay==="Paid");
    return (
      <div>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back"}</button>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:18}}>{d.name.charAt(0)}</div>
          <div><div style={{fontWeight:700,fontSize:17}}>{d.name}</div><div style={{fontSize:12,color:th.muted}}>{d.role} - <span style={{color:C.yellow,fontWeight:700}}>{d.pct}% default</span></div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:10,marginBottom:16}}>
          <Stat th={th} label="June Loads" value={ml.length} color={C.accent} icon="box"/>
          <Stat th={th} label="Paid Loads" value={pl.length} color={C.green} icon="check"/>
          <Stat th={th} label="RC (Paid)" value={money(pl.reduce((s,l)=>s+(l.rc||0),0))} color={C.green} icon="dollar"/>
          <Stat th={th} label="Commission" value={money(pl.reduce((s,l)=>s+(l.inv||0),0))} color={C.green} icon="pay"/>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12}}>June Load History</div>
          {ml.length===0?<div style={{color:th.muted,fontSize:13}}>No loads booked by {d.name} in June.</div>:(
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>{["Driver","Broker","RC","Invoice","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 9px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd}}>{h}</th>)}</tr></thead>
              <tbody>{ml.map(l=>(
                <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                  <td style={{padding:"8px 9px"}}>{l.dn}</td>
                  <td style={{padding:"8px 9px",color:th.muted}}>{l.bk||"-"}</td>
                  <td style={{padding:"8px 9px"}}>{money(l.rc)}</td>
                  <td style={{padding:"8px 9px",fontWeight:700,color:l.pay==="Paid"?C.green:C.yellow}}>{money(l.inv)}</td>
                  <td style={{padding:"8px 9px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>Employees</h2>
        <span style={{fontSize:11,color:th.muted}}>Edit % in June 2026 - Rate Editor</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:11}}>
        {employees.map(d=>{
          const ml=JUNE_LOADS.filter(l=>l.bb&&l.bb.toLowerCase().includes(d.name.toLowerCase()));
          const cm=ml.filter(l=>l.pay==="Paid").reduce((s,l)=>s+(l.inv||0),0);
          return (
            <div key={d.id} onClick={()=>setSel(d.id)} style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:16,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <div style={{width:33,height:33,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:14}}>{d.name.charAt(0)}</div>
                  <div><div style={{fontWeight:600,fontSize:13}}>{d.name}</div><div style={{fontSize:10,color:th.muted}}>{d.role}</div></div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <span style={{background:"#FFFF0022",color:C.yellow,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{d.pct}%</span>
                  <Icon name="arrow" size={13} color={th.muted}/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                <div><div style={{fontSize:9,color:th.muted}}>Jun Loads</div><div style={{fontWeight:700,fontSize:13}}>{ml.length}</div></div>
                <div><div style={{fontSize:9,color:th.muted}}>Jun Commission</div><div style={{fontWeight:700,color:C.green,fontSize:12}}>{money(cm)}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PayrollPage({th,employees}){
  const[month,setMonth]=useState("2026-06");
  const isJune=month==="2026-06";
  const stats=employees.map(d=>{
    const ml=isJune?JUNE_LOADS.filter(l=>l.bb&&l.bb.toLowerCase().includes(d.name.toLowerCase())):[];
    const earned=ml.filter(l=>l.pay==="Paid").reduce((s,l)=>s+(l.inv||0),0);
    return {...d,earned,loads:ml.length};
  }).filter(d=>d.earned>0||d.loads>0);
  const total=stats.reduce((s,d)=>s+d.earned,0);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:9}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>Payroll</h2>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"7px 11px",fontSize:13}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Total Earned" value={money(total)} color={C.green} icon="dollar"/>
        <Stat th={th} label="Employees" value={stats.length} color={C.accent} icon="users"/>
      </div>
      {stats.length===0?<div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:"50px 20px",textAlign:"center",color:th.muted}}>{isJune?"No commission data.":"Select June 2026."}</div>:(
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{background:th.s2}}>{["Employee","Role","Rate","Loads","Commission"].map(h=><th key={h} style={{textAlign:"left",padding:"11px 14px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd}}>{h}</th>)}</tr></thead>
            <tbody>{stats.map(e=>(
              <tr key={e.id} style={{borderBottom:"1px solid "+th.bd}}>
                <td style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:28,height:28,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:11}}>{e.name.charAt(0)}</div><span style={{fontWeight:600}}>{e.name}</span></div></td>
                <td style={{padding:"12px 14px",color:th.muted,fontSize:12}}>{e.role}</td>
                <td style={{padding:"12px 14px"}}><span style={{background:"#FFFF0022",color:C.yellow,fontWeight:700,padding:"2px 8px",borderRadius:20,fontSize:11}}>{e.pct}%</span></td>
                <td style={{padding:"12px 14px",fontWeight:600,textAlign:"center"}}>{e.loads}</td>
                <td style={{padding:"12px 14px",fontWeight:700,color:C.green}}>{money(e.earned)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ReportsPage({th}){
  const paid=JUNE_LOADS.filter(l=>l.pay==="Paid"),unpaid=JUNE_LOADS.filter(l=>l.pay==="Unpaid");
  const by={};
  JUNE_LOADS.forEach(l=>{if(!by[l.dn])by[l.dn]={n:l.dn,loads:0,rc:0,comm:0,paid:0};by[l.dn].loads++;by[l.dn].rc+=l.rc||0;by[l.dn].comm+=l.inv||0;if(l.pay==="Paid")by[l.dn].paid+=l.inv||0;});
  const rows=Object.values(by).sort((a,b)=>b.rc-a.rc);
  return (
    <div>
      <h2 style={{margin:"0 0 16px",fontSize:19,fontWeight:700}}>Reports - June 2026</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Total Loads" value={JUNE_LOADS.length} color={C.accent} icon="box"/>
        <Stat th={th} label="Paid Loads" value={paid.length} color={C.green} icon="check"/>
        <Stat th={th} label="Unpaid Loads" value={unpaid.length} color={C.yellow} icon="dollar"/>
        <Stat th={th} label="Total RC" value={money(JUNE_LOADS.reduce((s,l)=>s+(l.rc||0),0))} color={C.accent} icon="dollar"/>
        <Stat th={th} label="Paid Commission" value={money(paid.reduce((s,l)=>s+(l.inv||0),0))} color={C.green} icon="pay"/>
        <Stat th={th} label="Pending Commission" value={money(unpaid.reduce((s,l)=>s+(l.inv||0),0))} color={C.yellow} icon="pay"/>
      </div>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
        <div style={{fontWeight:600,marginBottom:12}}>Driver Performance</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Driver","Loads","Total RC","Commission","Paid Comm"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>{rows.map(d=>(
              <tr key={d.n} style={{borderBottom:"1px solid "+th.bd}}>
                <td style={{padding:"9px 11px",fontWeight:700}}>{d.n}</td>
                <td style={{padding:"9px 11px",textAlign:"center"}}>{d.loads}</td>
                <td style={{padding:"9px 11px",fontWeight:600}}>{money(d.rc)}</td>
                <td style={{padding:"9px 11px",fontWeight:600}}>{money(d.comm)}</td>
                <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(d.paid)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LoadModal({data,close,th,employees,drivers,setLoads,toast}){
  const blank={dn:"",bb:"",bk:"",rc:"",inv:"",pd:"",pl:"",dd:"",dl:"",st:"Pending",pay:"Unpaid",cm:""};
  const[f,setF]=useState(data||blank);
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const save=()=>{
    if(!f.dn||!f.inv){alert("Driver & Invoice required");return;}
    if(data){setLoads(l=>l.map(x=>x.id===data.id?{...f,id:data.id}:x));toast("Updated");}
    else{setLoads(l=>[{...f,id:gid(),pd:f.pd||new Date().toISOString().slice(0,10),rc:parseFloat(f.rc)||0,inv:parseFloat(f.inv)||0},...l]);toast("Load added");}
    close();
  };
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"9px 12px",fontSize:13,width:"100%",marginBottom:9};
  const lb=t=><label style={{fontSize:10,color:th.muted,fontWeight:500,display:"block",marginBottom:3}}>{t}</label>;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:14}} onClick={e=>e.target===e.currentTarget&&close()}>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:18,padding:22,width:"100%",maxWidth:500,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:16}}>{data?"Edit Load":"New Load"}</div>
          <button onClick={close} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="close" size={19} color={th.muted}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 11px"}}>
          <div style={{gridColumn:"1 / -1"}}>{lb("Driver *")}<select style={inp} value={f.dn} onChange={set("dn")}><option value="">Select Driver</option>{drivers.map(d=><option key={d.name}>{d.name}</option>)}</select></div>
          <div>{lb("Booked By")}<select style={inp} value={f.bb} onChange={set("bb")}><option value="">-</option>{employees.map(d=><option key={d.id}>{d.name}</option>)}</select></div>
          <div>{lb("Broker")}<input style={inp} placeholder="Broker" value={f.bk} onChange={set("bk")}/></div>
          <div>{lb("RC Amount ($)")}<input style={inp} type="number" value={f.rc} onChange={set("rc")}/></div>
          <div>{lb("Invoice Amount ($) *")}<input style={inp} type="number" value={f.inv} onChange={set("inv")}/></div>
          <div>{lb("Pickup Date")}<input style={inp} type="date" value={f.pd} onChange={set("pd")}/></div>
          <div>{lb("Delivery Date")}<input style={inp} type="date" value={f.dd} onChange={set("dd")}/></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Pickup Location")}<input style={inp} placeholder="City, State" value={f.pl} onChange={set("pl")}/></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Delivery Location")}<input style={inp} placeholder="City, State" value={f.dl} onChange={set("dl")}/></div>
          <div>{lb("Status")}<select style={inp} value={f.st} onChange={set("st")}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
          <div>{lb("Pay Status")}<select style={inp} value={f.pay} onChange={set("pay")}><option>Unpaid</option><option>Paid</option></select></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Comments")}<textarea style={{...inp,height:64,resize:"vertical"}} value={f.cm} onChange={set("cm")}/></div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:4}}>
          <button onClick={save} style={{flex:1,background:C.accent,color:"#fff",border:"none",borderRadius:11,padding:"12px",fontSize:14,fontWeight:600,cursor:"pointer"}}>{data?"Update":"Add Load"}</button>
          <button onClick={close} style={{background:th.s2,color:th.text,border:"1px solid "+th.bd,borderRadius:11,padding:"12px 16px",fontSize:14,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[dark,setDark]=useLS("rm2_dark",true);
  const[user,setUser]=useLS("rm2_user",null);
  const[page,setPage]=useState("dashboard");
  const[sb,setSb]=useState(false);
  const[loads,setLoads]=useLS("rm2_loads",[]);
  const[employees,setEmployees]=useLS("rm2_emp",DEFAULT_EMPLOYEES);
  const[drivers,setDrivers]=useLS("rm2_drivers",DEFAULT_DRIVERS);
  const[toastMsg,setToastMsg]=useState(null);
  const[modal,setModal]=useState(null);
  const th=dark?{bg:C.bg.d,surf:C.surf.d,s2:C.s2.d,bd:C.bd.d,text:C.text.d,muted:C.muted.d}:{bg:C.bg.l,surf:C.surf.l,s2:C.s2.l,bd:C.bd.l,text:C.text.l,muted:C.muted.l};
  const toast=m=>{setToastMsg(m);setTimeout(()=>setToastMsg(null),2500);};
  if(!user)return <Login th={th} onLogin={setUser}/>;
  const NAV=[["dashboard","Home","home"],["june","June 2026","cal"],["loads","Loads","box"],["employees","Employees","users"],["payroll","Payroll","pay"],["reports","Reports","chart"],["settings","Settings","gear"]];
  const cp={th,loads,setLoads,employees,setEmployees,drivers,setDrivers,toast,setModal};
  let body;
  if(page==="dashboard")body=<Dashboard {...cp} setPage={setPage}/>;
  else if(page==="june")body=<JunePage {...cp}/>;
  else if(page==="loads")body=<LoadsPage {...cp}/>;
  else if(page==="employees")body=<EmployeesPage {...cp}/>;
  else if(page==="payroll")body=<PayrollPage {...cp}/>;
  else if(page==="reports")body=<ReportsPage th={th}/>;
  else body=(
    <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:24}}>
      <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>Settings</div>
      {user.role!=="Owner"?<div style={{color:th.muted}}>Owner access only.</div>:(
        <div>
          <div style={{fontWeight:600,marginBottom:12}}>User Roles (Demo)</div>
          {[["Ali Bhai","owner@routemate.com","Owner"],["Raza","dispatcher@routemate.com","Dispatcher"],["Viewer","viewer@routemate.com","Viewer"]].map(u=>(
            <div key={u[1]} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 0",borderBottom:"1px solid "+th.bd}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:13}}>{u[0].charAt(0)}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{u[0]}</div><div style={{fontSize:11,color:th.muted}}>{u[1]}</div></div>
              <Badge color={u[2]==="Owner"?"purple":u[2]==="Dispatcher"?"blue":"gray"}>{u[2]}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  const mob=typeof window!=="undefined"&&window.innerWidth<768;
  return (
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif",display:"flex"}}>
      <aside style={{width:210,minHeight:"100vh",background:th.surf,borderRight:"1px solid "+th.bd,display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,bottom:0,zIndex:100,transform:(sb||!mob)?"translateX(0)":"translateX(-100%)",transition:"transform .25s ease"}}>
        <div style={{padding:"18px 14px 13px",borderBottom:"1px solid "+th.bd}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#4F6EF7,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="truck" size={15} color="#fff"/></div>
            <div><div style={{fontWeight:700,fontSize:13}}>RouteMate</div><div style={{fontSize:9,color:th.muted}}>Dispatch Manager</div></div>
          </div>
        </div>
        <nav style={{flex:1,padding:"9px 7px",overflowY:"auto"}}>
          {NAV.map(n=>(
            <button key={n[0]} onClick={()=>{setPage(n[0]);setSb(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:9,border:"none",cursor:"pointer",marginBottom:2,background:page===n[0]?C.accent+"22":"transparent",color:page===n[0]?C.accent:th.muted,fontWeight:page===n[0]?600:400,fontSize:12}}>
              <Icon name={n[2]} size={16} color={page===n[0]?C.accent:th.muted}/>{n[1]}
              {n[0]==="june"&&<span style={{marginLeft:"auto",background:"#0EA5E922",color:"#0EA5E9",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:20}}>58</span>}
            </button>
          ))}
        </nav>
        <div style={{padding:"9px 7px 16px",borderTop:"1px solid "+th.bd}}>
          <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 10px",marginBottom:5}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:C.accent+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.accent}}>{(user.name||"U").charAt(0)}</div>
            <div><div style={{fontSize:11,fontWeight:600}}>{user.name}</div><div style={{fontSize:9,color:th.muted}}>{user.role}</div></div>
          </div>
          <button onClick={()=>setDark(d=>!d)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:th.muted,fontSize:11,marginBottom:3}}><Icon name={dark?"sun":"moon"} size={14} color={th.muted}/>{dark?"Light Mode":"Dark Mode"}</button>
          <button onClick={()=>setUser(null)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:C.red,fontSize:11}}><Icon name="logout" size={14} color={C.red}/>Sign Out</button>
        </div>
      </aside>
      {sb&&<div onClick={()=>setSb(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:99}}/>}
      <div style={{flex:1,marginLeft:mob?0:210,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",background:th.surf,borderBottom:"1px solid "+th.bd,position:"sticky",top:0,zIndex:50}}>
          {mob?<button onClick={()=>setSb(s=>!s)} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="menu" size={20} color={th.text}/></button>:<div/>}
          <div style={{fontWeight:700,fontSize:15}}>{(NAV.find(n=>n[0]===page)||[])[1]||"RouteMate"}</div>
          <button onClick={()=>setDark(d=>!d)} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name={dark?"sun":"moon"} size={18} color={th.muted}/></button>
        </header>
        <main style={{flex:1,padding:"16px 14px",maxWidth:1160,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>{body}</main>
        {mob&&(
          <nav style={{display:"flex",justifyContent:"space-around",padding:"6px 0 10px",background:th.surf,borderTop:"1px solid "+th.bd,position:"sticky",bottom:0}}>
            {NAV.slice(0,5).map(n=>(
              <button key={n[0]} onClick={()=>setPage(n[0])} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 7px",border:"none",cursor:"pointer",background:"transparent",color:page===n[0]?C.accent:th.muted}}>
                <Icon name={n[2]} size={20} color={page===n[0]?C.accent:th.muted}/>
                <span style={{fontSize:9,fontWeight:page===n[0]?600:400}}>{n[1]}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
      {toastMsg&&<div style={{position:"fixed",bottom:72,left:"50%",transform:"translateX(-50%)",background:C.green,color:"#fff",padding:"10px 20px",borderRadius:11,fontWeight:600,fontSize:13,zIndex:999}}>{toastMsg}</div>}
      {modal&&modal.type==="load"&&<LoadModal data={modal.data} close={()=>setModal(null)} th={th} employees={employees} drivers={drivers} setLoads={setLoads} toast={toast}/>}
      <style>{"*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#444;border-radius:4px;}input,select,textarea{outline:none;}button{font-family:inherit;}"}</style>
    </div>
  );
}
