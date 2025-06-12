let cartList = JSON.parse(localStorage.getItem("data")) || []
function add_to_cart(id,img,name,price) {
    cartList.push(
        {
           id:id,
            img:img,
            name:name,
            price:price
        }
    )
    localStorage.setItem("data",JSON.stringify(cartList))
    console.log(cartList)
    alert(`${name} added to cart`)
    
}