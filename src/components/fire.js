import React, { Component } from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCvuZsD-gTYI28MYCafCYOy3e7YLDI7Kx0",
    authDomain: "groceryapp-61826.firebaseapp.com",
    databaseURL: "https://groceryapp-61826.firebaseio.com",
    projectId: "groceryapp-61826",
    storageBucket: "groceryapp-61826.appspot.com",
    messagingSenderId: "706643193028",
    appId: "1:706643193028:web:8e4b945642ce222fdfad91",
    measurementId: "G-CK2NK1B4JN"
// Initialize Firebase
};
export default class fire{
  static auth;
  static getFire()
  {
    if(!firebase.apps.length)
    {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase;
  }
  
}