import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
// import * as serviceWorker from './serviceWorker';

/**
 *  步骤：1.写reducer方法(state,action)
 *        2.创建store（通过createStore）
 *        3.写方法（调用dispatch(action)）
 *        4.写显示界面
 *        5.监听变化，重新渲染(store.subscribe)
 */       


//用于操作状态的仓库，通过动作操作state
const reducer = function(state={num:10},action){
  switch (action.type) {
    case "add":
       state.num+=1;
       break;
    case "decr":
         state.num-=1;
         break;
    default:
      console.log("找不到对应的action.type")
    }
    return {...state}; //相当于复制得到一个新的state
}

//创建store对象，关联对应仓库
const store = createStore(reducer)

//调用dispatch执行,传入对应的action.type，指明执行的方法
function add(){
  //通过仓库的方法dispath进行修改数据
  store.dispatch({type:'add'})
  console.log(store.getState())
}
//调用dispatch执行,传入对应的action.type，指明执行的方法
function decr(){
  //通过仓库的方法dispath进行修改数据
  store.dispatch({type:'decr'})
  console.log(store.getState())
}

//显示界面
const Counter = function(props){
  let state = store.getState()
  return (
    <div className="index">
      <h1 >值：{state.num}</h1>
      <button onClick={add}>加一</button>&nbsp;&nbsp;&nbsp;
      <button onClick={decr}>减一</button>
    </div>
  )
}

//监听变化，重新渲染
store.subscribe(()=>{
  ReactDOM.render(
    <Counter />,
     document.getElementById('root')
   );
})

ReactDOM.render(
 <Counter />,
  document.getElementById('root')
);

// serviceWorker.unregister();
