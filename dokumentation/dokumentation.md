# Dokumentaiton för slutprojekt Webbserverprogramering 1

## Vad har jag gjort?
Jag började med att skriva en planering med vad sidan ska vara, vad jag ska ha i databasen och sen en tidsplanering. Det som sidan ska vara är en sida där man kan logga in och ladda upp listor man har skrivit i exempel battlescribe eller liknande. Samt att man kan se andra användare och listor. Planeringen hjälpte mig med vad jag skulle göra varje vecka och vad som skulle vara färdigt. Det fanns vissa saker jag inte tänkte på när jag skrev min planering som hosting eller validering. Det spelade inte jätte stor roll i slutändan för att jag låg alltid före i min planering så jag hade ett par veckor att jobba med det innan inlämningsdatumet. 

Det första jag gjorde var att lägga till det jag skulle ha i databasen. Det fanns lite problem med designen av dom så jag ändrade på upplägget så att det var listor som hade en ägare istället för användare som ägde listor. Ett problem som jag stötte på senare var hur man skulle välja vilket spel man skrev en lista till. Jag lade till ett table för spelsystemen som jag sen använder i en dropdown meny för att välja spelen.

Sen jobbade jag med inloggningssystemet på sidan och döpte om allt till engelska så jag inte blandar engelska och svenska för att göra det mindre förvirrande att jobba med. De största problemen jag hade är att jag hade stavat fel på "newuser" och sql-frågan som jag använde. Jag hittade alla problem och åtgärdade de felen. 

Efter det lade jag till så att man kan skapa nya användare på sidan. När man inte är inloggad så ser man 2 knappar: logga in och skapa ny användare. När man är inloggad ser man 2 andra knappar: logga ut och skapa ny lista. Det är här jag hade problemet med att välja spel, jag testade med en dropdown meny utan användning av databasen. Det gick inte bra så jag valde att använda mig av radiobuttons för att välja spel, men det såg inte jättebra ut så inte optimalt men det fungerade. Ett problem med detta är att det ibland skapades tomma rader med inget i den. Jag lade till så att man kan bara ladda upp en lista om man är inloggad, för förr kunde man manuelt skriva url till skapa ny lista sidan men nu om man går in dit skickas man till hemsidan. Det var även nu jag bytte från radiobuttons till en dropdown med hjälp av databasen. 

Sen lade jag till css för att få sidan snyggare och hostade sidan på glitch, inte den färdiga versionen men en version. Jag lade till express vadidering på skapa ny användare. Jag lade sen till en sida där man kan se alla användare där man kan sen gå in på användarens profil där det står alla användarens listor. 

Jag lade till en sida med alla listor där man kan gå in på en lista och se mer information om listan. 

Efter det fixade jag massa småfel på sidan och började att lägga till validering på alla formulär på sidan.

Sist av allt hostade jag sidan. Jag hade ett problem med att jag inte hade ett anändarnamn i .env filen på glitch.

### Tester
Jag har testat sidan i Validator.nu och med wave. Det jag fick först var ett kontrastfel på länken till användaren när man är inne i en lista, gjorde alla länkar rosa så fixade jag det. Inga större fel med validator.nu, tror att de största var att jag hade ett p element i pre element som tydligen inte var tillåtet, men det är fixat inga problem. Nu säger wave bara att jag har 1 redundant link men jag har inte tid att fixa det inom rimlig tid så det får vara så, om jag skulle fixa det skulle jag enbart lägga in knappen och bilden (de 2 saker som har samma länk) i ett li element för att fixa det som jag gjorde i ettan med CV-sidan vi gjorde.

### Bild
Jag har en AI-genererad logotyp som bild på sidan. Den hade en vit bakgrund först. För att ta bort den använde jag mig av photoshop. Den är 41,6 kB från att vara runt 600. Jag körde den igenom många bild kompressor program för att få den mindre. Nästan inget kunde få någon märkvärdig effekt efter 270 kB. Men sen hittade jag det fantastiska verktyget Pi 7 Image Tool (https://image.pi7.org/compress-image-to-50kb). Det fungerade faktiskt väldigt bra och nu är bilden 41,6 kB från att vara lite mer än 600 kB.

### Säkerhet
Jag har expressvalidering på sidan. Det var ganska mycket trubbel. Det största och mest märkvärda felet jag gjorde var att jag råkade göra fel på en if sats när jag kollade om datan var bra data. Det jag skrev att den skulle göra var att om det var fel så gjorde den det den skulle göra om det var rätt och när det var rätt så gjorde den det som den skulle göra när det var fel. Jag har även så att om man inte är inloggad och navigerar manuellt till en sida som newlist så kan man inte skapa en ny sida, utan man skickas tillbaka till home sidan.

## Features jag saknar
Det finns vissa saker som jag skulle vela lägga till. Några av de saker jag mest vill lägga till är att när man är inloggad att man ska kunna redigera och ta bort existerande listor som en användare äger. Sen att man ska kunna sortera och filtrera listor efter namn, tid skapad, spelsystem och poängvärde.

## Vad skulle jag ändra/göra annorlunda om jag gjorde detta igen?
Det finns inte jätte mycket jag skulle ändra om jag skulle göra sidan på nytt, jag är ganska nöjd med min sida. Det jag skulle ända är det jag sa i de features jag saknade.

Det jag skulle göra annorlunda om jag gjorde detta igen var att allt skulle gå snabbare och jag skulle försöka få in de features jag saknar.