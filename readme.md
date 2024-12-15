# Node start

## 1-4

- Everything that we did on the lesson
- Optimized code by creating functions for request body and response
- Found (with help of copilot) good way to modify properties with PATCH

## 5

- Didn't know what to do so made just simple min, max, sum, average and median calculator from the value keys in the list
- Functionality: items can be posted on the server for example student exam numbers and then highest, lowest, average and median can be calculated
- Works with /items/min, /items/max ect


# Express

## 1-2

- Easy and straight forward

## 3

- Added information about api endpoints to index.pug
- Little struggle with example data in pug
- Used "each item in exampleData" for generating example data in pug

# 4-5

- Implemented PUT and DELETE endpoints
- Added images to media folder with matching filenames to the mock data
- Images avalaible at /media/filename


# Database A

- Database structure in database/database.png
- Created tables for likes, comments, tags and user levels
- Inserted records in all tables
- All sql queries can be found in database/create-db.sql

# Database B

- Planned and created project database
- Created current sql dump from the database

# Express MVC and database

- Connected database and created sql statements to models for getting data from the database
- Implemented endpoints for:
    - GET /api/media - list all media items
    - GET /api/media/:id - get media item by id
    - PUT /api/media/:id - update media item
    - DELETE /api/media/:id - delete media item
    - GET /api/users - list all users
    - GET /api/users/:id - get user by id
    - POST /api/users - add new user
    - PUT /api/users/:id - update user
    - DELETE /api/users/:id - delete user
    - GET /api/likes/media/:id - get likes for media
    - GET /api/likes/user/:id - get likes for user
    - POST /api/likes - get all likes
    - DELETE /api/likes/:id - get like by id
- Implemented file upload with multer

# Authentication

- Implemented login endpoint
- Implemented authentication for routes
    - PUT /api/media/:id - only file owner can update media items
    - DELETE /api/media/:id - only file owner can delete media item
    - PUT /api/users/ - users can update only their own user info
