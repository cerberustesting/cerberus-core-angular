# cerberus-keycloak-angular Cerberus Docker compositions

[Cerberus](http://www.cerberus-testing.org/) is an user-friendly automated testing framework.

Here you will find information about the `cerberus-keycloak-angular` Docker composition

## cerberus-keycloak-angular

The `cerberus-keycloak-angular` Docker composition runs Cerberus Source under the Tomcat application server configured to work with Keycloak authentification plugin (not in the composition scope) on a [MySQL](https://www.mysql.com/) database and Cerberus Front under a [NodeJS](https://nodejs.org) application server.

### Get started

TO DO.

### How to run Web Application tests

TO DO.

### Associated images

Image                                                                                                           | Description
----------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------
[`cerberustesting/cerberus-db-mysql`](https://hub.docker.com/r/cerberustesting/cerberus-db-mysql/)              | Run a Cerberus dedicated MySQL database instance
[`cerberustesting/cerberus-as-tomcat-keycloak`](https://hub.docker.com/r/cerberustesting/cerberus-as-tomcat-keycloak/)      | Run a Cerberus instance into a Tomcat application server with Keycloak


### Ports

Hereafter list of reachable ports from your Docker host:

Port             | Description
-----------------|---------------------------------------------------------------------------------
`4200`          | the Cerberus Front HTTP access port
`8080`          | the Cerberus Back HTTP access port
`3306`          | the MySQL database access port

### Mapped volumes

Hereafter list of mapped volumes:

Service                 | Data volume (Source)                                                          | Host volume (Destination, default values)     | Description
------------------------|-------------------------------------------------------------------------------|-----------------------------------------------| -----------------------------------------------
`cerberus-db-mysql`     | `/var/lib/mysql`                                                              | `./localdata/mysql-db`                        | The MySQL local database directory
`cerberus-as-tomcat-keycloak`    | `/opt/CerberusMedias/`                                                  | `./localdata/cerberusmedia`                     | The Cerberus media directory (hosting execution screenshot for ex.)


Don't forget to change host volume default values to fit to your need.

## License

Cerberus Copyright (C) 2013 - 2017 cerberustesting

This file is part of Cerberus.

Cerberus is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Cerberus is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Cerberus.  If not, see <http://www.gnu.org/licenses/>.
