const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const deliveryDate = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const totalEl = document.getElementById("total")
const noteCounter = document.getElementById("noteCounter")

const confirmBox = document.getElementById("confirmBox")
const success = document.getElementById("success")

const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000
}

function showError(id,msg){
document.getElementById(id+"Error").textContent=msg
document.getElementById(id).classList.add("invalid")
}

function clearError(id){
document.getElementById(id+"Error").textContent=""
document.getElementById(id).classList.remove("invalid")
document.getElementById(id).classList.add("valid")
}

function validateProduct(){

if(product.value===""){
showError("product","Vui lòng chọn sản phẩm")
return false
}

clearError("product")
return true
}

function validateQuantity(){

const value=parseInt(quantity.value)

if(isNaN(value) || value<1 || value>99){
showError("quantity","Số lượng từ 1-99")
return false
}

clearError("quantity")
return true
}

function validateDate(){

const selected=new Date(deliveryDate.value)
const today=new Date()
today.setHours(0,0,0,0)

const max=new Date()
max.setDate(today.getDate()+30)

if(!deliveryDate.value){
document.getElementById("dateError").textContent="Chọn ngày giao"
return false
}

if(selected<today){
document.getElementById("dateError").textContent="Không chọn ngày quá khứ"
return false
}

if(selected>max){
document.getElementById("dateError").textContent="Không quá 30 ngày"
return false
}

document.getElementById("dateError").textContent=""
return true
}

function validateAddress(){

const value=address.value.trim()

if(value.length<10){
showError("address","Địa chỉ tối thiểu 10 ký tự")
return false
}

clearError("address")
return true
}

function validateNote(){

if(note.value.length>200){
document.getElementById("noteError").textContent="Tối đa 200 ký tự"
return false
}

document.getElementById("noteError").textContent=""
return true
}

function validatePayment(){

const radios=document.querySelectorAll("input[name='payment']")
let checked=false

radios.forEach(r=>{
if(r.checked) checked=true
})

if(!checked){
document.getElementById("paymentError").textContent="Chọn phương thức thanh toán"
return false
}

document.getElementById("paymentError").textContent=""
return true
}

function updateTotal(){

const price=prices[product.value] || 0
const qty=parseInt(quantity.value)||0

const total=price*qty

totalEl.textContent=total.toLocaleString("vi-VN")
}

product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)

note.addEventListener("input",()=>{

const len=note.value.length

noteCounter.textContent=len+"/200"

if(len>200){
noteCounter.classList.add("over")
}else{
noteCounter.classList.remove("over")
}

})

product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
deliveryDate.addEventListener("blur",validateDate)
address.addEventListener("blur",validateAddress)

product.addEventListener("input",()=>clearError("product"))
quantity.addEventListener("input",()=>clearError("quantity"))
address.addEventListener("input",()=>clearError("address"))

form.addEventListener("submit",(e)=>{

e.preventDefault()

const valid=
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment()

if(!valid) return

const total=totalEl.textContent

confirmBox.style.display="block"

confirmBox.innerHTML=`
<h3>Xác nhận đặt hàng</h3>
<p>Sản phẩm: ${product.value}</p>
<p>Số lượng: ${quantity.value}</p>
<p>Ngày giao: ${deliveryDate.value}</p>
<p>Tổng tiền: ${total} VND</p>

<button id="confirmBtn">Xác nhận</button>
<button id="cancelBtn">Hủy</button>
`

document.getElementById("confirmBtn").onclick=()=>{

form.style.display="none"
confirmBox.style.display="none"

success.innerHTML=`<div class="success">
Đặt hàng thành công 🎉
</div>`

}

document.getElementById("cancelBtn").onclick=()=>{
confirmBox.style.display="none"
}

})