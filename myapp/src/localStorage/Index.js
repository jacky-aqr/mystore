import React from 'react';
class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        // {
        //   title: 'ionic',
        //   checked: true
        // },
        // {
        //   title: 'nodejs',
        //   checked: false
        // },
        // {
        //   title: 'vue',
        //   checked: false
        // }
      ],
      name: 'TodoList'
    }
  }
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
  delData = (key) => {
    var temList = this.state.list
    temList.splice(key, 1)
    this.setState({
      list: temList
    })
    localStorage.setItem('todoList', JSON.stringify(temList))
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
        {this.state.name}
        <br />
        <input ref='title' onKeyUp={this.addData} />
        <h2>待办事项</h2>
        <ul>
          {
            this.state.list.map((value, key) => {
              if (!value.checked) {
                return (
                  <li key={key}>
                    <input type='checkbox' checked={value.checked} onChange={this.checkData.bind(this, key)} />{value.title}-----------<button onClick={this.delData.bind(this, key)}>删除</button></li>
                )
              }
            })
          }
        </ul>
        <h2>已完成事项</h2>
        <ul>
          {
            this.state.list.map((value, key) => {
              if (value.checked) {
                return (
                  <li key={key}>
                    <input type='checkbox' checked={value.checked} onChange={this.checkData.bind(this, key)} />{value.title}-----------<button onClick={this.delData.bind(this, key)}>删除</button></li>
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