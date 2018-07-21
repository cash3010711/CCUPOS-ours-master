import React from 'react'

import { UserIsAuthenticated } from 'utils/router'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui-next/styles'
import Paper from 'material-ui-next/Paper'
import Typography from 'material-ui-next/Typography'
// const populates = [
//   { child: 'owner', root: 'users', keyProp: 'key' }
// ]
//


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

@UserIsAuthenticated // redirect to /login if user is not authenticated



class Table extends React.Component {


  render(){

     const { classes } = this.props
     return (


     <div >
       <Paper className={classes.root} elevation={4}>
        <Typography type="display1"  align='center' paragraph = {true}>
            系統須知&注意事項
        </Typography>
        <br/>
        <Typography type="subheading" paragraph = {true}>
            目前官方APP僅開放IOS系統，安卓系統持續開發中，敬請期待。 <br/>
            本館全面採用雲端技術，請確保您的網路訊號穩定以取得我們所有的服務。
        </Typography>
        <Typography type="title" align='center' paragraph = {true}>
          登入
        </Typography>
        <Typography type="body1" paragraph = {true}>
          1.請勿使用私密或無痕模式進行瀏覽
        </Typography>
        <Typography type="title" align='center' paragraph = {true}>
          訂單
        </Typography>
        <Typography type="body1" paragraph = {true}>
          1.請使用Chrome瀏覽器並允許通知服務才可以收到餐點完成通知。<br/>
          2.單一餐點若超過五份以上請直接至櫃台點餐。<br/>
          3.IOS用戶請注意點餐叫號。
        </Typography>
        <Typography type="title" align='center' paragraph = {true}>
          系統
        </Typography>
        <Typography type="body1" paragraph = {true}>
          1.IOS用戶請至AppStore下載官方定位APP(門口處有QR Code)。<br/>
          2.開啟官方定位APP請務必進行登入。<br/>
          3.官方定位APP與點餐帳號務必為同一類型(Facebook, Google, Email)。
        </Typography>
      </Paper>
     </div>
    );
  }
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);
