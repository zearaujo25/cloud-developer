import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { CreateAppointmentRequest } from '../../requests/CreateAppointmentRequest'
import { createAppointment } from '../../businessLogic/appointments'
const logger = createLogger('delete')



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: '+ event)

  const newAppointment: CreateAppointmentRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  logger.info("newAppointment " + newAppointment + " jwToken "+ jwtToken)

  const newItem = await createAppointment(newAppointment, jwtToken)
  createLogger('New Item Created: '+ newItem)
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item:newItem
    })
  }
}
