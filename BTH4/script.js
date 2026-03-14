const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")

const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

const searchInput = document.getElementById("search")
const filterRank = document.getElementById("filterRank")
const sortScore = document.getElementById("sortScore")

let students = []
let filteredStudents = []

let sortDirection = null // asc | desc

function getRank(score){

if(score >= 8.5) return "Giỏi"
if(score >= 7) return "Khá"
if(score >= 5) return "Trung bình"
return "Yếu"

}

function addStudent(){

const name = nameInput.value.trim()
const score = parseFloat(scoreInput.value)

if(name === ""){
alert("Họ tên không được trống")
return
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0-10")
return
}

students.push({
name,
score
})

nameInput.value=""
scoreInput.value=""
nameInput.focus()

applyFilters()

}

addBtn.addEventListener("click",addStudent)

scoreInput.addEventListener("keyup",(e)=>{

if(e.key==="Enter"){
addStudent()
}

})

function applyFilters(){

const keyword = searchInput.value.toLowerCase()
const rankFilter = filterRank.value

filteredStudents = students.filter(s=>{

const matchName = s.name.toLowerCase().includes(keyword)

const rank = getRank(s.score)

const matchRank = rankFilter === "all" || rank === rankFilter

return matchName && matchRank

})

if(sortDirection){

filteredStudents.sort((a,b)=>{

return sortDirection==="asc" ? a.score-b.score : b.score-a.score

})

}

renderTable()

}

function renderTable(){

tableBody.innerHTML=""

if(filteredStudents.length===0){

tableBody.innerHTML=`<tr>
<td colspan="5" class="no-result">Không có kết quả</td>
</tr>`

updateStats()
return

}

filteredStudents.forEach((s,index)=>{

const tr=document.createElement("tr")

if(s.score < 5){
tr.classList.add("low-score")
}

tr.innerHTML=`

<td>${index+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${getRank(s.score)}</td>
<td>
<button data-name="${s.name}" class="delete-btn">Xóa</button>
</td>

`

tableBody.appendChild(tr)

})

updateStats()

}

function updateStats(){

const total = filteredStudents.length

let avg = 0

if(total>0){

const sum = filteredStudents.reduce((a,b)=>a+b.score,0)
avg=(sum/total).toFixed(2)

}

stats.textContent=`Tổng sinh viên hiển thị: ${total} | Điểm trung bình: ${avg}`

}

searchInput.addEventListener("input",applyFilters)

filterRank.addEventListener("change",applyFilters)

sortScore.addEventListener("click",()=>{

if(sortDirection===null || sortDirection==="desc"){
sortDirection="asc"
sortScore.textContent="Điểm ▲"
}else{
sortDirection="desc"
sortScore.textContent="Điểm ▼"
}

applyFilters()

})

tableBody.addEventListener("click",(e)=>{

if(e.target.classList.contains("delete-btn")){

const name = e.target.getAttribute("data-name")

students = students.filter(s=>s.name!==name)

applyFilters()

}

})

applyFilters()