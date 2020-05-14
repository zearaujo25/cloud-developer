# Serverless Appointment App

This project aims to be a simple appointmetn app for clients and doctors usign serveless framework. It uses the cour04 projec as its core bases, having the same features.

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

# Auth Feature

This proojects uses the auth0 feature to handle authentications.


# Enpoints 

* `GetAppointment  GET  /appointments/`


This end points purpose is to get all  apointments from a user returning a similiar response like bellow.

```json
{
    "items": [
        {
            "createdAt": "2020-05-13T23:46:36.829Z",
            "appointmentId": "deb3e4c1-4a73-4ea5-806d-ac1f3d40355a",
            "name": "Change the world",
            "appointmentDate": "2021-12-11",
            "done": true,
            "userId": "google-oauth2|114593001408695520569"
        }
    ]
}
```

* `CreateAppointment POST /appointments/` 


This end points purpose is to create an apointments to a user.

It receives a new Appointment item to be created in JSON format that looks like this:

```json
{
	"name": "Doctor phil",
	"appointmentDate": "2019-06-11"
}
```

It should return a new Appointment item that looks like this:

```json
{
    "item": {
        "userId": "google-oauth2|114593001408695520569",
        "appointmentId": "deb3e4c1-4a73-4ea5-806d-ac1f3d40355a",
        "createdAt": "2020-05-13T23:46:36.829Z",
        "name": "Jimmy",
        "appointmentDate": "2019-06-11",
        "done": false
    }
}
```

* `UpdateAppointment PATCH /appointments/{appointmentId}` 


This end points purpose is to update an apointments from a user

It receives an object that contains three fields that can be updated in a appointment item:

```json
{
	"name": "Doctor Lee",
	"appointmentDate": "2021-12-11",
	"done": false
}
```
The id of an item that should be updated is passed as a URL parameter.

It should return an empty body.

* `DeleteAppointment DELETE /appointments/{appointmentId}`


This end points purpose is to delete an apointments from a user

It should return an empty body.
The id of an item that should be updated is passed as a URL parameter.

* `GenerateUploadUrl POST /appointments/{appointmentId}/attachment` - 
returns a pre-signed URL that can be used to upload an attachment file for a TODO item.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

# Frontend

The `client` folder contains a web application that can be used to check the api.

in the folder just run 
```ts
npm -i
npm start
```

To begin the app.


