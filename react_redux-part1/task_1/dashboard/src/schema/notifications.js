import React from 'react'
import * as dataJson from '../../../../notifications.json'
import { normalize, schema } from 'normalizr'

export function getAllNotificationsByUser(userId) {
  return dataJson.default
                 .filter((item) => item.author.id === userId)
                 .map(({context}) => context)
}

const user = new schema.Entity("users");

const message = new schema.Entity(
  "messages",
  {},
  {
    idAttribute: "guid"
  }
);

const notification = new schema.Entity(
  "notifications",
  {
    author: user,
    message: message
  },
);

const normalizedData = normalize(dataJson.default, [notification]);

export { normalizedData };