# multi-domain
Experiment with multiple domains served on same server and its impact on cookies and socket.io

Nginx server setup to serve multiple domains,
e.g. test1.engine.lvh.me:8080, test2.engine.lvh.me:8080,
from a single node application.
The node application uses `express-session` with `redis` to store cookies for all the
different sub-domains it encounters.

## Build
> $ npm install\
> $ docker build -t experiment/multi-domain .

## Run
> $ docker-compose up

> $ docker exec -it multi-domain /bin/sh\
> $ nginx

Now we can open `test1.engine.lvh.me:8080` and `test2.engine.lvh.me:8080`
on two different tabs to observe both domains work and are setting different sessions.
