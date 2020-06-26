import React , { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';


class AlbumList extends Component {

    state: { albums: [] };

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
        .then(response => this.setState({ albums: response.data }));
    }

    renderAlbums() {
        return (this.state) ? this.state.albums.map(album => 
            <AlbumDetail 
                key={album.title}
                album={album}
            />
        )
        : 
        <Text>No albums found</Text>;
    }

    render() {
        console.log('JES albums state', this.state);
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export { AlbumList };