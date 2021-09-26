import React, {useEffect} from "react"
import {shallowEqual, useSelector} from "react-redux";
import Echo from "laravel-echo";
import {toAbsoluteApiUrl} from "../_metronic/_helpers";

window.Pusher = require('pusher-js');




export const WebsocketTest = ()=>{
  const {user, access_token} = useSelector( ({auth}) => auth, shallowEqual );

  // const _pusher = new window.Pusher('8bca4bde5b203ab7d844', {
  //   // authEndpoint: toAbsoluteApiUrl("/broadcasting/auth"),
  //   // auth: {
  //   //   headers: {
  //   //     Authorization: `Bearer ${access_token}`,
  //   //     Accept: 'application/json',
  //   //   },
  //   // },
  //   cluster: 'eu'
  // });
  // const channel = _pusher.subscribe(`private-user.${user.id}`);
  // channel.bind('project-viewed', function(data) {
  //   alert("example.1  .event triggered")
  // });


  // let _Echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: '8bca4bde5b203ab7d844',
  //   cluster: 'eu',
  //   forceTLS: true,
  //   authEndpoint: toAbsoluteApiUrl("/broadcasting/auth"),
  //   auth: {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //       Accept: 'application/json',
  //     },
  //   },
  // });


  // _Echo.channel(`my-channel`)
  //   .listen('my-event', (e) => {
  //     alert('event fired');
  //     console.log(e);
  //   });
  return "";

  // window.Pusher.logToConsole = true;

  // const _pusher = new window.Pusher('8bca4bde5b203ab7d844', {
  //   cluster: 'eu'
  // });
  //
  // // const channel = _pusher.subscribe('my-channel');
  // // channel.bind('my-event', function(data) {
  // //   console.log(data)
  // // });
  // const channel = _pusher.subscribe('my-channel');
  // channel.bind('project-viewed', function(data) {
  //   alert('worked')
  // });

  // const options = {
  //   broadcaster: 'pusher',
  //   key: "8bca4bde5b203ab7d844",
  //   cluster: "eu",
  //   forceTLS: true,
  //   //authEndpoint is your apiUrl + /broadcasting/auth
  //   authEndpoint: `http://api.emywork.local/broadcasting/auth`,
  //   // As I'm using JWT tokens, I need to manually set up the headers.
  //   auth: {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //       Accept: 'application/json',
  //     },
  //   },
  // };
  //
  //
  //
  // const echo = new Echo(options);
  // echo.private(`App.User.${user.id}`).notification((data) => {
  //   console.log(data);
  // });

  // echo.join('chat')
  //   .joining((user) => {
  //     axios.put('/api/user/'+ user.id +'/online?api_token=' + access_token, {},{
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         Accept: 'application/json',
  //       },
  //     });
  //   });
  // echo
  //   .join('chat')
  //   .listen('UserOnline', (e) => {
  //     console.log(e)
  //     // windowPusher.resetActivityCheck()
  //     // this.friend = e.user;
  //   })


  return <span>aaa</span>
}