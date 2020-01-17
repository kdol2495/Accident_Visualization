import numpy as np
import json
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, import request
import simplejson as json
import decimal, datetime

def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes."""
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

def example():
    connection = engine.connect()
    res = conection.execute(select([accident_table]))

    # use special handler for dates and decimals
    return json.dumps([dict(r) for r in res], default=alchemyencoder)


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///test.sqlite.db3")


metadata = db.MetaData()

accident_table = db.Table('ACCIDENTS', metadata, autoload=True, autoload_with=engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/passengers"
        f"/api/v1.0/all_accidents"
    )


@app.route("/api/v1.0/all_accidents")
def all_accidents():
    connection = engine.connect()

    """Return a list of all accidents"""
    #Equivalent to 'SELECT * FROM accidents'
    query = db.select([accident_table])
    ResultProxy = connection.execute(query)
    result = ResultProxy.fetchall()
    return json.dumps([dict(r) for r in result], default=alchemyencoder)

@app.route("/api/v1.0/map_data")
def map_data():
    connection = engine.connect()
    query = db.select([accident_table])
    ResultProxy = connection.execute(query)
    result = ResultProxy.fetchall()



if __name__ == '__main__':
    app.run(debug=True)
