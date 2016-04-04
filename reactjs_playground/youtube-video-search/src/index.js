import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
import _ from 'lodash';
import config from './lib/config';
const API_KEY = config.youtube_api;

/**
 * Created by rvansant2 on 3/17/16.
 */

// Create a new component. This component should produce some HTML
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch(config.youtube_default_search_term);
	}

    videoSearch(term) {
        YTSearch( { key: API_KEY, term: term }, ( videos ) => {
            this.setState( {
                videos: videos,
                selectedVideo: videos[0]
            } );
        } );
    }

	render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term), 300});

		return (
	        <div>
	            <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
	            <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
	        </div>
    	);
	}
};

// Take this component's generated HTML and put it 
//on the page (in the DOM)

ReactDom.render(<App />, document.querySelector('.container'));