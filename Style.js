
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#007aff',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#eee',
        fontSize: 30,
        fontWeight: 'bold'
    },
    time: {
        fontSize: 55,
        marginTop: 80,
        alignSelf: 'center'
    },
    contentButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#eee',
        fontSize: 18
    },
    button: {
        width: 85,
        height: 45,
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
});
