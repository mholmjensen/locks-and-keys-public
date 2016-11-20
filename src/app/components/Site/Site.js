/* @flow */

import React from 'react'

import s from './Site.css'

import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import Divider from 'material-ui/Divider'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

const TopToolbar = (props) =>
  <Toolbar>
    <ToolbarGroup firstChild>
      <DropDownMenu>
        <MenuItem value={1} primaryText='All Broadcasts' />
        <MenuItem value={2} primaryText='All Voice' />
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text='Options' />
      <ToolbarSeparator />
      <RaisedButton label='Til Særbestilling' primary />
      <IconMenu iconButtonElement={
        <IconButton touch>
          <NavigationExpandMoreIcon />
        </IconButton>
        }
      >
        <MenuItem primaryText='Settings' />
        <Divider />
        <MenuItem primaryText='Log out' />
      </IconMenu>
    </ToolbarGroup>
  </Toolbar>

export default class Site extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <TopToolbar />
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <OrderOverview />
            </div>
            <div className='col-md-4'>
              <OrderToolbar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
