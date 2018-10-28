import React from 'react';
import {View, Text, TouchableHighlight, Image,ScrollView, Switch} from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import {Style} from './styles';
import {friends} from './dummyfriends';
import { Ionicons } from '@expo/vector-icons';


class FriendComponent extends React.Component {
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

    return (
      <View style={[Style.friendoverlay, {height: expanded ? 100 : null }]}>
        <ScrollView scrollEnabled={!expanded} contentContainerStyle={{ flexGrow: expanded ? 0 : 1, width : expanded ? 76 : 60 }} showsVerticalScrollIndicator={false}>
          <View style={{ height : expanded ? 70 : ((friends.length + 1) * 70) }}>
            {friends.map((item, index)=> {
              if (expanded && index > 2) return null 
              return (
                <View style={[Style.circlepic, { marginLeft : expanded ? (index * 2) : 0, top : (index + 1) * (expanded ? 5 : 70) } ]} key={index}>
                  <Image style={{flex: 1}} source={{uri: item.profilePic}} />
                </View>
              ) 
            })}
          </View>
          <TouchableHighlight
            activeOpacity={0}
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
          </TouchableHighlight>
        </ScrollView>
      </View>
    )
  }
}

class TopBar extends React.Component {
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
          <View>
            <Ionicons style={{fontSize: 40 , color: 'rgba(255,45,85, 0.7)'}} name="md-person-add" />
          </View>
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
    <TouchableHighlight 
      style={Style.pinbutton}
      onPress={() => props.locationHandler()}
    >
      <Text style={{color: '#fff', fontWeight: '700'}}>Pin My Location</Text>
    </TouchableHighlight>
  </View>
)

export default class MapViewScreen extends React.Component {

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
            style={{flex: 1}}
            initialRegion={this.state.region}
            region={this.state.region}
          >
            {marker}
          </MapView>
          <TopBar />
          <FriendComponent />
          <PinButton locationHandler={this.locationHandler } />
      </View>
    )
  }
}