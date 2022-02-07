# SET UP INSTRUCTIONS

You will need Docker running on your machine.
THis project uses Swagger (OpenAPi), Symfony and NuxtJs for frontend.

- git clone https://github.com/edouardkombo/gaming-api-nuxtjs

Get the .env file and all details from my google docs:

https://docs.google.com/document/d/1g2Il1dcsBUULjk6qBzG-2zf41XoE1blIRoLGn1nNiLo/edit?usp=sharing

Download and build the latest versions of the image
- docker-compose build --pull --no-cache

Start docker-compose in detached mode
- docker-compose up -d 

# Urls
FRONTEND: https://localhost:8443 or http://caddy

REST API: http://caddy/docs

GRAPHQL API: http://caddy/api/graphql

# TO ACCESS THE HOSTED DEMO:

Add to your windows hosts: 51.254.125.26 caddy

Access through: http://caddy


