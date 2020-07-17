import React from 'react';
import "../../assets/style/index.css";
import {Button } from "antd";

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
       // {title:'sss',checked:flase}
      ],
      name: 'ToDoList',
    }
  }
  //添加
  addData = (e) => {
    // console.log(e)
    //判断回车
    if (e.keyCode === 13) {
      let title = this.refs.title.value;
      let tempList = this.state.list;
      tempList.push({
        title: title,
        checked: false
      })
      this.setState({
        list: tempList
      })
      //表单置为空
      this.refs.title.value = '';
      localStorage.setItem('todoList', JSON.stringify(tempList))
    }
  }
  //删除
  delData = (key) => {
    var temList = this.state.list
    temList.splice(key, 1)
    this.setState({
      list: temList
    })
    localStorage.setItem('todoList', JSON.stringify(temList))
  }
  //点击修改按钮修改数据
  upDate(key){
    //弹出输入框进行修改
    let val=window.prompt('请输入新值');
    let temList = this.state.list
    if(val!=null){
        temList[key].title = val;
        this.setState({
            list:temList
        });
       localStorage.setItem('todoList', JSON.stringify(temList)) 
    }
}
  checkData = (key) => {
    let tempList = this.state.list;
    tempList[key].checked = !tempList[key].checked;
    this.setState({
      list: tempList
    })
    localStorage.setItem('todoList', JSON.stringify(tempList))
  }
  // 生命周期函数 页面加载就会触发
  componentDidMount () {
    var todoList = JSON.parse(localStorage.getItem('todoList'))
    if (todoList) {
      this.setState({
        list: todoList
      })
    }
  }
  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <input ref='title' onKeyUp={this.addData} placeholder="请输入" />
        <h3>待办事项</h3>
        <ul>
          {
            this.state.list.map((value, key) => {
              if (!value.checked) {
                return (
                  <li key={key}>
                    <input type='checkbox' checked={value.checked} 
                    onChange={this.checkData.bind(this, key)} />
                    {value.title}-----------
                    <Button type="primary" size='small' 
                    onClick={()=>this.upDate(key)}>编辑</Button>
                    <Button type="primary" danger size='small' 
                    onClick={this.delData.bind(this, key)}>删除</Button>
                  </li>
                )
              }
            })
          }
        </ul>
        <h3>已完成事项</h3>
        <ul>
          {
            this.state.list.map((value, key) => {
              if (value.checked) {
                return (
                  <li key={key}>
                    <input type='checkbox' checked={value.checked} 
                    onChange={this.checkData.bind(this, key)} />
                    {value.title}-----------
                    <Button type="primary" danger size='small' 
                    onClick={this.delData.bind(this, key)}>删除</Button>
                  </li>
                )
              }
            })
          }
        </ul>
      </div>
    )
  }
}
export default TodoList;