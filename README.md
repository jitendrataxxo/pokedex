### prerequisites
node
python

1. install pipenv => pip install --user pipenv. https://docs.pipenv.org
2. install dependencies => pipenv install.
3. activate pipenv shell =>  pipenv shell or run python with pipenv run python ....
4. exit => to close shell

### For running server for this project

## backend

pipenv install => for install backand dependencies // some peoblem is here with pipenv latest version, so install packages manually (pipenv install package_name) acc. to pipFile.

python start.py -p runserver => start backend server

## frontend

python start.py -n install => for installing frontend dependencies

python start.py -n start => start frontend server

## Extra Help!

// Run below query to upload data in postgrssql database with the help of pgadmin and change dir path according your folder path

// during uploading may be face some problem like //permisson denid for reading csv file so change the permisstion of the folder which containing
// data file, for fixing this issue please go through this link.
http://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/
https://stackoverflow.com/questions/14083311/permission-denied-when-trying-to-import-a-csv-file-from-pgadmin

COPY pokedex_pokedex
FROM 'C:\Users\Jeetendra\Documents\pokedex1\backend\pokedex\prokdex.csv' DELIMITER ',' CSV HEADER;

please use my csv file to upload data to run this project becuase some filed name are changed (e.g: type => threat_type) due to python reserved keywords issue.
