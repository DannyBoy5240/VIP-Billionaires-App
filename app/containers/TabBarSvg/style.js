import { StyleSheet, Dimensions} from 'react-native'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    tabBarImage: {
        width,
        position: 'absolute',
        bottom: 2,
        alignSelf: 'center'
    }
});

export default styles