import React, { PureComponent as Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,ScrollView,
  Switch,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';
import { MapView, Location, Permissions, Svg } from 'expo';
import { Actions } from 'react-native-router-flux';
import {Style} from './styles';
import {friends} from './dummyfriends';
import { Ionicons } from '@expo/vector-icons';

import mapStyle from './mapStyle.json'

import constants from '../../constants/styles_constants'

// function pinPathCubicBezier(width, height) {
//   const deltaX = width * Math.sqrt(3)
//   const deltaY = height * 4 / 3
//   return `M 0,0 C ${-deltaX},${-deltaY} ${deltaX},${-deltaY} 0,0 z`
// }

class FriendComponent extends Component {
  state = {
    expanded: true,
  }

  expandedHandler = () => {
    return this.setState(prevState => {
      return {
        expanded: !prevState.expanded,
      }
    })
  }

  render() {
    const { expanded } = this.state
    const { onSetFriendLocation } = this.props

    return (
      <View style={[Style.friendoverlay, {height: expanded ? 100 : null }]}>
        <ScrollView scrollEnabled={!expanded} contentContainerStyle={{ flexGrow: expanded ? 0 : 1, width : expanded ? 76 : 60 }} showsVerticalScrollIndicator={false}>
          <View style={{ height : expanded ? 70 : ((friends.length + 1) * 70) }}>
            {friends.map((item, index)=> {
              if (expanded && index > 2) return null

              let borderColor = 'gray'

              if(item.isOnline) {
                switch(item.dangerLvl) {
                  case 1:
                    borderColor = constants.iosRed
                    break
                  case 2:
                    borderColor = constants.iosYellow
                    break
                  default:
                    borderColor = constants.iosGreen
                }
              }

              return (
                <TouchableWithoutFeedback onPress={ () => onSetFriendLocation(item.coordinates) } key={index}>
                  <View style={[Style.circlepic, { borderColor, marginLeft : expanded ? (index * 2) : 0, top : (index + 1) * (expanded ? 5 : 70) } ]}>
                    <Image style={{flex: 1}} source={{uri: item.profilePic}} />
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
          <TouchableOpacity
            activeOpacity={ 1 }
            underlayColor={'transparent'}
            onPress={() => this.expandedHandler()}
              style={[
              Style.circlepic,
              {
                backgroundColor: expanded ? 'transparent':'rgba(0,0,0,0.2)',
                display: 'flex',
                padding: expanded ? 100 : 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0,
              }
            ]}>
            <Text style={{color: '#fff', fontWeight: '900', fontSize: 20}}>
            {this.state.expanded ? '+' : '-'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

class TopBar extends Component {
  state = {
    realtime: false,
  }

  realtimeHandler = () => {
    this.setState(prevState => {
      return {
        realtime: !prevState.realtime
      }
    })
  }

  render() {
    return (
      <View style={Style.topbar}>
        <View style={Style.topbarchild}>
          <TouchableOpacity onPress={ () => Actions.push('addPeople') } activeOpacity={ 0.75 }>
            <Ionicons style={{fontSize: 40 , color: 'rgba(255,45,85, 0.7)'}} name="md-person-add" />
          </TouchableOpacity>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'rgba(0,122,255,0.9)', fontWeight: '400', paddingRight: 10,}}>Real time location</Text>
            <Switch  onTintColor='rgb(255,45,85)' value={this.state.realtime} onValueChange={() => this.realtimeHandler()} />
          </View>
        </View>
      </View>
    )
  }
}

const PinButton = (props) => (
  <View style={Style.buttoncont}>
    <TouchableOpacity
      activeOpacity={ 0.75 }
      style={Style.pinbutton}
      onPress={() => props.locationHandler()}
    >
      <Text style={{color: '#fff', fontWeight: '700'}}>Pin My Location</Text>
    </TouchableOpacity>
  </View>
)

class PinMarker extends Component{
  state = { pulse : new Animated.Value(0) }

  _pulsate = () => {
    const { isOnline, name } = this.props

    if(isOnline) {
      const { pulse } = this.state

      return Animated.timing(pulse, {
        toValue : 1,
        duration : 1000,
        easing : Easing.linear
      }).start(() => this.setState({ pulse : new Animated.Value(0) }, this._pulsate))
    }
  }

  componentDidMount = () => this._pulsate()

  render() {
    const { pulse } = this.state
    const { uri, name, isOnline, dangerLvl } = this.props

    let borderColor = 'gray'

    if(isOnline) {
      switch(dangerLvl) {
        case 1:
          borderColor = constants.iosRed
          break
        case 2:
          borderColor = constants.iosYellow
          break
        default:
          borderColor = constants.iosGreen
      }
    }

    const scale = pulse.interpolate({
      inputRange : [0, 1],
      outputRange : [1, 2]
    })

    const opacity = pulse.interpolate({
      inputRange : [0, 1],
      outputRange : [1, 0]
    })

    const viewStyle = { height : 30, width : 30, borderColor }

    return (
      <View style={{ alignItems : 'center', justifyContent : 'center' }}>
        <Animated.View style={[ Style.pulsatingCircle, { backgroundColor : borderColor, borderColor, transform : [{ scale }], opacity } ]} />
        <View style={[ Style.circlepic, viewStyle ]}>
          {/* <Svg height={ 100 } width={ 100 }> */}
            {/* <Svg.Path d={ pinPathCubicBezier(60,60) } stroke="white" fill={ constants.primaryColor } strokeWidth={ 10 } /> */}
          <Image style={{ flex: 1 }} source={{ uri }} />
          {/* </Svg> */}
        </View>
      </View>
    )
  }
}

export default class MapViewScreen extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    errorMessage: null,
    location: false,
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    console.log('permission granted')
  };


  onRegionChange(region) {
    this.setState({ region });
  }

  _setFriendLocation = ({ latitude, longitude }) => {
    const { region } = this.state

    return this.setState({ location : false, region : { ...region, latitude, longitude } })
  }

  locationHandler = async() => {
    console.log(this.state.region)
    let location = await Location.getCurrentPositionAsync({});
    this.setState(prevState => {
      return {
        region: {
          ...prevState.region,
          latitude: location.coords.latitude,
          longitude:location.coords.longitude,
        },
        location: true,
      }
    });

  }

  render() {
    let marker = null;

    if (this.state.location) {
      marker = <MapView.Marker title='Adrians first picture!' coordinate={this.state.region} />
    }

    return (
      <View style={Style.container}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.region}
            region={this.state.region}
          >
            {
              friends.map((friend, i) => {
                return (
                  <MapView.Marker key={ i } title={ friend.name } coordinate={ friend.coordinates }>
                    <PinMarker dangerLvl={ friend.dangerLvl } uri={ friend.profilePic } isOnline={ friend.isOnline } />
                  </MapView.Marker>
                )
              })
            }
            { marker }
          </MapView>
          <TopBar />
          <FriendComponent onSetFriendLocation={ this._setFriendLocation } />
          <PinButton locationHandler={this.locationHandler } />
      </View>
    )
  }
}
