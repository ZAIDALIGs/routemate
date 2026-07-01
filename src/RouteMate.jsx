import { useState, useMemo, useCallback, useEffect } from "react";
import { saveData, listenData } from "./firebase";

const C = {
  bg:{d:"#0A0A0F",l:"#F5F5F7"}, surf:{d:"#111118",l:"#FFFFFF"},
  s2:{d:"#1C1C26",l:"#F0F0F5"}, bd:{d:"#2A2A3A",l:"#D1D1D6"},
  accent:"#4F6EF7", green:"#34C759", red:"#FF3B30", yellow:"#FF9500",
  purple:"#AF52DE", cyan:"#0EA5E9", text:{d:"#F5F5F7",l:"#1D1D1F"}, muted:{d:"#8E8E99",l:"#6E6E73"},
};

const JUNE_LOADS = [
  {id:"j1",dn:"DAN GARRET",bb:"Ali",bk:"Freight Masters",rc:1000,inv:40,factor:3,pd:"2026-06-03",pl:"ADDISON, IL",dd:"2026-06-03",dl:"ELKHART, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j2",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:850,inv:34,factor:3,pd:"2026-06-04",pl:"Fort Wayne, IN",dd:"2026-06-05",dl:"Chicago, IL",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j3",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:1100,inv:44,factor:3,pd:"2026-06-08",pl:"Chicago, IL",dd:"2026-06-09",dl:"Fort Wayne, IN",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j4",dn:"DAN GARRET",bb:"Ali",bk:"FitzMark",rc:900,inv:36,factor:3,pd:"2026-06-09",pl:"Fort Wayne, IN",dd:"2026-06-10",dl:"Dwight, IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j5",dn:"DAN GARRET",bb:"Ali",bk:"ROAR LOGISTICS INC",rc:1100,inv:44,factor:3,pd:"2026-06-10",pl:"Garry, IN",dd:"2026-06-10",dl:"Marion, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j6",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:1100,inv:44,factor:3,pd:"2026-06-11",pl:"Fort Wayne, IN",dd:"2026-06-12",dl:"Decatur, IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j7",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:1800,inv:72,factor:3,pd:"2026-06-16",pl:"Harvard, IL",dd:"2026-06-17",dl:"Greenwood, IN",st:"Delivered",pay:"Paid",cm:""},
  {id:"j8",dn:"DAN GARRET",bb:"Ali",bk:"Fitzmark",rc:1000,inv:40,factor:3,pd:"2026-06-17",pl:"Plainfield, IN",dd:"2026-06-18",dl:"Mount Pleasant, WI",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j9",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:1150,inv:46,factor:3,pd:"2026-06-23",pl:"Romeoville, IL",dd:"2026-06-24",dl:"Greenfield, IN",st:"Booked",pay:"Paid",cm:""},
  {id:"j10",dn:"DAN GARRET",bb:"Ali",bk:"RXO",rc:1000,inv:40,factor:3,pd:"2026-06-24",pl:"Terre Haute, IN",dd:"2026-06-25",dl:"Romeoville, IL",st:"Booked",pay:"Paid",cm:""},
  {id:"j11",dn:"DAN GARRET",bb:"Ali",bk:"",rc:1000,inv:40,factor:3,pd:"2026-06-25",pl:"",dd:"2026-06-25",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j12",dn:"Anderson",bb:"Younus",bk:"Landstar",rc:1900,inv:114,factor:3,pd:"2026-06-22",pl:"BESSEMER AL",dd:"2026-06-23",dl:"HOWELL NJ",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j13",dn:"Anderson",bb:"Younus",bk:"Landstar",rc:2500,inv:150,factor:3,pd:"2026-06-23",pl:"AMELIA CRT HSE VA",dd:"2026-06-25",dl:"S PORTLAND ME",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j14",dn:"Anderson",bb:"Younus",bk:"",rc:1150,inv:69,factor:3,pd:"2026-06-26",pl:"",dd:"2026-06-27",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j15",dn:"Reefer",bb:"Hasnain",bk:"Moeller Logistics LLC",rc:900,inv:45,factor:3,pd:"2026-06-11",pl:"Decatur, IN",dd:"2026-06-12",dl:"Hanover Park, IL",st:"Delivered",pay:"Paid",cm:"*000177"},
  {id:"j16",dn:"Okwardi Opara",bb:"Awais",bk:"TQL",rc:2700,inv:189,factor:3,pd:"2026-06-03",pl:"Tracy, CA",dd:"2026-06-05",dl:"Hereford, TX",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j17",dn:"Okwardi Opara",bb:"Awais",bk:"wwex",rc:2050,inv:143.50,factor:3,pd:"2026-06-02",pl:"LUBBOCK TX",dd:"2026-06-05",dl:"WAKE FOREST NC",st:"Delivered",pay:"Paid",cm:""},
  {id:"j18",dn:"Okwardi Opara",bb:"Awais",bk:"wwex",rc:1100,inv:77,factor:3,pd:"2026-06-04",pl:"ABILENE TX",dd:"2026-06-09",dl:"PHILADELPHIA PA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j19",dn:"Okwardi Opara",bb:"Awais",bk:"CDS Transport",rc:1950,inv:136.50,factor:3,pd:"2026-06-09",pl:"WARMINSTER PA",dd:"2026-06-10",dl:"TULSA OK",st:"Delivered",pay:"Paid",cm:""},
  {id:"j20",dn:"Okwardi Opara",bb:"Awais",bk:"S&S Brokerage",rc:1400,inv:98,factor:3,pd:"2026-06-11",pl:"Cuba, MO",dd:"2026-06-12",dl:"Pulaski, VA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j21",dn:"Okwardi Opara",bb:"Awais",bk:"Freight Flex",rc:5000,inv:350,factor:3,pd:"2026-06-14",pl:"N CHARLESTON SC",dd:"2026-06-16",dl:"ASPEN CO",st:"Delivered",pay:"Paid",cm:""},
  {id:"j22",dn:"Okwardi Opara",bb:"Awais",bk:"Baileys logistics",rc:4700,inv:329,factor:3,pd:"2026-06-17",pl:"Lindon, UT",dd:"2026-06-19",dl:"Atlanta, GA",st:"Delivered",pay:"Paid",cm:""},
  {id:"j23",dn:"Okwardi Opara",bb:"Awais",bk:"General Transportation",rc:3250,inv:227.50,factor:3,pd:"2026-06-19",pl:"Perry, GA",dd:"2026-06-22",dl:"Aurora, CO",st:"Delivered",pay:"Paid",cm:""},
  {id:"j24",dn:"Okwardi Opara",bb:"Awais",bk:"Drove Logistics",rc:3500,inv:245,factor:3,pd:"2026-06-19",pl:"KENNESAW GA",dd:"2026-06-23",dl:"HIGHLANDS RANCH CO",st:"Delivered",pay:"Paid",cm:"inv 000187"},
  {id:"j25",dn:"Okwardi Opara",bb:"Awais",bk:"integrated connection",rc:1800,inv:126,factor:3,pd:"2026-06-23",pl:"LOVELAND CO",dd:"2026-06-24",dl:"CLEBURNE TX",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j26",dn:"Okwardi Opara",bb:"Awais",bk:"Bedrock logistics",rc:2500,inv:175,factor:3,pd:"2026-06-24",pl:"LEWISVILLE TX",dd:"2026-06-25",dl:"CLEVELAND MS",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j27",dn:"Okwardi Opara",bb:"Awais",bk:"TQL",rc:2100,inv:147,factor:3,pd:"2026-06-26",pl:"Olive Branch, MS",dd:"2026-06-29",dl:"Pequannock, NJ",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j28",dn:"Raymond",bb:"Sidra",bk:"Premier Global Transp",rc:2850,inv:171,factor:3,pd:"2026-06-16",pl:"Lexington, KY",dd:"2026-06-17",dl:"Wellesley, MA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j29",dn:"Raymond",bb:"Sidra",bk:"",rc:1150,inv:69,factor:3,pd:"2026-06-20",pl:"",dd:"2026-06-21",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j30",dn:"Raymond",bb:"Sidra",bk:"",rc:2200,inv:132,factor:3,pd:"2026-06-23",pl:"",dd:"2026-06-24",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j31",dn:"Raymond",bb:"Sidra",bk:"",rc:900,inv:54,factor:3,pd:"2026-06-25",pl:"STANLEY NC",dd:"2026-06-25",dl:"CHARLESTON SC",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j32",dn:"Raymond",bb:"Sidra",bk:"",rc:1250,inv:75,factor:3,pd:"2026-06-26",pl:"",dd:"2026-06-27",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j33",dn:"Raymond",bb:"Sidra",bk:"",rc:1400,inv:84,factor:3,pd:"2026-06-27",pl:"",dd:"2026-06-28",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j34",dn:"Jimmy",bb:"Ubair",bk:"legion logistics",rc:1500,inv:99.75,factor:3,pd:"2026-06-05",pl:"RIVERSIDE CA",dd:"2026-06-07",dl:"SCOTTSBLUFF NE",st:"Delivered",pay:"Paid",cm:""},
  {id:"j35",dn:"Jimmy",bb:"Ubair",bk:"Blackbox logistics",rc:1475,inv:98.09,factor:3,pd:"2026-06-09",pl:"Colton, CA",dd:"2026-06-10",dl:"Ely, NV",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j36",dn:"Brian",bb:"Ubair",bk:"GREEN FREIGHT LOGISTICS",rc:400,inv:32,factor:3,pd:"2026-06-03",pl:"BALTIMORE MD",dd:"2026-06-04",dl:"STUARTS DRAFT VA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j37",dn:"Brian",bb:"Ubair",bk:"TQL",rc:1200,inv:96,factor:3,pd:"2026-06-17",pl:"Cranbury, NJ",dd:"2026-06-18",dl:"Zeeland, MI",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j38",dn:"Brian",bb:"Ubair",bk:"",rc:825,inv:66,factor:3,pd:"2026-06-20",pl:"",dd:"2026-06-21",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j39",dn:"Harol",bb:"Ubair",bk:"Tailwind",rc:1400,inv:112,factor:3,pd:"2026-06-03",pl:"ADAIRSVILLE GA",dd:"2026-06-04",dl:"TERRELL TX",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j40",dn:"Harol",bb:"Ubair",bk:"Nations Top Logistics",rc:2100,inv:168,factor:3,pd:"2026-06-19",pl:"Columbus, GA",dd:"2026-06-22",dl:"Shreveport, LA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j41",dn:"Christon",bb:"Younus",bk:"C&W TRANSPORT",rc:900,inv:59.85,factor:3,pd:"2026-06-17",pl:"MINNVILLE TN",dd:"2026-06-18",dl:"EUREKA IL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j42",dn:"Christon",bb:"Younus",bk:"GlobalTraz",rc:1200,inv:79.80,factor:3,pd:"2026-06-17",pl:"New Paris, IN",dd:"2026-06-18",dl:"Columbia, MD",st:"Delivered",pay:"Paid",cm:"174"},
  {id:"j43",dn:"Christon",bb:"Younus",bk:"steamboat Transp",rc:2500,inv:166.25,factor:3,pd:"2026-06-19",pl:"Bensalem, PA",dd:"2026-06-22",dl:"Dallas, TX",st:"Delivered",pay:"Paid",cm:""},
  {id:"j44",dn:"Christon",bb:"Younus",bk:"Show me global",rc:1100,inv:73.15,factor:3,pd:"2026-06-24",pl:"Forney, TX",dd:"2026-06-25",dl:"Kansas City, MO",st:"Picked Up",pay:"Paid",cm:""},
  {id:"j45",dn:"Christon",bb:"Younus",bk:"Central Freight",rc:750,inv:67.5,factor:3,pd:"2026-06-25",pl:"TOPEKA KS",dd:"2026-06-26",dl:"GARDEN CITY KS",st:"Booked",pay:"Unpaid",cm:"KTM"},
  {id:"j46",dn:"Christon",bb:"Younus",bk:"",rc:3400,inv:306,factor:3,pd:"2026-06-27",pl:"",dd:"2026-06-28",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j47",dn:"Cadet",bb:"Zain",bk:"BROKERMAN LOGISTICS",rc:1700,inv:136,factor:3,pd:"2026-06-01",pl:"Noblesville, IN",dd:"2026-06-02",dl:"PENSACOLA FL",st:"Delivered",pay:"Paid",cm:"KTM 154,155"},
  {id:"j48",dn:"Cadet",bb:"Zain",bk:"ATS Logistics",rc:4500,inv:360,factor:3,pd:"2026-06-05",pl:"REDSTONE CENTRAL AL",dd:"2026-06-08",dl:"PELHAM NH",st:"Delivered",pay:"Paid",cm:"KTM 162,163"},
  {id:"j49",dn:"Cadet",bb:"Zain",bk:"Axle Logistics",rc:4100,inv:155.80,factor:3,pd:"2026-06-10",pl:"Mountain Top, PA",dd:"2026-06-13",dl:"San Diego, CA",st:"Delivered",pay:"Paid",cm:"Dirmat 174"},
  {id:"j50",dn:"Cadet",bb:"Zain",bk:"Fitzharris",rc:5000,inv:350,factor:3,pd:"2026-06-14",pl:"CHULA VISTA CA",dd:"2026-06-16",dl:"INDIANAPOLIS IN",st:"Delivered",pay:"Paid",cm:"KTM 175,176"},
  {id:"j51",dn:"Cadet",bb:"Zain",bk:"Armstrong Transport",rc:3300,inv:231,factor:3,pd:"2026-06-18",pl:"Fithian, IL",dd:"2026-06-19",dl:"Lincoln, ME",st:"Delivered",pay:"Paid",cm:"KTM 183,184"},
  {id:"j52",dn:"Cadet",bb:"Zain",bk:"",rc:4200,inv:294,factor:3,pd:"2026-06-24",pl:"",dd:"2026-06-25",dl:"",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j53",dn:"Rodney",bb:"Yasir Arfat",bk:"",rc:300,inv:18,factor:3,pd:"2026-06-05",pl:"Cincinnati, OH",dd:"2026-06-06",dl:"Piqua, OH",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j54",dn:"Rodney",bb:"Yasir Arfat",bk:"",rc:350,inv:21,factor:3,pd:"2026-06-05",pl:"Springfield, OH",dd:"2026-06-06",dl:"St Marys, OH",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j55",dn:"Vernon",bb:"Yasir Arfat",bk:"TQL",rc:1000,inv:50,factor:3,pd:"2026-06-16",pl:"Aurora, CO",dd:"2026-06-17",dl:"Casper, WY",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j56",dn:"Anthony",bb:"Yasir Arfat",bk:"TQL",rc:2500,inv:125,factor:3,pd:"2026-06-17",pl:"San Diego, CA",dd:"2026-06-19",dl:"Idaho Falls, ID",st:"Delivered",pay:"Paid",cm:"Zelle"},
  {id:"j57",dn:"Anthony",bb:"Yasir Arfat",bk:"",rc:2900,inv:145,factor:3,pd:"2026-06-22",pl:"",dd:"2026-06-23",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j58",dn:"Jared",bb:"Yasir Arfat",bk:"",rc:1100,inv:55,factor:3,pd:"2026-06-20",pl:"",dd:"2026-06-21",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j59",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:530,inv:42.40,factor:3,pd:"2026-06-02",pl:"Holiday, FL",dd:"2026-06-02",dl:"Coconut Creek, FL",st:"Delivered",pay:"Paid",cm:"156 5%"},
  {id:"j60",dn:"Desman Hearns",bb:"Tehseen",bk:"Archer Cargo",rc:175,inv:14,factor:3,pd:"2026-06-09",pl:"Tampa, FL",dd:"2026-06-09",dl:"Tampa, FL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j61",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:225,inv:18,factor:3,pd:"2026-06-03",pl:"Plant City, FL",dd:"2026-06-03",dl:"Sarasota, FL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j62",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:400,inv:32,factor:3,pd:"2026-06-22",pl:"Mulberry, FL",dd:"2026-06-22",dl:"Coconut Creek, FL",st:"Delivered",pay:"Paid",cm:""},
  {id:"j63",dn:"Desman Hearns",bb:"Tehseen",bk:"TQL",rc:1000,inv:80,factor:3,pd:"2026-06-24",pl:"Charlotte, NC",dd:"2026-06-25",dl:"Ocala, FL",st:"Booked",pay:"Unpaid",cm:""},
  {id:"j64",dn:"Desman Hearns",bb:"Tehseen",bk:"D&L TRANSPORT",rc:1100,inv:88,factor:3,pd:"2026-06-25",pl:"GREENVILLE SC",dd:"2026-06-26",dl:"OCALA FL",st:"Booked",pay:"Paid",cm:""},
  {id:"j65",dn:"David-Richard",bb:"Zaid",bk:"Brokerman",rc:1800,inv:126,factor:3,pd:"2026-06-16",pl:"Libertyville, IL",dd:"2026-06-17",dl:"Reading, PA",st:"Delivered",pay:"Paid",cm:"KTM"},
  {id:"j66",dn:"David-Richard",bb:"Zaid",bk:"PRADEL LOGISTICS",rc:450,inv:31.50,factor:3,pd:"2026-06-18",pl:"Philadelphia PA",dd:"2026-06-19",dl:"Aberdeen, MD",st:"Delivered",pay:"Paid",cm:"KTM #00178"},
  {id:"j67",dn:"Tyrone",bb:"Zain",bk:"HD Shipping",rc:250,inv:25,factor:3,pd:"2026-06-17",pl:"Chantilly, VA",dd:"2026-06-17",dl:"Chantilly, VA",st:"Delivered",pay:"Unpaid",cm:"KTM"},
  {id:"j68",dn:"Tyrone",bb:"Zain",bk:"Global Tranz",rc:300,inv:30,factor:3,pd:"2026-06-25",pl:"Washington, DC",dd:"2026-06-25",dl:"Springfield, VA",st:"Picked Up",pay:"Unpaid",cm:"KTM"},
  {id:"j69",dn:"Tod (lowboy)",bb:"Ali",bk:"Rapid Transport",rc:2500,inv:125,factor:3,pd:"2026-06-17",pl:"Albany, NY",dd:"2026-06-17",dl:"Braintree, MA",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j70",dn:"Maxwell",bb:"Ali",bk:"",rc:1000,inv:90,factor:3,pd:"2026-06-20",pl:"",dd:"2026-06-21",dl:"",st:"Delivered",pay:"Unpaid",cm:""},
  {id:"j71",dn:"Dashera",bb:"Zain",bk:"",rc:550,inv:38.50,factor:3,pd:"2026-06-15",pl:"",dd:"2026-06-16",dl:"",st:"Delivered",pay:"Paid",cm:""},
];

const DEFAULT_DRIVERS = [
  {name:"DAN GARRET",rate:4,note:"RC x 4%"},
  {name:"Anderson",rate:6,note:"RC x 6% Dirmat"},
  {name:"Reefer",rate:5,note:"Total x 5%"},
  {name:"Edwin",rate:8,note:"RC x 8%"},
  {name:"Okwardi Opara",rate:7,note:"Total x 7%"},
  {name:"Raymond",rate:6,note:"RC x 6%"},
  {name:"Jimmy",rate:7,note:"Total x 7% x 95%"},
  {name:"Brian",rate:8,note:"RC x 8%"},
  {name:"Harol",rate:8,note:"RC x 8%"},
  {name:"Christon",rate:7,note:"Total x 7% x 95% Dirmat"},
  {name:"Cadet",rate:8,note:"RC x 8% / 7% mixed"},
  {name:"Rodney",rate:6,note:"RC x 6%"},
  {name:"Vernon",rate:5,note:"RC x 5%"},
  {name:"Anthony",rate:5,note:"RC x 5%"},
  {name:"Jared",rate:5,note:"RC x 5%"},
  {name:"Desman Hearns",rate:8,note:"RC x 8%"},
  {name:"David-Richard",rate:7,note:"RC x 7%"},
  {name:"Tyrone",rate:10,note:"RC x 10%"},
  {name:"Tod (lowboy)",rate:5,note:"RC x 5%"},
  {name:"Maxwell",rate:9,note:"RC x 9%"},
  {name:"Dashera",rate:7,note:"7% or 20% Dirmat"},
  {name:"Leonard Roy",rate:9.5,note:"MC Lease 9.5%"},
  {name:"Albert Paul",rate:21,note:"21% or 11%"},
  {name:"Larron",rate:10,note:"10% or 9% lease"},
];

const DEFAULT_EMPLOYEES = [
  {id:"e1",name:"Ali Bhai",role:"Dispatcher",pct:40,pass:"alibhai123",assignedDrivers:["DAN GARRET","Tod (lowboy)","Maxwell"],threshold:false,thresholdAmt:1000,basePct:40,bonusPct:45},
  {id:"e2",name:"Raza",role:"Owner",pct:0,pass:"raza123",assignedDrivers:[],threshold:false,thresholdAmt:1000,basePct:0,bonusPct:0},
  {id:"e3",name:"Awais",role:"Dispatcher",pct:35,pass:"awais123",assignedDrivers:["Okwardi Opara"],threshold:false,thresholdAmt:1000,basePct:35,bonusPct:40},
  {id:"e4",name:"Rafay",role:"Dispatcher",pct:20,pass:"rafay123",assignedDrivers:[],threshold:false,thresholdAmt:1000,basePct:20,bonusPct:25},
  {id:"e5",name:"Younus",role:"Dispatcher",pct:25,pass:"younus123",assignedDrivers:["Anderson","Christon"],threshold:false,thresholdAmt:1000,basePct:25,bonusPct:30},
  {id:"e6",name:"Ubair",role:"Dispatcher",pct:25,pass:"ubair123",assignedDrivers:["Jimmy","Brian","Harol"],threshold:false,thresholdAmt:1000,basePct:25,bonusPct:30},
  {id:"e7",name:"Huzaifa",role:"Dispatcher",pct:15,pass:"huzaifa123",assignedDrivers:[],threshold:false,thresholdAmt:1000,basePct:15,bonusPct:20},
  {id:"e8",name:"Zain",role:"Dispatcher",pct:35,pass:"zain123",assignedDrivers:["Cadet","Tyrone","Dashera"],threshold:false,thresholdAmt:1000,basePct:35,bonusPct:40},
  {id:"e9",name:"Kashif",role:"Dispatcher",pct:5,pass:"kashif123",assignedDrivers:[],threshold:false,thresholdAmt:1000,basePct:5,bonusPct:10},
  {id:"e10",name:"Yasir Arfat",role:"Dispatcher",pct:40,pass:"yasir123",assignedDrivers:["Rodney","Vernon","Anthony","Jared"],threshold:false,thresholdAmt:1000,basePct:40,bonusPct:45},
  {id:"e11",name:"Tehseen",role:"Dispatcher",pct:8,pass:"tehseen123",assignedDrivers:["Desman Hearns"],threshold:false,thresholdAmt:1000,basePct:8,bonusPct:13},
  {id:"e12",name:"Sidra",role:"Dispatcher",pct:10,pass:"sidra123",assignedDrivers:["Raymond"],threshold:false,thresholdAmt:1000,basePct:10,bonusPct:15},
  {id:"e13",name:"Zaid",role:"Owner",pct:0,pass:"zaid123",assignedDrivers:["David-Richard"],threshold:false,thresholdAmt:1000,basePct:0,bonusPct:0},
  {id:"e14",name:"Hasnain",role:"Dispatcher",pct:10,pass:"hasnain123",assignedDrivers:["Reefer"],threshold:false,thresholdAmt:1000,basePct:10,bonusPct:15},
];

const ADMIN_USERS = [
  {email:"admin@routemate.com",password:"Admin@2026",name:"Admin",role:"Admin"},
  {email:"raza@routemate.com",password:"Raza@2026",name:"Raza",role:"Owner"},
  {email:"zaid@routemate.com",password:"Zaid@2026",name:"Zaid",role:"Owner"},
];

const STATUSES=["Pending","In Transit","Delivered","Invoiced","Booked","Picked Up","Cancelled"];
function gid(){return Math.random().toString(36).slice(2,9);}
function money(n){return"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
function fdate(d){if(!d)return"-";try{return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}catch{return d;}}
function netInv(load){const f=parseFloat(load.factor)||3;return(parseFloat(load.inv)||0)*(1-f/100);}
function mergeJune(overrides){return JUNE_LOADS.map(l=>overrides&&overrides[l.id]?{...l,...overrides[l.id]}:l);}
function getMonthLoads(month,userLoads,juneOverrides){
  // month format: "2026-06"
  const [yr,mo]=month.split("-").map(Number);
  const juneMerged=mergeJune(juneOverrides);
  // June 2026 hardcoded loads
  const juneBase=month==="2026-06"?juneMerged:[];
  // User-added loads filtered by month
  const userFiltered=(userLoads||[]).filter(l=>{
    if(!l.pd)return false;
    try{const d=new Date(l.pd);return d.getFullYear()===yr&&d.getMonth()+1===mo;}catch{return false;}
  });
  return [...juneBase,...userFiltered];
}

function calcCommission(emp,paidLoads){
  if(!emp||emp.role==="Owner")return 0;
  const myLoads=paidLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===emp.name.toLowerCase().split(" ")[0]);
  if(!emp.threshold){
    return myLoads.reduce((s,l)=>s+netInv(l)*(emp.pct/100),0);
  }
  let running=0,total=0;
  myLoads.forEach(l=>{
    const net=netInv(l);
    if(running>=emp.thresholdAmt){
      total+=net*(emp.bonusPct/100);
    } else if(running+net<=emp.thresholdAmt){
      total+=net*(emp.basePct/100);
    } else {
      const below=emp.thresholdAmt-running;
      const above=net-below;
      total+=below*(emp.basePct/100)+above*(emp.bonusPct/100);
    }
    running+=net;
  });
  return total;
}

function useLS(key,init){
  const[v,sv]=useState(init);
  useEffect(()=>{
    const unsub=listenData(key,(val)=>{sv(val);},init);
    return()=>unsub&&unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[key]);
  const set=useCallback(x=>{sv(p=>{const n=typeof x==="function"?x(p):x;saveData(key,n);return n;});},[key]);
  return[v,set];
}
function useLocal(key,init){
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
  if(name==="owner")return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M12 14c-5 0-8 2.5-8 4v1h16v-1c0-1.5-3-4-8-4z"/><path d="M17 3l1.5 1.5L17 6M7 3L5.5 4.5 7 6"/></svg>;
  if(name==="bolt")return <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if(name==="lock")return <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  return null;
}

function Badge({color,children}){
  const m={green:["#1C3A28","#34C759"],red:["#3A1C1C","#FF3B30"],yellow:["#3A2E1C","#FF9500"],blue:["#1C2A3A","#4F6EF7"],purple:["#2A1C3A","#AF52DE"],cyan:["#0C2A3A","#0EA5E9"],gray:["#2A2A3A","#8E8E99"]};
  const[bg,t]=m[color]||m.gray;
  return <span style={{background:bg,color:t,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,display:"inline-block"}}>{children}</span>;
}
function sColor(s){return{Paid:"green",Delivered:"purple","In Transit":"blue",Booked:"cyan","Picked Up":"blue",Unpaid:"yellow",Pending:"yellow",Cancelled:"red"}[s]||"gray";}

function Stat({label,value,sub,color,icon,th}){
  const col=color||C.accent;
  return(
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

function Login({th,onLogin,employees}){
  const[em,setEm]=useState("");
  const[pw,setPw]=useState("");
  const[err,setErr]=useState("");
  const go=()=>{
    const admin=ADMIN_USERS.find(u=>u.email===em&&u.password===pw);
    if(admin){onLogin(admin);return;}
    const emp=employees.find(e=>e.name.toLowerCase()===em.toLowerCase()&&e.pass===pw);
    if(emp){onLogin({email:em,name:emp.name,role:emp.role==="Owner"?"Owner":"Employee",empId:emp.id});return;}
    setErr("Invalid credentials");
  };
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:12,padding:"13px 15px",fontSize:15,width:"100%",marginBottom:10};
  return(
    <div style={{minHeight:"100vh",background:th.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:380,background:th.surf,borderRadius:20,padding:36,border:"1px solid "+th.bd}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{width:56,height:56,borderRadius:14,background:"linear-gradient(135deg,#4F6EF7,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px"}}><Icon name="truck" size={26} color="#fff"/></div>
          <div style={{fontSize:22,fontWeight:700}}>RouteMate</div>
          <div style={{fontSize:13,color:th.muted,marginTop:3}}>Dispatch Manager</div>
        </div>
        <input style={inp} type="text" placeholder="Email or Name" value={em} onChange={e=>setEm(e.target.value)}/>
        <input style={inp} type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
        {err&&<div style={{color:C.red,fontSize:12,marginBottom:8}}>{err}</div>}
        <button onClick={go} style={{width:"100%",background:C.accent,color:"#fff",border:"none",borderRadius:12,padding:"13px",fontSize:15,fontWeight:600,cursor:"pointer",marginBottom:16}}>Sign In</button>
        <div style={{fontSize:11,color:th.muted,textAlign:"center"}}>Admin: admin@routemate.com / Admin@2026</div>
      </div>
    </div>
  );
}

function EmployeePortal({th,user,employees,drivers,loads,setLoads,juneOverrides,toast}){
  const emp=employees.find(e=>e.id===user.empId);
  const[page,setPage]=useState("myloads");
  const[modal,setModal]=useState(null);
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"8px 12px",fontSize:13};
  if(!emp)return <div style={{padding:40,color:th.muted}}>Employee not found.</div>;
  const juneMerged=mergeJune(juneOverrides);
  const myDriverNames=emp.assignedDrivers||[];
  const allLoads=[...loads,...juneMerged];
  const myLoads=allLoads.filter(l=>myDriverNames.some(d=>l.dn&&l.dn.toLowerCase().includes(d.toLowerCase()))||l.bb===emp.name||(l.bb&&l.bb.toLowerCase().split(" ")[0]===emp.name.toLowerCase().split(" ")[0]));
  const paidMyLoads=myLoads.filter(l=>l.pay==="Paid");
  const myComm=calcCommission(emp,paidMyLoads);
  return(
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif"}}>
      <header style={{background:th.surf,borderBottom:"1px solid "+th.bd,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#4F6EF7,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="truck" size={14} color="#fff"/></div>
          <div><div style={{fontWeight:700,fontSize:14}}>RouteMate</div><div style={{fontSize:10,color:th.muted}}>{emp.name}</div></div>
        </div>
        <div style={{background:C.green+"22",color:C.green,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>Commission: {money(myComm)}</div>
      </header>
      <div style={{padding:"16px 14px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {[["myloads","My Loads","box"],["mydrivers","My Drivers","truck"]].map(t=>(
            <button key={t[0]} onClick={()=>setPage(t[0])} style={{padding:"8px 16px",border:"none",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:600,background:page===t[0]?C.accent:th.s2,color:page===t[0]?"#fff":th.muted,display:"flex",alignItems:"center",gap:6}}>
              <Icon name={t[2]} size={14} color={page===t[0]?"#fff":th.muted}/>{t[1]}
            </button>
          ))}
          <button onClick={()=>setModal({type:"load"})} style={{marginLeft:"auto",background:C.green,color:"#fff",border:"none",borderRadius:9,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
            <Icon name="plus" size={14} color="#fff"/>Add Load
          </button>
        </div>
        {page==="myloads"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
              <Stat th={th} label="My Loads" value={myLoads.length} color={C.accent} icon="box"/>
              <Stat th={th} label="Paid" value={paidMyLoads.length} color={C.green} icon="check"/>
              <Stat th={th} label="My Commission" value={money(myComm)} color={C.green} icon="dollar"/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {myLoads.length===0?<div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:"40px 20px",textAlign:"center",color:th.muted}}>No loads yet.</div>:
              myLoads.map(l=>{
                const isJ=l.id.charAt(0)==="j";
                return(
                  <div key={l.id} style={{background:th.surf,border:"1px solid "+(isJ?"#0EA5E944":th.bd),borderRadius:13,padding:"14px 16px"}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
                          <span style={{fontWeight:700,fontSize:13}}>{l.dn}</span>
                          {isJ&&<span style={{background:"#0EA5E922",color:"#0EA5E9",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20}}>JUN</span>}
                          <Badge color={sColor(l.st)}>{l.st}</Badge>
                          <Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge>
                        </div>
                        <div style={{fontSize:11,color:th.muted}}>{l.bk||"-"} | {l.pl||"-"} | {fdate(l.pd)}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:700,color:C.green,fontSize:14}}>{money(netInv(l))}</div>
                        <div style={{fontSize:9,color:th.muted}}>after {l.factor||3}% fee</div>
                      </div>
                    </div>
                    {!isJ&&(
                      <select value={l.st} onChange={e=>setLoads(ls=>ls.map(x=>x.id===l.id?{...x,st:e.target.value}:x))} style={{...inp,fontSize:11,padding:"5px 9px",width:"auto"}}>
                        {STATUSES.map(s=><option key={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {page==="mydrivers"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:11}}>
            {myDriverNames.length===0?<div style={{color:th.muted,padding:20}}>No drivers assigned yet.</div>:
            myDriverNames.map(dn=>{
              const dLoads=myLoads.filter(l=>l.dn&&l.dn.toLowerCase().includes(dn.toLowerCase()));
              return(
                <div key={dn} style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:16}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>{dn}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                    <div><div style={{fontSize:9,color:th.muted}}>Loads</div><div style={{fontWeight:700}}>{dLoads.length}</div></div>
                    <div><div style={{fontSize:9,color:th.muted}}>Paid</div><div style={{fontWeight:700,color:C.green}}>{dLoads.filter(l=>l.pay==="Paid").length}</div></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {modal&&modal.type==="load"&&<EmpLoadModal emp={emp} drivers={drivers} th={th} close={()=>setModal(null)} setLoads={setLoads} toast={toast} inp={inp}/>}
    </div>
  );
}

function EmpLoadModal({emp,drivers,th,close,setLoads,toast,inp}){
  const myDrvs=emp.assignedDrivers||[];
  const[f,setF]=useState({dn:myDrvs[0]||"",bk:"",rc:"",inv:"",factor:"3",pd:new Date().toISOString().slice(0,10),pl:"",dd:"",dl:"",st:"Booked",pay:"Unpaid",cm:""});
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const net=((parseFloat(f.inv)||0)*(1-(parseFloat(f.factor)||3)/100));
  const save=()=>{
    if(!f.dn||!f.inv){window.alert("Driver and Invoice required");return;}
    setLoads(l=>[{...f,id:gid(),bb:emp.name,rc:parseFloat(f.rc)||0,inv:parseFloat(f.inv)||0,factor:parseFloat(f.factor)||3},...l]);
    toast("Load added");close();
  };
  const lb=t=><label style={{fontSize:10,color:th.muted,fontWeight:500,display:"block",marginBottom:3}}>{t}</label>;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:14}} onClick={e=>e.target===e.currentTarget&&close()}>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:18,padding:22,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:16}}>Add Load</div>
          <button onClick={close} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="close" size={19} color={th.muted}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 11px"}}>
          <div style={{gridColumn:"1 / -1"}}>{lb("Driver *")}<select style={inp} value={f.dn} onChange={set("dn")}><option value="">Select</option>{myDrvs.map(d=><option key={d}>{d}</option>)}</select></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Broker")}<input style={inp} placeholder="Broker name" value={f.bk} onChange={set("bk")}/></div>
          <div>{lb("RC Amount ($)")}<input style={inp} type="number" value={f.rc} onChange={set("rc")}/></div>
          <div>{lb("Invoice Amount ($) *")}<input style={inp} type="number" value={f.inv} onChange={set("inv")}/></div>
          <div>{lb("Payment Fee %")}<input style={inp} type="number" value={f.factor} onChange={set("factor")} placeholder="3"/></div>
          <div style={{padding:"10px 0"}}><div style={{fontSize:10,color:th.muted,marginBottom:2}}>Net Amount</div><div style={{fontSize:16,fontWeight:700,color:C.green}}>{money(net)}</div></div>
          <div>{lb("Pickup Date")}<input style={inp} type="date" value={f.pd} onChange={set("pd")}/></div>
          <div>{lb("Delivery Date")}<input style={inp} type="date" value={f.dd} onChange={set("dd")}/></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Pickup Location")}<input style={inp} placeholder="City, State" value={f.pl} onChange={set("pl")}/></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Delivery Location")}<input style={inp} placeholder="City, State" value={f.dl} onChange={set("dl")}/></div>
          <div>{lb("Status")}<select style={inp} value={f.st} onChange={set("st")}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></div>
          <div>{lb("Pay Status")}<select style={inp} value={f.pay} onChange={set("pay")}><option>Unpaid</option><option>Paid</option></select></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Comments")}<textarea style={{...inp,height:60,resize:"vertical"}} value={f.cm} onChange={set("cm")}/></div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:4}}>
          <button onClick={save} style={{flex:1,background:C.accent,color:"#fff",border:"none",borderRadius:11,padding:"12px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Add Load</button>
          <button onClick={close} style={{background:th.s2,color:th.text,border:"1px solid "+th.bd,borderRadius:11,padding:"12px 16px",fontSize:14,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({th,loads,employees,juneOverrides,setPage}){
  const juneMerged=mergeJune(juneOverrides);
  const allLoads=[...loads,...juneMerged];
  const paidLoads=allLoads.filter(l=>l.pay==="Paid");
  const unpaidLoads=allLoads.filter(l=>l.pay==="Unpaid");
  const totalInv=allLoads.reduce((s,l)=>s+(l.inv||0),0);
  const paidInv=paidLoads.reduce((s,l)=>s+(l.inv||0),0);
  const totalNetPaid=paidLoads.reduce((s,l)=>s+netInv(l),0);
  const totalEmpComm=employees.filter(e=>e.role!=="Owner").reduce((s,e)=>s+calcCommission(e,paidLoads),0);
  const ownerProfit=totalNetPaid-totalEmpComm;
  const recent=allLoads.slice().sort((a,b)=>new Date(b.pd||0)-new Date(a.pd||0)).slice(0,6);
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Total Invoice" value={money(totalInv)} icon="dollar" color={C.accent}/>
        <Stat th={th} label="Paid Invoice" value={money(paidInv)} icon="check" color={C.green}/>
        <Stat th={th} label="Net (after fees)" value={money(totalNetPaid)} icon="dollar" color={C.cyan} sub="After payment fees"/>
        <Stat th={th} label="Employee Comm" value={money(totalEmpComm)} icon="users" color={C.yellow}/>
        <Stat th={th} label="Owner Profit" value={money(ownerProfit)} icon="dollar" color={C.green}/>
        <Stat th={th} label="Raza (50%)" value={money(ownerProfit/2)} icon="owner" color={C.purple}/>
        <Stat th={th} label="Zaid (50%)" value={money(ownerProfit/2)} icon="owner" color={C.purple}/>
        <Stat th={th} label="Unpaid Loads" value={unpaidLoads.length} icon="box" color={C.yellow}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14,marginBottom:18}}>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Quick Actions</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {[["June 2026","cal",C.cyan,"june"],["Add Load","plus",C.accent,"loads"],["Employees","users",C.purple,"employees"],["Owner Revenue","owner",C.purple,"owner"]].map(a=>(
              <button key={a[0]} onClick={()=>setPage(a[3])} style={{background:a[2]+"18",border:"1px solid "+a[2]+"44",borderRadius:11,padding:"11px 8px",cursor:"pointer",color:a[2],fontWeight:600,fontSize:12,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <Icon name={a[1]} size={17} color={a[2]}/>{a[0]}
              </button>
            ))}
          </div>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Owner Split</div>
          <div style={{background:"#1E6B2E22",border:"1px solid #1E6B2E44",borderRadius:11,padding:12,marginBottom:10}}>
            <div style={{fontSize:11,color:th.muted,marginBottom:3}}>Net after fees - Employee commissions</div>
            <div style={{fontSize:18,fontWeight:700,color:C.green}}>{money(ownerProfit)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{textAlign:"center",background:C.purple+"18",borderRadius:10,padding:12}}>
              <div style={{fontSize:11,color:th.muted,marginBottom:4}}>Raza</div>
              <div style={{fontWeight:700,color:C.purple,fontSize:18}}>{money(ownerProfit/2)}</div>
            </div>
            <div style={{textAlign:"center",background:C.purple+"18",borderRadius:10,padding:12}}>
              <div style={{fontSize:11,color:th.muted,marginBottom:4}}>Zaid</div>
              <div style={{fontWeight:700,color:C.purple,fontSize:18}}>{money(ownerProfit/2)}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
        <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Recent Loads</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Driver","Booked By","Invoice","Net","Status","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>{recent.map(l=>(
              <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                <td style={{padding:"8px 10px",fontWeight:600}}>{l.dn}</td>
                <td style={{padding:"8px 10px",color:th.muted}}>{l.bb||"-"}</td>
                <td style={{padding:"8px 10px",fontWeight:700}}>{money(l.inv)}</td>
                <td style={{padding:"8px 10px",color:C.green,fontWeight:700}}>{money(netInv(l))}</td>
                <td style={{padding:"8px 10px"}}><Badge color={sColor(l.st)}>{l.st}</Badge></td>
                <td style={{padding:"8px 10px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OwnerRevenuePage({th,loads,employees,juneOverrides}){
  const juneMerged=mergeJune(juneOverrides);
  const allLoads=[...loads,...juneMerged];
  const paidLoads=allLoads.filter(l=>l.pay==="Paid");
  const totalNetPaid=paidLoads.reduce((s,l)=>s+netInv(l),0);
  const totalEmpComm=employees.filter(e=>e.role!=="Owner").reduce((s,e)=>s+calcCommission(e,paidLoads),0);
  const ownerProfit=totalNetPaid-totalEmpComm;
  const razaShare=ownerProfit/2;
  const zaidShare=ownerProfit/2;

  // Monthly breakdown
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyData=months.map((m,idx)=>{
    const mLoads=paidLoads.filter(l=>{try{return new Date(l.pd).getMonth()===idx&&new Date(l.pd).getFullYear()===2026;}catch{return false;}});
    const mNet=mLoads.reduce((s,l)=>s+netInv(l),0);
    const mComm=employees.filter(e=>e.role!=="Owner").reduce((s,e)=>s+calcCommission(e,mLoads),0);
    const mProfit=mNet-mComm;
    return{m,loads:mLoads.length,net:mNet,comm:mComm,profit:mProfit};
  }).filter(m=>m.loads>0);

  // Per employee commission breakdown
  const empComms=employees.filter(e=>e.role!=="Owner").map(e=>({
    name:e.name,
    comm:calcCommission(e,paidLoads),
    loads:paidLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===e.name.toLowerCase().split(" ")[0]).length
  })).filter(e=>e.comm>0).sort((a,b)=>b.comm-a.comm);

  return(
    <div>
      <h2 style={{margin:"0 0 18px",fontSize:19,fontWeight:700}}>Owner Revenue</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Net Revenue" value={money(totalNetPaid)} color={C.cyan} icon="dollar" sub="After payment fees"/>
        <Stat th={th} label="Employee Comm" value={money(totalEmpComm)} color={C.yellow} icon="users"/>
        <Stat th={th} label="Owner Profit" value={money(ownerProfit)} color={C.green} icon="dollar"/>
        <Stat th={th} label="Raza (50%)" value={money(razaShare)} color={C.purple} icon="owner"/>
        <Stat th={th} label="Zaid (50%)" value={money(zaidShare)} color={C.purple} icon="owner"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:20}}>
          <div style={{fontWeight:600,marginBottom:16,fontSize:14}}>Raza Earnings</div>
          <div style={{background:C.purple+"18",borderRadius:12,padding:16,marginBottom:12}}>
            <div style={{fontSize:12,color:th.muted,marginBottom:4}}>Total Share (50%)</div>
            <div style={{fontSize:28,fontWeight:700,color:C.purple}}>{money(razaShare)}</div>
          </div>
          <div style={{fontSize:13,color:th.muted,marginBottom:4}}>Net Revenue: <span style={{color:th.text,fontWeight:600}}>{money(totalNetPaid)}</span></div>
          <div style={{fontSize:13,color:th.muted,marginBottom:4}}>- Employee Comm: <span style={{color:C.yellow,fontWeight:600}}>{money(totalEmpComm)}</span></div>
          <div style={{borderTop:"1px solid "+th.bd,marginTop:8,paddingTop:8,fontSize:13}}>= Owner Pool: <span style={{color:C.green,fontWeight:700}}>{money(ownerProfit)}</span></div>
          <div style={{fontSize:12,color:th.muted,marginTop:4}}>Raza gets 50% = <span style={{color:C.purple,fontWeight:700}}>{money(razaShare)}</span></div>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:20}}>
          <div style={{fontWeight:600,marginBottom:16,fontSize:14}}>Zaid Earnings</div>
          <div style={{background:C.purple+"18",borderRadius:12,padding:16,marginBottom:12}}>
            <div style={{fontSize:12,color:th.muted,marginBottom:4}}>Total Share (50%)</div>
            <div style={{fontSize:28,fontWeight:700,color:C.purple}}>{money(zaidShare)}</div>
          </div>
          <div style={{fontSize:13,color:th.muted,marginBottom:4}}>Net Revenue: <span style={{color:th.text,fontWeight:600}}>{money(totalNetPaid)}</span></div>
          <div style={{fontSize:13,color:th.muted,marginBottom:4}}>- Employee Comm: <span style={{color:C.yellow,fontWeight:600}}>{money(totalEmpComm)}</span></div>
          <div style={{borderTop:"1px solid "+th.bd,marginTop:8,paddingTop:8,fontSize:13}}>= Owner Pool: <span style={{color:C.green,fontWeight:700}}>{money(ownerProfit)}</span></div>
          <div style={{fontSize:12,color:th.muted,marginTop:4}}>Zaid gets 50% = <span style={{color:C.purple,fontWeight:700}}>{money(zaidShare)}</span></div>
        </div>
      </div>

      {monthlyData.length>0&&(
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18,marginBottom:18}}>
          <div style={{fontWeight:600,marginBottom:14,fontSize:14}}>Monthly Breakdown</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>{["Month","Loads","Net Revenue","Emp Comm","Owner Profit","Raza","Zaid"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{monthlyData.map(m=>(
                <tr key={m.m} style={{borderBottom:"1px solid "+th.bd}}>
                  <td style={{padding:"10px 12px",fontWeight:700}}>{m.m} 2026</td>
                  <td style={{padding:"10px 12px",textAlign:"center"}}>{m.loads}</td>
                  <td style={{padding:"10px 12px"}}>{money(m.net)}</td>
                  <td style={{padding:"10px 12px",color:C.yellow}}>{money(m.comm)}</td>
                  <td style={{padding:"10px 12px",fontWeight:700,color:C.green}}>{money(m.profit)}</td>
                  <td style={{padding:"10px 12px",color:C.purple,fontWeight:600}}>{money(m.profit/2)}</td>
                  <td style={{padding:"10px 12px",color:C.purple,fontWeight:600}}>{money(m.profit/2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
        <div style={{fontWeight:600,marginBottom:14,fontSize:14}}>Employee Commission Breakdown</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Employee","Loads","Commission"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 12px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd}}>{h}</th>)}</tr></thead>
            <tbody>
              {empComms.map(e=>(
                <tr key={e.name} style={{borderBottom:"1px solid "+th.bd}}>
                  <td style={{padding:"10px 12px",fontWeight:700}}>{e.name}</td>
                  <td style={{padding:"10px 12px",textAlign:"center"}}>{e.loads}</td>
                  <td style={{padding:"10px 12px",fontWeight:700,color:C.yellow}}>{money(e.comm)}</td>
                </tr>
              ))}
              <tr style={{background:th.s2}}>
                <td style={{padding:"10px 12px",fontWeight:700}}>TOTAL</td>
                <td></td>
                <td style={{padding:"10px 12px",fontWeight:700,color:C.yellow}}>{money(totalEmpComm)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function JunePage({th,drivers,setDrivers,employees,setEmployees,juneOverrides,setJuneOverrides}){
  const juneMerged=mergeJune(juneOverrides);
  const[view,setView]=useState("summary");
  const[selDrv,setSelDrv]=useState(null);
  const[search,setSearch]=useState("");
  const[payF,setPayF]=useState("All");
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"8px 12px",fontSize:13};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stats=useMemo(()=>drivers.map(d=>{
    const ld=juneMerged.filter(l=>l.dn&&l.dn.toLowerCase().includes(d.name.toLowerCase()));
    const pL=ld.filter(l=>l.pay==="Paid"),uL=ld.filter(l=>l.pay==="Unpaid");
    return{...d,ld,pL,uL,pRC:pL.reduce((s,l)=>s+(l.rc||0),0),uRC:uL.reduce((s,l)=>s+(l.rc||0),0),pNet:pL.reduce((s,l)=>s+netInv(l),0),uNet:uL.reduce((s,l)=>s+netInv(l),0),pInv:pL.reduce((s,l)=>s+(l.inv||0),0),uInv:uL.reduce((s,l)=>s+(l.inv||0),0)};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }),[drivers,juneOverrides]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fLoads=useMemo(()=>{
    let l=juneMerged.slice();
    if(search)l=l.filter(x=>[x.dn,x.bk,x.bb,x.pl].some(f=>(f||"").toLowerCase().includes(search.toLowerCase())));
    if(payF!=="All")l=l.filter(x=>x.pay===payF);
    return l;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search,payF,juneOverrides]);

  if(view==="driver"&&selDrv){
    const sec=stats.find(d=>d.name===selDrv);
    if(!sec)return null;
    return(
      <div>
        <button onClick={()=>{setView("summary");setSelDrv(null);}} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back"}</button>
        <div style={{marginBottom:14}}><h2 style={{margin:0,fontSize:19,fontWeight:700}}>{sec.name}</h2><div style={{fontSize:12,color:th.muted}}>{sec.note} - Rate: <span style={{color:C.yellow,fontWeight:700}}>{sec.rate}%</span></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div style={{background:"#1E6B2E22",border:"1px solid #1E6B2E55",borderRadius:13,padding:16}}>
            <div style={{fontSize:11,color:C.green,fontWeight:700,marginBottom:6}}>PAID - {sec.pL.length} loads</div>
            <div style={{fontSize:13,marginBottom:3}}><span style={{color:th.muted}}>Invoice:</span> <b>{money(sec.pInv)}</b></div>
            <div style={{fontSize:13}}><span style={{color:th.muted}}>Net (after fees):</span> <b style={{color:C.green}}>{money(sec.pNet)}</b></div>
          </div>
          <div style={{background:"#8B250022",border:"1px solid #8B250055",borderRadius:13,padding:16}}>
            <div style={{fontSize:11,color:C.yellow,fontWeight:700,marginBottom:6}}>UNPAID - {sec.uL.length} loads</div>
            <div style={{fontSize:13,marginBottom:3}}><span style={{color:th.muted}}>Invoice:</span> <b>{money(sec.uInv)}</b></div>
            <div style={{fontSize:13}}><span style={{color:th.muted}}>Net (after fees):</span> <b style={{color:C.yellow}}>{money(sec.uNet)}</b></div>
          </div>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12}}>All Loads ({sec.ld.length})</div>
          {sec.ld.length===0?<div style={{color:th.muted,textAlign:"center",padding:24}}>No loads.</div>:(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>{["Date","Broker","RC","Invoice","Fee%","Net","Status","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
                <tbody>{sec.ld.map(l=>(
                  <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                    <td style={{padding:"8px 10px",whiteSpace:"nowrap"}}>{fdate(l.pd)}</td>
                    <td style={{padding:"8px 10px"}}>{l.bk||"-"}</td>
                    <td style={{padding:"8px 10px"}}>{money(l.rc)}</td>
                    <td style={{padding:"8px 10px"}}>{money(l.inv)}</td>
                    <td style={{padding:"8px 10px",color:th.muted}}>{l.factor||3}%</td>
                    <td style={{padding:"8px 10px",fontWeight:700,color:l.pay==="Paid"?C.green:C.yellow}}>{money(netInv(l))}</td>
                    <td style={{padding:"8px 10px"}}><Badge color={sColor(l.st)}>{l.st}</Badge></td>
                    <td style={{padding:"8px 10px"}}><Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay}</Badge></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
  if(view==="rates")return(
    <div>
      <button onClick={()=>setView("summary")} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back"}</button>
      <RateEditor th={th} drivers={drivers} setDrivers={setDrivers} employees={employees} setEmployees={setEmployees} inp={inp} juneOverrides={juneOverrides}/>
    </div>
  );

  const gPNet=stats.reduce((s,d)=>s+d.pNet,0),gUNet=stats.reduce((s,d)=>s+d.uNet,0);
  const gPInv=stats.reduce((s,d)=>s+d.pInv,0),gUInv=stats.reduce((s,d)=>s+d.uInv,0);
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>June 2026 <span style={{fontSize:12,color:th.muted,fontWeight:400}}>({juneMerged.length} loads)</span></h2>
        <button onClick={()=>setView("rates")} style={{background:C.accent+"22",border:"1px solid "+C.accent+"44",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",color:C.accent,display:"flex",alignItems:"center",gap:6}}>
          <Icon name="gear" size={14} color={C.accent}/>Rate Editor
        </button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
        <Stat th={th} label="Paid Loads" value={juneMerged.filter(l=>l.pay==="Paid").length} color={C.green} icon="check"/>
        <Stat th={th} label="Unpaid Loads" value={juneMerged.filter(l=>l.pay==="Unpaid").length} color={C.yellow} icon="box"/>
        <Stat th={th} label="Invoice (Paid)" value={money(gPInv)} color={C.green} icon="dollar"/>
        <Stat th={th} label="Net (Paid)" value={money(gPNet)} color={C.green} icon="pay" sub="After fees"/>
        <Stat th={th} label="Invoice (Unpaid)" value={money(gUInv)} color={C.yellow} icon="dollar"/>
        <Stat th={th} label="Net (Unpaid)" value={money(gUNet)} color={C.yellow} icon="pay"/>
      </div>
      <div style={{display:"flex",gap:9,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:170,position:"relative"}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)"}}><Icon name="search" size={14} color={th.muted}/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search loads..." style={{...inp,paddingLeft:30,width:"100%"}}/>
        </div>
        <select value={payF} onChange={e=>setPayF(e.target.value)} style={{...inp,cursor:"pointer"}}><option>All</option><option>Paid</option><option>Unpaid</option></select>
      </div>
      {(search||payF!=="All")&&fLoads.length>0&&(
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:13,padding:16,marginBottom:14}}>
          <div style={{fontWeight:600,marginBottom:10,fontSize:13}}>Filtered ({fLoads.length})</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr>{["Driver","Broker","Invoice","Fee%","Net","Pay"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 9px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{fLoads.map(l=>(
                <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                  <td style={{padding:"7px 9px",fontWeight:600}}>{l.dn}</td>
                  <td style={{padding:"7px 9px"}}>{l.bk||"-"}</td>
                  <td style={{padding:"7px 9px"}}>{money(l.inv)}</td>
                  <td style={{padding:"7px 9px",color:th.muted}}>{l.factor||3}%</td>
                  <td style={{padding:"7px 9px",fontWeight:700,color:l.pay==="Paid"?C.green:C.yellow}}>{money(netInv(l))}</td>
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
                  <div style={{fontSize:12,fontWeight:700,color:C.green}}>{money(sec.pNet)}<span style={{fontSize:9,color:th.muted,fontWeight:400}}> net</span></div>
                  {sec.uNet>0&&<div style={{fontSize:10,color:C.yellow}}>{money(sec.uNet)} pending</div>}
                </div>
                <Icon name="arrow" size={15} color={th.muted}/>
              </div>
            </div>
            {sec.ld.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderTop:"1px solid "+th.bd}}>
                <div style={{padding:"9px 16px",borderRight:"1px solid "+th.bd,background:"#1E6B2E11"}}>
                  <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:2}}>Paid</div>
                  <div style={{fontSize:12,fontWeight:700}}>{money(sec.pInv)} inv / <span style={{color:C.green}}>{money(sec.pNet)}</span> net</div>
                </div>
                <div style={{padding:"9px 16px",background:"#8B250011"}}>
                  <div style={{fontSize:10,color:C.yellow,fontWeight:700,marginBottom:2}}>Unpaid</div>
                  <div style={{fontSize:12,fontWeight:700}}>{money(sec.uInv)} inv / <span style={{color:C.yellow}}>{money(sec.uNet)}</span> net</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RateEditor({th,drivers,setDrivers,employees,setEmployees,inp,juneOverrides}){
  const juneMerged=mergeJune(juneOverrides);
  const[tab,setTab]=useState("drivers");
  const[nd,setNd]=useState({name:"",rate:"",note:""});
  const[showD,setShowD]=useState(false);
  const[editE,setEditE]=useState(null);
  const[ne,setNe]=useState({name:"",role:"Dispatcher",pct:"",pass:""});
  const[showE,setShowE]=useState(false);
  const tb=(t,l)=><button onClick={()=>setTab(t)} style={{padding:"7px 16px",border:"none",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,background:tab===t?C.accent:th.s2,color:tab===t?"#fff":th.muted}}>{l}</button>;
  return(
    <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:16,padding:22}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <div><div style={{fontWeight:700,fontSize:16}}>Rate and Employee Editor</div><div style={{fontSize:11,color:th.muted,marginTop:2}}>Yellow = editable. Manage rates, thresholds and employee logins.</div></div>
        <div style={{display:"flex",gap:8}}>{tb("drivers","Driver Rates")}{tb("emp","Employees")}</div>
      </div>
      {tab==="drivers"&&(
        <div>
          <div style={{overflowX:"auto",marginBottom:16}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:th.s2}}>{["#","Driver","Rate%","Notes","Paid","Net Paid",""].map(h=><th key={h} style={{textAlign:"left",padding:"9px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{drivers.map((d,i)=>{
                const ld=juneMerged.filter(l=>l.dn&&l.dn.toLowerCase().includes(d.name.toLowerCase())&&l.pay==="Paid");
                const net=ld.reduce((s,l)=>s+netInv(l),0);
                return(
                  <tr key={i} style={{borderBottom:"1px solid "+th.bd,background:i%2===0?th.surf:th.s2}}>
                    <td style={{padding:"9px 11px",color:th.muted,fontSize:10}}>{i+1}</td>
                    <td style={{padding:"9px 11px",fontWeight:700}}>{d.name}</td>
                    <td style={{padding:"5px 11px"}}><div style={{display:"flex",alignItems:"center",gap:5}}><input type="number" value={d.rate} onChange={e=>setDrivers(ds=>ds.map((x,j)=>j===i?{...x,rate:parseFloat(e.target.value)||0}:x))} style={{...inp,width:54,padding:"5px 7px",background:"#FFFF0022",border:"1px solid #FFFF0066",fontWeight:700,color:C.yellow,textAlign:"center"}}/><span style={{color:th.muted,fontSize:11}}>%</span></div></td>
                    <td style={{padding:"5px 11px"}}><input value={d.note} onChange={e=>setDrivers(ds=>ds.map((x,j)=>j===i?{...x,note:e.target.value}:x))} style={{...inp,width:"100%",minWidth:130,fontSize:11,padding:"5px 9px"}}/></td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green,textAlign:"center"}}>{ld.length}</td>
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(net)}</td>
                    <td style={{padding:"5px 11px"}}><button onClick={()=>{if(window.confirm("Remove "+d.name+"?"))setDrivers(ds=>ds.filter((_,j)=>j!==i));}} style={{background:C.red+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="trash" size={12} color={C.red}/></button></td>
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
                  <button onClick={()=>{if(!nd.name||!nd.rate){window.alert("Name and Rate required");return;}setDrivers(ds=>[...ds,{name:nd.name,rate:parseFloat(nd.rate)||0,note:nd.note||"RC x "+nd.rate+"%"}]);setNd({name:"",rate:"",note:""});setShowD(false);}} style={{background:C.green,color:"#fff",border:"none",borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Add</button>
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
              <thead><tr style={{background:th.s2}}>{["#","Name","Role","Pass","Rate%","Threshold","Assigned Drivers","Jun Comm",""].map(h=><th key={h} style={{textAlign:"left",padding:"9px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
              <tbody>{employees.map((d,i)=>{
                const paidL=juneMerged.filter(l=>l.pay==="Paid");
                const comm=calcCommission(d,paidL);
                const ed=editE===d.id;
                return(
                  <tr key={d.id} style={{borderBottom:"1px solid "+th.bd,background:i%2===0?th.surf:th.s2}}>
                    <td style={{padding:"9px 11px",color:th.muted,fontSize:10}}>{i+1}</td>
                    {ed?(
                      <>
                        <td style={{padding:"5px 8px"}}><input value={d.name} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,name:e.target.value}:x))} style={{...inp,width:90}}/></td>
                        <td style={{padding:"5px 8px"}}><select value={d.role} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,role:e.target.value}:x))} style={{...inp,cursor:"pointer",width:100}}><option>Dispatcher</option><option>Owner</option><option>Manager</option></select></td>
                        <td style={{padding:"5px 8px"}}><input value={d.pass} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,pass:e.target.value}:x))} style={{...inp,width:90}} placeholder="password"/></td>
                        <td style={{padding:"5px 8px"}}><div style={{display:"flex",alignItems:"center",gap:4}}><input type="number" value={d.pct} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,pct:parseFloat(e.target.value)||0,basePct:parseFloat(e.target.value)||0}:x))} style={{...inp,width:50,background:"#FFFF0022",border:"1px solid #FFFF0066",fontWeight:700,color:C.yellow,textAlign:"center"}}/><span style={{fontSize:10,color:th.muted}}>%</span></div></td>
                        <td style={{padding:"5px 8px"}}>
                          <div style={{display:"flex",flexDirection:"column",gap:4}}>
                            <label style={{fontSize:10,display:"flex",alignItems:"center",gap:4,color:th.muted,cursor:"pointer"}}><input type="checkbox" checked={d.threshold||false} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,threshold:e.target.checked}:x))}/>Enable</label>
                            {d.threshold&&(
                              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                                <input type="number" placeholder="$1000" value={d.thresholdAmt} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,thresholdAmt:parseFloat(e.target.value)||1000}:x))} style={{...inp,width:70,fontSize:10,padding:"4px 6px"}}/>
                                <input type="number" placeholder="bonus%" value={d.bonusPct} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,bonusPct:parseFloat(e.target.value)||0}:x))} style={{...inp,width:55,fontSize:10,padding:"4px 6px",background:"#FFFF0022",border:"1px solid #FFFF0066",color:C.yellow}}/>
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={{padding:"5px 8px"}}>
                          <select multiple value={d.assignedDrivers||[]} onChange={e=>setEmployees(es=>es.map(x=>x.id===d.id?{...x,assignedDrivers:Array.from(e.target.selectedOptions,o=>o.value)}:x))} style={{...inp,width:150,height:70,fontSize:10}}>
                            {DEFAULT_DRIVERS.map(drv=><option key={drv.name} value={drv.name}>{drv.name}</option>)}
                          </select>
                          <div style={{fontSize:9,color:th.muted,marginTop:2}}>Hold Ctrl to multi-select</div>
                        </td>
                      </>
                    ):(
                      <>
                        <td style={{padding:"9px 11px",fontWeight:700}}>{d.name}</td>
                        <td style={{padding:"9px 11px",color:th.muted}}>{d.role}</td>
                        <td style={{padding:"9px 11px",color:th.muted,fontStyle:"italic",fontSize:11}}>{d.pass||"not set"}</td>
                        <td style={{padding:"9px 11px"}}><span style={{background:"#FFFF0022",color:C.yellow,fontWeight:700,padding:"2px 7px",borderRadius:20,fontSize:11}}>{d.pct}%</span></td>
                        <td style={{padding:"9px 11px"}}>{d.threshold?<span style={{background:C.yellow+"22",color:C.yellow,padding:"2px 6px",borderRadius:10,fontSize:10,fontWeight:700}}>ON ${d.thresholdAmt}</span>:<span style={{fontSize:10,color:th.muted}}>Off</span>}</td>
                        <td style={{padding:"9px 11px",fontSize:11,color:th.muted,maxWidth:160}}>{(d.assignedDrivers||[]).join(", ")||"None"}</td>
                      </>
                    )}
                    <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(comm)}</td>
                    <td style={{padding:"5px 11px"}}>
                      <div style={{display:"flex",gap:5}}>
                        {ed?<button onClick={()=>setEditE(null)} style={{background:C.green+"22",color:C.green,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:11,fontWeight:600}}>Done</button>:<button onClick={()=>setEditE(d.id)} style={{background:C.accent+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="edit" size={12} color={C.accent}/></button>}
                        <button onClick={()=>{if(window.confirm("Remove?"))setEmployees(es=>es.filter(x=>x.id!==d.id));}} style={{background:C.red+"22",border:"none",borderRadius:6,padding:"4px 7px",cursor:"pointer"}}><Icon name="trash" size={12} color={C.red}/></button>
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
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Name *</div><input style={{...inp,minWidth:120}} placeholder="Name" value={ne.name} onChange={e=>setNe(s=>({...s,name:e.target.value}))}/></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Password *</div><input style={{...inp,width:110}} placeholder="password" value={ne.pass} onChange={e=>setNe(s=>({...s,pass:e.target.value}))}/></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Role</div><select style={{...inp,cursor:"pointer"}} value={ne.role} onChange={e=>setNe(s=>({...s,role:e.target.value}))}><option>Dispatcher</option><option>Owner</option><option>Manager</option></select></div>
                <div><div style={{fontSize:10,color:th.muted,marginBottom:3}}>Rate %</div><input type="number" style={{...inp,width:70}} placeholder="10" value={ne.pct} onChange={e=>setNe(s=>({...s,pct:e.target.value}))}/></div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>{if(!ne.name||!ne.pass){window.alert("Name and Password required");return;}setEmployees(es=>[...es,{id:gid(),name:ne.name,role:ne.role,pct:parseFloat(ne.pct)||0,pass:ne.pass,assignedDrivers:[],threshold:false,thresholdAmt:1000,basePct:parseFloat(ne.pct)||0,bonusPct:(parseFloat(ne.pct)||0)+5}]);setNe({name:"",role:"Dispatcher",pct:"",pass:""});setShowE(false);}} style={{background:C.green,color:"#fff",border:"none",borderRadius:9,padding:"8px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>Add</button>
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

function LoadsPage({th,loads,setLoads,employees,drivers,juneOverrides,setJuneOverrides,setModal,toast}){
  const juneMerged=mergeJune(juneOverrides);
  const updateJune=(id,changes)=>setJuneOverrides(o=>({...o,[id]:{...(o[id]||{}),...changes}}));
  const[search,setSearch]=useState("");
  const[sf,setSf]=useState("All");
  const[pf,setPf]=useState("All");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filtered=useMemo(()=>{
    const all=[...loads,...juneMerged];
    let l=all.slice();
    if(search)l=l.filter(x=>[x.dn,x.bk,x.bb,x.pl].some(f=>(f||"").toLowerCase().includes(search.toLowerCase())));
    if(sf!=="All")l=l.filter(x=>x.st===sf);
    if(pf!=="All")l=l.filter(x=>x.pay===pf);
    return l.sort((a,b)=>new Date(b.pd||0)-new Date(a.pd||0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loads,search,sf,pf,juneOverrides]);
  const del=id=>{if(window.confirm("Delete?")){setLoads(l=>l.filter(x=>x.id!==id));toast("Deleted");}};
  const dup=ld=>{setLoads(l=>[{...ld,id:gid(),pd:new Date().toISOString().slice(0,10)},...l]);toast("Duplicated");};
  const tog=id=>setLoads(l=>l.map(x=>x.id===id?{...x,pay:x.pay==="Paid"?"Unpaid":"Paid"}:x));
  const sel={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"8px 11px",fontSize:12};
  const[juneModal,setJuneModal]=useState(null);
  return(
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
            return <LoadCard key={l.id} l={l} th={th} isJune={isJ}
              onEdit={()=>!isJ&&setModal({type:"load",data:l})}
              onDup={()=>dup(l)}
              onDel={()=>!isJ&&del(l.id)}
              onTog={()=>!isJ&&tog(l.id)}
              onJuneEdit={isJ?(action)=>{if(action==="toggle"){updateJune(l.id,{pay:l.pay==="Paid"?"Unpaid":"Paid"});}else{setJuneModal(l);}}:null}
            />;
          })}
        </div>
      )}
      {juneModal&&<JuneLoadModal load={juneModal} close={()=>setJuneModal(null)} th={th} updateJune={updateJune} toast={toast}/>}
    </div>
  );
}

function LoadCard({l,th,isJune,onEdit,onDup,onDel,onTog,onJuneEdit}){
  const[ex,setEx]=useState(false);
  const net=netInv(l);
  return(
    <div style={{background:th.surf,border:"1px solid "+(isJune?"#0EA5E944":th.bd),borderRadius:13,overflow:"hidden"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer"}} onClick={()=>setEx(e=>!e)}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontWeight:700,fontSize:13}}>{l.dn||"?"}</span>
            {isJune&&<span style={{background:"#0EA5E922",color:"#0EA5E9",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20}}>JUN</span>}
            <Badge color={sColor(l.st)}>{l.st}</Badge>
            <Badge color={l.pay==="Paid"?"green":"yellow"}>{l.pay||"Unpaid"}</Badge>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",fontSize:11,color:th.muted}}>
            <span>{l.bk||"-"}</span><span>{l.pl||"-"}</span><span>{fdate(l.pd)}</span>
          </div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:700,color:C.green}}>{money(net)}<span style={{fontSize:9,color:th.muted,fontWeight:400}}> net</span></div>
          <div style={{fontSize:10,color:th.muted}}>Inv: {money(l.inv)} | {l.factor||3}% fee</div>
        </div>
      </div>
      {ex&&(
        <div style={{borderTop:"1px solid "+th.bd,padding:"12px 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:9,marginBottom:12,fontSize:11}}>
            {[["Booked By",l.bb],["Broker",l.bk],["RC",money(l.rc)],["Invoice",money(l.inv)],["Fee",l.factor+"%"],["Net",money(net)],["Delivery",fdate(l.dd)],["Route",(l.pl||"")+"-"+(l.dl||"")]].map(r=>(
              <div key={r[0]}><div style={{color:th.muted,fontSize:9,marginBottom:1}}>{r[0]}</div><div style={{fontWeight:500}}>{r[1]||"-"}</div></div>
            ))}
          </div>
          {l.cm&&<div style={{background:th.s2,borderRadius:8,padding:"7px 11px",fontSize:11,marginBottom:10,color:th.muted}}>{l.cm}</div>}
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {!isJune&&<button onClick={onEdit} style={{background:C.accent+"22",color:C.accent,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={12} color={C.accent}/>Edit</button>}
            {isJune&&onJuneEdit&&<button onClick={onJuneEdit} style={{background:C.accent+"22",color:C.accent,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={12} color={C.accent}/>Edit</button>}
            <button onClick={onDup} style={{background:th.s2,color:th.text,border:"1px solid "+th.bd,borderRadius:8,padding:"6px 11px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="copy" size={12} color={th.muted}/>Dup</button>
            {!isJune&&<button onClick={onTog} style={{background:(l.pay==="Paid"?C.yellow:C.green)+"22",color:l.pay==="Paid"?C.yellow:C.green,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l.pay==="Paid"?"Mark Unpaid":"Mark Paid"}</button>}
            {isJune&&<button onClick={()=>onJuneEdit&&onJuneEdit("toggle")} style={{background:(l.pay==="Paid"?C.yellow:C.green)+"22",color:l.pay==="Paid"?C.yellow:C.green,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{l.pay==="Paid"?"Mark Unpaid":"Mark Paid"}</button>}
            {!isJune&&<button onClick={onDel} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:8,padding:"6px 11px",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Icon name="trash" size={12} color={C.red}/>Del</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function EmployeesPage({th,employees,juneOverrides,setJuneOverrides,loads,setLoads}){
  const juneMerged=mergeJune(juneOverrides);
  const[sel,setSel]=useState(null);
  const[editLoad,setEditLoad]=useState(null);
  const[month,setMonth]=useState("2026-06");
  const monthLoads=getMonthLoads(month,loads,juneOverrides);
  if(sel){
    const d=employees.find(x=>x.id===sel);
    if(!d)return null;
    const paidLoads=monthLoads.filter(l=>l.pay==="Paid");
    const comm=calcCommission(d,paidLoads);
    const myLoads=monthLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===d.name.toLowerCase().split(" ")[0]);
    const myPaid=myLoads.filter(l=>l.pay==="Paid");
    const myUnpaid=myLoads.filter(l=>l.pay==="Unpaid");
    const totalGross=myLoads.reduce((s,l)=>s+(l.inv||0),0);
    const paidGross=myPaid.reduce((s,l)=>s+(l.inv||0),0);
    const unpaidGross=myUnpaid.reduce((s,l)=>s+(l.inv||0),0);
    const paidNet=myPaid.reduce((s,l)=>s+netInv(l),0);
    const unpaidNet=myUnpaid.reduce((s,l)=>s+netInv(l),0);
    const unpaidComm=myUnpaid.reduce((s,l)=>s+netInv(l)*(d.pct/100),0);
    return(
      <div>
        <button onClick={()=>setSel(null)} style={{background:"none",border:"none",color:C.accent,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:14}}>{"< Back"}</button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:18}}>{d.name.charAt(0)}</div>
            <div>
              <div style={{fontWeight:700,fontSize:17}}>{d.name}</div>
              <div style={{fontSize:12,color:th.muted}}>{d.role} | <span style={{color:C.yellow,fontWeight:700}}>{d.pct}%</span>{d.threshold&&<span style={{color:C.cyan}}> | Thresh: ${d.thresholdAmt} then {d.bonusPct}%</span>}</div>
            </div>
          </div>
          <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"7px 11px",fontSize:13}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
          <Stat th={th} label="Loads" value={myLoads.length} color={C.accent} icon="box" sub={month}/>
          <Stat th={th} label="Paid Loads" value={myPaid.length} color={C.green} icon="check"/>
          <Stat th={th} label="Unpaid Loads" value={myUnpaid.length} color={C.yellow} icon="box"/>
          <Stat th={th} label="Total Gross" value={money(totalGross)} color={C.accent} icon="dollar" sub="All loads"/>
          <Stat th={th} label="Paid Gross" value={money(paidGross)} color={C.green} icon="dollar" sub="Invoice (paid)"/>
          <Stat th={th} label="Unpaid Gross" value={money(unpaidGross)} color={C.yellow} icon="dollar" sub="Invoice (unpaid)"/>
          <Stat th={th} label="Net Paid" value={money(paidNet)} color={C.green} icon="pay" sub="After fees"/>
          <Stat th={th} label="Net Unpaid" value={money(unpaidNet)} color={C.yellow} icon="pay" sub="After fees"/>
          <Stat th={th} label="Paid Comm" value={money(comm)} color={C.green} icon="pay" sub="Earned"/>
          <Stat th={th} label="Unpaid Comm" value={money(unpaidComm)} color={C.yellow} icon="pay" sub="Pending"/>
        </div>
        <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
          <div style={{fontWeight:600,marginBottom:12}}>Assigned Drivers</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
            {(d.assignedDrivers||[]).map(drv=><span key={drv} style={{background:C.accent+"22",color:C.accent,padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600}}>{drv}</span>)}
            {(d.assignedDrivers||[]).length===0&&<span style={{color:th.muted,fontSize:13}}>No drivers assigned</span>}
          </div>
          <div style={{fontWeight:600,marginBottom:12}}>Load History - {month} ({myLoads.length})</div>
          {myLoads.length===0?<div style={{color:th.muted,fontSize:13}}>No loads.</div>:(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>{["Driver","Broker","Invoice","Fee%","Net","Status","Pay","Comm","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 9px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
                <tbody>{myLoads.map(l=>{
                  const net=netInv(l);
                  const c=l.pay==="Paid"?net*(d.pct/100):0;
                  const isJ=l.id.charAt(0)==="j";
                  return(
                    <tr key={l.id} style={{borderBottom:"1px solid "+th.bd}}>
                      <td style={{padding:"8px 9px",fontWeight:600}}>{l.dn}</td>
                      <td style={{padding:"8px 9px",color:th.muted}}>{l.bk||"-"}</td>
                      <td style={{padding:"8px 9px"}}>{money(l.inv)}</td>
                      <td style={{padding:"8px 9px",color:th.muted}}>{l.factor||3}%</td>
                      <td style={{padding:"8px 9px",fontWeight:600,color:l.pay==="Paid"?C.green:C.yellow}}>{money(net)}</td>
                      <td style={{padding:"5px 9px"}}>
                        {isJ?(
                          <select value={l.st} onChange={e=>setJuneOverrides(o=>({...o,[l.id]:{...(o[l.id]||{}),...{st:e.target.value}}}))} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:7,padding:"4px 7px",fontSize:11,cursor:"pointer"}}>
                            {STATUSES.map(s=><option key={s}>{s}</option>)}
                          </select>
                        ):(
                          <select value={l.st} onChange={e=>setLoads(ls=>ls.map(x=>x.id===l.id?{...x,st:e.target.value}:x))} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:7,padding:"4px 7px",fontSize:11,cursor:"pointer"}}>
                            {STATUSES.map(s=><option key={s}>{s}</option>)}
                          </select>
                        )}
                      </td>
                      <td style={{padding:"5px 9px"}}>
                        {isJ?(
                          <select value={l.pay} onChange={e=>setJuneOverrides(o=>({...o,[l.id]:{...(o[l.id]||{}),...{pay:e.target.value}}}))} style={{background:l.pay==="Paid"?"#1C3A2888":"#3A2E1C88",border:"1px solid "+(l.pay==="Paid"?"#34C75966":"#FF950066"),color:l.pay==="Paid"?C.green:C.yellow,borderRadius:7,padding:"4px 7px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                            <option>Paid</option><option>Unpaid</option>
                          </select>
                        ):(
                          <select value={l.pay} onChange={e=>setLoads(ls=>ls.map(x=>x.id===l.id?{...x,pay:e.target.value}:x))} style={{background:l.pay==="Paid"?"#1C3A2888":"#3A2E1C88",border:"1px solid "+(l.pay==="Paid"?"#34C75966":"#FF950066"),color:l.pay==="Paid"?C.green:C.yellow,borderRadius:7,padding:"4px 7px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                            <option>Paid</option><option>Unpaid</option>
                          </select>
                        )}
                      </td>
                      <td style={{padding:"8px 9px",fontWeight:700,color:C.green}}>{l.pay==="Paid"?money(c):"-"}</td>
                      <td style={{padding:"5px 9px"}}>
                        {isJ&&<button onClick={()=>setEditLoad(l)} style={{background:C.accent+"22",color:C.accent,border:"none",borderRadius:7,padding:"4px 9px",cursor:"pointer",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:4}}><Icon name="edit" size={11} color={C.accent}/>Edit</button>}
                      </td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          )}
        {editLoad&&<JuneLoadModal load={editLoad} close={()=>setEditLoad(null)} th={th} updateJune={(id,changes)=>setJuneOverrides(o=>({...o,[id]:{...(o[id]||{}),...changes}}))} toast={()=>{}}/>}
      </div>
    );
  }
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>Employees</h2>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:11,color:th.muted}}>Edit % in June 2026 - Rate Editor</span>
          <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"7px 11px",fontSize:13}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:11}}>
        {employees.map(d=>{
          const paidLoads=monthLoads.filter(l=>l.pay==="Paid");
          const comm=calcCommission(d,paidLoads);
          const myLoads=monthLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===d.name.toLowerCase().split(" ")[0]);
          return(
            <div key={d.id} onClick={()=>setSel(d.id)} style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:16,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:11}}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  <div style={{width:33,height:33,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:14}}>{d.name.charAt(0)}</div>
                  <div><div style={{fontWeight:600,fontSize:13}}>{d.name}</div><div style={{fontSize:10,color:th.muted}}>{d.role}</div></div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  {d.threshold&&<span style={{background:C.yellow+"22",color:C.yellow,fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:10}}>THRESH</span>}
                  <span style={{background:"#FFFF0022",color:C.yellow,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{d.pct}%</span>
                  <Icon name="arrow" size={13} color={th.muted}/>
                </div>
              </div>
              {(d.assignedDrivers||[]).length>0&&<div style={{fontSize:10,color:th.muted,marginBottom:8,lineHeight:1.4}}>{d.assignedDrivers.join(", ")}</div>}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                <div><div style={{fontSize:9,color:th.muted}}>{month} Loads</div><div style={{fontWeight:700,fontSize:13}}>{myLoads.length}</div></div>
                <div><div style={{fontSize:9,color:th.muted}}>Total Gross</div><div style={{fontWeight:700,color:C.accent,fontSize:12}}>{money(myLoads.reduce((s,l)=>s+(l.inv||0),0)+myLoads.filter(l=>l.pay==="Unpaid").reduce((s,l)=>s+(l.inv||0),0))}</div></div>
                <div><div style={{fontSize:9,color:th.muted}}>Paid Comm</div><div style={{fontWeight:700,color:C.green,fontSize:12}}>{money(comm)}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PayrollPage({th,employees,juneOverrides}){
  const juneMerged=mergeJune(juneOverrides);
  const[month,setMonth]=useState("2026-06");
  const isJune=month==="2026-06";
  const paidLoads=isJune?juneMerged.filter(l=>l.pay==="Paid"):[];
  const allMonthLoads=isJune?juneMerged:[];
  const stats=employees.map(d=>{
    const comm=calcCommission(d,paidLoads);
    const myL=paidLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===d.name.toLowerCase().split(" ")[0]);
    const allMyL=allMonthLoads.filter(l=>l.bb&&l.bb.toLowerCase().split(" ")[0]===d.name.toLowerCase().split(" ")[0]);
    const totalGross=allMyL.reduce((s,l)=>s+(l.inv||0),0);
    const netGross=allMyL.reduce((s,l)=>s+netInv(l),0);
    return{...d,earned:comm,loads:myL.length,totalGross,netGross};
  });
  const totalEmp=stats.filter(e=>e.role!=="Owner").reduce((s,e)=>s+e.earned,0);
  const totalNet=paidLoads.reduce((s,l)=>s+netInv(l),0);
  const ownerProfit=totalNet-totalEmp;
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:9}}>
        <h2 style={{margin:0,fontSize:19,fontWeight:700}}>Payroll</h2>
        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} style={{background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"7px 11px",fontSize:13}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Net Revenue" value={money(totalNet)} color={C.cyan} icon="dollar" sub="After payment fees"/>
        <Stat th={th} label="Employee Comm" value={money(totalEmp)} color={C.yellow} icon="users"/>
        <Stat th={th} label="Owner Profit" value={money(ownerProfit)} color={C.green} icon="dollar"/>
        <Stat th={th} label="Raza (50%)" value={money(ownerProfit/2)} color={C.purple} icon="owner"/>
        <Stat th={th} label="Zaid (50%)" value={money(ownerProfit/2)} color={C.purple} icon="owner"/>
      </div>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{background:th.s2}}>{["Employee","Role","Rate","Threshold","Loads","Total Gross","Net Gross","Commission/Share"].map(h=><th key={h} style={{textAlign:"left",padding:"11px 14px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd}}>{h}</th>)}</tr></thead>
          <tbody>{stats.map(e=>(
            <tr key={e.id} style={{borderBottom:"1px solid "+th.bd}}>
              <td style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:28,height:28,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:C.accent,fontSize:11}}>{e.name.charAt(0)}</div><span style={{fontWeight:600}}>{e.name}</span></div></td>
              <td style={{padding:"12px 14px",color:th.muted,fontSize:12}}>{e.role}</td>
              <td style={{padding:"12px 14px"}}><span style={{background:"#FFFF0022",color:C.yellow,fontWeight:700,padding:"2px 8px",borderRadius:20,fontSize:11}}>{e.role==="Owner"?"50%":e.pct+"%"}</span></td>
              <td style={{padding:"12px 14px"}}>{e.threshold?<span style={{background:C.yellow+"22",color:C.yellow,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:10}}>${e.thresholdAmt} | {e.basePct}%-{e.bonusPct}%</span>:<span style={{fontSize:11,color:th.muted}}>-</span>}</td>
              <td style={{padding:"12px 14px",fontWeight:600,textAlign:"center"}}>{e.loads}</td>
              <td style={{padding:"12px 14px",fontWeight:600,color:C.accent}}>{money(e.totalGross||0)}</td>
              <td style={{padding:"12px 14px",fontWeight:600,color:C.cyan}}>{money(e.netGross||0)}</td>
              <td style={{padding:"12px 14px",fontWeight:700,color:e.role==="Owner"?C.purple:C.green}}>{e.role==="Owner"?money(ownerProfit/2):money(e.earned)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function JuneLoadModal({load,close,th,updateJune,toast}){
  const[f,setF]=useState({st:load.st,pay:load.pay,factor:load.factor||3,inv:load.inv,cm:load.cm||""});
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const net=((parseFloat(f.inv)||0)*(1-(parseFloat(f.factor)||3)/100));
  const save=()=>{
    updateJune(load.id,{st:f.st,pay:f.pay,factor:parseFloat(f.factor)||3,inv:parseFloat(f.inv)||0,cm:f.cm});
    toast("Load updated");close();
  };
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"9px 12px",fontSize:13,width:"100%",marginBottom:9};
  const lb=t=><label style={{fontSize:10,color:th.muted,fontWeight:500,display:"block",marginBottom:3}}>{t}</label>;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:14}} onClick={e=>e.target===e.currentTarget&&close()}>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:18,padding:22,width:"100%",maxWidth:420,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <div style={{fontWeight:700,fontSize:16}}>Edit June Load</div>
            <div style={{fontSize:12,color:th.muted}}>{load.dn} - {load.bk||"No broker"}</div>
          </div>
          <button onClick={close} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="close" size={19} color={th.muted}/></button>
        </div>
        {lb("Load Status")}<select style={inp} value={f.st} onChange={set("st")}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
        {lb("Pay Status")}<select style={inp} value={f.pay} onChange={set("pay")}><option>Unpaid</option><option>Paid</option></select>
        {lb("Invoice Amount ($)")}<input style={inp} type="number" value={f.inv} onChange={set("inv")} placeholder={load.inv}/>
        <div style={{marginBottom:9}}>
          {lb("Payment Fee % (Square/Stripe)")}
          <input style={inp} type="number" value={f.factor} onChange={set("factor")} placeholder="3"/>
          <div style={{fontSize:11,color:C.green,marginTop:4,fontWeight:600}}>Net: {money(net)} (after {f.factor||3}% fee)</div>
        </div>
        {lb("Comments")}<textarea style={{...inp,height:64,resize:"vertical"}} value={f.cm} onChange={set("cm")}/>
        <div style={{display:"flex",gap:9,marginTop:4}}>
          <button onClick={save} style={{flex:1,background:C.accent,color:"#fff",border:"none",borderRadius:11,padding:"12px",fontSize:14,fontWeight:600,cursor:"pointer"}}>Save Changes</button>
          <button onClick={close} style={{background:th.s2,color:th.text,border:"1px solid "+th.bd,borderRadius:11,padding:"12px 16px",fontSize:14,cursor:"pointer"}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function LoadModal({data,close,th,employees,drivers,setLoads,toast}){
  const blank={dn:"",bb:"",bk:"",rc:"",inv:"",factor:"3",pd:"",pl:"",dd:"",dl:"",st:"Pending",pay:"Unpaid",cm:""};
  const[f,setF]=useState(data||blank);
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const net=((parseFloat(f.inv)||0)*(1-(parseFloat(f.factor)||3)/100));
  const save=()=>{
    if(!f.dn||!f.inv){window.alert("Driver and Invoice required");return;}
    if(data){setLoads(l=>l.map(x=>x.id===data.id?{...f,id:data.id,rc:parseFloat(f.rc)||0,inv:parseFloat(f.inv)||0,factor:parseFloat(f.factor)||3}:x));toast("Updated");}
    else{setLoads(l=>[{...f,id:gid(),pd:f.pd||new Date().toISOString().slice(0,10),rc:parseFloat(f.rc)||0,inv:parseFloat(f.inv)||0,factor:parseFloat(f.factor)||3},...l]);toast("Load added");}
    close();
  };
  const inp={background:th.s2,border:"1px solid "+th.bd,color:th.text,borderRadius:9,padding:"9px 12px",fontSize:13,width:"100%",marginBottom:9};
  const lb=t=><label style={{fontSize:10,color:th.muted,fontWeight:500,display:"block",marginBottom:3}}>{t}</label>;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:14}} onClick={e=>e.target===e.currentTarget&&close()}>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:18,padding:22,width:"100%",maxWidth:520,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:16}}>{data?"Edit Load":"New Load"}</div>
          <button onClick={close} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="close" size={19} color={th.muted}/></button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 11px"}}>
          <div style={{gridColumn:"1 / -1"}}>{lb("Driver *")}<select style={inp} value={f.dn} onChange={set("dn")}><option value="">Select Driver</option>{drivers.map(d=><option key={d.name}>{d.name}</option>)}</select></div>
          <div>{lb("Booked By")}<select style={inp} value={f.bb} onChange={set("bb")}><option value="">-</option>{employees.map(d=><option key={d.id}>{d.name}</option>)}</select></div>
          <div style={{gridColumn:"1 / -1"}}>{lb("Broker")}<input style={inp} placeholder="Broker name" value={f.bk} onChange={set("bk")}/></div>
          <div>{lb("RC Amount ($) - Driver ref")}<input style={inp} type="number" value={f.rc} onChange={set("rc")} placeholder="1000"/></div>
          <div>{lb("Invoice Amount ($) *")}<input style={inp} type="number" value={f.inv} onChange={set("inv")} placeholder="200"/></div>
          <div>{lb("Payment Fee % (Square/Stripe)")}<input style={inp} type="number" value={f.factor} onChange={set("factor")} placeholder="3"/></div>
          <div style={{padding:"10px 0"}}>
            <div style={{fontSize:10,color:th.muted,marginBottom:2}}>Net Amount (commission base)</div>
            <div style={{fontSize:18,fontWeight:700,color:C.green}}>{money(net)}</div>
            <div style={{fontSize:10,color:th.muted}}>Invoice minus {f.factor||3}% fee</div>
          </div>
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
  const[dark,setDark]=useLocal("rm4_dark",true);
  const[user,setUser]=useLocal("rm4_user",null);
  const[page,setPage]=useState("dashboard");
  const[sb,setSb]=useState(false);
  const[loads,setLoads]=useLS("rm4_loads",[]);
  const[employees,setEmployees]=useLS("rm4_emp",DEFAULT_EMPLOYEES);
  const[drivers,setDrivers]=useLS("rm4_drivers",DEFAULT_DRIVERS);
  const[juneOverrides,setJuneOverrides]=useLS("rm4_june_overrides",{});
  const[toastMsg,setToastMsg]=useState(null);
  const[modal,setModal]=useState(null);
  const th=dark?{bg:C.bg.d,surf:C.surf.d,s2:C.s2.d,bd:C.bd.d,text:C.text.d,muted:C.muted.d}:{bg:C.bg.l,surf:C.surf.l,s2:C.s2.l,bd:C.bd.l,text:C.text.l,muted:C.muted.l};
  const toast=m=>{setToastMsg(m);setTimeout(()=>setToastMsg(null),2500);};
  if(!user)return <Login th={th} onLogin={setUser} employees={employees}/>;
  if(user.role==="Employee"){
    return(
      <div>
        <EmployeePortal th={th} user={user} employees={employees} drivers={drivers} loads={loads} setLoads={setLoads} juneOverrides={juneOverrides} toast={toast}/>
        <div style={{position:"fixed",top:10,right:10,zIndex:999,display:"flex",gap:6}}>
          <button onClick={()=>setDark(d=>!d)} style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:8,padding:"6px 10px",cursor:"pointer"}}><Icon name={dark?"sun":"moon"} size={15} color={th.muted}/></button>
          <button onClick={()=>setUser(null)} style={{background:C.red+"22",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",color:C.red,fontSize:12,fontWeight:600}}>Sign Out</button>
        </div>
        {toastMsg&&<div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",background:C.green,color:"#fff",padding:"10px 20px",borderRadius:11,fontWeight:600,fontSize:13,zIndex:999}}>{toastMsg}</div>}
      </div>
    );
  }
  const NAV=[["dashboard","Home","home"],["june","June 2026","cal"],["loads","Loads","box"],["employees","Employees","users"],["payroll","Payroll","pay"],["owner","Owner Revenue","owner"],["reports","Reports","chart"]];
  const cp={th,loads,setLoads,employees,setEmployees,drivers,setDrivers,juneOverrides,setJuneOverrides,toast,setModal,user};
  let body;
  if(page==="dashboard")body=<Dashboard {...cp} setPage={setPage}/>;
  else if(page==="june")body=<JunePage {...cp}/>;
  else if(page==="loads")body=<LoadsPage {...cp}/>;
  else if(page==="employees")body=<EmployeesPage th={th} employees={employees} juneOverrides={juneOverrides} setJuneOverrides={setJuneOverrides} loads={loads} setLoads={setLoads}/>;
  else if(page==="payroll")body=<PayrollPage th={th} employees={employees} juneOverrides={juneOverrides}/>;
  else if(page==="owner")body=<OwnerRevenuePage th={th} loads={loads} employees={employees} juneOverrides={juneOverrides}/>;
  else body=<ReportsPage th={th} employees={employees} juneOverrides={juneOverrides}/>;
  const mob=typeof window!=="undefined"&&window.innerWidth<768;
  return(
    <div style={{minHeight:"100vh",background:th.bg,color:th.text,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',sans-serif",display:"flex"}}>
      <aside style={{width:215,minHeight:"100vh",background:th.surf,borderRight:"1px solid "+th.bd,display:"flex",flexDirection:"column",position:"fixed",left:0,top:0,bottom:0,zIndex:100,transform:(sb||!mob)?"translateX(0)":"translateX(-100%)",transition:"transform .25s ease"}}>
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
              {n[0]==="june"&&<span style={{marginLeft:"auto",background:"#0EA5E922",color:"#0EA5E9",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:20}}>71</span>}
            </button>
          ))}
        </nav>
        <div style={{padding:"9px 7px 16px",borderTop:"1px solid "+th.bd}}>
          <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 10px",marginBottom:5}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:C.accent+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.accent}}>{(user.name||"A").charAt(0)}</div>
            <div><div style={{fontSize:11,fontWeight:600}}>{user.name}</div><div style={{fontSize:9,color:th.muted}}>{user.role}</div></div>
          </div>
          <button onClick={()=>setDark(d=>!d)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:th.muted,fontSize:11,marginBottom:3}}><Icon name={dark?"sun":"moon"} size={14} color={th.muted}/>{dark?"Light Mode":"Dark Mode"}</button>
          <button onClick={()=>setUser(null)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"7px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:C.red,fontSize:11}}><Icon name="logout" size={14} color={C.red}/>Sign Out</button>
        </div>
      </aside>
      {sb&&<div onClick={()=>setSb(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:99}}/>}
      <div style={{flex:1,marginLeft:mob?0:215,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
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

function ReportsPage({th,employees,juneOverrides}){
  const juneMerged=mergeJune(juneOverrides);
  const paid=juneMerged.filter(l=>l.pay==="Paid"),unpaid=juneMerged.filter(l=>l.pay==="Unpaid");
  const totalNet=paid.reduce((s,l)=>s+netInv(l),0);
  const totalEmpComm=employees.filter(e=>e.role!=="Owner").reduce((s,e)=>s+calcCommission(e,paid),0);
  const by={};
  juneMerged.forEach(l=>{if(!by[l.dn])by[l.dn]={n:l.dn,loads:0,inv:0,net:0,paid:0};by[l.dn].loads++;by[l.dn].inv+=l.inv||0;by[l.dn].net+=netInv(l);if(l.pay==="Paid")by[l.dn].paid+=netInv(l);});
  const rows=Object.values(by).sort((a,b)=>b.inv-a.inv);
  return(
    <div>
      <h2 style={{margin:"0 0 16px",fontSize:19,fontWeight:700}}>Reports - June 2026</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))",gap:10,marginBottom:18}}>
        <Stat th={th} label="Total Loads" value={juneMerged.length} color={C.accent} icon="box"/>
        <Stat th={th} label="Paid Loads" value={paid.length} color={C.green} icon="check"/>
        <Stat th={th} label="Unpaid Loads" value={unpaid.length} color={C.yellow} icon="box"/>
        <Stat th={th} label="Net (Paid)" value={money(totalNet)} color={C.green} icon="dollar" sub="After payment fees"/>
        <Stat th={th} label="Employee Comm" value={money(totalEmpComm)} color={C.yellow} icon="users"/>
        <Stat th={th} label="Owner Profit" value={money(totalNet-totalEmpComm)} color={C.purple} icon="dollar"/>
      </div>
      <div style={{background:th.surf,border:"1px solid "+th.bd,borderRadius:14,padding:18}}>
        <div style={{fontWeight:600,marginBottom:12}}>Driver Performance</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Driver","Loads","Invoice","Net (all)","Net (paid)"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 11px",color:th.muted,fontWeight:500,borderBottom:"1px solid "+th.bd,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
            <tbody>{rows.map(d=>(
              <tr key={d.n} style={{borderBottom:"1px solid "+th.bd}}>
                <td style={{padding:"9px 11px",fontWeight:700}}>{d.n}</td>
                <td style={{padding:"9px 11px",textAlign:"center"}}>{d.loads}</td>
                <td style={{padding:"9px 11px",fontWeight:600}}>{money(d.inv)}</td>
                <td style={{padding:"9px 11px",fontWeight:600}}>{money(d.net)}</td>
                <td style={{padding:"9px 11px",fontWeight:700,color:C.green}}>{money(d.paid)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
