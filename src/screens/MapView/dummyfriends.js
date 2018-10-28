const friends = [
  {
    name: 'Zachary Ball',
    profilePic: 'https://images.unsplash.com/photo-1516084523366-84451994e4fe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=686d3328bbe8789e464cf87aecb85b45&auto=format&fit=crop&w=2606&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.8326894,
      longitude : -74.02528895,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Ricardo Simmons',
    profilePic: 'https://images.unsplash.com/photo-1538106050205-217b8691cb22?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a1147243e006ea06ef3b5d5c8ce1a487&auto=format&fit=crop&w=881&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.80906034,
      longitude : -73.94045179,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Joe Guerrero',
    profilePic: 'https://images.unsplash.com/photo-1515918157445-f86cda843fea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b675f2e37210d4190211decdd865b4a&auto=format&fit=crop&w=934&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.74188378,
      longitude : -73.88133987,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Jim Clayton',
    profilePic: 'https://images.unsplash.com/photo-1473433657392-e7e31b785bc2?ixlib=rb-0.3.5&s=a251372ddf1b6c1866c74aa2736499af&auto=format&fit=crop&w=2250&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.78296983,
      longitude : -73.87596375,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Kate Parker',
    profilePic: 'https://images.unsplash.com/photo-1538106050205-217b8691cb22?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a1147243e006ea06ef3b5d5c8ce1a487&auto=format&fit=crop&w=881&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.64069796,
      longitude : -74.10232632,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Kyle Harris',
    profilePic: 'https://images.unsplash.com/photo-1515918157445-f86cda843fea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b675f2e37210d4190211decdd865b4a&auto=format&fit=crop&w=934&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.63264137,
      longitude : -74.03068574,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  },
  {
    name: 'Mathilda Salazar',
    profilePic: 'https://images.unsplash.com/photo-1473433657392-e7e31b785bc2?ixlib=rb-0.3.5&s=a251372ddf1b6c1866c74aa2736499af&auto=format&fit=crop&w=2250&q=80',
    phone: 6528389113,
    coordinates : {
      latitude : 40.66036477,
      longitude : -74.07251997,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    },
    isOnline : Boolean(Math.floor(Math.random() * 2)),
    dangerLvl : Math.floor(Math.random() * 4),
  }
]

console.log(friends.map(({ dangerLvl, isOnline }) => ({ dangerLvl, isOnline })))

/**
 * Latitude: 40°49′58″N   40.8326894
Longitude: 74°01′31″W   -74.02528895
Distance: 8.3494 mi  Bearing: 353.051°
Latitude: 40°48′33″N   40.80906034
Longitude: 73°56′26″W   -73.94045179
Distance: 7.4868 mi  Bearing: 27.247°
Latitude: 40°44′31″N   40.74188378
Longitude: 73°52′53″W   -73.88133987
Distance: 6.831 mi  Bearing: 72.831°
Latitude: 40°46′59″N   40.78296983
Longitude: 73°52′33″W   -73.87596375
Distance: 8.3594 mi  Bearing: 54.481°
Latitude: 40°38′27″N   40.64069796
Longitude: 74°06′08″W   -74.10232632
Distance: 7.0941 mi  Bearing: 225.425°
Latitude: 40°37′58″N   40.63264137
Longitude: 74°01′50″W   -74.03068574
Distance: 5.688 mi  Bearing: 193.173°
Latitude: 40°39′37″N   40.66036477
Longitude: 74°04′21″W   -74.07251997
Distance: 5.0285 mi  Bearing: 223.936°
 */

export {
  friends
}
