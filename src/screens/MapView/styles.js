import React from 'react';
import {  StyleSheet, Dimensions  } from 'react-native';

const {width, height} = Dimensions.get('window');

const windowPercent = (x, percent) => {
  return (x * percent) * .01;
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendoverlay: {
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 124,
    bottom: height - (height / 1.5),
    left: 10,
  },
  buttoncont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    width: '100%',
    height: windowPercent(height, 10),
    backgroundColor: 'transparent',
  },
  pinbutton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: windowPercent(width, 60),
    height: windowPercent(height, 8),
    backgroundColor: 'rgba(255,45,85, 1)',
    borderRadius: windowPercent(width, 90) / 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  pulsatingCircle : {
    height : 30,
    width : 30,
    position : 'absolute',
    borderWidth : 2,
    borderRadius : 15
  },
  circlepic: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: 'rgba(255, 45, 85, 1)',
    borderRadius: 40,
    backgroundColor: 'red',
    overflow: 'hidden',
    // marginTop: 5,
    // marginBottom: 5,
    position: 'absolute'
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    width: '100%',
    height: windowPercent(height, 10),
    backgroundColor: 'transparent',
  },
  topbarchild: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    height: 60,
    width: '98%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderRadius: 5,

  }
})

export {Style}
