import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux'

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


const addAction = {
  type:'add'
}
//将修改state数据方法映射到props
function mapDispatchToProps(dispatch){
  return {
    onAddClick:()=>{
      dispatch(addAction)
    }
  }
}



//关联 方法和组件
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  ,
   document.getElementById('root')
);