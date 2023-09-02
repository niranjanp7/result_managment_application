How to setup project and run
    1.  Extract project zip file to any location on local machine.
    2.  Install node modules by running the following command
        npm install
    3.  Configure database
        Go to file "config/config.json" for configuring the database properties for database connection used by "sequelize".
        a.  Updata username and password for logging into database.
        b.  Either use any existing schema from database or manually create "school" schema in database.
        c.  Provide host url where database is running.
        d.  Dialect is for what type of database is being used. (refer sequelize docs for more details)
    4.  (OPTIONAL) Run the migrations to create tables into database.
        Code will synchronize the models with the database before starting up express server. If tables does not exist, then will create it.
    5.  Configure app properties in file "app-config.js", replace HOST to one that is available.
    6.  Run below command to start express server
        npm start
    7.  Open a new terminal at the same location. To input sample data in the tables, run the below command.
        sequelize db:seed:all

        Below data will be inputted in database
        Teacher Table
        +----------+----------+
        | username | password |
        +----------+----------+
        | abc1     | abc1     |
        | abc2     | abc2     |
        | abc3     | abc3     |
        +----------+----------+

        Student Table
        +---------+-------------+------------+-------+
        | roll_no | name        | dob        | score |
        +---------+-------------+------------+-------+
        |       1 | Ben Zymen   | 2002-02-28 |     0 |
        |       2 | Sam Panze   | 2001-05-17 |     0 |
        |       3 | Kine Tealer | 2001-09-08 |     0 |
        |       4 | Mir Kazim   | 2002-03-20 |     0 |
        +---------+-------------+------------+-------+