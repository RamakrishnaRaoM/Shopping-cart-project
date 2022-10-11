let a=document.querySelector('.mainbody');

let basket=JSON.parse(localStorage.getItem("data"))||[];

let generateShopItems=()=>{
  return (
    a.innerHTML=b.map((x)=>{
      let searching=basket.findIndex((y)=>{return x.id===y.id});
      return `
         <div class="maindiv" id=productId-${x.id}>
            <div class="verticaldiv1">
              <img src="${x.image}" class="jpg">
            </div>
    
            <div class="verticaldiv2">
              <div class="verticaldiv1verticaldiv2">
                <span>${x.name}</span>
              </div>
    
              <div class="verticaldiv2verticaldiv2">
                ${x.description}
              </div>
    
              <div class="verticaldiv3verticaldiv2">
                <div class="horizontal1verticaldiv3verticaldiv2">
                  <span> ₹ ${x.cost}</span>
                </div>
    
                <div class="horizontal2verticaldiv3verticaldiv2">
                  <button onclick="decrement(${x.id})" type="button" class="minus"><span>-</span></button>
                 
    
                  <p class="quantity" id=${x.id}>${searching===-1?0: basket[searching].itemCount}</p>
    
                  <button onclick="increment(${x.id})" type="button" class="plus"><span>+</span></button>
                </div>
              </div>
            </div>
          </div> `;
      

    }).join("")
  )
};

generateShopItems();

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

  if (search === undefined) return;
  else if (search.itemCount === 0) return;
  else {
    search.itemCount -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.itemCount !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  console.log(basket);
};

let update=(id)=>{
  let searchitem=basket.findIndex((x)=>{return x.id===id});
  document.getElementById(id).innerHTML=basket[searchitem].itemCount;
  calculate();
};

let calculate=()=>{
document.getElementById("cartamount").innerHTML=basket.reduce((acc,cur)=>{return acc+cur.itemCount},0);
}
calculate();

