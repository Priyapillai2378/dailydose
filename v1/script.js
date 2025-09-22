const initialDose = [
  {
    id: 1,
    text: "  What’s your management style A good manager gives clear directions and is ready to jump in to offer guidance, expertise, and help when needed. I also go out of my way to make sure I know when my team needs help.",
    source:
      "https://www.themuse.com/advice/interview-questions-and-answers#c94aaea8-2076-4a8a-8df1-fb0c1be56e3c",
    votesInteresting: 25,
    votesMindblowing: 18,
    votesFalse: 4,
    creadtedIn: 2015,
    category: "Interview Qn",
  },

  {
    id: 2,
    text: " Reverse Pyramid of numbers rows = 5 for i in range(0, rows + 1):for j in range(rows - i, 0, -1): print(j, end=' ')print()output: 5 4 3 2 1 4 3 2 1 3 2 1 2 1 1 ",
    source:
      "https://www.themuse.com/advice/interview-questions-and-answers#c94aaea8-2076-4a8a-8df1-fb0c1be56e3c",
    votesInteresting: 30,
    votesMindblowing: 20,
    votesFalse: 3,
    creadtedIn: 2017,
    category: "Python",
  },
  {
    id: 3,
    text: " A man has Rs.480 in the denominations of one-rupee notes, five-rupee notes and ten-rupee notes. The number of notes of each denomination is equal. What is the total number of notes that he has ?Explanation:Let number of notes of each denomination be x.Then x + 5x + 10x = 48016x = 480 x = 30.Hence, total number of notes = 3x = 90.",
    source:
      "https://www.themuse.com/advice/interview-questions-and-answers#c94aaea8-2076-4a8a-8df1-fb0c1be56e3c",
    votesInteresting: 35,
    votesMindblowing: 18,
    votesFalse: 2,
    creadtedIn: 2015,
    category: "Aptitude",
  },
];

const CATEGORIES = [
  { name: "Java", color: "#0369a1" },
  { name: "C", color: "#0369a1" },
  { name: "Python", color: "#0369a1" },
  { name: "Aptitude", color: "#dc2626" },
  { name: "Interview Questions", color: "#dc2626" },
  { name: "Pattern", color: "#dc2626" },
];

//Selecting DOM Elements
const btn = document.querySelector(".share-btn");
const form = document.querySelector(".Dose-Form");
const DoseList = document.querySelector(".Dose-List");
//Creating DOM elements
DoseList.innerHTML = "";
//Load data from Supabase
LoadDose();
async function LoadDose() {
  const res = await fetch(
    "https://fqbznzlbkgxmucuxghdg.supabase.co/rest/v1/Dose",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYnpuemxia2d4bXVjdXhnaGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNzE3NDcsImV4cCI6MjAwNzc0Nzc0N30.l9WL4bjuJtvJYeKTelgLIEIwhn6qFsWkv_U96_Bs5Ao",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYnpuemxia2d4bXVjdXhnaGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNzE3NDcsImV4cCI6MjAwNzc0Nzc0N30.l9WL4bjuJtvJYeKTelgLIEIwhn6qFsWkv_U96_Bs5Ao",
      },
    }
  );
  const data = await res.json();
  // console.log(data);
  // const filteredData = data.filter((dose)=>dose.category === "Java");
  // createDoseList(filteredData);
  createDoseList(data);
}

function createDoseList(dataArray) {
  const htmlarr = dataArray.map(
    (dosecontent) => `<li class="dose-content">
<p>
<pre>
${dosecontent.text} 
</pre>
<a class="source" href="${dosecontent.source}">(source)</a>
</p>
<span class="tag" style="background-color:${
      CATEGORIES.find((cat) => cat.name === dosecontent.category).color
    }">${dosecontent.category}</span>
</li>`
  );
  console.log(htmlarr);
  const html = htmlarr.join("");
  DoseList.insertAdjacentHTML("afterbegin", html);
}
//Toggle Form Visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a Dose";
  }
});

console.log([2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18].filter((el) => el > 10));
console.log(
  [2, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18].find((el) => el > 10)
); /* votesInteresting=votesInteresting+1;
console.log(votesInteresting);
const Upvotes=votesInteresting+votesMindblowing;
let voteFalse=31;
const isCorrect=votesFalse<Upvotes;
console.log(isCorrect);



console.log(displayAge(2040));






let votesInteresting=25;
let votesMindblowing=20;
if(votesInteresting===votesMindblowing){
  alert('This dose is equally interesting and mindblowing');
}else if(votesInteresting>votesMindblowing){
  console.log('Interesting Dose!');
}
if(votesMindblowing){
  console.log('Mindblowing');
}else{
  console.log('Not so special');
}
let votesFalse=2;
const totalUpvotes=votesInteresting+votesMindblowing;
const msg= totalUpvotes>votesFalse? "Dose is true":"Might be False .Check other sources";
console.log(msg);
//Arrays
const arr=['word',22,true];
console.log(arr);
console.log(arr[1]);
console.log(arr.length);
const [text,num,bool]=arr;
console.log(num);

const dose1=[...arr,'priya'];

console.log(dose1);
console.log(3!==3? 'priya':'dhanu');
const DoseObj={ 
  dose:'Java is a powerful Language',
  category:'Java',
  createdIn:22,
  iscorrect:true,
createSummary:function(){
  return `This dose "${this.dose}" is from the category ${this.category.toUpperCase()}
`;
},
};
console.log(DoseObj.createSummary());
[2,4,6,8].forEach(function(el){
  console.log(el);
});
const times10=[2,3,4,5].map((el)=>el*10);
console.log(times10);
const CATEGORIES=[{
  name:'Java',color:"#b91c1c"},
  {name:'Python',color:"#b91c1c"},
 {name:'C',color:"#0e7490"},
 {name:'Aptitude',color:"#0e7490"},
 {name:'Pattern',color:"#0e7490"},
 {name:'Interview Qns',color:"#0e7490"},
];
const allCategories=CATEGORIES.map((el)=>el.name);
console.log(allCategories);
  

function displayAge(Year){
  const CurrentYear=new Date().getFullYear();
  const age= CurrentYear-Year;
  if(age>=0) return age;
  else return `Impossible age ${CurrentYear}`;
} ;

const a=initialDose.map((el)=> displayAge(el.creadtedIn));
console.log(a.join('&'));
console.log(new Date().getFullYear());*/
