import {
  blueGrey100, blueGrey500, blueGrey700,
  pinkA200, tealA100, lightBlue500,
  grey900, white, grey400, darkBlack
} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color:'rgba(#ffffff, 0)',
    //primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    primary3Color: blueGrey100,
    accent1Color: pinkA200,
    accent2Color: tealA100,
    accent3Color: lightBlue500,
    textColor: grey900,
    //alternateTextColor: white,
    alternateTextColor: 'rgba(#fe0000, 0.5)',
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: pinkA200,
    shadowColor: 'rgba(255, 255, 255, 0)'

  }

}
