import numpy as np
import json
import sqlalchemy as db
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask
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
    #ResultSet[:3]
    # Convert list of tuples into normal list
    #all_accidents = list(np.ravel(ResultSet))

    


    

    # #print(result)
    #return jsonify({'result': [dict(row) for row in result]})
    return json.dumps([dict(r) for r in result], default=alchemyencoder)


@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_passengers = []
    for name, age, sex in results:
        passenger_dict = {}
        passenger_dict["name"] = name
        passenger_dict["age"] = age
        passenger_dict["sex"] = sex
        all_passengers.append(passenger_dict)

    return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
