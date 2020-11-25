import {Platform} from 'react-native';
import colors from './color';

export default {
    colors,
    text:
       { 
            fontSize:17,
            color:colors.dark,
            fontFamily:Platform.OS === "android" ? "Roboto" : "Avenir",
            textAlign:"justify"
        }

    }