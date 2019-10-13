import React, { Component } from "react";
import styles from './ShowSendContainer.module';

import { connect } from 'react-redux'
import Spinner from "../presentational/Spinner";


import axios from 'axios';


export class ShowSendContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            status: null,
            specificListSortByName: [],
            specificListSortByAge: []
        };
    }

    postData(list) {

        this.setState({ status: 'inprogress' });

        // cancel the previous request
        if (typeof this._source != typeof undefined) {
            this._source.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this._source = axios.CancelToken.source();

        axios.post('/api/invented', {
            list
        }, { cancelToken: this._source.token })
            .then((response) => {
                console.log(response);
                this.setState({ status: 'completed' });

            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error);
                } else {
                    console.log(error);
                }
                this.setState({ status: 'completed' });

            });

    }

    componentDidMount() {
        const { data } = this.props;

        this.setState({
            specificListSortByName: _.sortBy(data.specific, [function (o) { return o.name; }]),
            specificListSortByAge: _.sortBy(data.specific, [function (o) { return parseInt(o.age); }])
        });
    }

    render() {

        const { data } = this.props;

        return data.specific && data.specific.length > 0 ? (
            <div className={styles.container}>
                <h3>Show and Send</h3>
                <div className={styles.list}>
                    <h4>All users order by name</h4>
                    <ul >
                        {this.state.specificListSortByName.map((item, index) =>
                            <li key={'name-' + index}>
                                {index + 1}. {item.name} ({item.age})
                        </li>
                        )}
                    </ul>
                </div>
                <div className={styles.list}>
                    <h4>All users order by age</h4>
                    <ul className={styles.list}>
                        {this.state.specificListSortByAge.map((item, index) =>
                            <li key={'age-' + index}>
                                {index + 1}. {item.name} ({item.age})
                        </li>
                        )}
                    </ul>
                </div>

                {this.state.status === 'inprogress' ? <div className={styles.buttons}><Spinner /></div> :
                    <div className={styles.buttons}>
                        <button onClick={() => {
                            this.postData(this.state.specificListSortByAge);
                        }}><span>Send data order by age</span></button>
                        <button onClick={() => {
                            this.postData(this.state.specificListSortByName);
                        }}><span>Send data order by name</span></button>
                    </div>
                }


            </div>
        ) :
            <Spinner />;
    }
}
const mapStateToProps = state => ({
    data: state.data
})

export default connect(
    mapStateToProps,
    null
)(ShowSendContainer)