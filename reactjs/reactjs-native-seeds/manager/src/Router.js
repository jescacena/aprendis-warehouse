import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreateForm from './components/EmployeeCreateForm';
import EmployeeEditForm from './components/EmployeeEditForm';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 0 }}>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" initial />
                </Scene>
                <Scene key="main">
                    <Scene 
                        rightTitle="Add"
                        onRight={() => Actions.employeeCreateForm()}
                        key="employeeList" 
                        component={EmployeeList} 
                        title="Employee List" 
                        initial
                    />
                    <Scene 
                        key="employeeCreateForm"
                        title="Create Employee"
                        component={EmployeeCreateForm} 
                    />
                    <Scene 
                        key="employeeUpdateForm"
                        title="Edit Employee"
                        component={EmployeeEditForm} 
                    />
                </Scene>
            </Scene>
        </Router>
    );
};


export default RouterComponent;
