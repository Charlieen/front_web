/**
 * 1:
 */
class DisplayMessages extends React.Component {
    // Change code below this line
    constructor(props){
      super(props)
      this.state={
        input:'',
        messages:[]
      };
    }
    
    // Change code above this line
    render() {
      return <div />
    }
  };

  /**
   * 2: React and Redux: Manage State Locally First
   */

  class DisplayMessages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        messages: []
      }
      this.handleChange= this.handleChange.bind(this);
      this.submitMessage= this.submitMessage.bind(this);
    }
    // Add handleChange() and submitMessage() methods here
    handleChange(event){
      this.setState({
        input:event.target.value
      });
    }
    submitMessage(event){
      this.setState(state=>({
        messages:[...state.messages,state.input],
        input:''
      }));
    }
  
    render() {
      const items= this.state.messages.map((m,index)=>{
        return (<li key={index}>{m}</li>)
      })
      console.log('test:',this.state);
      return (
        <div>
          <h2>Type in a new Message:</h2>
          { /* Render an input, button, and ul below this line */ }
          <input value={this.state.input} onChange={this.handleChange}/>
          <button onClick={this.submitMessage}>Add message</button>
          <ul>{items}</ul>
  
          { /* Change code above this line */ }
        </div>
      );
    }
  };
  /**
   * 3: Extract State Logic to Redux
   */
  // Define ADD, addMessage(), messageReducer(), and store here:
const ADD="ADD"
const addMessage=(message)=>{return {type:ADD,message:message}};

const messageReducer=(state=[],action)=>{
    switch(action.type){
        case ADD:
            return [...state,action.message];
        default:
            return state;
    }
}

const store = Redux.createStore(messageReducer);
/**
 * Use Provider to Connect Redux and React
 */
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
 render(){
   return (
     <Provider store={store}>
     <DisplayMessages />
     </Provider>
   )
 }
 
  // Change code above this line
};
/**
 *  Map State to Props
 */
const state = [];

// Change code below this line

const mapStateToProps = (state)=>{
    return {messages:state};
}

/**
 * Map Dispatch to Props
 */
const addMessage = (message) => {
    return {
      type: 'ADD',
      message: message
    }
  };
  
  // Change code below this line
  
  const mapDispatchToProps= (dispatch)=>{
    return {
      submitNewMessage:message =>{
        dispatch(addMessage(message));
      }
    }
  }
  /**
   * Connect Redux to React
   */
  const addMessage = (message) => {
    return {
      type: 'ADD',
      message: message
    }
  };
  
  const mapStateToProps = (state) => {
    return {
      messages: state
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      submitNewMessage: (message) => {
        dispatch(addMessage(message));
      }
    }
  };
  
  class Presentational extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <h3>This is a Presentational Component</h3>
    }
  };
  
  const connect = ReactRedux.connect;
  // Change code below this line 
  const ConnectedComponent =
  connect(mapStateToProps,mapDispatchToProps)(Presentational);

  /**
   * Connect Redux to the Message App
   * 
   * In the last lesson, the component you connected to Redux was named Presentational,
   *  and this wasn't arbitrary. 
   * This term generally refers to React components that are not directly connected to Redux. 
   * They are simply responsible for the presentation of UI and do this as a function 
   * of the props they receive. By contrast, container components are connected to Redux.
   *  These are typically responsible for dispatching actions to the store 
   * and often pass store state to child components as props.
   */

   // Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Define the Container component here:


class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Complete the return statement:
    const PresentationalComponent= connect(mapStateToProps,mapDispatchToProps)(Presentational)
    return (<Provider store={store}>
    <PresentationalComponent />
    </Provider>);
  }
};
/**
 * Extract Local State into Redux;
 */
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.props.submitNewMessage(this.state.input);
    this.setState({input:''});
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
// Change code above this line

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};