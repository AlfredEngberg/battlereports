# 06-09 2024
Idag så skrev jag färdigt planeringen och jag lade till allt i database.
Jag hade lite problem med designen av databasen och dess upplägg. Men med Jens hjälp så fixades det utan några större problem. Jens hjälpte mig med hur jag bör tänka kring designen och gav förslag på att ändra en tabell från stats till game. Innan idag så hade jag problem med hur kopplingen mellan användare och listor skulle vara. Med det jag hade tidigare så kunde en användare max ha 1 lista, då man ägde bara 1 lista. Med det nya sättet så har listorna en ägare, vilket innebär att man kan ha hur många listor som helst.

# 11-04 2024
Idag så har jag jobbat med att fixa inloggning och att städa och döpa om allt så jag inte blandar engelska och svenska, syftet med det är att göra det mindre rörigt och att jag ska förstå vad som . Jag har haft ett fokus på hash men det har inte gått så bra. Jag har inte kommit så långt i inloggningen men jag har instalerat bcrypt och ska fortsätta med inloggningen nästa lektion.

# 16-04 2024
Idag så lade jag in session i projektet och fixade inloggningen. Det var otroligt mycket trubbel med det. Jag hade skrivit fel på "newuser" ett flertal gånger, jag hade också problem med sql frågan, jag hade problem med att förstå hur det fungerade. Men nu vet jag vad jag har gjort och det fungerar som det ska och man kan skapa en ny användare och logga in.

# 22-04 2024
Idag så fixade jag så att man kan skapa en ny användare och när man skapar en ny användare så tas man till login sidan. Sen när man är inloggad så ser man en ny knapp som man kan skapa listor på. Jag har skapat ett formulär där som man ska använda för att skapa en ny lista. Det största problemet med detta är att välja vilket spel som man ska använda, först tänkte jag en dropdown meny men det verkade ganska svårt och jag fick inte till det så jag kollade på andra alternativ och kom fram till att checkbox skulle fungera lika bra och vara lättare så det ska bli det. Nästa lektion 

# 23-04 2024
Idag så lade jag till en log ut knapp, som loggar ut en. Jag gömde login och skapa ny användare knapparna om man är inloggad och så ser man skapa ny lista knappen. Jag fick också till det med checkboxes så nu är folmuläret färdig. Ett problem jag har stött på idag är att det har varit ganska svårt att kunna använda formuläret och få den till databasen och att det har kommit upp massa skumma personer i databasen :/ verkade fixat sig självt med jag litar inte på den. Nästa gång så ska jag fixa formuläret och fixa så att det kommer till databasen.

# 25-04 2024
Idag så skrev jag färdigt så att man kan skapa nya listor MEN bara om man är inloggad, om man inte är inloggad och vill skapa en lista så skickas man till log in sidan. Jag ändrade så att det är en dropdown meny istället för radio buttons. Nästa gång så ska jag lägga till så att man ska kunna se andras listor och sen gå in på dom för att se mer detalj på listan

## 30-04 2024
Idag så fixade jag lite med css för att jens sa till mig, jag var tvungen att avika från min planering. Jag fixade också hosting på med hjälp av glitch. Jag fixade också validering av express, iaf på att skapa nya användare så att det bara skickas till databasen om man har valida saker i formuläret. Sen har jag också fixat så att man kan se alla användare på sidan som ska visa alla användare. Nästa steg är att kunna gå in på användare och sen se deras listor och sen gå in på listorna och se dess innehåll.

## 06-05 2024
Idag så försökte jag att fixa man ska kunna gå in på en profil och se hens listor men det gick inte så bra. Jag har kollat på cats-repot men det har inte varit jätte hjälpsamt. Jag har gjort så att man iaf tar sig till en sida beroende på id:t. Det jag måste ha hjälp med är att få sql-frågan att fungera samt att göra sidan med css och annat, för att nu så är det utan css när den "fungerade"

## 07-05 2024
Idag så har jag fixat det mesta som behövts för att sidan ska fungera. Jag lade till en sida där man kan se alla listor i databasen. Nu kan man även gå in på en profil och se listorna som den användaren har skapat. Man kan sen gå in på listorna och se mer detaljer om listan, namn på listan, skaparen (dock så är det bara ett id för användaren just nu), poängvärde och dess compositon. Ett problem jag stötte på idag är att jag hade fel i package.json filen och den upptäckte inte ändringar i njk-filer, löstes ganska lätt. Ett annat problem som jag har stött på är att SQL frågorna tycker jag är jätte kluriga. Det är svårt att få till dom så att dom faktiskt gör det jag vill. Det som jag ska göra nästa gång är igentligen bara finslip. Göra sidan tydligare för användarna och liknande.

## 14-15 2024
Idag så har jag fixat massa små fel, finslipat och börjat med express validator på alla formulär. SQL-frågan var ett problem men det löstes. Jag gjorde lösenordet till lösenord, jag gjorde det snyggare med att ta bort prickarna bredvid. Nästa gång så ska jag fortsätta med express validator och se till att det fungerar och sen när det är klart så ska jag få upp sidan på glitch.

## 16-05 2024
Idag har jag jobbat med express-validering och det är klurit som satan. Det är väldigt konstigt hur saker fungerar men det fungerar på något sätt men jag förstår inte hur. Jag har validering på alla formulär. Nästa gång ska jag fortsätta med express, mer specifikt att hantara dom eventuella felen som kan uppstå.

## 21-05 2024
Idag har jag försökt få upp den på glitch men det gick åt helvete och jag är typ inte ett dugg närmare för att få hosting att fungera