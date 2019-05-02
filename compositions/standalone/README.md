# cerberus-angular-standalone Cerberus Docker compositions

[Cerberus](http://www.cerberus-testing.org/) is an user-friendly automated testing framework.

Here you will find information about the `cerberus-angular-standalone` Docker composition

## standalone

The `cerberus-angular-standalone` Docker composition runs Cerberus Front under the [NodeJS](https://nodejs.org) application server.

### Get started

 1. Download the default Docker composition
 
_Note: Optionaly adapt it according to your local config._

 2. Execute at the root path
	
        docker-compose -f docker-compose.yml up

 3. Wait for the images to startup

 4. Open your favorite browser and go to `<docker_host>:4200`, where `<docker_host>` is your Docker host

 5. Cerberus Front should be up and running. Please note that you need to deploy a Cerberus Back instance on your machine.

### Associated images                                                                                                          | Description

No current Cerberus images yet. 

### Ports

Hereafter list of reachable ports from your Docker host:

Port             | Description
-----------------|---------------------------------------------------------------------------------
`4200`          | the Cerberus Front HTTP access port

### Mapped volumes

There is no mapped volume since no data are persisted in this composition

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
