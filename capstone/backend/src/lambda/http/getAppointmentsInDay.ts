import 'source-map-support/register'
// import { getUserAppointments } from '../../businessLogic/appointments';
import { getAppointmentInDay } from '../../businessLogic/appointments';
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import *  as moment from 'moment'

const logger = createLogger("Get appointments in day")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info("Processing Event: ",event)
  const appointmentDay = event.pathParameters.appointmentDay
  const appointmentsDate = moment(appointmentDay,"YYYY-MM-DD",true)
  if(!appointmentsDate.isValid){
    logger.info('Invalid date ',appointmentDay)
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: "Invalid date format. please use YYYY-MM-DD"
    }
  }
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const result = await getAppointmentInDay(jwtToken,appointmentsDate)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({items :result})
    }
  

}
