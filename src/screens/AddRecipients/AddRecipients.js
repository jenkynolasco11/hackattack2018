import React, { PureComponent as Component } from 'react'
import {
    Text,
    View,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Platform,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import { Permissions, Contacts } from 'expo'

import constants from '../../constants/styles_constants'

const platform = Platform.OS == 'ios' ? 'ios' : 'md'

const AddRecipientsTitle = ({ howMany }) => {
    return (
        <View style={{ height : 180, justifyContent : 'center' }}>
            <View style={{ alignItems : 'center'  }}>
                <Text style={{ fontSize : 25, fontWeight : '200', lineHeight : 40 }}>Add Some Contacts</Text>
                <Text style={{ fontSize : 25, fontWeight : '200', lineHeight : 40 }}>To Help You Keep Protected</Text>
            </View>
            <View style={{ alignItems : 'center' }}>
                {
                    howMany > 0
                    ? <Text>{ howMany } Contacts Selected</Text>
                    : null
                }
            </View>
        </View>
    )
}

const ImageWrapper = ({ image, hasImage, name }) => {
    const letters = name.split(' ').slice(0,2).map(l => l[0]).join('')

    return (
        <View style={{ height : 48, width : 48, alignItems : 'center', justifyContent : 'center' }}>
            <View style={{ borderWidth : 0.4, borderColor : constants.primaryColor, backgroundColor : 'silver', overflow : 'hidden', height : 40, width : 40, alignItems : 'center', justifyContent : 'center', borderRadius : 20 }}>
            {
                hasImage
                ? <Image source={{ uri : image.uri }} style={{ height : '100%', width : '100%' }} resizeMode="cover" />
                : <Text style={{ fontSize : 20, fontWeight : '700', color : 'white' }}>{ letters }</Text>
            }
            </View>
        </View>
    )
}

const NameWrapper = ({ name, phoneNumber }) => {
    return (
        <View style={{ flex : 5, padding : 4, paddingLeft : 8 }}>
            <View style={{ height : 28, justifyContent : 'center' }}>
                <Text style={{ fontSize : 24, fontWeight : '400' }}>{ name }</Text>
            </View>
            <View style={{ height : 28, justifyContent : 'center' }}>
                <Text style={{ fontSize : 14, fontWeight : '400', color : 'rgba(0,0,0,0.5)' }}>{ phoneNumber.digits }</Text>
            </View>
        </View>
    )
}

class ContactListItem extends Component{
    state = { opacity : new Animated.Value(0) }

    componentDidMount = () => {
        const { opacity } = this.state
        const { index } = this.props

        return Animated.timing(opacity, {
            toValue : 1,
            duration : 200,
            easing : Easing.linear,
            delay : index * 10
        }).start()
    }

    render() {
        const { opacity } = this.state
        const { item, onPress, isSelected } = this.props
        const { id, imageAvailable, image, name, phoneNumbers } = item
        const [ phoneNumber ] = phoneNumbers

        return (
            <TouchableOpacity onPress={ () => onPress(id) } activeOpacity={ 0.8 }>
                <Animated.View style={{ opacity, height : 60, width : '100%', alignItems : 'center', flexDirection : 'row', ...constants.shadows }} >
                    <ImageWrapper name={ name } hasImage={ imageAvailable } image={ image } />
                    <NameWrapper name={ name } phoneNumber={ phoneNumber } />
                    <View style={{ width : 48 }}>
                        {
                            isSelected
                            ? <Icon name={ `${ platform }-checkmark` } size={ 48 } color="green" />
                            : null
                        }
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const ContactsList = ({ contacts, selected, onContactPress, filterText }) => {
    return (
        <FlatList
            style={{ flexGrow : 1 }}
            data={ contacts }
            renderItem={ ({ item, index }) => <ContactListItem index={ index } onPress={ onContactPress } item={ item } isSelected={ selected.includes(item.id) } /> }
            keyExtractor={ ({ id }) => id }
        />
    )
}

const AddContactsButton = ({ onPress }) => {
    return (
        <View style={{ height : 100, alignSelf : 'stretch', alignItems : 'center', justifyContent : 'center' }}>
            <TouchableOpacity onPress={ onPress } activeOpacity={ 0.75 } style={{ borderRadius : 4, backgroundColor : constants.primaryColor, height : 48, width : 160, alignItems : 'center', justifyContent : 'center' }}>
                <Text style={{ color : 'white', fontSize : 16, fontWeight : '200' }}>Add Contacts</Text>
            </TouchableOpacity>
        </View>
    )
}

const Filter = ({ filterText, onChange }) => {
    return (
        <View style={{ ...constants.shadows, padding : 10, height : 48, justifyContent : 'center', flexDirection : 'row', alignSelf : 'stretch' }}>
            <TextInput
                style={{ flex : 1, fontSize : 24, fontWeight : '200' }}
                onChangeText={ onChange }
                value={ filterText }
                placeholder="Search Name"
            />
            {
                filterText.length > 0
                ?
                <TouchableOpacity style={{ height : '100%', width : 48, alignItems : 'center', justifyContent : 'center' }} onPress={ () => onChange('') } activeOpacity={ 0.75 }>
                    <View style={{ height : '100%', width : '100%', alignItems : 'center', justifyContent : 'center' }}>
                        <Icon name={ `${ platform }-close`} size={ 36 } color="rgba(0,0,0,0.5)" />
                    </View>
                </TouchableOpacity>
                : null
            }
        </View>
    )
}

class AddRecipients extends Component{
    state = {
        contactsToShow : [],
        contacts : [],
        selected : [],
        filterText : ''
    }

    _onSubmitContacts = async () => {
        // const contacts = await Contacts.getContactsAsync()

        // console.log({ contacts })
    }

    _onFilterChange = filterText => {
        const { contactsSaved } = this.state

        const contacts = []

        if(!filterText.length) contacts.push(...contactsSaved)
        else contacts.push(...contactsSaved.filter(({ name }) => name.toLowerCase().startsWith(filterText.toLowerCase())))

        return this.setState({ contacts, filterText })
    }

    _onContactPress = id => {
        const { selected } = this.state

        const isIncluded = selected.includes(id)

        if(isIncluded) return this.setState({ selected : selected.filter(item => item !== id) })

        return this.setState({ selected : [ ...selected, id ] })
    }

    _getContacts = async () => {
        const { data } = await Contacts.getContactsAsync()

        const unfilteredData = data.filter(({ phoneNumbers }) => !!phoneNumbers)

        const contacts = unfilteredData.sort((a,b) => a.name.localeCompare(b.name))

        return this.setState({ contacts, contactsSaved : [ ...contacts ] })
    }

    componentDidMount = async () => {
        const permission = await Permissions.askAsync(Permissions.CONTACTS)

        const { status } = permission

        if(status == 'granted') return this._getContacts()
    }

    render() {
        const { contacts, selected, filterText } = this.state

        return (
            <View style={{ flex : 1 }}>
                <StatusBar hidden />
                <KeyboardAvoidingView style={{ flex : 1 }} behavior="padding">
                    <AddRecipientsTitle howMany={ selected.length } />
                    {/* <ScrollView contentContainerStyle={{ flexGrow : 1 }}> */}
                    <ContactsList filterText={ filterText } contacts={ contacts } selected={ selected } onContactPress={ this._onContactPress } />
                    {/* </ScrollView> */}
                    {/* <ContactsList contacts={ contacts } /> */}
                    <Filter filterText={ filterText } onChange={ this._onFilterChange } />
                </KeyboardAvoidingView>
                <AddContactsButton onPress={ this._onSubmitContacts } />
            </View>
        )
    }
}

export default AddRecipients
