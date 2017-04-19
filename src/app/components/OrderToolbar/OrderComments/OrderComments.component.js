/* @flow */

import React from 'react'
import {translate} from 'react-i18next'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

let secsToDateStr = function (epochSecs) {
  var curdate = new Date()
  curdate.setTime(epochSecs * 1000)
  return curdate.toLocaleString()
}

const OrderComments = (props) => {
  const {order, t} = props
  let comments = order.Comment || []
  comments = comments.filter(e => e.Comment !== undefined)
  comments = comments.map((e, index) => {
    return {
      comment: e.Comment.comment.replace(/(?:\r\n|\r|\n)/g, '<br />'), // From http://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
      author: e.Comment.author,
      created: secsToDateStr(e.Comment.created),
      key: index + ''
    }
  })

  return (
    <List>
      { order.remarks &&
        <div>
          <Subheader>{t('Remarks')}</Subheader>
          <ListItem key={'-1'}>
            <blockquote>
              <p>{order.remarks}</p>
            </blockquote>
          </ListItem>
        </div>
      }
      { order.Comment &&
        <Subheader>{t('Comments')}</Subheader>
      }
      {
        comments.map(c => {
          return (
            <ListItem key={c.key}>
              <blockquote>
                <p dangerouslySetInnerHTML={{__html: c.comment}} />
                <footer>
                  {c.author}
                  <small>
                    {c.created}
                  </small>
                </footer>
              </blockquote>
            </ListItem>
          )
        })
      }
    </List>
  )
}

OrderComments.propTypes = {
  order: React.PropTypes.object,
  t: React.PropTypes.func
}

export default translate('', [{ wait: true }])(OrderComments)
