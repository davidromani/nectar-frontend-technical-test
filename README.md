Nectar Frontend Technical Test v1.0
===================================

#### Installation requirements

 * Git 2.0+
 * Make 3.0+
 * Docker Compose 2.0+

#### Installation instructions

```bash
$ git clone git@github.com:davidromani/nectar-frontend-technical-test.git nectar-frontend
$ cd nectar-frontend
$ make up
```

#### Usage notes

 * Make sure that you have previously clone, build & run [this](https://github.com/davidromani/nectar-backend-technical-test) instance
 * To manage tasks as a ROLE_USER open a browser [here](https://localhost:8100/login) 
 * You will show a security risk warning due to self signed SSL certificate, that must be accepted. Indeed, is not a security risk because API calls never go outside of your local networks.
 * Click on "Visit web page", and accept to apply changes. Then, login page will appears.
 * Finally, login with the following credentials -> username `1email@email.com` and password `password1111`
