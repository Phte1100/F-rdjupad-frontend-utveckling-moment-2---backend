# Moment 2

Jag har skapat ett CRUD-API som anslut till MongoDB och använder backend-ramverket Fastify. Applikationen har full CRUD-funktionalitet och kan skpa, läsa, uppdatera och radera.

 Fastify som jag använt är Node.js-ramverk. API:et hanterar data relaterat till discgolf-discar.

## Endpoint

 API:et är publicerat på Render nås här:
 https://fullstack-moment-2.onrender.com/discs
 (Det kan ta en stund innan servern vaknar.)

## Funktionalitet

|Metod  |Ändpunkt          |Beskrivning                                                                                       |
|-------|------------------|--------------------------------------------------------------------------------------------------|
|GET    |/discs/           |Hämtar alla inlägg.                                                                               |
|POST   |/discs/           |*Skapar nytt inlägg                                                                               |
|PUT    |/discs/:ID        |Uppdaterar inlägg med angivet ID.                                                                 |
|DELETE |/discs/:ID        |Raderar inlägg med angivet ID.                                                                    |

*POST 
För att lägga till en ny disc så krävs följande JSON-datan i bodyn:
{
	brand: { type: 'string' },
	model: { type: 'string' },
	weight: { type: 'integer', minimum: 134, maximum: 205 },
	tested: { type: 'boolean' }
}

## Plugins

I denna applikation så har jag använt:

### @fastify/mongodb
För att ansluta till databasen.

### @fastify/routes
Logga alla Routes under utvecklingen.

## Klona repot
git clone https://github.com/Phte1100/Fullstack---moment-2.git




Skapad av Philip Telberg

