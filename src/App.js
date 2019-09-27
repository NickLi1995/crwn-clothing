import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { dispatch } from 'C:/Users/79931/AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/observable/pairs';
import { selectCurrentUser } from './redux/user/user-selector';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
  unSubscribeFormAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFormAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubscribeFormAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);