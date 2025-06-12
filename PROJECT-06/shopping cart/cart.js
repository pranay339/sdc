let cartList = JSON.parse(localStorage.getItem("data")) || []
let cartContainer = document.getElementById("cart-items")

function generatecartItems() {
    if(cartList.length !== 0) {
        cartContainer.innerHTML = cartList.map((element)=> {
            let {id,img,name,price}= element
            return `
            <div class="cart-ind-products">
            <p>${name}</p>
            <img src="${img}" alt="" class="cart-img"/>
            <p>₹${price}</p>
            <button onclick="remove_button('${id}')" class="cart-btn" > Remove</button>
            </div>
            `
        })
    }
    else {
        cartContainer.innerHTML=` <h3>Shopping cart is empty</h3>`
    }
}
generatecartItems()

function total_price () {
    let total_amount = 0
    for(let each of cartList) {
        total_amount = total_amount + parseInt(each.price)
    }
    document.getElementById("total-price").innerHTML = ` <h4> Total Price: ${total_amount} </h4> `
}
total_price()

function remove_button(id) {
    
    
    for(let ind in cartList) {
        if(cartList[ind].id==id) {
            cartList.splice(ind,1)
        }
    }
    localStorage.setItem("data",JSON.stringify(cartList))
    generatecartItems()
    total_price()
}