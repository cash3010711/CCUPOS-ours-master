// @flow
//

const style = {


    sidebar(){
        return {
          bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px',
            display:'none'
          },
          bmBurgerBars: {
            background: '#ff0000'
          },
          bmCrossButton: {
            height: '24px',
            width: '24px'
          },
          bmCross: {
            background: '#bdc3c7',
            display:'none'
          },
          bmMenu: {
            background: '#ffffff',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
          },
          bmMorphShape: {
            fill: '#373a47'
          },
          bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
          },
          bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)',
          }
        }
    },
    sidebarFontSize(){
        return {
            fontSize: 30
        }
    },
    loginCard(){
      return {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        textAlign: 'center',
      }
    }
}

export const gridMenu = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 450,
    height: 400,

  },
};

export default style;
