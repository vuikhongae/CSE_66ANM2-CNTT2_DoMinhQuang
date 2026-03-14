let currentStep = 1

const steps = document.querySelectorAll(".step")
const progress = document.getElementById("progress")
const progressText = document.getElementById("progressText")

const password = document.getElementById("password")
const togglePassword = document.getElementById("togglePassword")

const strengthLevel = document.getElementById("strengthLevel")
const strengthText = document.getElementById("strengthText")

/* toggle password */

togglePassword.addEventListener("click",()=>{

password.type = password.type === "password" ? "text" : "password"

})

/* strength bar */

password.addEventListener("input",()=>{

const value = password.value

let strength = 0

if(value.length >= 8) strength++
if(/[A-Z]/.test(value)) strength++
if(/[0-9]/.test(value)) strength++
if(/[^A-Za-z0-9]/.test(value)) strength++

if(strength <= 1){

strengthLevel.style.width="33%"
strengthLevel.className="weak"
strengthText.textContent="Mật khẩu yếu"

}
else if(strength <=3){

strengthLevel.style.width="66%"
strengthLevel.className="medium"
strengthText.textContent="Mật khẩu trung bình"

}
else{

strengthLevel.style.width="100%"
strengthLevel.className="strong"
strengthText.textContent="Mật khẩu mạnh"

}

})

function showStep(step){

steps.forEach(s => s.classList.remove("active"))

document.getElementById("step"+step).classList.add("active")

progress.style.width = (step*33) + "%"

progressText.textContent = "Bước " + step + " / 3"

}

showStep(currentStep)

/* VALIDATE STEP 1 */

function validateStep1(){

const name = document.getElementById("fullname").value.trim()
const dob = document.getElementById("dob").value
const gender = document.querySelector("input[name='gender']:checked")

let valid = true

if(name.length < 3){
document.getElementById("fullnameError").textContent="Tên ≥ 3 ký tự"
valid=false
}else{
document.getElementById("fullnameError").textContent=""
}

if(!dob){
document.getElementById("dobError").textContent="Chọn ngày sinh"
valid=false
}else{
document.getElementById("dobError").textContent=""
}

if(!gender){
document.getElementById("genderError").textContent="Chọn giới tính"
valid=false
}else{
document.getElementById("genderError").textContent=""
}

return valid
}

/* VALIDATE STEP 2 */

function validateStep2(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value
const confirm = document.getElementById("confirmPassword").value

let valid = true

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email)){
document.getElementById("emailError").textContent="Email không hợp lệ"
valid=false
}else{
document.getElementById("emailError").textContent=""
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

if(!passwordRegex.test(password)){
document.getElementById("passwordError").textContent =
"Mật khẩu ≥8 ký tự, có chữ hoa, chữ thường, số"
valid = false
}
else{
document.getElementById("passwordError").textContent=""
}

if(confirm !== password){
document.getElementById("confirmError").textContent="Mật khẩu không khớp"
valid=false
}else{
document.getElementById("confirmError").textContent=""
}

return valid
}

/* NEXT BUTTON */

document.getElementById("next1").onclick = () => {

if(validateStep1()){

currentStep = 2
showStep(currentStep)

}

}

document.getElementById("next2").onclick = () => {

if(validateStep2()){

showSummary()

currentStep = 3
showStep(currentStep)

}

}

/* BACK BUTTON */

document.getElementById("back1").onclick = () => {

currentStep = 1
showStep(currentStep)

}

document.getElementById("back2").onclick = () => {

currentStep = 2
showStep(currentStep)

}

/* SUMMARY */

function showSummary(){

const name = document.getElementById("fullname").value
const dob = document.getElementById("dob").value
const gender = document.querySelector("input[name='gender']:checked")?.value
const email = document.getElementById("email").value

document.getElementById("summary").innerHTML =

`
<p><b>Họ tên:</b> ${name}</p>
<p><b>Ngày sinh:</b> ${dob}</p>
<p><b>Giới tính:</b> ${gender}</p>
<p><b>Email:</b> ${email}</p>
`

}

/* SUBMIT */

document.getElementById("multiForm").addEventListener("submit",(e)=>{

e.preventDefault()

/* chỉ cho submit khi ở step 3 */

if(currentStep !== 3){
return
}

document.getElementById("multiForm").style.display="none"

document.getElementById("success").innerHTML=
`<div class="success">
Đăng ký thành công 🎉
</div>`

})

/* ENTER = NEXT */

document.getElementById("multiForm").addEventListener("keydown",(e)=>{

if(e.key === "Enter"){

e.preventDefault()

if(currentStep === 1){
document.getElementById("next1").click()
}
else if(currentStep === 2){
document.getElementById("next2").click()
}

}

})