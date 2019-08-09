import { AsyncStorage } from 'react-native';
import api from '../Api';
import { logout } from './AuthActions';

export const setFeedRefreshing = (status) => {
   return {
      type: 'changeFeedRefreshingStatus',
      payload: {
         status: status
      }
   };
};

export const getFeed = (offset, isRefresh = false) => {
   return(dispatch) => {

      if (offset == 0 && isRefresh == false) {
         dispatch({
            type: 'changeFeedLoadingStatus',
            payload: {
               status: true
            }
         });
      }

      AsyncStorage.getItem('jwt')
      .then((data) => {
         if (data != null && data != '') {
            api.req({
               endpoint:'users/feed',
               method:'GET',
               data:{jwt:data, offset:offset },
               success:(json) => {
                  if (json.logged === true) {

                     dispatch({
                        type: 'changeFeedLoadingStatus',
                        payload: {
                           status: false
                        }
                     });
                     
                     dispatch({
                        type: 'changeFeedRefreshingStatus',
                        payload: {
                           status: false
                        }
                     });
                     
                     if (isRefresh) {
                        dispatch({ type: 'clearFeed' });
                     }

                     dispatch({
                        type: 'incrementFeed',
                        payload:{
                           feed:json.data
                        }
                     })
                     
                  } else {
                     dispatch(logout());
                  }
               },
               error:(error)=> {
                  alert(error)
               }
            });
         } else {
            dispatch(logout());
         }
      })
      .catch(() => {
         dispatch(logout());
      });
   };
};

export const likePhoto = (id, is_liked) => {
   return (dispatch) => {
      if (id != null) {
         let method = '';
         if (is_liked) {
            method = 'DELETE';
            dispatch({
               type: 'removeLike',
               payload: {
                  id: id,
               }
            });
         } else {
            method = 'POST';
            dispatch({
               type: 'addLike',
               payload: {
                  id: id,
               }
            });
         }

         AsyncStorage.getItem('jwt')
         .then((data) => {
            if (data != null && data != '') {

               let endpoint = 'photos/'+id+'like';

               api.req({
                  endpoint: endpoint,
                  method: method,
                  data: { jwt: data },
                  success: (json) => {
                     if (json.logged === true) {

                        if (json.error != '') {
                           alert(json.error);
                           if (is_liked) {
                              dispatch({
                                 type: 'removeLike',
                                 payload: {
                                    id: id,
                                 }
                              });
                           } else {
                              dispatch({
                                 type: 'addLike',
                                 payload: {
                                    id: id,
                                 }
                              });
                           }
                        }  

                     } else {
                        dispatch(logout());
                     }
                  },
                  error: (error) => {
                     alert(error)
                  }
               });
            } else {
               dispatch(logout());
            }
         })
         .catch(() => {
            dispatch(logout());
         });
      }
   };
}
//suporte@b7web.com.br
// 123456