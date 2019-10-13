import React, { Component } from "react";
import styles from './GetEditContainer.module';
import axios from 'axios';
import _ from 'lodash';



import { connect } from 'react-redux'

import {
    setList,
    addToList,
    deleteFromList
} from '../../actions'
import Spinner from "../presentational/Spinner";
import UserForm from "../presentational/UserForm";
import DeleteIcon from "../presentational/DeleteIcon";


const API_URL = '/api';


export class GetEditContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'init'
        };
    }


    fetchData() {
        // cancel the previous request
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this._source = axios.CancelToken.source();

        axios.get(API_URL, { cancelToken: this._source.token })
            .then((response) => {
                console.log('JES', response.data)
                this.props.setList('generic', response.data);
                this.props.setList('specific', response.data);
                this.setState({ status: 'completed' });
            }).catch(error => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                } else {
                    console.log(error);
                }
            });
    }

    componentDidMount() {
        this.setState({ status: 'in-progress' });
        this.props.setList('generic', []);
        this.props.setList('specific', []);

        this.fetchData();
    }

    componentWillUnmount() {

        // cancel the previous request
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation canceled due to new request.')
        }

    }

    createGeneric(formData) {
        const { data, addToList } = this.props;
        console.log('JES createGeneric', formData);

        if(!formData.namegeneric || !formData.agegeneric) {
            window.alert('Error empty form!');
            return;
        }


        if(!_.find(data.generic, (item) => {return item.name === formData.namegeneric;})) {
            const item = {name: formData.namegeneric, age: formData.agegeneric};
            addToList('generic',item);
            addToList('specific',item);
        } else {    
            window.alert('Error: existing name');
        }

    }

    createSpecific(formData) {

        const { data, addToList } = this.props;
        console.log('JES createSpecific', formData);

        if(!formData.namespecific || !formData.agespecific) {
            window.alert('Error empty form!');
            return;
        }


        if(!_.find(data.generic, (item) => {return item.name === formData.namespecific;})) {
            const item = {name: formData.namespecific, age: formData.agespecific};
            addToList('specific',item);
        } else {
            window.alert('Error: existing name');
        }

    }

    deleteItem(listKey, index) {
        console.log('JES deleteItem', listKey, index);

        this.props.deleteFromList(listKey, index);

    }

    render() {

        const { data } = this.props;
        console.log('JES geditcontainer render', data);

        // return false ? (
        return this.state.status === 'completed' ? (
            <div className={styles.container}>
                <h3>Get and edit</h3>


                <div className={styles.listWrapper}>
                    <h4>Generic Data</h4>
                    <ul className={styles.list}>
                        {data.generic.map((item, index) =>
                            <li key={'name-' + index}>
                                {index + 1}. {item.name} ({item.age})
                                <DeleteIcon deleteFn={() => {
                                    this.deleteItem('generic', item.name);
                                    this.deleteItem('specific', item.name);
                                }} />
                            </li>
                        )}
                    </ul>
                    <UserForm iden="generic" buttonLabel="Add user generic+specific" onSubmit={this.createGeneric.bind(this)} />
                </div>

                <div className={styles.listWrapper}>
                    <h4>Specific Data</h4>
                    <ul className={styles.list}>
                        {data.specific.map((item, index) =>
                            <li key={'name-' + index}>
                                {index + 1}. {item.name} ({item.age})
                                <DeleteIcon deleteFn={() => {
                                    this.deleteItem('specific', item.name);
                                }} />
                            </li>
                        )}
                    </ul>
                    <UserForm iden="specific" buttonLabel="Add user only specific" onSubmit={this.createSpecific.bind(this)} />

                </div>
            </div>
        ) :
            <Spinner />;
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = dispatch => ({
    setList: (key, list) => dispatch(setList(key, list)),
    addToList: (key, item) => dispatch(addToList(key, item)),
    deleteFromList: (key, name) => dispatch(deleteFromList(key, name))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetEditContainer)