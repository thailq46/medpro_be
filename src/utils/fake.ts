import {faker} from '@faker-js/faker'
import _, {random} from 'lodash'
import {ObjectId} from 'mongodb'
import {RoleType, UserVerifyStatus} from '~/constants/enum'
import {RegisterReqBody} from '~/models/request/User.request'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.service'
import {hashPassword} from '~/utils/crypto'

const PASSWORD = 'Thai@123!'

const createRandomUser = () => {
  const user: RegisterReqBody = {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: PASSWORD,
    confirm_password: PASSWORD,
    date_of_birth: faker.date.between('1945-01-01', '1980-12-31').toISOString(),
    gender: random(0, 1)
  }
  return user
}

const users: RegisterReqBody[] = faker.helpers.multiple(createRandomUser, {
  count: 17
})

export function generateRandomPhoneNumber(): string {
  const prefix = _.sample(['038', '035'])
  const phoneNumberArray = _.times(7, () => _.random(0, 9))
  const phoneNumber = prefix + phoneNumberArray.join('')
  return phoneNumber
}

const insertMultipleUsers = async (users: RegisterReqBody[]) => {
  console.log('Creating users...')
  const result = await Promise.all(
    users.map(async (user) => {
      const user_id = new ObjectId()
      await databaseService.users.insertOne(
        new User({
          ...user,
          _id: user_id,
          username: `user${user_id.toString()}`,
          password: hashPassword(user.password),
          date_of_birth: new Date(user.date_of_birth),
          verify: UserVerifyStatus.Verified,
          role: RoleType.Doctor,
          phone_number: generateRandomPhoneNumber(),
          email: `doctor${_.random(5, 30)}@gmail.com`,
          position: random(1, 4)
        })
      )
      return user_id
    })
  )
  console.log(`Created ${result.length} users`)
  return result
}
// insertMultipleUsers(users)
//   .then(() => {
//     console.log('Done!')
//   })
//   .catch(console.error)
