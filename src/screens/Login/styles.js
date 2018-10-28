import { StyleSheet } from 'react-native'

import constants from '../../constants/styles_constants'

const { shadows, primaryColor } = constants

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    },
    appTitle : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    appTitleText : {
        fontSize : 40,
        fontWeight : '200',
        color : primaryColor
    },
    card : {
        padding : 20,
        // alignSelf : 'stretch',
        marginRight : 30,
        marginLeft : 30,
        ...shadows
    }
})

export default styles
