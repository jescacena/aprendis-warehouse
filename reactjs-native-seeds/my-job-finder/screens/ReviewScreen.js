import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

    static navigationOptions = (navigation) => {
        return {
            title: 'Review Jobs',
            headerRight: (
                <Button
                    title="Settings"
                    onPress={() => navigation.navigation.navigate('settings')}
                    backgroundColor='rgba(0,0,0,0)'
                    color="rgba(0,122, 255,1)"
                />
            ),
            style: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            },
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Icon name='favorite' size={30} color={tintColor} />
                );
            }
        };
    }

    renderLikeJobs = () => {
        return this.props.likedJobs.map((job) => {
            const { company, formattedRelativeTime, url, 
                latitude, longitude, jobtitle, jobkey } = job;
            const initialRegion = {
                latitude,
                longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };
            return (
                <Card key={jobkey} title={jobtitle}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply now!"
                            backgroundColor='#03A9F4'
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikeJobs()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { likedJobs: state.likedJobs };
};

const styles = {
    italics: {
        fontStyle: 'italic'
    },
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

export default connect(mapStateToProps)(ReviewScreen);

