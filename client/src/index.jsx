import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import data from './dummy_data.js';
// import ImageList from './components/ImageList.jsx';
// import SavedList from './components/SavedList.jsx';
// "http://www.michiganduckrescueandsanctuary.com/wp-content/uploads/2014/12/marold_donate_transparent_504.png"
// "https://s4.favim.com/orig/48/puppy-lion-cute-Favim.com-445038.jpg"
// const originalImgUrl = {"imageUri": "https://s4.favim.com/orig/48/puppy-lion-cute-Favim.com-445038.jpg"};
// "https://www.sciencedaily.com/images/2017/05/170502204556_1_900x600.jpg"
// "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/12_powerhouse_vegetables_slideshow/intro_cream_of_crop.jpg"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
      // twentyFiveUrls: [],
      twentyFiveUrls: data,
      originImgUrl: {"imageUri": "https://s4.favim.com/orig/48/puppy-lion-cute-Favim.com-445038.jpg"},
      userInput: '',
      currentImgRowIdx: 0,
      fakeIdx: 0,
    };
    this.postOriginalImg = this.postOriginalImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showNextRow = this.showNextRow.bind(this);
    this.showNextRow = this.showNextRow.bind(this);
    this.showPrevRow = this.showPrevRow.bind(this);
  }

  /***ComponentDidmount
  Will make an ajax call to the server, which will grab all the saved images for the user, then render that to the user via setState.
  ***/
  componentDidMount() {
    // this.postOriginalImg(this.state.originImgUrl);
  }

  postOriginalImg(originalImgUrl) {

    var gif = {"imageUri": "https://codropspz-tympanus.netdna-ssl.com/codrops/wp-content/uploads/2014/04/scr_01.gif"};
    this.setState({
      originImgUrl: gif
    })
  
    $.ajax({
      method: 'POST',
      url: '/images',
      data: originalImgUrl,
      success: (results) => {
        console.log('Client POST Original Img Success', results);
        this.setState({
          twentyFiveUrls: results,
           originImgUrl: originalImgUrl
        })
      },
      error: function(err) {
        console.log('Client POST Err', err);
      }
    })
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    })
  }

  handleClick() {
    var originImgUrl = {imageUri: this.state.userInput};
    console.log('click ', originImgUrl)
    this.setState({
      originImgUrl: originImgUrl
    });
    this.postOriginalImg(originImgUrl);
  }

  showPrevRow() {
    var idx = this.state.currentImgRowIdx

    idx = idx === 0 ? 4 : idx - 1;

    this.setState({
      currentImgRowIdx: idx
    })
  }

  showNextRow() {
    var idx = this.state.currentImgRowIdx

    idx = idx === 4 ? 0 : idx + 1;

    this.setState({
      currentImgRowIdx: idx
    })
  }

  render() {
    return (
      <div>

      <div className="well" id="title"><h1>PicSeach</h1></div>
      
      <div className="marginLeft">

        <div className="row">
          <div className="form-group">

            <div className="col-md-6 col-lg-6">
              <input 
                type="text" 
                className="form-control input-lg" 
                value={this.userInput}
                placeholder="Search for..."
                onChange={this.handleChange}
              />
            </div>
            <div>
              <p className="btn btn-success btn-lg" onClick={this.handleClick}> GO !</p>
            </div>

          </div>
        </div>
       


          <div className="row">
            <div className="col-md-6">
              <div className="thumbnail">
                <img src={this.state.originImgUrl.imageUri} />
                <div className="caption">
                </div>
              </div>
            </div>
            <div className="col-md-1"/>
            <div className="col-md-4">
                <div className="well maxHeight">
                  <h1> ~~ LIKED FILES ~~ </h1>
                  {/* {[1,2,3,4,5].map((idx) => {
                    return (<h2 key={idx}>{'LIKED FILE ' + idx + '-->'}</h2>)
                  })} */}
                  {this.state.twentyFiveUrls.map((guessAndUrls, idx) => {
                    return (
                      <div className="col-md-2 col-lg-2" key={idx}>
                          <div className="thumbnail">
                            <img src={guessAndUrls.urls[this.state.currentImgRowIdx]} />
                            <div className="row">
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            </div>
          </div>

          

          

      <div className="well"></div> 
      <div className="row">
      {this.state.twentyFiveUrls.map((guessAndUrls, idx) => {
        return (
          <div className="col-md-2 col-lg-2" key={idx}>
              <div className="thumbnail">
                <img src={guessAndUrls.urls[this.state.currentImgRowIdx]} />
                <div className="row">
                  <div className="col-md-2 col-lg-2"/>
                   <div className="col-md-4 col-lg-4"> <a href="#" className="btn btn-primary" role="button">Like !</a></div> 
                  <div className="col-md-4 col-lg-4"> <a href="#" className="btn btn-success" role="button">Go !</a></div>
                </div>
              </div>
            </div>
        );
      })}
      <div className="col-md-1 col-lg-1">
        
        <p 
        className="btn btn-info btn-lg marginBottom"
        onClick={this.showPrevRow}
        ><span className="glyphicon glyphicon-arrow-up"></span></p>
        <p 
        className="btn btn-info btn-lg"
        onClick={this.showNextRow}
        ><span className="glyphicon glyphicon-arrow-down"></span></p>

      </div>
      </div> {/* end of row  */}

    </div>
    </div> 
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

