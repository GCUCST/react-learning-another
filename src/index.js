import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux'


/**
 * 步骤：1. 写reducer
 *      2. 初始化store
 *      3. 写映射state数据，映射dispatch方法。
 *      4. 写你的组件，调用映射的方法
 *      5. 使用connect关联3映射方法和4你的组件
 *      6.  使用 Provider 包裹5组件，渲染 
 */

class Counter extends React.Component{
    render(){
      const value = this.props.value;
      const onAddClick = this.props.onAddClick;
      return(
        <div>
          <h1>计数的数量：{value}</h1>
          <button onClick = {onAddClick}>加一</button>
        </div>
      )
    }
}

function reducer(state={num:0},action){
  switch (action.type) {
    case "add":
       state.num+=1;
       break;
    default:
      console.log("找不到对应的action.type")
    }
    return {...state};
}

const store = createStore(reducer);

//将state映射对应的props函数
function mapStateToProps(state){
  return {
    value : state.num
  }
}

//动作
const addAction = {
  type:'add'
}
//将修改state数据方法dispatch映射到props，实现方法贡献
function mapDispatchToProps(dispatch){
  return {
    onAddClick:()=>{
      dispatch(addAction)
    }
  }
}

//组件和数据进行连接
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// /**自动将store里的state和组件进行关联 */
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,
   document.getElementById('root')
);