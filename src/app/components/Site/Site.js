/* @flow */

import React from 'react'

import s from './Site.css'

import OrderOverview from '../OrderOverview/OrderOverview.container'
import OrderToolbar from '../OrderToolbar/OrderToolbar.container'

import Divider from 'material-ui/Divider'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

const TopToolbar = (props) =>
  <Toolbar>
    <ToolbarGroup firstChild>
      <RaisedButton label='Til Særbestilling' primary />
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text='Keys and Locks Manager' />
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarSeparator />
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
            <div className='col-xs-12'>
              <OrderOverview />
            </div>
          </div>
          <div className={s.toolbar + ' row'}>
            <div className='col-xs-12'>
              <OrderToolbar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
