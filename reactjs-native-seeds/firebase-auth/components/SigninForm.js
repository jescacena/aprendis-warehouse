import React, { Component } from 'React';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-ee626.cloudfunctions.net';

class SigninForm extends Component {

    state = { phone: '', code: '' };

    handleSubmit = async () => {
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOTP`, {
                phone: this.state.phone,
                code: this.state.code
            });
            console.log(data);
            firebase.auth().signInWithCustomToken(data.token)
                .then((response) => console.log(response));
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter phone number: </FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter code: </FormLabel>
                    <FormInput
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
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

export default SigninForm;
