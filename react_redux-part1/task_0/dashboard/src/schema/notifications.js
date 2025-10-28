import React from 'react'
import * as dataJson from '../../../../notifications.json'

function getAllNotificationsByUser(userId) {
  return dataJson.default
                 .filter((item) => item.author.id === userId)
                 .map(({context}) => context)
}

export default getAllNotificationsByUser