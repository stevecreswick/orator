var React = require('react')
var ReactDOM = require('react-dom')
var MyTitle = require('./components/MyTitle')

var MyFirstComponent = function () {
  return (
    <div>
      <MyTitle title='why' color='rebeccapurple' />
      <MyTitle title='work!' color='papayawhip' />
      <MyTitle title='you' color='#f06d06' />
    </div>
  )
}

ReactDOM.render(<MyFirstComponent />, document.getElementById('app'))
