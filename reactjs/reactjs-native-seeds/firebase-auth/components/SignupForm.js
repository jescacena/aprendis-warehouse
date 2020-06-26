import React, { Component } from 'React';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-ee626.cloudfunctions.net';

class SignupForm extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = { phone: ''};
    // }
    //Equivalent in ES2017
    state = { phone: '' };

    // handleSubmit() {
    // }
    //Equivalent in ES2017 and we no longer need to use bind(this) in the invocation to get the right this object
    handleSubmit = async () => {
        try {
            let response = await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
            console.log(response);
            await axios.post(`${ROOT_URL}/requestOTP`, { phone: this.state.phone });
        } catch (err) {
            err.response.data && console.log(err.response.data.error);
            console.log(err);
        }
    }
    // handleSubmit = () => {
    //     axios.post(`${ROOT_URL}/createUser`, {
    //         phone: this.state.phone
    //     }).then(() => {
    //         axios.post(`${ROOT_URL}/requestOTP`, {
    //             phone: this.state.phone
    //         });
    //     });

    // }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter your phone number: </FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button
                    onPress={this.handleSubmit}
                    title="submit"
                />
            </View>
        );
    }
}

export default SignupForm;
