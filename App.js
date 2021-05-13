import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './database';
import * as Speech from 'expo-speech';
export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : "",
 
    };
  }

  getWord=(text)=>{
     text = text.toLowerCase().trim()
    try{
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" : definition,
       
      })
    }
    catch(err){
      alert("Sorry This word is not available. Will try to add it as soon as possible :-) Enjoy Pocket Dictionary")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:1, borderWidth:2}}>
        <Header
          backgroundColor={'#910d09'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: 'white', fontSize: 25, fontFamily: 'Times New Roman'},
          }}
        />
          <Image
                style={{ width: 100, height: 100, marginLeft: 105, flex: 0.3,}}
                source={require('./assets/dictionary.png')}
          />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                defination : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
           <TouchableOpacity
          style={styles.toSearchButton}
          onPress={() => {
            var word= this.state.text.toLowerCase().trim()
              var thingToSay = this.state.text;
              Speech.speak(thingToSay)
            
          }}>
          <Text style={styles.toHearText}> Press button to hear </Text>
         </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'top', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type:{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                 
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBoxContainer: {
    flex:0.5,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#bdfffd'
  },
  inputBox: {
    width: '100%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderRadius: 10
  },
  searchButton: {
    width: '30%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    fontFamily: 'Segoe Print'
  },
  outputContainer:{
    flex:0.85,
    alignItems: 'top',
    backgroundColor: '#97f3fe',
   },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center',
   },
  detailsTitle:{
    color:'red',
    fontSize:20,
    fontWeight:'bold',
    fontFamily: 'Agency FB'
  },
  toSearchButton: {
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: '#d31a39'
  },
   toHearText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff77d',
    fontFamily: 'Segoe Print'
  },
});
