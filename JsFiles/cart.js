
let basket=JSON.parse(localStorage.getItem("data"))||[];
let calculate=()=>{
  document.getElementById("cartamount").innerHTML=basket.reduce((acc,cur)=>{return acc+cur.itemCount},0);
}
calculate();

let generateCart=()=>{
  if(basket.length===0){
    document.getElementById('cartBill1').innerHTML=` 
  <div class="cartDesc1" id="cartDesc11">
    <span>Cart is Empty</span>
  </div>
  <div class="cartButtons1" id="cartButtons11">
    <a href="index.html">
      <button type="button">Back to home</button>
    </a>
  </div>`;
  document.getElementById('cartItemsBody1').innerHTML=`
`;
  }
  else{
    document.getElementById('cartBill1').innerHTML=`
    <div class="totalBill" id="totalBill1">
      
    </div>
    <div class="twoButtons">
      <button type="button" class="blueButton">Checkout</button>
      <button onclick="clearingCart()" type="button" class="redButton">Clear Cart</button>
    </div>`;
  
    document.getElementById('cartItemsBody1').innerHTML=basket.map(x=>{
      let searching=b.findIndex((y)=>{return x.id===y.id});
      return `
    <div class="cartItem" >
      <div class="imageSection">
        <img src=${b[searching].image}>
      </div>
      
      <div class="mainDescriptionSection">
        <div class="descriptionSection1">
          <span>${b[searching].name}</span> <button>₹ ${b[searching].cost}</button> 
        </div>

        <div class="descriptionSection2">
          <button onclick="decrement(${x.id})" type="button" class="minus"><span>-</span></button>
         
          <p class="quantity" id=${x.id}>${x.itemCount}</p>

          <button onclick="increment(${x.id})" type="button" class="plus"><span>+</span></button>
        </div>

        <div class="descriptionSection3">
          <span> ₹ ${x.itemCount * b[searching].cost}</span>
        </div>
      </div>

      <div class="cutSection">
        <button onclick ="cut(${x.id})">x</button>
      </div>
    </div>
    `;
    }).join("")
  }
}
generateCart();

let increment=(id)=>{
  let item=id;
  let searchitem=basket.findIndex((x)=>{return x.id===item.id});
  if(searchitem===-1){
  basket.push({id: item.id,
  itemCount: 1
  });
  }
  else{
    basket[searchitem].itemCount+=1;
  }
  update(item.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement=(id)=>{
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search.itemCount === 1){
    cut(id);

  }
  else {
    search.itemCount -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.itemCount !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update=(id)=>{
  let searchitem=basket.findIndex((x)=>{return x.id===id});
  document.getElementById(id).innerHTML=basket[searchitem].itemCount;
  calculate();
  generateBill(); 
};
 

let cut=(id)=>{
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  search.itemCount=0;
  update(selectedItem.id);
  basket = basket.filter((x) => x.itemCount !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  generateBill();
}

let clearingCart=()=>{
  basket.splice(0,basket.length);
  calculate();
  localStorage.setItem("data", JSON.stringify(basket));
  generateCart();
}

let generateBill=()=>{
  if(basket.length!==0){
    generateCart();
    let amount=basket.map((x)=>{
      let searchitem=b.findIndex((y)=>{return x.id===y.id});
      return b[searchitem].cost*x.itemCount;
    }).reduce((x, y) => x + y, 0);
    document.getElementById('totalBill1').innerHTML=`<h2>Total Bill : ₹ ${amount} </h2>`;
  }
  
    
  else if(basket.length===0){
    generateCart();
  }
}

generateBill();
