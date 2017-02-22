/* @flow */

import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

class HeaderBar extends React.Component {
  render () {
    let {signout} = this.props
    let navElement = <IconButton touch><NavigationExpandMoreIcon /></IconButton>
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          <IconMenu iconButtonElement={navElement}>
            <MenuItem primaryText='Sign out' onClick={signout} />
          </IconMenu>
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text='Locks and keys - Roskilde Festival' />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
HeaderBar.propTypes = {
  signout: React.PropTypes.func.isRequired
}

export default HeaderBar
