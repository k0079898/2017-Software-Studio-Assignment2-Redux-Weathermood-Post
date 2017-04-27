import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';

//New things
import {connect} from 'react-redux';
import {setNavbarToggle, searchPost} from 'states/post-actions.js';
import {mainReducer, todayReducer, postFormReducer, postItemReducer} from 'states/post-reducers.js';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        /*
        this.state = {
            navbarToggle: false,
            searchText: ''
        };
        */
        this.store = null;
        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            forecast,
            mainReducer,
            todayReducer,
            postFormReducer,
            postItemReducer
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bg-faded'>
                            <div className='container'>
                                <Navbar color='faded' light toggleable>
                                    <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                                    <Collapse isOpen={this.props.navbarToggle} navbar>
                                        <Nav navbar>
                                            <NavItem>
                                                <NavLink tag={Link} to='/'>Today</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                            </NavItem>
                                        </Nav>
                                        <div className='search ml-auto'>
                                            <Input className='ml-auto' type='text' getRef={this.searchEl} placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{
                                                this.store.getState().mainReducer.searchText &&
                                                <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                                            }
                                        </div>
                                    </Collapse>
                                </Navbar>
                            </div>
                        </div>

                        <Route exact path="/" render={() => (
                            <Today searchText={this.store.getState().mainReducer.searchText} />
                        )}/>
                        <Route exact path="/forecast" render={() => (
                            <Forecast />
                        )}/>
                        <div className='footer'>
                            DataLab.
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }

    handleNavbarToggle() {
        this.store.dispatch(setNavbarToggle());
        /*
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
        */
        this.forceUpdate();
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.store.dispatch(searchPost(e.target.value));
            this.forceUpdate();
            /*
            this.setState({
                searchText: e.target.value
            });
            */
        }
    }

    handleClearSearch() {
        this.store.dispatch(searchPost(''));
        /*
        this.setState({
            searchText: ''
        });
        */
        this.searchEl.value = '';
        this.forceUpdate();
    }
}
