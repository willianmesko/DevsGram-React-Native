import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { checkLogin } from '../actions/AuthActions';
import { getFeed, likePhoto, setFeedRefreshing } from '../actions/FeedActions';
import FeedItemFake from '../components/feed/FeedItemFake';
import FeedItem from '../components/feed/FeedItem';

export class Feed extends Component {
   static navigationOptions = {
      title: 'PhotoSphere'
   }

   constructor(props) {
      super(props)
      this.state = {
         feedFake: [{ "id": "3", "id_user": "3", "url": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i3.jpg", "date_posted": "2018-01-01 14:30:00", "name": "testador", "avatar": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg", "like_count": "0", "comments": [{ "id": "1", "id_user": "1", "id_photo": "3", "date_comment": "2018-01-01 18:00:00", "txt": "Show de bola!", "name": "Bonieky" }] }, { "id": "2", "id_user": "2", "url": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i2.jpg", "date_posted": "2018-01-01 13:45:00", "name": "Testador", "avatar": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg", "like_count": "0", "comments": [] }, { "id": "1", "id_user": "2", "url": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/photos\/i1.jpg", "date_posted": "2018-01-01 12:30:00", "name": "Testador", "avatar": "https:\/\/alunos.b7web.com.br\/apis\/devstagram\/media\/avatar\/default.jpg", "like_count": "2", "comments": [], "is_liked":true }]
      }
   }

   componentDidMount(){
      this.props.getFeed(0);
   }

   ComponentDidUpdate(){
      this.verifyStatus();
   }

   verifyStatus = () => {
      if (this.props.status === 2) {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [
               NavigationActions.navigate({ routeName: 'Login' })
            ]
         }));
      }
   }

   likeAction = (id, is_liked) => {
      this.props.likePhoto(id, is_liked);
   }

   paginateFeed = () => {
      this.props.getFeed(this.props.feed.length);
   }

   feedRefresh = () => {
      this.props.setFeedRefreshing(true);
      this.props.getFeed(0, true);
   }

   render() {
      return (
         <View style={styles.container}>
            {this.props.feedLoading == true &&
               <View>
                  <FeedItemFake />
                  <FeedItemFake />
               </View>
            }

            {(this.props.feedLoading == false && this.props.feed.length == 0) &&
               <View style={styles.feedZero}>
                  <Text>Não existem itens a serem mostrados</Text>
               </View>
            }

            {(this.props.feedLoading == false && this.props.feed.length > 0) &&
               <FlatList
                  data={this.props.feed}
                  renderItem={({ item }) => <FeedItem data={item} likeAction={this.likeAction} nav={this.props.navigation} />}
                  keyExtractor={(item) => item.id}
                  style={styles.feed}
                  onEndReachedThreshold={0.5}
                  onEndReached={this.paginateFeed}
               refreshing={this.props.feedRefreshing}
               onRefresh={this.feedRefresh}
               />
            }

         </View>
      );
   }
   
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   feed:{
      flex: 1,
   },
   feedZero:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

   }
});

const mapStateToProps = (state) => {
   return {
      status: state.auth.status,
      feed: state.feed.feed,
      feedLoading: state.feed.feedLoading,
      feedRefreshing: state.feed.feedRefreshing
   };
}

const FeedConnect = connect(mapStateToProps, { checkLogin, setFeedRefreshing, getFeed, likePhoto})(Feed);
export default FeedConnect;
