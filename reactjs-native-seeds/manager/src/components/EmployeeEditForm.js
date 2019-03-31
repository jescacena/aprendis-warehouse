
import _ from 'lodash';

import React, { Component } from 'react';

import Communications from 'react-native-communications';

import { connect } from 'react-redux';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEditForm extends Component {
    state = { showModal: false };
    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onSavePress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onDeletePress() {
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.props.employeeDelete({ uid: this.props.employee.uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        console.log('JES employee-->', this.props.employee);
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button
                        onPress={this.onSavePress.bind(this)}
                    > Save </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={this.onTextPress.bind(this)}
                    > Text Schedule </Button>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={this.onDeletePress.bind(this)}
                    > Delete </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { 
    employeeUpdate, 
    employeeSave, 
    employeeDelete })(EmployeeEditForm);
