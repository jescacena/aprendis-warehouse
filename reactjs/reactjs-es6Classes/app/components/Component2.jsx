import React from 'react';

// var isAdmin = true;
// var adminComponent = (Component) => {
//   return class Admin extends React.Component {
//     render () {
//       if (isAdmin) {
//         return (
//           <div className="callout secondary">
//             <p className="alert label">Private admin information</p>
//             <Component {...this.props}/>
//           </div>
//         )
//       } else {
//           return null
//       }
//     }
//   };
// };

var isAdmin = true;
var adminComponent = (Component) => {
  return class Admin extends Component {
    componentDidUpdate () {
      console.log('Admin component did update');

      if (super.componentDidUpdate) {
        super.componentDidUpdate();
      }
    }
    render () {
      if (isAdmin) {
        return (
          <div className="callout secondary">
            <p className="alert label">Private admin information</p>
            {super.render()}
          </div>
        )
      } else {
          return null
      }
    }
  };
};

class ComponentTwo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: props.count
    };
    // this.onClick = this.onClick.bind(this);
  }
  // onClick () {
  //   this.setState({
  //     count: this.state.count + 1
  //   });
  // }
  render () {
    return (
      <div>
        <h3>Component Two Using React.Component</h3>
        <p>Current count: {this.state.count}</p>
        <button className="button" onClick={() => {
          this.setState({
            count: this.state.count + 1
          });
        }}>Button Two</button>
      </div>
    );
  }
}

ComponentTwo.defaultProps = {
  count: 50
};

ComponentTwo.propTypes = {
  count: React.PropTypes.number
};

export default adminComponent(ComponentTwo);
