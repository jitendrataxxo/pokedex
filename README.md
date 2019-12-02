1. install pipenv pip install --user pipenv. https://docs.pipenv.org
2. install dependencies pipenv install.
3. activate pipenv shell pipenv shell or run python with pipenv run python ....

4. exit to close shel

for running server for this project

frontend //

python start.py -n install // for installing frontend dependencies

python start.py -n start

backend

python start.py -p runserver

// Run below query to upload data in postgrssql database with the help of pgadmin and change dir path according your folder path
// during uploading may be face some problem like //permisson denid for reading csv file so change the permisstion of the folder which containing
// data file, for fixing this issue please go through this link.
http://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/
https://stackoverflow.com/questions/14083311/permission-denied-when-trying-to-import-a-csv-file-from-pgadmin

COPY pokedex_pokedex
FROM 'C:\Users\Jeetendra\Documents\pokedex1\backend\pokedex\prokdex.csv' DELIMITER ',' CSV HEADER;

please use my csv file to upload data to run this project becuase some filed name are changed (e.g: type => threat_type) due to python reserved keywords issue.
