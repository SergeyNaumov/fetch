from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from data.userlist import get as getUserlist

from db import db
# uvicorn main:app --reload --port=7002


print('FreshDB:',db.get(table='user'))
app = FastAPI(Debug=True)

origins = [
    #"http://localhost.tiangolo.com",
    #"https://localhost.tiangolo.com",
    
    #"http://localhost",
    "http://localhost:8080",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/userList')
async def userlist():
  return {
    "success":1,
    "data":db.get(table='user'),
    "errors":[]
  }

@app.post('/addUser')
async def useradd(item: dict):

  errors=[]
  success=1
  print('item:',item)
  db.save(
    table='user',
    errors=errors,
    data={
      'name':item['name']
    }
  )
  if len(errors): success=0
  return {
    "success":success,     
    "errors":errors
  }

@app.delete('/delUser/{id}')
def deluser(id: int):
  errors=[]
  success=1
  db.query(
    query=f"DELETE from user where id=%s",
    values=[id],
    errors=errors
  )
  if len(errors): success=0
  
  return {
    "success":success,     
    "errors":errors
  }  
