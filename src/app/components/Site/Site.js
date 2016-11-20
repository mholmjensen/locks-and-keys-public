/* @flow */

import React from 'react'

import s from './Site.css'

import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

const TopToolbar = (props) =>
  <Toolbar>
    <ToolbarGroup firstChild>
      <IconMenu iconButtonElement={
        <IconButton touch>
          <NavigationExpandMoreIcon />
        </IconButton>
        }>
        <MenuItem primaryText='Settings' />
        <Divider />
        <MenuItem primaryText='Log out' />
      </IconMenu>
      <ToolbarSeparator />
      <RaisedButton label='Til Særbestilling' primary />
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text='Keys and Locks Manager' />
    </ToolbarGroup>
    <ToolbarGroup />
  </Toolbar>

export default class Site extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <div>
          <TopToolbar />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <OrderOverview />
            </div>
          </div>
        </div>
        <div>
          <OrderToolbar />
        </div>
      </div>
    )
  }
}
