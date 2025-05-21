import data from './details.json';
import { useState } from 'react';
import cart from './Assets/icon-add-to-cart.svg';
import plus from './Assets/icon-increment-quantity.svg';
import subtract from './Assets/icon-decrement-quantity.svg';
import './App.css';

function Carts({num, setNum, setBtn, btn, setCount, count}){
  const indexes = []
  num.forEach((element, index) => {
    if(element !== 0){
      indexes.push(index)
    }
  });
  let total = 0;
  indexes.forEach(e=>{
    let tot = (num[e] * data[e].price)
    total += tot}
  )

  function remove(index){
    let rNum = [...num]
    rNum[index] = 0
    setNum(rNum)
    let rBtn = [...btn]
    rBtn[index] = 0
    setBtn(rBtn)
  }

  function newOrder(){
    setCount(0);
    setBtn(btn.fill(0));
    setNum(btn.fill(0))
  }

  return(
    <div className="cart">
      <h2 className='counts'>Your({indexes.length})</h2>
      {indexes.length==0 ? 
      <div className='emptyCart'>
        <img src="./illustration-empty-cart.svg" alt="" />
        <p>Your added items will appear here</p>
      </div>:
      <div className='addedCart'>
          {indexes.map(e=> <div className='food' key={e}>
            <div className="product">
              <p className='head'>{data[e].name}</p>
              <div className="prices">
                <p className="unit">{num[e]}x</p>
                <p className="pricex">@${data[e].price.toFixed(2)}</p>
                <p className="amount">${(data[e].price * num[e]).toFixed(2)}</p>
              </div>
            </div>
            <img src="./icon-remove-item.svg" alt="" onClick={()=>remove(e)}/>
          </div> )}
          <div className="total">
            <p>Order Total</p>
            <h2>${total.toFixed(2)}</h2>
          </div>
          <p className='carbon'><img src="./icon-carbon-neutral.svg" alt="" /> This is a <strong>carbon neutral</strong> delivery</p>
          <button onClick={()=>setCount(1)}>Confirm Order</button>
      </div>}
      {(count == 1) && (<div className="confirm">
          <div className="page">
            <img src="./icon-order-confirmed.svg" alt="" />
            <h2 className='mark'>Order Confirmed</h2>
            <p className='info'>We hope you enjoy your food!</p>
            <div className="orders">
              {indexes.map(e=><div className='foodOrders' key={e}>
                <div className="foods">
                  <img src={data[e].thumbnail} alt="" />
                  <div className="foodDetails">
                    <p className='foodName'>{data[e].name}</p>
                    <div className="foodUnits">
                      <p className='x'>{num[e]}x</p>
                      <p>@${data[e].price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <h2 className="priced">${(data[e].price * num[e]).toFixed(2)}</h2>
              </div>)}
              <div className="foodTotals">
                <p>Order Total</p>
                <h2 className='priced'>${total.toFixed(2)}</h2>
              </div>
            </div>
            <button className='closeOrders' onClick={()=>newOrder()}>Start new Order</button>
          </div>
      </div>)}
    </div>
  )
}

function Head() {
  const [count, setCount] = useState(0)
  const [btn, setBtn] = useState(Array(data.length).fill(0))
  const [unit, setUnit] = useState(Array(data.length).fill(0))
  let [num, setNum] = useState(Array(data.length).fill(0))
  const toggle = (index) =>{
    const newBtn = [...btn];
    newBtn[index] = 1;
    setBtn(newBtn);
    let newNum = [...num]
    newNum[index] = 1
    setNum(newNum)
  }
  const minus =(index)=>{
    let mns = [...num]
    if(mns[index] > 1){
      mns[index] --
    }else{
      btn[index] = 0
      mns[index] = 0
    }
    setNum(mns)
  }
  const pls =(index)=>{
    let pls = [...num]
    pls[index] ++
    setNum(pls)
  }
  return(
    <div id="container">
      <div className="left">
        <h2 className='heading'>Desserts</h2>
        <div className="commerce">
          <div className="items">
            {data.map((item, index) => (
              <div key={item.id} id={item.id}  className='box'>
                <img src={item.src} alt="" />
                <div className="button">
                  {btn[index] >= 1?
                    <button className='count'><img src={subtract} alt="" onClick={()=> minus(index)} /><input type="text" value={num[index]} disabled/><img src={plus} onClick={()=> pls(index)} alt="" /></button> :
                    <button className='car' onClick={()=>toggle(index)}><img src={cart} alt="" />Add to carts</button>
                  }
                </div>
                <p className="name">{item.name}</p>
                <p className="details">{item.details}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            )
            )}
          </div>
        </div>
      </div>
      <div className='right'>
        <Carts num={num} btn={btn} setNum={setNum} setBtn={setBtn} setCount={setCount} count={count}/>
      </div>
    </div>
  )
}

export default Head
